import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { plans, faqs } from "@/data/site";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — SnapCut AI" },
      {
        name: "description",
        content:
          "Free plan with 5 images a day, Pro at ₹799/month for unlimited cutouts, or credit packs that never expire.",
      },
      { property: "og:title", content: "Pricing — SnapCut AI" },
      {
        property: "og:description",
        content: "Free, Pro monthly, or pay-as-you-go credits. No watermarks on any plan.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pricing"
        title="Pay for cutouts, not seats"
        description="Start free, move to unlimited when your volume grows, or buy credits that never expire."
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`glass-card flex flex-col p-7 ${p.highlighted ? "glow-ring border-primary/50" : ""}`}
            >
              {p.highlighted && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                  Most popular
                </span>
              )}
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="mt-3">
                <span className="font-display text-4xl font-semibold">{p.price}</span>{" "}
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-7 w-full" variant={p.highlighted ? "hero" : "outline"}>
                {p.cta}
              </Button>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prices include GST. Payments are processed through Razorpay; cancel any time.
        </p>
      </section>

      <section className="border-t border-border bg-card/30">
        <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold">Billing questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="glass-card p-5">
                <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
