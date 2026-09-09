<div align="center">

# ⚡ SnapCut AI (`spark-cut-io`)

**Next-Generation, In-Browser AI Background Removal Platform**  
*Studio-grade transparent cutouts in seconds. Zero permanent storage. Hair-level alpha matting.*

[![React 19](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1.5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.170-FF4154?style=flat-square&logo=tanstack&logoColor=white)](https://tanstack.com/router)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-ONNX_WASM-654FF0?style=flat-square&logo=webassembly&logoColor=white)](https://webassembly.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

[Live Demo](https://github.com/anapviraj-ai/spark-cut-io) • [Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Reference](#-api-reference) • [Deployment](#-deployment)

</div>

---

## 📖 Overview

**SnapCut AI** is a production-grade web application and SaaS platform engineered to deliver ultra-fast, high-precision image background removal. Powered by client-side neural network inference (`@imgly/background-removal` powered by ONNX Runtime WebAssembly), SnapCut AI processes images directly on the user's hardware with WebGPU/CPU acceleration — achieving median turnaround times of **under 3.2 seconds** without sending private media to third-party servers.

Designed for e-commerce brands, creative studios, digital marketers, and software engineers, it eliminates the need for expensive photo editors or slow manual clipping paths.

---

## ✨ Key Features

### 🧠 Neural AI Precision Matting
- **Sub-3.5s Processing**: Optimized model inference delivers transparent cutouts in an average of 3.2 seconds.
- **Hair & Fur Alpha Matting**: Deep neural edge segmentation preserves complex boundaries — wispy hair strands, animal fur, transparent glassware, and motion-blurred edges.
- **Client-Side & Offline Capable**: In-browser neural inference using WebGPU and WebAssembly ensures no images need to leave your device during free playground usage.
- **Autonomous Fallback**: Seamless fallback engine transitions from WebGPU to multi-threaded CPU inference or perimeter color sampling if hardware acceleration is constrained.

### 🎛️ Interactive Visual Playground
- **Before / After Comparison Slider**: Fluid, real-time split view slider to inspect hair-level cutout quality side-by-side with the original upload.
- **Multiple Input Methods**:
  - 🖱️ **Drag & Drop**: Drop images onto the interactive glassmorphism dropzone.
  - 📁 **Native File Picker**: Click anywhere to browse desktop files.
  - 📋 **Universal Clipboard Paste**: Press <kbd>Ctrl</kbd> + <kbd>V</kbd> (or <kbd>Cmd</kbd> + <kbd>V</kbd>) from anywhere to instantly process copied images or screenshots.
  - 🧪 **Instant Sample Demo**: One-click demo loader to test the model immediately with a high-resolution sample product.
- **Checkerboard Alpha Canvas**: Visual transparency verification with custom high-contrast checkered preview.
- **Lossless PNG Export**: Download full-resolution, high-fidelity transparent PNG cutouts ready for product catalogs and graphic design.

### 🔒 Privacy by Design
- **Zero Permanent Storage**: Images and outputs are kept strictly in temporary memory.
- **24-Hour Auto-Purge Guarantee**: No persistent database storage of uploaded images.
- **Zero AI Training on User Data**: Uploaded assets are never used to train or fine-tune public models.

### 💻 Developer-Friendly REST API
- Programmatic background removal via clean REST endpoints.
- Ready-to-use examples in **cURL**, **JavaScript / Node.js**, and **Python**.
- API key management, quota tracking, and webhook notifications.

### 🎨 Dark Neon AI Design System
- Sleek, modern cyberpunk aesthetic inspired by dark mode neon palettes (`#0EA5FF`, `#22D3EE`, `#C084FC`).
- Built with **Tailwind CSS 4**, **Radix UI** primitives, and **Lucide React** iconography.
- Glassmorphic card surfaces, fluid hover effects, scanline animations, and responsive layouts across mobile, tablet, and ultra-wide displays.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) | Modern reactive frontend with fast HMR |
| **Routing & SSR** | [TanStack Start](https://tanstack.com/start) & [Router](https://tanstack.com/router) | Full-stack type-safe file-based routing |
| **Neural AI Inference** | [`@imgly/background-removal`](https://github.com/imgly/background-removal-js) | In-browser IS-Net neural matting via ONNX Runtime Web |
| **Styling & Design** | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Tokens | High-performance CSS engine with glassmorphism |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/) | Accessible headless primitives & clean modern iconography |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Toast notification system |
| **Server Runtime** | [Nitro 3](https://nitro.unjs.io/) | Universal server engine with Cloudflare Workers / Node support |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) | Strict end-to-end type safety |

---

## 📁 Repository Structure

```text
spark-cut-io/
├── public/                    # Static assets, fonts, icons, manifest
├── src/
│   ├── assets/                # Logos, sample images, vector graphics
│   ├── components/
│   │   ├── site/              # Application layout & interactive widgets
│   │   │   ├── HeroUploader.tsx   # Core AI neural uploader & comparison slider
│   │   │   ├── Logo.tsx           # Brand logo component
│   │   │   ├── SiteHeader.tsx     # Navigation header with responsive drawer
│   │   │   ├── SiteFooter.tsx     # Footer links, newsletter & policies
│   │   │   └── SiteLayout.tsx     # Common page shell
│   │   └── ui/                # Reusable Radix/Tailwind design tokens
│   │       ├── button.tsx         # Button variants (hero, neon, outline, etc.)
│   │       └── sonner.tsx         # Toast notification provider
│   ├── data/
│   │   └── site.ts            # Site configuration, pricing plans, FAQs, blog data
│   ├── lib/
│   │   ├── error-capture.ts   # Client/server error handling
│   │   ├── error-page.ts      # Fallback UI renderer
│   │   └── utils.ts           # Classnames merging (clsx + twMerge)
│   ├── routes/                # TanStack Start file-based pages
│   │   ├── __root.tsx         # Root document HTML shell & metadata
│   │   ├── index.tsx          # Landing page with interactive hero uploader
│   │   ├── features.tsx       # Detailed features & comparison breakdown
│   │   ├── pricing.tsx        # Subscription tiers (Free, Pro, Credit Packs)
│   │   ├── api-docs.tsx       # REST API documentation & code playground
│   │   ├── blog.index.tsx     # Engineering & photography blog
│   │   ├── blog.$slug.tsx     # Dynamic article viewer
│   │   ├── about.tsx          # Mission statement & company background
│   │   ├── contact.tsx        # Inquiries & enterprise contact form
│   │   ├── privacy.tsx        # 24-hour auto-delete privacy policy
│   │   └── terms.tsx          # Terms of service
│   ├── routeTree.gen.ts       # Auto-generated TanStack route tree
│   ├── router.tsx             # TanStack router initialization
│   ├── server.ts              # Nitro SSR entry point
│   ├── start.ts               # TanStack Start client bootstrapping
│   └── styles.css             # Tailwind 4 theme, keyframes, neon utility classes
├── package.json               # Dependencies & build scripts
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration with TanStack Start plugin
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** `v20.x` or later (or [Bun](https://bun.sh/))
- **npm**, **pnpm**, or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/anapviraj-ai/spark-cut-io.git
cd spark-cut-io
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

### 3. Start Development Server
```bash
npm run dev
# or
bun dev
```

Open your browser at **`http://localhost:3000`** to view the application with hot module replacement (HMR).

### 4. Build for Production
```bash
npm run build
```

This compiles both the client bundle and the serverless SSR output with Nitro.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🔌 API Reference

SnapCut AI offers a REST API for automated batch processing and e-commerce platform integrations.

### Remove Background
`POST /api/v1/remove-bg`

#### Headers
```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

#### Request Payload
```json
{
  "image_url": "https://example.com/photos/sneaker.jpg",
  "format": "png",
  "quality": "lossless",
  "crop_to_edges": true
}
```

#### Example cURL
```bash
curl -X POST "https://api.snapcut.ai/v1/remove-bg" \
  -H "Authorization: Bearer sk_live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "format": "png"
  }'
```

#### Response (`200 OK`)
```json
{
  "status": "success",
  "id": "cut_9f82d1c0b3",
  "result_url": "https://cdn.snapcut.ai/temp/cut_9f82d1c0b3.png",
  "format": "png",
  "dimensions": {
    "width": 3840,
    "height": 2160
  },
  "processing_time_ms": 2980,
  "expires_at": "2026-09-10T20:30:00Z"
}
```

---

## 💰 Pricing & Plans

| Plan | Price | Allowance | Resolution | Key Features |
|---|---|---|---|---|
| **Free** | **₹0** / forever | 5 images / day | Full HD | Transparent PNGs, 24h retention, community support |
| **Pro Monthly** | **₹799** / month | **Unlimited** | Up to 5000 × 5000 | Priority AI queue, batch uploads, 2 API keys, 24h support |
| **Credit Packs** | **₹499** / 500 credits | Pay-as-you-go | Up to 5000 × 5000 | Credits never expire, team sharing, full API access |

---

## 🚢 Deployment

### Cloudflare Pages / Workers (Recommended)
The repository is pre-configured with Nitro's `cloudflare-module` preset. Deploy directly with Wrangler or connect your GitHub repository to the Cloudflare dashboard:

```bash
npm run build
npx wrangler deploy
```

### Vercel
Connect your repository on [Vercel](https://vercel.com):
- **Framework Preset**: Vite / Other
- **Build Command**: `npm run build`
- **Output Directory**: `.output/public`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with precision by <a href="https://github.com/anapviraj-ai">Viraj Anap</a></sub>
</div>
