import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { readFile } from "fs/promises";
import path from "path";
import { getProductBySlug } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const slug = searchParams.get("slug");
  const file = searchParams.get("file");

  if (!sessionId || !slug || !file) {
    return NextResponse.json(
      { error: "Missing session_id, slug, or file" },
      { status: 400 },
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json(
      { error: "Payment not completed" },
      { status: 403 },
    );
  }

  const purchasedSlugs = (session.metadata?.products ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!purchasedSlugs.includes(slug)) {
    return NextResponse.json(
      { error: "Product not in this order" },
      { status: 403 },
    );
  }

  const product = getProductBySlug(slug);
  if (!product?.stlFiles?.length) {
    return NextResponse.json(
      { error: "No files associated with this product" },
      { status: 404 },
    );
  }

  // Verify the requested file actually belongs to this product.
  // This prevents a buyer of product A from downloading files from product B.
  if (!product.stlFiles.includes(file)) {
    return NextResponse.json(
      { error: "File not part of this product" },
      { status: 403 },
    );
  }

  // Files live in /private/stl/ — NOT inside /public/ so they can't be
  // accessed directly via a URL. Only this authenticated route serves them.
  const filePath = path.join(process.cwd(), "private", "stl", file);

  try {
    const fileBuffer = await readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${file}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "File not yet available — contact support" },
      { status: 404 },
    );
  }
}
