import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { Sparkles } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { features } from "@/data/site";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — SnapCut AI Background Removal" },
      {
        name: "description",
        content:
          "Hair-level alpha matting, batch processing, a REST API and 24-hour auto-deletion. See everything SnapCut AI does.",
      },
      { property: "og:title", content: "Features — SnapCut AI Background Removal" },
      {
        property: "og:description",
        content: "Alpha matting, batch workspace, REST API and private temporary storage.",
      },
    ],
  }),
  component: FeaturesPage,
});

const specs = [
  ["Formats", "JPG, PNG, WEBP"],
  ["Max file size", "10 MB"],
  ["Max resolution", "5000 × 5000 px"],
  ["Median processing", "3.2 seconds"],
  ["Output", "PNG with alpha channel"],
  ["Retention", "Deleted after 24 hours"],
];

function FeaturesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Features"
        title="Built for catalogues, not just single shots"
        description="Every part of SnapCut AI is tuned for teams pushing hundreds of product images a week."
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[f.icon] ?? Sparkles;
            return (
              <article key={f.title} className="glass-card p-6 hover:border-primary/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-lg font-semibold">{f.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-card/30">
        <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold">Technical limits</h2>
          <dl className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {specs.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-6 bg-card/40 px-5 py-4">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/pricing">Start free</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
