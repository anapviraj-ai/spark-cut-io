import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles, Star, Upload } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { features, faqs, plans } from "@/data/site";
import heroImage from "@/assets/hero-cutout.jpg";
import * as Icons from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI — Remove Image Backgrounds in Seconds" },
      {
        name: "description",
        content:
          "SnapCut AI removes backgrounds from photos in under five seconds. Studio-grade transparent PNGs, batch processing and a simple REST API.",
      },
      { property: "og:title", content: "SnapCut AI — Remove Image Backgrounds in Seconds" },
      {
        property: "og:description",
        content: "Studio-grade transparent cutouts in under five seconds, with an API for teams.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  { title: "Upload", body: "Drop a JPG, PNG or WEBP up to 10 MB. Folders welcome." },
  { title: "AI cuts it out", body: "Our matting model separates subject from background." },
  { title: "Download", body: "Grab a transparent PNG, or pull the result from the API." },
];

function Index() {
  return (
    <SiteLayout>
      <section className="grid-backdrop border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Median cutout time: 3.2 seconds
            </span>
            <h1 className="mt-6 text-4xl leading-tight font-semibold md:text-6xl">
              Remove backgrounds <span className="text-gradient">instantly</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              SnapCut AI turns any photo into a clean transparent cutout — hair, fur and glass
              included. Built for e-commerce teams, designers and developers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/pricing">
                  Start free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/api-docs">Read the API docs</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["5 free images daily", "No watermark", "Deleted after 24 hours"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card glow-ring overflow-hidden p-3">
            <img
              src={heroImage}
              alt="Product photo with its background removed by SnapCut AI"
              className="w-full rounded-xl object-cover"
              loading="eager"
            />
            <div className="flex items-center justify-between px-2 py-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Upload className="h-3.5 w-3.5" /> shoe-front.jpg
              </span>
              <span className="text-success">Done in 2.8s</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold md:text-4xl">Everything the cutout needs</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          One engine, tuned for production catalogues rather than one-off experiments.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[f.icon] ?? Sparkles;
            return (
              <article key={f.title} className="glass-card p-6 hover:border-primary/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold md:text-4xl">Three steps, no learning curve</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="glass-card p-6">
                <span className="font-display text-4xl text-gradient">{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold md:text-4xl">Simple pricing</h2>
          <Link to="/pricing" className="text-sm text-primary hover:underline">
            Compare all plans →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`glass-card p-7 ${p.highlighted ? "glow-ring border-primary/50" : ""}`}
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-3">
                <span className="font-display text-4xl font-semibold">{p.price}</span>{" "}
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={p.highlighted ? "hero" : "outline"}
                asChild
              >
                <Link to="/pricing">{p.cta}</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/30">
        <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold md:text-4xl">Frequently asked</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="glass-card group p-5">
                <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="glass-card glow-ring flex flex-col items-center gap-5 p-12 text-center">
          <Star className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-semibold md:text-4xl">Cut your first image free</h2>
          <p className="max-w-xl text-muted-foreground">
            Five images a day, no card required. Upgrade only when your catalogue grows.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/pricing">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
