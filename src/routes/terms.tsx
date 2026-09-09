import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SnapCut AI" },
      {
        name: "description",
        content:
          "The terms covering use of SnapCut AI: acceptable use, credits and billing, image rights, refunds and service availability.",
      },
      { property: "og:title", content: "Terms of Service — SnapCut AI" },
      { property: "og:description", content: "Acceptable use, billing, image rights and refunds." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Using the service",
    body: "You must have the right to upload every image you process. Uploading unlawful content, or attempting to overload or reverse-engineer the service, ends access without refund.",
  },
  {
    title: "Your content",
    body: "You keep full ownership and commercial rights to your uploads and cutouts. We claim no licence over them beyond what is needed to process and deliver a result.",
  },
  {
    title: "Credits and billing",
    body: "One credit equals one successfully processed image. Failed jobs are never charged. Subscriptions renew monthly until cancelled; credit packs are one-time purchases that do not expire.",
  },
  {
    title: "Refunds",
    body: "Unused credits purchased within the last 7 days can be refunded on request. Subscription periods already served are non-refundable, but you can cancel to stop future renewals.",
  },
  {
    title: "Availability",
    body: "We target 99.9% monthly API availability but do not guarantee uninterrupted service. Planned maintenance is announced in advance where possible.",
  },
  {
    title: "Changes",
    body: "We may update these terms; material changes are notified by email at least 14 days before they take effect.",
  },
];

function TermsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated 9 September 2026. This is a template agreement — have it reviewed before launch."
      />
      <section className="mx-auto w-full max-w-3xl space-y-8 px-4 py-20 sm:px-6">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
