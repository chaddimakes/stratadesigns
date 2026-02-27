"""
Community engagement monitor for Proper Polymer.
Searches Reddit and TacomaWorld for relevant threads and logs leads to Google Sheets.
"""

import json
import os
import time
from datetime import datetime, timezone, timedelta
from pathlib import Path

import anthropic
import gspread
import praw
import requests
from bs4 import BeautifulSoup
from google.oauth2.service_account import Credentials

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SUBREDDITS = ["ToyotaTacoma", "overlanding", "4x4", "Tacoma"]

KEYWORDS = {
    "Raptor Light Brackets": [
        "raptor light bracket",
        "Tacoma honeycomb grill lights",
        "Tacoma grill light mount",
        "Tacoma raptor lights",
    ],
    "Roof Rack Camp Light Mount": [
        "roof rack camp light",
        "Tacoma roof rack lights",
        "overland camp light mount",
        "roof rack light mount",
        "camp light setup",
    ],
    "Midrange Speaker Mount": [
        "Tacoma speaker upgrade",
        "Tacoma midrange speaker",
        "Tacoma speaker mount",
    ],
    "Glove Box & Center Console Organizer": [
        "Tacoma glove box organizer",
        "Tacoma center console organizer",
        "Tacoma interior storage",
        "Tacoma cab organization",
    ],
    "Pelican Bed Rail Bracket": [
        "Pelican case Tacoma bed",
        "Pelican bed rail mount",
        "Tacoma bed storage system",
        "Pelican 3310 mount",
    ],
    "DC Power Panel": [
        "Tacoma power panel",
        "Tacoma 12V bed power",
        "Tacoma bed power setup",
        "Tacoma DC outlet bed",
        "overland bed power",
    ],
    "General": [
        "Tacoma mods",
        "Tacoma build",
        "Tacoma accessories",
        "overlanding Tacoma",
        "Tacoma interior mods",
    ],
}

ALL_KEYWORDS = [kw for group in KEYWORDS.values() for kw in group]

SEEN_POSTS_FILE = Path(__file__).parent / "seen_posts.txt"
TACOMAWORLD_URL = "https://www.tacomaworld.com/forums/accessories-modifications.17/"

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

SHEET_HEADERS = [
    "Date",
    "Platform",
    "Community",
    "Thread Title",
    "Link",
    "Relevance Summary",
    "Priority",
    "Proposed Response",
    "Status",
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def load_seen_posts() -> set[str]:
    if SEEN_POSTS_FILE.exists():
        return set(SEEN_POSTS_FILE.read_text().splitlines())
    return set()


def save_seen_posts(seen: set[str]) -> None:
    SEEN_POSTS_FILE.write_text("\n".join(sorted(seen)) + "\n")


def matches_keywords(text: str) -> list[str]:
    """Return the product categories whose keywords appear in *text*."""
    lower = text.lower()
    matched = []
    for category, kws in KEYWORDS.items():
        if any(kw.lower() in lower for kw in kws):
            matched.append(category)
    return matched


def get_ai_analysis(
    client: anthropic.Anthropic, title: str, body: str, categories: list[str]
) -> dict:
    """Ask Claude to summarise relevance, assign priority, and draft a response."""
    prompt = f"""You are helping Proper Polymer (properpolymer.com), a store selling 3D-printed Toyota Tacoma accessories, find community engagement opportunities.

A community thread was found that matches these product categories: {', '.join(categories)}.

Thread title: {title}
Thread body (may be empty): {body[:2000]}

Respond with ONLY valid JSON (no markdown fences) with these keys:
- "relevance": one sentence explaining why this thread matters to Proper Polymer
- "priority": "High" if someone is directly asking about a product category, "Medium" if it is a build thread where a contribution fits naturally, "Low" if loosely related
- "response": a natural, helpful reply that leads with genuine advice. Only mention Proper Polymer and properpolymer.com if their product directly solves the poster's problem. Never be spammy."""

    message = client.messages.create(
        model="claude-haiku-3-5-20251001",
        max_tokens=512,
        messages=[{"role": "user", "content": prompt}],
    )
    text = message.content[0].text.strip()
    # Strip markdown fences if present
    if text.startswith("```"):
        text = text.split("\n", 1)[1].rsplit("```", 1)[0].strip()
    return json.loads(text)


# ---------------------------------------------------------------------------
# Reddit
# ---------------------------------------------------------------------------


def search_reddit(seen: set[str]) -> list[dict]:
    reddit = praw.Reddit(
        client_id=os.environ["REDDIT_CLIENT_ID"],
        client_secret=os.environ["REDDIT_CLIENT_SECRET"],
        username=os.environ["REDDIT_USERNAME"],
        password=os.environ["REDDIT_PASSWORD"],
        user_agent="ProperPolymerMonitor/1.0",
    )

    cutoff = datetime.now(timezone.utc) - timedelta(hours=24)
    leads = []

    for sub_name in SUBREDDITS:
        subreddit = reddit.subreddit(sub_name)
        for submission in subreddit.new(limit=100):
            created = datetime.fromtimestamp(submission.created_utc, tz=timezone.utc)
            if created < cutoff:
                continue
            if submission.id in seen:
                continue

            text = f"{submission.title} {submission.selftext}"
            categories = matches_keywords(text)
            if not categories:
                continue

            seen.add(submission.id)
            leads.append(
                {
                    "platform": "Reddit",
                    "community": f"r/{sub_name}",
                    "title": submission.title,
                    "link": f"https://www.reddit.com{submission.permalink}",
                    "body": submission.selftext,
                    "categories": categories,
                }
            )

    return leads


# ---------------------------------------------------------------------------
# TacomaWorld
# ---------------------------------------------------------------------------


def search_tacomaworld() -> list[dict]:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    resp = requests.get(TACOMAWORLD_URL, headers=headers, timeout=30)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    cutoff = datetime.now(timezone.utc) - timedelta(hours=24)
    leads = []

    for thread in soup.select(".structItem--thread"):
        title_el = thread.select_one(".structItem-title a:last-child")
        if not title_el:
            continue

        title = title_el.get_text(strip=True)
        href = title_el.get("href", "")
        link = f"https://www.tacomaworld.com{href}" if href.startswith("/") else href

        # Try to parse the thread date
        time_el = thread.select_one("time[datetime]")
        if time_el:
            try:
                post_date = datetime.fromisoformat(
                    time_el["datetime"].replace("Z", "+00:00")
                )
                if post_date < cutoff:
                    continue
            except (ValueError, KeyError):
                continue
        else:
            continue

        categories = matches_keywords(title)
        if not categories:
            continue

        leads.append(
            {
                "platform": "TacomaWorld",
                "community": "Accessories & Modifications",
                "title": title,
                "link": link,
                "body": "",
                "categories": categories,
            }
        )

    return leads


# ---------------------------------------------------------------------------
# Google Sheets
# ---------------------------------------------------------------------------


def get_sheet():
    sa_json = json.loads(os.environ["GOOGLE_SERVICE_ACCOUNT_JSON"])
    creds = Credentials.from_service_account_info(sa_json, scopes=SCOPES)
    gc = gspread.authorize(creds)
    sheet = gc.open_by_key(os.environ["GOOGLE_SHEET_ID"]).sheet1

    # Ensure headers exist
    existing = sheet.row_values(1)
    if existing != SHEET_HEADERS:
        sheet.update("A1:I1", [SHEET_HEADERS])

    return sheet


def existing_links(sheet) -> set[str]:
    """Return all URLs already in the sheet to avoid duplicates."""
    try:
        col = sheet.col_values(5)  # Link column (E)
        return set(col[1:])  # skip header
    except Exception:
        return set()


def append_lead(sheet, lead: dict, analysis: dict) -> None:
    row = [
        datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        lead["platform"],
        lead["community"],
        lead["title"],
        lead["link"],
        analysis["relevance"],
        analysis["priority"],
        analysis["response"],
        "Pending",
    ]
    sheet.append_row(row, value_input_option="USER_ENTERED")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    print("Starting Proper Polymer community monitor...")

    seen = load_seen_posts()
    all_leads: list[dict] = []

    # Reddit
    reddit_env_vars = [
        os.environ.get("REDDIT_CLIENT_ID"),
        os.environ.get("REDDIT_CLIENT_SECRET"),
        os.environ.get("REDDIT_USERNAME"),
        os.environ.get("REDDIT_PASSWORD"),
    ]
    if not all(reddit_env_vars):
        print("Reddit credentials not found, skipping Reddit monitoring.")
    else:
        try:
            reddit_leads = search_reddit(seen)
            all_leads.extend(reddit_leads)
            print(f"Found {len(reddit_leads)} Reddit leads")
        except Exception as e:
            print(f"Reddit search failed: {e}")

    # TacomaWorld
    try:
        tw_leads = search_tacomaworld()
        all_leads.extend(tw_leads)
        print(f"Found {len(tw_leads)} TacomaWorld leads")
    except Exception as e:
        print(f"TacomaWorld search failed: {e}")

    if not all_leads:
        print("No new leads found.")
        save_seen_posts(seen)
        return

    # Google Sheets setup
    sheet = get_sheet()
    known_links = existing_links(sheet)

    # Anthropic client
    ai = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    written = 0
    for lead in all_leads:
        if lead["link"] in known_links:
            print(f"Skipping (already in sheet): {lead['title'][:60]}")
            continue

        try:
            analysis = get_ai_analysis(
                ai, lead["title"], lead["body"], lead["categories"]
            )
            append_lead(sheet, lead, analysis)
            known_links.add(lead["link"])
            written += 1
            print(f"[{analysis['priority']}] {lead['title'][:60]}")
            time.sleep(1)  # gentle rate limiting
        except Exception as e:
            print(f"Failed to process lead: {e}")

    save_seen_posts(seen)
    print(f"Done. Wrote {written} new leads to Google Sheets.")


if __name__ == "__main__":
    main()
