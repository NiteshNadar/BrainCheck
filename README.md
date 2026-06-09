# Braincheck - Mental Wellness Self-Assessment

Braincheck is a private, reflective, and journal-like mental wellness self-assessment tool. It allows individuals to check in on their mind across 5 core pillars: Stress, Focus, Energy, Emotional Balance, and Self-Confidence.

## Core Features

- **12-Question Assessment**: A carefully crafted survey flow with a sleek, interactive, and keyboard-accessible UI.
- **Privacy First**: Zero permanent storage of personal data, name, email, or answers in the application. Answers and contact details are cleared immediately after report generation.
- **Automated Reports**: Integration with n8n webhook automation to compute scores, compile findings, and deliver reports directly to the user's email.
- **Secure Razorpay Payments**: Standard Rs. 49 checkout with server-side signature verification and request validation (Zod) to prevent transaction tampering.
- **Neural Dusk Theme**: A premium, reflective dark-first design featuring custom layout boundaries, responsive styling, and fluid motion (Framer Motion).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Payments**: Razorpay Standard Checkout
- **Security**: Content Security Policy (CSP), HSTS, Zod Schema Validations, environment variable isolation.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment Variables (`.env.local`):
   ```env
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   N8N_WEBHOOK_URL=your_n8n_webhook_url
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build the application for production:
   ```bash
   npm run build
   ```
