import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SnapCut AI" },
      {
        name: "description",
        content:
          "SnapCut AI is a small team building fast, private background removal for e-commerce sellers, designers and developers.",
      },
      { property: "og:title", content: "About — SnapCut AI" },
      {
        property: "og:description",
        content: "Why we built a background remover around speed, privacy and fair pricing.",
      },
    ],
  }),
  component: AboutPage,
});

const stats = [
  ["3.2s", "median processing time"],
  ["24h", "maximum image retention"],
  ["12M+", "cutouts delivered"],
  ["99.9%", "API uptime last quarter"],
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title="Cutouts should take seconds, not evenings"
        description="We started SnapCut after watching a friend spend three nights masking 400 product photos before a festive sale."
      />

      <section className="mx-auto w-full max-w-3xl space-y-6 px-4 py-20 text-muted-foreground sm:px-6">
        <p>
          SnapCut AI exists for the people who need a clean cutout and nothing else: the seller
          uploading a new catalogue, the designer prepping a mockup, the developer wiring image
          processing into a pipeline at 2 a.m.
        </p>
        <p>
          We keep the product deliberately narrow. No sprawling editor, no template gallery — just a
          matting model tuned for hair, fur, glass and motion blur, a batch workspace, and an API
          that returns a signed URL in one request.
        </p>
        <p>
          Privacy is part of the design. Uploads live in temporary storage and are deleted 24 hours
          after processing, and you keep full commercial rights to everything you upload and
          download.
        </p>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid w-full max-w-5xl gap-5 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="glass-card p-6 text-center">
              <p className="font-display text-3xl font-semibold text-gradient">{value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-semibold">Want to talk to us?</h2>
        <p className="mt-3 text-muted-foreground">
          We answer every message ourselves, usually within a day.
        </p>
        <Button variant="hero" size="lg" className="mt-7" asChild>
          <Link to="/contact">Contact the team</Link>
        </Button>
      </section>
    </SiteLayout>
  );
}
