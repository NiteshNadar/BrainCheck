import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID || "";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

if (!keyId || !keySecret) {
  console.warn("Razorpay credentials missing from environment variables.");
}

// Server-side only Razorpay SDK instance
export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});
