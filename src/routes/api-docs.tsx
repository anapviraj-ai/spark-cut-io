import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/api-docs")({
  head: () => ({
    meta: [
      { title: "API Docs — SnapCut AI Background Removal API" },
      {
        name: "description",
        content:
          "One POST request returns a transparent PNG. Authentication, rate limits, errors and code samples for the SnapCut AI API.",
      },
      { property: "og:title", content: "API Docs — SnapCut AI" },
      {
        property: "og:description",
        content: "Authentication, endpoints, rate limits and code samples for the SnapCut AI API.",
      },
    ],
  }),
  component: ApiDocsPage,
});

const curlSample = `curl -X POST https://api.snapcut.ai/v1/remove \\
  -H "Authorization: Bearer sk_live_your_key" \\
  -F "image=@shoe-front.jpg" \\
  -F "format=png"`;

const jsonSample = `{
  "id": "job_8f21c0",
  "status": "succeeded",
  "credits_used": 1,
  "result_url": "https://cdn.snapcut.ai/r/8f21c0.png",
  "expires_at": "2026-09-10T10:19:00Z"
}`;

const nodeSample = `const form = new FormData();
form.append("image", file);

const res = await fetch("https://api.snapcut.ai/v1/remove", {
  method: "POST",
  headers: { Authorization: \`Bearer \${process.env.SNAPCUT_KEY}\` },
  body: form,
});

const { result_url } = await res.json();`;

const errors = [
  ["400", "Unsupported format or file larger than 10 MB"],
  ["401", "Missing or invalid API key"],
  ["402", "Out of credits or quota"],
  ["429", "Rate limit exceeded — retry after the given delay"],
  ["500", "Processing failed. No credit is charged"],
];

function Code({ children, label }: { children: string; label: string }) {
  return (
    <div className="glass-card overflow-hidden p-0">
      <div className="border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
        {label}
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function ApiDocsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="API"
        title="One endpoint, one transparent PNG"
        description="Send an image, get back a signed result URL. No SDK required."
      />

      <section className="mx-auto w-full max-w-4xl space-y-12 px-4 py-20 sm:px-6">
        <div>
          <h2 className="text-2xl font-semibold">Authentication</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Every request carries a bearer token from your dashboard. Pro plans include two keys;
            keys can be rotated at any time without downtime.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Remove a background</h2>
          <p className="text-sm text-muted-foreground">
            <code className="rounded bg-secondary px-1.5 py-0.5">POST /v1/remove</code> — multipart
            form with an <code>image</code> field.
          </p>
          <Code label="cURL">{curlSample}</Code>
          <Code label="Response">{jsonSample}</Code>
          <Code label="JavaScript">{nodeSample}</Code>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Rate limits</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Free keys allow 5 requests per day. Pro keys allow 60 requests per minute with a
            priority queue. Exceeding a limit returns 429 with a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5">Retry-After</code> header.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Errors</h2>
          <dl className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {errors.map(([code, text]) => (
              <div key={code} className="flex gap-6 bg-card/40 px-5 py-4">
                <dt className="w-12 font-mono text-sm text-primary">{code}</dt>
                <dd className="text-sm text-muted-foreground">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SiteLayout>
  );
}
