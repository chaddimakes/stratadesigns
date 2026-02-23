import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { getProductBySlug } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { session_id, origin } = await req.json();

  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 403 });
  }

  const customerEmail = session.customer_details?.email;
  if (!customerEmail) {
    return NextResponse.json({ error: "No customer email on session" }, { status: 400 });
  }

  const purchasedSlugs = (session.metadata?.products ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const purchasedProducts = purchasedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  const baseUrl = (origin as string) || "https://chaddimakes.com";
  const successUrl = `${baseUrl}/success?session_id=${session_id}`;

  const productsHtml = purchasedProducts
  .map((product) => {
    if (!product) return "";
    const files = product.stlFiles ?? [];
    const fileLinks = files
      .map((file) => {
        const url = `${baseUrl}/api/download?session_id=${session_id}&slug=${product.slug}&file=${encodeURIComponent(file)}`;
        return `<li style="margin-bottom:8px;"><a href="${url}" style="color:#e07b39;text-decoration:none;font-size:13px;font-weight:500;">⬇ ${file}</a></li>`;
      })
      .join("");
    return `
      <div style="margin-bottom:12px;padding:16px 20px;border:1px solid #e8e8e8;border-radius:6px;background:#fafafa;">
        <p style="margin:0 0 10px;font-weight:600;color:#111111;font-size:14px;">${product.name}</p>
        <ul style="margin:0;padding-left:18px;">${fileLinks}</ul>
      </div>
    `;
  })
  .join("");

  const orderTotal = purchasedProducts.reduce(
    (sum, p) => sum + (p?.price ?? 0),
    0,
  );

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d0d0d;padding:40px 24px;color:#f0f0f0;max-width:600px;margin:0 auto;">
      <div style="margin-bottom:32px;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#e07b39;">Payment Confirmed</p>
        <h1 style="margin:0;font-size:26px;font-weight:700;color:#f0f0f0;">Thanks for your order!</h1>
        <p style="margin:8px 0 0;color:#888;font-size:14px;">Your STL files are ready to download below.</p>
      </div>

      <hr style="border:none;border-top:1px solid #222;margin:0 0 28px;" />

      <h2 style="margin:0 0 14px;font-size:14px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#999;">Your Downloads</h2>
      ${productsHtml}

      <p style="margin:20px 0 0;font-size:13px;color:#666;">
        Order total: <strong style="color:#f0f0f0;">$${orderTotal.toFixed(2)}</strong>
      </p>

      <hr style="border:none;border-top:1px solid #222;margin:28px 0;" />

      <div style="background:#161616;border:1px solid #2a2a2a;border-radius:8px;padding:16px;margin-bottom:28px;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#f0f0f0;">Save your order page</p>
        <p style="margin:0;font-size:13px;color:#888;">
          Bookmark this link to re-download your files any time — it never expires:<br />
          <a href="${successUrl}" style="color:#e07b39;word-break:break-all;">${successUrl}</a>
        </p>
      </div>

      <p style="margin:0;font-size:12px;color:#555;">
        Strata Design &bull; <a href="mailto:chaddimakes@gmail.com" style="color:#555;">chaddimakes@gmail.com</a>
      </p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_EMAIL_USER,
      pass: process.env.CONTACT_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Strata Design" <chaddimakes@gmail.com>`,
    to: customerEmail,
    subject: "Your Strata Design Order — STL Download Links",
    html,
    text: `Thanks for your order!\n\nVisit your order page to download your files:\n${successUrl}\n\n— Strata Design\nchaddimakes@gmail.com`,
  });

  return NextResponse.json({ ok: true });
}
