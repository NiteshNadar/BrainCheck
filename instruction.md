You are a senior full-stack engineer and product designer.
Build a production-ready Next.js web app called Braincheck —
a mental wellness self-assessment product.

---

CORE USER FLOW (strict, no deviations)

1. User lands on Home page → clicks "Start Assessment"
2. User completes 12 survey questions (one per step with progress bar)
3. User enters Name + Email + checks consent checkbox → clicks Submit
4. Razorpay payment modal opens (Rs. 1)
5. On payment success:
   - Backend verifies Razorpay signature
   - Triggers n8n webhook with: name, email, all questions with their selected answers, payment_id, order_id
6. n8n handles all report logic, scoring, and email delivery
7. App shows a simple success page only: "Payment confirmed. Your report is on its way."
8. NO scores, NO results, NO report content ever shown inside the app

---

WHAT TO NOT BUILD

- No login or signup
- No user dashboard
- No subscription
- No in-app report or score display
- No storing of name, email, or answers anywhere in the application
- No medical or clinical tone anywhere

---

TECH STACK

- Framework: Next.js 15 App Router
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Forms: React Hook Form + Zod
- Animations: Framer Motion (subtle only)
- Payment: Razorpay Standard Checkout
- Automation: n8n via webhook
- Deployment: Vercel

---

DESIGN SYSTEM — NEURAL DUSK THEME

CONCEPT:
The visual identity of Braincheck is "Neural Dusk" — the quiet moment
between a busy day and restful night when the mind becomes reflective.
Premium, dark-first, calm, and distinctly Gen Z without being trendy or loud.

COLORS:

  Dark backgrounds:
  --bg-base:        #070D1A   (near-black navy, main background)
  --bg-mid:         #0F1B2D   (slightly lighter navy for sections)
  --bg-card:        rgba(255,255,255,0.04)  (glass card on dark)
  --bg-card-border: rgba(255,255,255,0.08)  (glass card border)

  Light sections:
  --bg-light:       #F0F4FF   (lavender-tinted off-white)
  --bg-white:       #FFFFFF

  Brand colors:
  --purple:         #6D28D9   (primary brand, introspection)
  --purple-light:   #8B5CF6   (hover, lighter states)
  --teal:           #0694A2   (CTAs, action, clarity)
  --teal-light:     #06B6D4   (hover teal)
  --lavender:       #C4B5FD   (light accents, highlights)
  --mint:           #A7F3D0   (success states)

  Text:
  --text-primary:   #F1F5F9   (on dark backgrounds)
  --text-muted:     #94A3B8   (secondary text on dark)
  --text-dark:      #0F172A   (on light backgrounds)
  --text-dark-muted:#64748B   (secondary on light)

  Status:
  --success:        #10B981
  --error:          #EF4444
  --warning:        #F59E0B

GRADIENTS:
  --gradient-brand: linear-gradient(135deg, #6D28D9 0%, #0694A2 100%)
  --gradient-hero:  radial-gradient(ellipse at top left, #1E1041 0%, #070D1A 60%)
  --gradient-glow-purple: radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)
  --gradient-glow-teal:   radial-gradient(circle, rgba(6,148,162,0.2) 0%, transparent 70%)
  --gradient-card-border: linear-gradient(135deg, rgba(109,40,217,0.4), rgba(6,148,162,0.4))

TYPOGRAPHY:
  Primary font: "Plus Jakarta Sans" (import from Google Fonts)
  Fallback: Inter, system-ui, sans-serif

  Scale:
  --text-display: 4rem / 700 weight  (hero headline)
  --text-h1:      2.5rem / 700       (page titles)
  --text-h2:      1.875rem / 600     (section headings)
  --text-h3:      1.25rem / 600      (card titles)
  --text-body:    1rem / 400         (body, line-height 1.7)
  --text-small:   0.875rem / 400     (captions, meta)

COMPONENT STYLES:

  Cards (dark section):
    background: rgba(255,255,255,0.04)
    border: 1px solid rgba(255,255,255,0.08)
    border-radius: 1.25rem
    backdrop-filter: blur(12px)
    box-shadow: 0 4px 24px rgba(0,0,0,0.3)

  Cards (light section):
    background: #FFFFFF
    border: 1px solid #E2E8F0
    border-radius: 1.25rem
    box-shadow: 0 2px 12px rgba(0,0,0,0.06)

  CTA Primary Button:
    background: linear-gradient(135deg, #6D28D9, #0694A2)
    color: white
    border-radius: 0.75rem
    padding: 0.875rem 2rem
    font-weight: 600
    transition: opacity 0.2s, transform 0.1s
    hover: opacity 0.9, translateY(-1px)

  Secondary Button:
    background: transparent
    border: 1px solid rgba(109,40,217,0.5)
    color: #C4B5FD
    border-radius: 0.75rem
    hover: border-color #6D28D9, background rgba(109,40,217,0.1)

  Progress Bar:
    track: rgba(255,255,255,0.1)
    fill: linear-gradient(90deg, #6D28D9, #0694A2)
    border-radius: full
    height: 6px

  Input fields:
    background: rgba(255,255,255,0.06)
    border: 1px solid rgba(255,255,255,0.12)
    border-radius: 0.75rem
    color: #F1F5F9
    focus: border-color #6D28D9, ring rgba(109,40,217,0.3)

BACKGROUND DECORATIONS (hero section):
  - Two large blurred gradient orbs (position: absolute, z-index: 0)
    Orb 1: top-left, 600px diameter, #6D28D9 at 15% opacity, blur 120px
    Orb 2: bottom-right, 500px diameter, #0694A2 at 12% opacity, blur 100px
  - Subtle noise/grain texture overlay: 2% opacity SVG filter
  - All content sits above with z-index: 1

SECTION LAYOUT:
  - Alternating dark (#070D1A) and light (#F0F4FF) sections
  - Dark sections: light text, glass cards
  - Light sections: dark text, white solid cards
  - Max content width: 1200px, centered
  - Section padding: 6rem vertical on desktop, 4rem on mobile

LOGO COMPONENT (build as SVG in React):
  - Brain silhouette (minimal, abstract, not anatomical) with a checkmark
    integrated naturally into the right side of the brain shape
  - The checkmark flows from the brain's lower-right neural curve
  - Fill: gradient from #6D28D9 (left) to #0694A2 (right)
  - No background, no border, no subtitle text
  - Export as <BraincheckLogo /> component that accepts size prop
  - Works at 32px (navbar) and 48px (footer) sizes

---

PAGES

1. / — Home Page

  Sections in order:
  a) Navbar: Logo left, "Start Assessment" button right (teal gradient)
  b) Hero:
     - Dark background with orb decorations
     - Badge chip: "✦ Mental Wellness Assessment"
     - H1: "Understand What's Happening In Your Mind"
     - Subheadline: "A short 12-question assessment that delivers personalized
       wellness insights straight to your inbox. No signup. No diagnosis. Just clarity."
     - CTA: "Start Your Assessment — Rs. 1" (large gradient button)
     - Trust line below CTA: "🔒 Private · Your data is never stored · Delivered in minutes"
     - Scroll-animated entry via Framer Motion

  c) How It Works (3 steps, dark section):
     Step 1: Answer 12 questions about your mind
     Step 2: Pay Rs. 1 — one-time, no subscription
     Step 3: Receive your personalized report in your inbox

  d) Benefits (light section, 3 glass cards):
     - "Built for self-awareness, not labels"
     - "Covers 5 pillars: Stress, Focus, Energy, Emotion, Confidence"
     - "Your answers are never stored. Used only to generate your report."

  e) Pricing (dark section):
     Single card: Rs. 1, one-time, includes personalized wellness report,
     5-pillar analysis, 7-day improvement challenge, delivered to email.
     CTA: "Get My Report"

  f) Privacy Trust (light section):
     Headline: "Your privacy is not a footnote here."
     - We don't store your name or email after your report is sent
     - We don't store your assessment answers
     - Only your payment record is stored (required for billing)
     - No ads. No tracking. No selling of data.

  g) FAQ (dark section, accordion using shadcn):
     Q: What is Braincheck?
     Q: Is this a medical diagnosis?
     Q: How long does the report take?
     Q: What happens to my answers after payment?
     Q: Can I take the assessment again?
     Q: What if I don't receive the email?

  h) Footer:
     Logo, tagline, links to /privacy and /terms
     Disclaimer text (small, muted):
     "Braincheck is a self-awareness tool. Not a medical service."

2. /survey — Survey Page

  Layout:
  - Full dark background, centered card
  - Progress bar at top: "Question X of 12"
  - One question displayed at a time
  - Answer options as large tap-friendly cards (not radio buttons)
  - Selected answer card highlights with purple gradient border
  - Next button appears after selection
  - Framer Motion slide transition between questions (x: slide left/right)
  - Back button on all questions except first
  - On question 12 next → navigate to /details
  - Store all answers in React state (never hit any API during survey)

  Answer card style:
    background: rgba(255,255,255,0.04)
    border: 1px solid rgba(255,255,255,0.08)
    selected border: 2px solid, gradient #6D28D9→#0694A2
    selected background: rgba(109,40,217,0.12)
    border-radius: 0.875rem
    padding: 1rem 1.25rem
    cursor: pointer
    full width

3. /details — User Details Page

  Layout:
  - Dark background, centered card (max-width 480px)
  - Heading: "Almost there — where should we send your report?"
  - Name field (label: "Your Name")
  - Email field (label: "Email Address")
  - Consent checkbox:
    "I understand my assessment answers will be used only to generate
     my wellness report and will not be permanently stored."
  - Submit & Pay button: "Pay Rs. 1 & Get My Report"
  - Small note: "Secure payment via Razorpay"
  - On submit:
    1. Validate all fields (React Hook Form + Zod)
    2. Call POST /api/create-order
    3. Load Razorpay checkout script dynamically
    4. Open Razorpay modal
    5. On Razorpay success: call POST /api/verify-payment
    6. On verify success: navigate to /success
    7. Show loading spinner during API calls
    8. Show inline error message if anything fails

4. /success — Success Page

  Layout:
  - Dark background, centered, full height
  - Large animated checkmark (Framer Motion draw animation, teal color)
  - H1: "Payment Confirmed ✓"
  - Subtext: "We're generating your personalized wellness report right now.
    It will arrive in your inbox within a few minutes."
  - Show email in a highlighted chip: "Sending to: user@email.com"
  - Small note: "Check your spam folder if you don't see it in 5 minutes."
  - Support text: "Need help? Contact us at support@braincheck.in"
  - Button: "Back to Home"
  - Do NOT show any scores, answers, or report content here

5. /privacy — Privacy Policy

  Content sections:
  - What we collect (payment ID, order ID, amount, status only)
  - What we do NOT collect permanently (name, email, answers, scores)
  - How your data flows (survey → payment → n8n → email → deleted)
  - Email usage (only for report delivery)
  - Data retention (payment records kept for billing compliance only)
  - Your rights
  - Contact

6. /terms — Terms of Use

  Content sections:
  - What Braincheck is and is not
  - Payment terms (Rs. 1 one-time, non-refundable after report generation)
  - Wellness disclaimer (must be prominent)
  - User responsibilities
  - Limitation of liability

---

SURVEY QUESTIONS (12 questions)

Store as a typed array in /lib/questions.ts:

const questions = [
  {
    id: 1,
    pillar: "stress",
    text: "How often do you feel overwhelmed by your daily responsibilities?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Almost always", value: 0 }
    ]
  },
  {
    id: 2,
    pillar: "stress",
    text: "How well do you sleep on most nights?",
    options: [
      { label: "Very well", value: 3 },
      { label: "Fairly well", value: 2 },
      { label: "Poorly", value: 1 },
      { label: "Very poorly", value: 0 }
    ]
  },
  {
    id: 3,
    pillar: "focus",
    text: "How easy is it for you to concentrate on one task without getting distracted?",
    options: [
      { label: "Very easy", value: 3 },
      { label: "Somewhat easy", value: 2 },
      { label: "Difficult", value: 1 },
      { label: "Very difficult", value: 0 }
    ]
  },
  {
    id: 4,
    pillar: "focus",
    text: "How often does your mind wander when you are trying to work or study?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Very often", value: 0 }
    ]
  },
  {
    id: 5,
    pillar: "energy",
    text: "How would you describe your energy levels during the day?",
    options: [
      { label: "High and consistent", value: 3 },
      { label: "Moderate", value: 2 },
      { label: "Low by afternoon", value: 1 },
      { label: "Consistently low", value: 0 }
    ]
  },
  {
    id: 6,
    pillar: "energy",
    text: "How often do you feel physically or mentally drained without a clear reason?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Almost always", value: 0 }
    ]
  },
  {
    id: 7,
    pillar: "emotional_balance",
    text: "How well do you manage your emotions when things go wrong?",
    options: [
      { label: "Very well", value: 3 },
      { label: "Fairly well", value: 2 },
      { label: "Struggle sometimes", value: 1 },
      { label: "Struggle often", value: 0 }
    ]
  },
  {
    id: 8,
    pillar: "emotional_balance",
    text: "How often do you experience sudden mood changes throughout the day?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Very often", value: 0 }
    ]
  },
  {
    id: 9,
    pillar: "emotional_balance",
    text: "How often do you feel anxious or worried about things you cannot control?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Almost always", value: 0 }
    ]
  },
  {
    id: 10,
    pillar: "self_confidence",
    text: "How confident do you feel about your decisions in daily life?",
    options: [
      { label: "Very confident", value: 3 },
      { label: "Fairly confident", value: 2 },
      { label: "Unsure often", value: 1 },
      { label: "Rarely confident", value: 0 }
    ]
  },
  {
    id: 11,
    pillar: "self_confidence",
    text: "How often do you compare yourself negatively to others?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Almost always", value: 0 }
    ]
  },
  {
    id: 12,
    pillar: "self_confidence",
    text: "How often do you feel proud of what you have accomplished recently?",
    options: [
      { label: "Often", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Rarely", value: 1 },
      { label: "Almost never", value: 0 }
    ]
  }
]

---

BACKEND API ROUTES

POST /api/create-order
  Request body: { amount: 100, currency: "INR", receipt: string }
  Logic:
    - Import Razorpay SDK server-side only
    - Create order via Razorpay API
    - Return: { order_id, amount, currency }
  Never expose RAZORPAY_KEY_SECRET to frontend

POST /api/verify-payment
  Request body:
    {
      razorpay_payment_id: string,
      razorpay_order_id: string,
      razorpay_signature: string,
      name: string,
      email: string,
      answers: Array<{
        question_id: number,
        question_text: string,
        selected_answer: string,
        pillar: string
      }>
    }

  Logic:
    1. Verify HMAC SHA256:
       body = razorpay_order_id + "|" + razorpay_payment_id
       expected = HMAC(body, RAZORPAY_KEY_SECRET, sha256)
       if expected !== razorpay_signature → return 400
    2. POST to N8N_WEBHOOK_URL with payload:
       {
         name,
         email,
         payment_id: razorpay_payment_id,
         order_id: razorpay_order_id,
         answers: [
           {
             question_id,
             question_text,
             selected_answer,
             pillar
           }
         ]
       }
       Note: n8n receives raw answers only.
       n8n is responsible for all scoring, report generation, and email.
    4. Return { success: true }
    5. On any failure: return appropriate error with message

---

N8N WEBHOOK PAYLOAD (exact shape sent from /api/verify-payment)

{
  "name": "string",
  "email": "string",
  "payment_id": "string",
  "order_id": "string",
  "answers": [
    {
      "question_id": 1,
      "question_text": "How often do you feel overwhelmed...",
      "selected_answer": "Sometimes",
      "pillar": "stress"
    }
  ]
}

n8n handles:
- Scoring per pillar from the raw answers
- Overall wellness score calculation
- Pillar label mapping
- Report content generation
- Personalized tips and 7-day challenge
- Email delivery via Resend or SMTP

---

ENVIRONMENT VARIABLES

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
N8N_WEBHOOK_URL=

Frontend uses only NEXT_PUBLIC_RAZORPAY_KEY_ID.
Secret is never in frontend bundle.

---

FILE STRUCTURE

/app
  /page.tsx                    (home)
  /survey/page.tsx
  /details/page.tsx
  /success/page.tsx
  /privacy/page.tsx
  /terms/page.tsx
  /api/create-order/route.ts
  /api/verify-payment/route.ts
  /layout.tsx                  (imports Plus Jakarta Sans, sets dark bg)
  /globals.css                 (CSS variables, base styles)

/components
  /ui/                         (shadcn components)
  /layout/Navbar.tsx
  /layout/Footer.tsx
  /home/Hero.tsx
  /home/HowItWorks.tsx
  /home/BenefitCards.tsx
  /home/PricingSection.tsx
  /home/PrivacySection.tsx
  /home/FAQSection.tsx
  /survey/SurveyStep.tsx
  /survey/ProgressBar.tsx
  /survey/AnswerCard.tsx
  /shared/BraincheckLogo.tsx   (SVG logo component)
  /shared/GradientButton.tsx
  /shared/GlassCard.tsx

/lib
  /questions.ts                (typed questions array)
  /razorpay.ts                 (order + verify server helpers)
  /types.ts                    (shared TypeScript types)

/public
  /favicon.ico

---

COPY DIRECTION

Hero headline:     "Understand What's Happening In Your Mind"
Subheadline:       "12 questions. Personalized insights. Straight to your inbox."
CTA button:        "Start Your Assessment — Rs. 1"
Trust line:        "🔒 Private · Not stored · Delivered in minutes"
Pricing headline:  "One report. One price. No subscriptions."
Privacy headline:  "Your privacy is not a footnote here."
Success headline:  "Payment Confirmed ✓"
Success subtext:   "Your personalized wellness report is being generated.
                    Check your inbox in the next few minutes."

---

DISCLAIMER (in footer and /terms, small text, --text-muted color)

"Braincheck is a wellness self-assessment tool. It does not provide medical
diagnoses, clinical evaluations, or therapeutic advice. Results are for
self-awareness only. If you are experiencing serious mental health concerns,
please consult a qualified mental health professional."

---

QUALITY REQUIREMENTS

- All TypeScript strict mode, no any types
- Mobile-first, fully responsive at 375px, 768px, 1280px
- Accessible: aria-labels, keyboard navigation, focus rings
- Loading states on all async actions (spinner on buttons)
- Error states with clear user-facing messages
- All secrets in environment variables only
- No TODOs. No placeholder content. Real working code.
- Production-ready and deployable to Vercel without changes.