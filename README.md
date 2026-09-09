# SnapCut AI

You are a Senior Full-Stack Engineer, Product Architect, and UI/UX Designer. Your task is to design and generate a complete, production-ready SaaS web application called “SnapCut AI”, an AI-powered background removal platform.

Build this system for real-world commercial deployment with scalability, security, and monetization.

==================================================
ROLE DEFINITION
==================================================

Act as:
- Lead Product Architect
- Senior Frontend Engineer
- SaaS Systems Engineer
- UI/UX Designer
- Automation & Integration Specialist

You must produce clean, maintainable, fully deployable code.

==================================================
SYSTEM CONSTRAINTS
==================================================




Frontend:

- React (Vite)

- TypeScript

- Tailwind CSS

- ShadCN UI




Backend / Automation:

- n8n Cloud (no custom backend server)

- Webhook-based workflows




Database & Auth:

- Supabase (PostgreSQL + Auth)




Storage:

- Cloudinary (temporary storage only)




AI Processing:

- Third-party background removal API (Remove.bg / ClipDrop / Photoroom)




Payments:

- Razorpay (Orders API + Checkout + Webhooks)




Hosting:

- Frontend: Vercel or Netlify

- Backend: n8n Cloud

- Database: Supabase Cloud




Limits:

- Max image size: 10 MB

- Max resolution: 5000x5000

- Formats: JPG, PNG, WEBP

- Auto-delete after 24 hours

No permanent file storage.




==================================================

FUNCTIONAL REQUIREMENTS

==================================================




AUTHENTICATION

- Email/password signup

- Google OAuth

- Password reset

- Email verification

- JWT sessions via Supabase


IMAGE PROCESSING FLOW

1. User uploads image (drag/drop or browse)

2. Validate file type and size in frontend

3. Upload to Cloudinary temp bucket

4. Send URL + user ID to n8n webhook

5. n8n sends image to AI API

6. Receive transparent output

7. Upload result to Cloudinary

8. Save metadata in Supabase

9. Return result URL

10. Show preview

11. Enable download




USER DASHBOARD

- Upload history (7 days)

- Credit usage

- Remaining quota

- Subscription status

- Download history




PAYMENTS & CREDITS

- Free Plan: 5 images/day

- Pro Monthly: Unlimited

- Credit Packs

- Razorpay Checkout

- Razorpay Webhooks → n8n → Supabase update




ADMIN PANEL

- User management

- Usage analytics

- Revenue tracking

- Workflow error logs

- API monitoring




PUBLIC API (B2B)

- API keys

- Rate limiting

- Usage tracking

- Documentation page

==================================================

NON-FUNCTIONAL REQUIREMENTS

==================================================




- Avg processing time < 5s

- 99.5% uptime

- HTTPS everywhere

- Encrypted secrets

- OWASP security practices

- WCAG 2.1 AA compliance

- Mobile-first responsive

- SEO optimized

- CDN enabled

- Graceful error handling

- Retry mechanisms

==================================================

PAGE STRUCTURE

==================================================




PUBLIC

- Landing

- Features

- Pricing

- API Docs

- Blog

- About

- Contact

- Privacy Policy

- Terms




AUTH

- Login

- Register

- Forgot Password

- Verify Email




USER

- Dashboard

- Upload Workspace

- Preview Page

- Downloads

- Billing

- Credits

- Account Settings

- API Keys

ADMIN

- Admin Dashboard

- Users

- Analytics

- Logs

- Payments




==================================================

UI / UX DESIGN SYSTEM

==================================================




Theme: Dark Neon AI (Based on Logo)




Primary:   #0EA5FF

Secondary: #22D3EE

Accent:    #C084FC

Dark BG:   #020617

Card BG:   #0F172A

Text:      #E5E7EB

Muted:     #94A3B8

Error:     #F87171

Design Rules:

- Default dark mode

- Rounded corners: 14px

- Soft glow on CTAs

- Glassmorphism-lite cards

- Gradient CTAs: Blue → Purple

- Large upload zone

- Clear hierarchy

- Skeleton loaders

- Toast notifications

- Progress bars

- Hover neon effects




Typography:

- Inter / Poppins




Layout:

- Centered workspace

- Wide dashboard

- Minimal clutter

- High contrast

Design Rules:

- Default dark mode

- Rounded corners: 14px

- Soft glow on CTAs

- Glassmorphism-lite cards

- Gradient CTAs: Blue → Purple

- Large upload zone

- Clear hierarchy

- Skeleton loaders

- Toast notifications

- Progress bars

- Hover neon effects




Typography:

- Inter / Poppins




Layout:

- Centered workspace

- Wide dashboard

- Minimal clutter

- High contrast

==================================================

TECHNICAL STACK

==================================================




Frontend:

- React (Vite)

- TypeScript

- Tailwind CSS

- ShadCN UI

- TanStack Query

- Axios

- Zustand

- React Hook Form

- Zod




Backend:

- n8n Cloud

- Supabase SDK

- Cloudinary SDK

- Razorpay SDK




Monitoring:

- Supabase Logs

- n8n Logs

- Vercel Analytics


==================================================

INTEGRATION LOGIC

==================================================




N8N WORKFLOW

1. Webhook Trigger

2. Payload Validation

3. Cloudinary Fetch

4. AI API Request

5. Response Validation

6. Cloudinary Upload

7. Supabase Insert

8. Return URL




DATABASE TABLES

- users

- uploads

- credits

- subscriptions

- transactions

- api_keys

- logs




RAZORPAY

- Create Order via n8n

- Verify Signature

- Webhook Listener

- Update credits/subscription




SECURITY

- API token validation

- Rate limiting

- IP throttling

- Audit logging

==================================================

OUTPUT EXPECTATIONS

==================================================




Generate:




- Complete React + Vite codebase

- Modular folder structure

- Typed services

- Reusable UI components

- Auth system

- Working n8n workflows (JSON)

- Supabase schema

- Env templates

- Setup scripts

- README

- Deployment guide

- Sample data

- API examples




Code Quality:

- SOLID principles

- Fully typed

- ESLint compliant

- Production-ready

- No mock logic

- No placeholders


==================================================

RESTRICTIONS

==================================================




DO NOT:




- Build photo editors

- Add social features

- Store images permanently

- Add chat systems

- Add unnecessary animations

- Build native mobile apps

- Add unrelated AI tools

- Use heavy proprietary frameworks

- Implement custom backend servers




Focus only on background removal SaaS.




==================================================

PROJECT GOAL

==================================================




Deliver a scalable, monetizable, production-ready AI background removal platform optimized for speed, simplicity, branding consistency, and commercial deployment.




The final output must be immediately deployable.





use the attached image as the logo and for website color theme identification

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7ea882ca-53b7-46bd-a69b-35906fcf015b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
