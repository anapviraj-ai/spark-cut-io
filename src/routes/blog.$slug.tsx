import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — SnapCut AI" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — SnapCut AI Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  errorComponent: PostNotFound,
  component: BlogPost,
});

function PostNotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-28 text-center sm:px-6">
        <h1 className="text-3xl font-semibold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">
          That post may have been moved. Browse the rest of the blog instead.
        </p>
        <Link to="/blog" className="mt-6 inline-block text-primary hover:underline">
          Back to the blog →
        </Link>
      </div>
    </SiteLayout>
  );
}

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <SiteLayout>
      <article className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        <Link to="/blog" className="text-sm text-primary hover:underline">
          ← All articles
        </Link>
        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
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
        <h1 className="mt-4 text-4xl font-semibold">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="mt-10 space-y-5 text-muted-foreground">
          <p>
            Getting a cutout to look right is rarely about the subject — it is about the twenty
            pixels at its edge. A hard binary mask decides each pixel is either subject or
            background, which is exactly where hair, fur, glass and motion blur fall apart.
          </p>
          <p>
            SnapCut AI produces a soft alpha channel instead, so semi-transparent pixels keep a
            partial opacity value. In practice that means strands stay separated against a white
            marketplace background rather than clumping into a dark halo.
          </p>
          <h2 className="pt-4 text-2xl font-semibold text-foreground">What to check on export</h2>
          <p>
            Zoom to 200% along the top edge of the subject, look for grey fringing, and always
            export as PNG rather than JPG — a JPG has no alpha channel and will flatten your
            transparency to white.
          </p>
          <p>
            For catalogue-scale work, run the batch workspace or the API and spot-check ten percent
            of the output rather than every file. The failure modes cluster: if one shot from a
            lighting setup is clean, the rest of that setup usually is too.
          </p>
        </div>

        <div className="glass-card mt-12 p-7 text-center">
          <h2 className="text-xl font-semibold text-foreground">Try it on your own photo</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Five free cutouts a day, no card required.
          </p>
          <Link
            to="/pricing"
            className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Start free
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
