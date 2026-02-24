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

  let variantsMap: Record<string, string> = {};
  try {
    const raw = session.metadata?.variants;
    if (raw) variantsMap = JSON.parse(raw) as Record<string, string>;
  } catch { /* ignore */ }

  const baseUrl = (origin as string) || "https://chaddimakes.com";
  const successUrl = `${baseUrl}/success?session_id=${session_id}`;

  const productsHtml = purchasedProducts
  .map((product) => {
    if (!product) return "";
    const variantName = variantsMap[product.slug];
    const variant = product.variants?.find((v) => v.name === variantName);
    const files = variant?.stlFiles ?? product.stlFiles ?? [];
    const fileLinks = files
      .map((file) => {
        const url = `${baseUrl}/api/download?session_id=${session_id}&slug=${product.slug}&file=${encodeURIComponent(file)}`;
        return `<li style="margin-bottom:8px;"><a href="${url}" style="color:#e07b39;text-decoration:none;font-size:13px;font-weight:500;">⬇ ${file}</a></li>`;
      })
      .join("");
    const displayName = variantName
      ? `${product.name} <span style="font-weight:400;color:#888888;">— ${variantName}</span>`
      : product.name;
    return `
      <div style="margin-bottom:12px;padding:16px 20px;border:1px solid #e8e8e8;border-radius:6px;background:#fafafa;">
        <p style="margin:0 0 10px;font-weight:600;color:#111111;font-size:14px;">${displayName}</p>
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
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f4f4f4;padding:40px 16px;color:#1a1a1a;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

      <div style="background:#111111;padding:28px 32px;">
        <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">Strata Design</p>
        <p style="margin:4px 0 0;font-size:12px;color:#888888;letter-spacing:0.08em;text-transform:uppercase;">Precision Engineered. Trail Tested.</p>
      </div>

      <div style="padding:32px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#e07b39;">Payment Confirmed</p>
        <h1 style="margin:4px 0 8px;font-size:24px;font-weight:700;color:#111111;">Thanks for your order!</h1>
        <p style="margin:0 0 28px;color:#666666;font-size:14px;line-height:1.5;">Your STL files are ready to download. Click any file link below to download directly.</p>

        <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#999999;">Your Downloads</p>

        ${productsHtml}

        <p style="margin:20px 0 28px;font-size:13px;color:#666666;">
          Order total: <strong style="color:#111111;">&#36;${orderTotal.toFixed(2)}</strong>
        </p>

        <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 24px;" />

        <div style="background:#f9f9f9;border:1px solid #e8e8e8;border-left:3px solid #e07b39;border-radius:4px;padding:16px 20px;margin-bottom:8px;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#111111;">Save your order page</p>
          <p style="margin:0 0 10px;font-size:13px;color:#666666;line-height:1.5;">Bookmark this link to re-download your files any time — it never expires:</p>
          <a href="${successUrl}" style="color:#e07b39;font-size:12px;word-break:break-all;text-decoration:none;">${successUrl}</a>
        </div>
      </div>

      <div style="background:#f9f9f9;border-top:1px solid #eeeeee;padding:16px 32px;">
        <p style="margin:0;font-size:12px;color:#999999;">
          Strata Design &bull; <a href="mailto:chaddimakes@gmail.com" style="color:#999999;text-decoration:none;">chaddimakes@gmail.com</a>
        </p>
      </div>

    </div>
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
