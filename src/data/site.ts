export type Plan = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    cadence: "forever",
    tagline: "Try SnapCut on real work before you pay.",
    features: [
      "5 images per day",
      "Up to 10 MB per image",
      "PNG with transparency",
      "24-hour auto-delete",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    name: "Pro Monthly",
    price: "₹799",
    cadence: "per month",
    tagline: "Unlimited cutouts for daily production work.",
    features: [
      "Unlimited images",
      "Full 5000 × 5000 resolution",
      "Priority processing queue",
      "Batch upload workspace",
      "API access with 2 keys",
      "Email support within 24h",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Credit Packs",
    price: "₹499",
    cadence: "500 credits",
    tagline: "Pay only for what you process. Credits never expire.",
    features: [
      "1 credit = 1 processed image",
      "Packs from 100 to 10,000 credits",
      "Shareable across your team",
      "Usage analytics",
      "API access included",
    ],
    cta: "Buy credits",
  },
];

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export const features: Feature[] = [
  {
    icon: "Zap",
    title: "Under five seconds",
    description:
      "Every upload is streamed straight to our AI engine. Median processing time is 3.2 seconds, even at full 5000 × 5000 resolution.",
  },
  {
    icon: "Scissors",
    title: "Hair-level edges",
    description:
      "Fine strands, fur, glass and motion blur are matted with alpha precision instead of a hard binary mask.",
  },
  {
    icon: "ShieldCheck",
    title: "Nothing kept forever",
    description:
      "Uploads and results live in temporary storage and are deleted automatically 24 hours after processing.",
  },
  {
    icon: "Layers",
    title: "Batch workspace",
    description:
      "Drag in a folder of product shots and download the whole set as transparent PNGs in one archive.",
  },
  {
    icon: "Code2",
    title: "Simple REST API",
    description:
      "One POST request returns a signed result URL. Keys, rate limits and usage tracking are built in.",
  },
  {
    icon: "Gauge",
    title: "Usage you can see",
    description:
      "Live credit balance, quota, processing history and per-key usage in one dashboard.",
  },
];

export const faqs = [
  {
    q: "What image formats and sizes are supported?",
    a: "JPG, PNG and WEBP up to 10 MB and 5000 × 5000 pixels. Larger files are rejected before upload so you never waste a credit.",
  },
  {
    q: "How long are my images stored?",
    a: "Originals and results are held in temporary storage and permanently deleted 24 hours after processing. We never keep a permanent copy.",
  },
  {
    q: "Does a failed job cost a credit?",
    a: "No. Credits are deducted only when a transparent result is returned successfully. Failed or retried jobs are free.",
  },
  {
    q: "Can I use SnapCut AI commercially?",
    a: "Yes. You keep full rights to every image you upload and every cutout you download, on all paid and free plans.",
  },
  {
    q: "How do payments work?",
    a: "Checkout runs through Razorpay. Subscriptions renew monthly and can be cancelled any time; credit packs are one-time purchases that never expire.",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
};

export const posts: Post[] = [
  {
    slug: "product-photography-cutouts",
    title: "Cutouts that survive a marketplace listing review",
    excerpt:
      "Amazon, Flipkart and Shopify each judge edges differently. Here is the export recipe that passes all three on the first attempt.",
    date: "2026-08-28",
    readTime: "6 min read",
    category: "E-commerce",
  },
  {
    slug: "alpha-matting-explained",
    title: "Alpha matting, explained without the maths",
    excerpt:
      "Why a binary mask ruins hair and glass, and what a soft alpha channel does differently inside a background removal model.",
    date: "2026-08-14",
    readTime: "8 min read",
    category: "Engineering",
  },
  {
    slug: "batch-pipeline-api",
    title: "Building a 10,000-image batch pipeline on our API",
    excerpt:
      "Concurrency limits, retry strategy and signed URL handling for teams processing entire catalogues overnight.",
    date: "2026-07-30",
    readTime: "10 min read",
    category: "API",
  },
  {
    slug: "24-hour-deletion-policy",
    title: "Why we delete every image after 24 hours",
    excerpt:
      "Temporary storage is a product decision, not just a compliance one. A look at the trade-offs behind our retention window.",
    date: "2026-07-11",
    readTime: "5 min read",
    category: "Privacy",
  },
];
