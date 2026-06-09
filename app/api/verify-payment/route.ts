import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";

const verifyPaymentSchema = z.object({
  razorpay_payment_id: z.string().min(1, "Razorpay payment ID is required"),
  razorpay_order_id: z.string().min(1, "Razorpay order ID is required"),
  razorpay_signature: z.string().min(1, "Razorpay signature is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  answers: z.array(
    z.object({
      question_id: z.number().int().min(1).max(12),
      question_text: z.string().min(1),
      selected_answer: z.string().min(1),
      pillar: z.enum(["stress", "focus", "energy", "emotional_balance", "self_confidence"]),
    })
  ).length(12, "Assessment must contain exactly 12 answers"),
});

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Validate request body
    const validation = verifyPaymentSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      name,
      email,
      answers,
    } = validation.data;

    // 1. Verify signatures
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    if (!keySecret) {
      console.error("Razorpay secret key is missing from environment variables.");
      return NextResponse.json(
        { error: "Something went wrong. Please try again later." },
        { status: 500 }
      );
    }

    const dataString = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(dataString)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.warn("Invalid signature verification failed.");
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 400 }
      );
    }



    // 3. Dispatch webhook to n8n Automation Webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            answers,
          }),
        });

        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text();
          console.error(
            `n8n webhook responded with status ${webhookResponse.status}: ${errorText}`
          );
          // We don't fail the verification for the user if the webhook fails, 
          // but we log it so we can re-trigger or fix it.
        }
      } catch (webhookError) {
        console.error("Failed to post payload to n8n webhook:", webhookError);
      }
    } else {
      console.warn("N8N_WEBHOOK_URL is not configured.");
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Payment verification route failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
