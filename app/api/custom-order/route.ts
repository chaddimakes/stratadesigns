import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { price, description, customerName, customerEmail, notes } =
      await req.json();

    if (!price || !description || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const amount = Math.round(parseFloat(price) * 100);
    if (isNaN(amount) || amount < 50) {
      return NextResponse.json(
        { error: "Price must be at least $0.50" },
        { status: 400 },
      );
    }

    const origin =
      req.headers.get("origin") ||
      req.headers.get("referer")?.replace(/\/$/, "") ||
      "https://www.properpolymer.com";

    const productDescription = notes
      ? `${description}\n\nNotes: ${notes}`
      : description;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: description,
              description: notes || undefined,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: customerEmail,
      shipping_address_collection: { allowed_countries: ["US"] },
      success_url: `${origin}/custom-order?success=1`,
      cancel_url: origin,
      payment_intent_data: {
        receipt_email: customerEmail,
      },
      metadata: {
        customerName,
        customerEmail,
        description: productDescription,
        notes: notes || "",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }

    // Send payment link to customer via Brevo SMTP
    const smtpUser = process.env.BREVO_SMTP_USER;
    const smtpKey = process.env.BREVO_SMTP_KEY;
    const maskedKey = smtpKey
      ? `${smtpKey.slice(0, 4)}...${smtpKey.slice(-4)} (len=${smtpKey.length})`
      : "MISSING";
    console.log(`[custom-order] SMTP config:`);
    console.log(`  host: smtp-relay.brevo.com`);
    console.log(`  port: 587`);
    console.log(`  secure: false`);
    console.log(`  auth.user: "${smtpUser || "MISSING"}"`);
    console.log(`  auth.pass: "${maskedKey}"`);

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpKey,
      },
    });

    const formattedPrice = (amount / 100).toFixed(2);

    const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f4f4f4;padding:40px 16px;color:#1a1a1a;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

        <div style="background:#111111;padding:28px 32px;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">Proper Polymer</p>
          <p style="margin:4px 0 0;font-size:12px;color:#888888;letter-spacing:0.08em;text-transform:uppercase;">Precision Engineered. Trail Tested.</p>
        </div>

        <div style="padding:32px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#e07b39;">Custom Order</p>
          <h1 style="margin:4px 0 8px;font-size:24px;font-weight:700;color:#111111;">Hi ${customerName},</h1>
          <p style="margin:0 0 28px;color:#666666;font-size:14px;line-height:1.5;">Your custom order is ready for payment. Click the link below to complete checkout.</p>

          <div style="margin-bottom:24px;padding:16px 20px;border:1px solid #e8e8e8;border-radius:6px;background:#fafafa;">
            <p style="margin:0 0 4px;font-weight:600;color:#111111;font-size:14px;">${description}</p>${notes ? `\n            <p style="margin:6px 0 0;color:#888888;font-size:13px;line-height:1.5;">${notes}</p>` : ""}
            <p style="margin:8px 0 0;color:#666666;font-size:14px;">Total: <strong style="color:#111111;">$${formattedPrice}</strong></p>
          </div>

          <a href="${session.url}" style="display:inline-block;background:#e07b39;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:6px;">Complete Payment</a>

          <p style="margin:24px 0 0;font-size:12px;color:#999999;line-height:1.5;">If the button doesn't work, copy and paste this link into your browser:<br/>
          <a href="${session.url}" style="color:#e07b39;font-size:12px;word-break:break-all;text-decoration:none;">${session.url}</a></p>
        </div>

        <div style="background:#f9f9f9;border-top:1px solid #eeeeee;padding:16px 32px;">
          <p style="margin:0;font-size:12px;color:#999999;">
            Proper Polymer &bull; <a href="mailto:hello@properpolymer.com" style="color:#999999;text-decoration:none;">hello@properpolymer.com</a>
          </p>
        </div>

      </div>
    </div>`;

    console.log(`[custom-order] Verifying SMTP transporter...`);
    await transporter.verify();
    console.log(`[custom-order] SMTP transporter verified OK`);

    const notesText = notes ? `\nNotes: ${notes}\n` : "";
    console.log(`[custom-order] Sending payment link to ${customerEmail}...`);

    const info = await transporter.sendMail({
      from: `"Proper Polymer" <hello@properpolymer.com>`,
      to: customerEmail,
      subject: `Your Custom Order from Proper Polymer — $${formattedPrice}`,
      html,
      text: `Hi ${customerName},\n\nYour custom order is ready for payment.\n\n${description}${notesText}\nTotal: $${formattedPrice}\n\nComplete payment here: ${session.url}\n\n— Proper Polymer\nhello@properpolymer.com`,
    });

    console.log(`[custom-order] Email sent — messageId: ${info.messageId}`);
    console.log(`[custom-order]   accepted: ${JSON.stringify(info.accepted)}`);
    console.log(`[custom-order]   rejected: ${JSON.stringify(info.rejected)}`);

    return NextResponse.json({ ok: true, email: customerEmail });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[custom-order] FAILED:", message);
    if (stack) console.error("[custom-order] Stack:", stack);
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
