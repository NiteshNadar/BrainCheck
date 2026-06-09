import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "../../../lib/razorpay";
import { z } from "zod";

const createOrderSchema = z.object({
  amount: z.literal(100, {
    message: "Invalid amount. Must be exactly 100 paise (₹1).",
  }),
  currency: z.literal("INR").optional().default("INR"),
  receipt: z.string().optional().default("braincheck_receipt"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { amount, currency, receipt } = validation.data;

    // Create the order on Razorpay servers
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      payment_capture: true, // Automatically capture payment after customer authorizes it
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: unknown) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
