import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SnapCut AI" },
      {
        name: "description",
        content:
          "How SnapCut AI handles uploaded images, account data and payments, including our 24-hour deletion policy.",
      },
      { property: "og:title", content: "Privacy Policy — SnapCut AI" },
      { property: "og:description", content: "Image retention, account data and payment handling." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Images you upload",
    body: "Uploaded images and generated cutouts are stored in temporary storage and permanently deleted 24 hours after processing. We do not use your images to train models, and we do not share them with third parties.",
  },
  {
    title: "Account data",
    body: "We store your email address, plan, credit balance and processing history so we can run your account and show usage. You can request deletion of your account and its data at any time.",
  },
  {
    title: "Payments",
    body: "Payments are handled by our payment processor. Card details never reach our servers; we retain only the transaction reference, amount and status for accounting.",
  },
  {
    title: "Cookies and analytics",
    body: "We use essential cookies for sign-in sessions and privacy-respecting analytics to count page views. No advertising trackers are used.",
  },
  {
    title: "Your rights",
    body: "You may request a copy of your data, correction of inaccurate details, or full deletion. Write to support@snapcut.ai and we will respond within 30 days.",
  },
];

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated 9 September 2026. This is a template policy — have it reviewed before launch."
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
