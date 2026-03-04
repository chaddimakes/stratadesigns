import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { session_id } = await req.json();

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

  const customerEmail = session.customer_details?.email || session.metadata?.customerEmail;
  if (!customerEmail) {
    return NextResponse.json({ error: "No customer email on session" }, { status: 400 });
  }

  const customerName = session.metadata?.customerName || "there";
  const description = session.metadata?.description || "Custom order";
  const amountTotal = session.amount_total ?? 0;
  const formattedPrice = (amountTotal / 100).toFixed(2);

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f4f4f4;padding:40px 16px;color:#1a1a1a;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

      <div style="background:#111111;padding:28px 32px;">
        <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">Proper Polymer</p>
        <p style="margin:4px 0 0;font-size:12px;color:#888888;letter-spacing:0.08em;text-transform:uppercase;">Precision Engineered. Trail Tested.</p>
      </div>

      <div style="padding:32px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#e07b39;">Payment Confirmed</p>
        <h1 style="margin:4px 0 8px;font-size:24px;font-weight:700;color:#111111;">Thanks for your order, ${customerName}!</h1>
        <p style="margin:0 0 28px;color:#666666;font-size:14px;line-height:1.5;">Your custom order payment has been received. We'll get started on your order and reach out if we have any questions.</p>

        <div style="margin-bottom:24px;padding:16px 20px;border:1px solid #e8e8e8;border-radius:6px;background:#fafafa;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#999999;">Order Details</p>
          <p style="margin:8px 0 0;font-weight:600;color:#111111;font-size:14px;">${description}</p>
          <p style="margin:8px 0 0;color:#666666;font-size:14px;">Total paid: <strong style="color:#111111;">&#36;${formattedPrice}</strong></p>
        </div>

        <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 24px;" />

        <p style="margin:0;font-size:13px;color:#666666;line-height:1.5;">
          If you have any questions about your order, just reply to this email or reach out at
          <a href="mailto:hello@properpolymer.com" style="color:#e07b39;text-decoration:none;">hello@properpolymer.com</a>.
        </p>
      </div>

      <div style="background:#f9f9f9;border-top:1px solid #eeeeee;padding:16px 32px;">
        <p style="margin:0;font-size:12px;color:#999999;">
          Proper Polymer &bull; <a href="mailto:hello@properpolymer.com" style="color:#999999;text-decoration:none;">hello@properpolymer.com</a>
        </p>
      </div>

    </div>
  </div>`;

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  await transporter.sendMail({
    from: `"Proper Polymer" <hello@properpolymer.com>`,
    to: customerEmail,
    subject: `Your Custom Order is Confirmed — Proper Polymer`,
    html,
    text: `Thanks for your order, ${customerName}!\n\nYour custom order payment has been received.\n\n${description}\nTotal paid: $${formattedPrice}\n\nWe'll get started on your order and reach out if we have any questions.\n\n— Proper Polymer\nhello@properpolymer.com`,
  });

  return NextResponse.json({ ok: true });
}
