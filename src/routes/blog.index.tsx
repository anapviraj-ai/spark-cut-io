import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — SnapCut AI" },
      {
        name: "description",
        content:
          "Guides on product photography cutouts, alpha matting, batch API pipelines and image privacy from the SnapCut AI team.",
      },
      { property: "og:title", content: "Blog — SnapCut AI" },
      {
        property: "og:description",
        content: "Cutout guides, engineering notes and API pipeline walkthroughs.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Notes on cutouts, pipelines and privacy"
        description="Practical writing from the team building the engine."
      />

      <section className="mx-auto grid w-full max-w-5xl gap-5 px-4 py-20 sm:px-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="glass-card flex flex-col p-6 hover:border-primary/40">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/12 px-2.5 py-1 text-primary">
                {post.category}
              </span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
              <span>{post.readTime}</span>
            </div>
            <h2 className="mt-4 text-lg font-semibold">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="mt-5 text-sm text-primary hover:underline"
            >
              Read article →
            </Link>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
