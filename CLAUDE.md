# Braincheck Developer Guide (CLAUDE.md)

This file serves as a comprehensive developer reference for the Braincheck codebase. Refer to this to understand how to build, test, and maintain the project without scanning all files.

---

## 🛠️ CLI Commands

* **Run Development Server**: `npm run dev`
* **Build Production Bundle**: `npm run build`
* **Start Production Server**: `npm run start`
* **Run Linter**: `npm run lint`

---

## 📋 Core Architectural Concept & User Flow

Braincheck is a 12-question mental wellness self-assessment tool that provides insights via email (Rs. 1).
1. **Home (`/`)**: Introduces the assessment, benefits, privacy policies, and FAQs.
2. **Survey (`/survey`)**: 12-step interactive assessment flow (options stored entirely in client-side state).
3. **Details (`/details`)**: Collects user's name, email, and consent, then initializes Razorpay.
4. **Payment (`POST /api/create-order` & `POST /api/verify-payment`)**:
   - Razorpay signature verification happens on the server.
   - payment verification happens on the server.
   - **Privacy Rule**: User names, emails, and answers are **never** stored.
5. **Report Delivery (`n8n Webhook`)**: The server triggers an n8n webhook with the user's details and answers. n8n performs all scoring, report generation, and email delivery.
6. **Success (`/success`)**: Confirmation screen indicating the report is on its way.

---

## 📂 File Structure Map

* **`/app`** - Next.js 16 App Router pages and APIs
  * [page.tsx](file:///c:/Users/nites/Desktop/BrainCheck/app/page.tsx) - Landing / Home page
  * [survey/page.tsx](file:///c:/Users/nites/Desktop/BrainCheck/app/survey/page.tsx) - Interactive assessment interface
  * [details/page.tsx](file:///c:/Users/nites/Desktop/BrainCheck/app/details/page.tsx) - User info form & Razorpay trigger
  * [success/page.tsx](file:///c:/Users/nites/Desktop/BrainCheck/app/success/page.tsx) - Post-payment verification success screen
  * [privacy/page.tsx](file:///c:/Users/nites/Desktop/BrainCheck/app/privacy/page.tsx) - Privacy policy and data flows
  * [terms/page.tsx](file:///c:/Users/nites/Desktop/BrainCheck/app/terms/page.tsx) - Terms of use & wellness disclaimer
  * [api/create-order/route.ts](file:///c:/Users/nites/Desktop/BrainCheck/app/api/create-order/route.ts) - Initiates Razorpay orders
  * [api/verify-payment/route.ts](file:///c:/Users/nites/Desktop/BrainCheck/app/api/verify-payment/route.ts) - Verifies payments and triggers n8n
  * [layout.tsx](file:///c:/Users/nites/Desktop/BrainCheck/app/layout.tsx) - Global layout (Plus Jakarta Sans font, dark theme background)
  * [globals.css](file:///c:/Users/nites/Desktop/BrainCheck/app/globals.css) - CSS variables and Neural Dusk styles

* **`/components`** - React UI components
  * `/home/` - Homepage sections (Hero, HowItWorks, BenefitCards, PricingSection, PrivacySection, FAQSection)
  * `/survey/` - Survey flow components (SurveyStep, ProgressBar, AnswerCard)
  * `/layout/` - Navbar and Footer (with disclaimer)
  * `/shared/` - Common UI elements (BraincheckLogo, GradientButton, GlassCard)

* **`/lib`** - Core business logic, configuration, and helpers
  * [questions.ts](file:///c:/Users/nites/Desktop/BrainCheck/lib/questions.ts) - 12-question array with pillars (stress, focus, energy, emotional_balance, self_confidence)
  * [razorpay.ts](file:///c:/Users/nites/Desktop/BrainCheck/lib/razorpay.ts) - Server helpers for Razorpay orders & validation
  * [types.ts](file:///c:/Users/nites/Desktop/BrainCheck/lib/types.ts) - Common TypeScript interfaces

---

## 🔒 Crucial Rules & Security Guidelines

1. **Next.js & React Version**: Running Next.js 16.2.7 and React 19. Refer to the Next.js guide in `node_modules/next/dist/docs/` for breaking changes/conventions.
2. **Zero Storage of Personal Data**:
   * Do NOT store name, email, or answers in the application.
3. **Environment Secrets**: Do not expose `RAZORPAY_KEY_SECRET` or `N8N_WEBHOOK_URL` to the client. Only use server-side endpoints for operations using these variables.
4. **Strict TypeScript**: Never use `any` types. Ensure full type safety across components and API requests.
5. **No Medical / Clinical Tone**: Keep copy focused on self-awareness, introspection, and wellness. Ensure the standard disclaimer is visible in the Footer and `/terms`.
