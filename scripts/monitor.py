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
        "raptor light",
        "raptor lighting",
        "grill light mount",
        "grill light bracket",
        "honeycomb grill light",
        "grille light",
    ],
    "Roof Rack Camp Light Mount": [
        "roof rack camp light",
        "roof rack light mount",
        "roof rack light bar",
        "overland camp light mount",
        "camp light setup",
        "camp light mount",
    ],
    "Midrange Speaker Mount": [
        "speaker upgrade",
        "midrange speaker",
        "speaker mount",
        "speaker install",
        "speaker replacement",
    ],
    "Glove Box & Center Console Organizer": [
        "glove box organizer",
        "center console organizer",
        "interior storage",
        "cab organization",
        "console insert",
        "glove box insert",
    ],
    "Pelican Bed Rail Bracket": [
        "pelican case",
        "pelican bed rail",
        "pelican mount",
        "bed storage system",
        "bed rail mount",
        "pelican 3310",
    ],
    "DC Power Panel": [
        "power panel",
        "12v bed power",
        "bed power setup",
        "dc outlet bed",
        "overland bed power",
        "bed power panel",
        "aux power panel",
    ],
    "General": [
        "Tacoma mods",
        "Tacoma build",
        "Tacoma accessories",
        "overlanding Tacoma",
        "interior mods",
        "build thread",
    ],
}

ALL_KEYWORDS = [kw for group in KEYWORDS.values() for kw in group]

SEEN_POSTS_FILE = Path(__file__).parent / "seen_posts.txt"

# TacomaWorld uses XenForo 1.x — forum IDs found from their forum index.
# .17 is actually Buy/Sell/Trade. These are the relevant product forums:
TACOMAWORLD_FORUMS = [
    ("Lighting", "https://www.tacomaworld.com/forums/lighting.60/"),
    ("Audio & Video", "https://www.tacomaworld.com/forums/audio-video.12/"),
    ("3rd Gen Builds", "https://www.tacomaworld.com/forums/3rd-gen-builds-2016-2023.196/"),
    ("4th Gen Builds", "https://www.tacomaworld.com/forums/4th-gen-builds-2024.293/"),
    ("General Tacoma Talk", "https://www.tacomaworld.com/forums/general-tacoma-talk.294/"),
    ("3rd Gen Tacomas", "https://www.tacomaworld.com/forums/3rd-gen-tacomas-2016-2023.186/"),
    ("4th Gen Tacomas", "https://www.tacomaworld.com/forums/4th-gen-tacomas-2024.292/"),
]

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

SHEET_HEADERS = [
    "Date",
    "Platform",
    "Community",
    "Author",
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
    prompt = f"""A community thread was found matching these Proper Polymer product categories: {', '.join(categories)}.

Thread title: {title}
Thread body (may be empty): {body[:2000]}

Respond with ONLY valid JSON (no markdown fences) with these keys:
- "relevance": one sentence explaining why this thread matters to Proper Polymer
- "priority": "High" if someone is directly asking about a product category, "Medium" if it is a build thread where a contribution fits naturally, "Low" if loosely related
- "response": follow the instructions below for writing the response

You are Chad, an engineer who designs 3D printed Tacoma accessories and sells them at properpolymer.com. You've been active in Tacoma communities for years and own a 2020 Tacoma TRD Off-Road. Write a forum reply to this thread that sounds like a real community member, not a marketer. Lead with genuine helpfulness or a relevant personal experience. Only mention Proper Polymer or properpolymer.com if it directly and naturally solves the person's specific problem — if it doesn't fit naturally, don't mention it at all. Keep it conversational, concise, and human. No exclamation points. No marketing language. Sound like someone who actually knows trucks.

Thread title: {title}
Thread context: Use the "relevance" you identified above as context for your reply."""

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
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
                    "author": str(submission.author or ""),
                    "title": submission.title,
                    "link": f"https://www.reddit.com{submission.permalink}",
                    "body": submission.selftext,
                    "categories": categories,
                    "date": created,
                }
            )

    return leads


# ---------------------------------------------------------------------------
# TacomaWorld
# ---------------------------------------------------------------------------


def _scrape_tacomaworld_page(
    soup: BeautifulSoup, forum_name: str, debug: bool, page: int
) -> list[dict]:
    """Parse threads from a single page of a TacomaWorld forum."""
    leads = []

    # XenForo 1.x uses .discussionListItem (NOT .structItem--thread)
    threads = soup.select(".discussionListItem")
    if debug:
        print(f"  [{forum_name}] page {page}: {len(threads)} threads")

    for thread in threads:
        # Title lives in h3.title > a.PreviewTooltip
        title_el = thread.select_one("h3.title a")
        if not title_el:
            continue

        title = title_el.get_text(strip=True)
        href = title_el.get("href", "")
        link = (
            f"https://www.tacomaworld.com/{href}"
            if not href.startswith("http")
            else href
        )

        author = thread.get("data-author", "")

        # Thread original post date from .startDate (text like "Nov 28, 2020")
        post_date = None
        start_el = thread.select_one(".startDate .DateTime")
        if start_el:
            try:
                post_date = datetime.strptime(
                    start_el.get_text(strip=True), "%b %d, %Y"
                ).replace(tzinfo=timezone.utc)
            except ValueError:
                pass

        categories = matches_keywords(title)
        if not categories:
            continue

        leads.append(
            {
                "platform": "TacomaWorld",
                "community": forum_name,
                "author": author,
                "title": title,
                "link": link,
                "body": "",
                "categories": categories,
                "date": post_date,
            }
        )

    return leads


MAX_TW_PAGES = 50


def _scrape_tacomaworld_forum(
    url: str, forum_name: str, debug: bool
) -> list[dict]:
    """Scrape up to MAX_TW_PAGES pages of a TacomaWorld forum (XenForo 1.x)."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    leads = []

    for page in range(1, MAX_TW_PAGES + 1):
        page_url = url if page == 1 else f"{url}page-{page}"
        resp = requests.get(page_url, headers=headers, timeout=30)
        resp.raise_for_status()

        soup = BeautifulSoup(resp.text, "html.parser")
        page_leads = _scrape_tacomaworld_page(soup, forum_name, debug, page)
        leads.extend(page_leads)

        # Stop if there's no "Next >" link in the pagination
        next_link = soup.select_one(".PageNav a.text")
        if not next_link or "Next" not in next_link.get_text():
            break

        time.sleep(1)  # be polite to the server

    if debug:
        print(f"  [{forum_name}] total: {len(leads)} leads across {page} pages")

    return leads


def search_tacomaworld(debug: bool = False) -> list[dict]:
    all_leads: list[dict] = []

    if debug:
        print("\n" + "=" * 70)
        print("DEBUG: TacomaWorld scraper (XenForo 1.x)")
        print("=" * 70)

    for forum_name, url in TACOMAWORLD_FORUMS:
        try:
            leads = _scrape_tacomaworld_forum(url, forum_name, debug)
            all_leads.extend(leads)
        except Exception as e:
            print(f"  [{forum_name}] Error: {e}")

    if debug:
        print(f"\nTotal TW keyword-matching leads (date filter OFF): {len(all_leads)}")
        for lead in all_leads:
            print(f"  [{lead['community']}] [{', '.join(lead['categories'])}] {lead['title'][:60]}")
        print("=" * 70 + "\n")

    return all_leads


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
        sheet.update("A1:J1", [SHEET_HEADERS])

    return sheet


def existing_links(sheet) -> set[str]:
    """Return all URLs already in the sheet to avoid duplicates."""
    try:
        col = sheet.col_values(6)  # Link column (F)
        return set(col[1:])  # skip header
    except Exception:
        return set()


def append_lead(sheet, lead: dict, analysis: dict) -> None:
    row = [
        lead["date"].strftime("%Y-%m-%d") if lead.get("date") else "",
        lead["platform"],
        lead["community"],
        lead.get("author", ""),
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
        tw_leads = search_tacomaworld(debug=False)
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
