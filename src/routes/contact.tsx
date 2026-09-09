import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Building2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SnapCut AI" },
      {
        name: "description",
        content:
          "Questions about plans, the API or bulk pricing? Send the SnapCut AI team a message and get a reply within a day.",
      },
      { property: "og:title", content: "Contact — SnapCut AI" },
      { property: "og:description", content: "Talk to the SnapCut AI team about plans or the API." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, title: "Email", body: "support@snapcut.ai" },
  { icon: MessageSquare, title: "Support hours", body: "Mon–Sat, 10:00–19:00 IST" },
  { icon: Building2, title: "Office", body: "Pune, Maharashtra, India" },
];

const inputClass =
  "w-full rounded-lg border border-input bg-card/50 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary";

function ContactPage() {
  const [sending, setSending] = useState(false);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need"
        description="Plan advice, API questions or high-volume pricing — a human reads every message."
      />

      <section className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {channels.map((c) => (
            <div key={c.title} className="glass-card flex gap-4 p-5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-sm font-semibold">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            These contact details are placeholders — send us the real ones and we'll swap them in.
          </p>
        </div>

        <form
          className="glass-card space-y-4 p-7"
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              setSending(false);
              (e.target as HTMLFormElement).reset();
              toast.success("Message sent", { description: "We'll reply within one business day." });
            }, 700);
          }}
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input id="name" name="name" required className={`mt-1.5 ${inputClass}`} />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`mt-1.5 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="topic" className="text-sm font-medium">
              Topic
            </label>
            <select id="topic" name="topic" className={`mt-1.5 ${inputClass}`}>
              <option>General question</option>
              <option>Plans and billing</option>
              <option>API support</option>
              <option>High-volume pricing</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className={`mt-1.5 ${inputClass}`}
            />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={sending}>
            {sending ? "Sending…" : "Send message"}
          </Button>
        </form>
      </section>
    </SiteLayout>
  );
}
