import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../../blog-content";
import SiteHeader from "../../site-header";
import SiteFooter from "../../site-footer";
import { organization, siteUrl } from "../../site-config";

function articleInline(text: string) {
  const token = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g;
  return Array.from(text.matchAll(token)).flatMap((match, i, matches) => {
    const previousEnd = i === 0 ? 0 : matches[i - 1].index + matches[i - 1][0].length;
    const prefix = text.slice(previousEnd, match.index);
    return [
      prefix,
      match[1] ? <strong key={match.index}>{match[1]}</strong> : <a key={match.index} href={match[3]}>{match[2]}</a>,
      ...(i === matches.length - 1 ? [text.slice(match.index + match[0].length)] : []),
    ];
  }).concat(text.match(token) ? [] : [text]);
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  const url = `${siteUrl}/blogs/${slug}`;
  return {
    title: article.seoTitle ?? article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url,
      siteName: "Recore",
      locale: "en_AU",
      images: [{ url: article.image.src, alt: article.image.alt, width: article.image.width, height: article.image.height }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image.src],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const url = `${siteUrl}/blogs/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: url,
    image: new URL(article.image.src, siteUrl).href,
    keywords: article.topics,
    author: {
      "@type": "Organization",
      "@id": organization["@id"],
      name: organization.name,
      url: siteUrl,
      sameAs: organization.sameAs,
    },
    publisher: { "@id": organization["@id"] },
  };
  const cover = (
    <Image {...article.image} alt={article.image.alt} className="blog-article-image" sizes="(max-width: 820px) 100vw, 780px" />
  );
  return (
    <>
      <SiteHeader />
      <main className="section container">
        <article className="blog-article">
          <Link href="/blogs" className="text-link">
            <span aria-hidden="true">←</span> Back to Blogs
          </Link>
          <header>
            <span className="eyebrow">{article.category}</span>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </header>
          {article.imageCaption ? (
            <figure className="blog-article-cover">
              {cover}
              <figcaption>{article.imageCaption}</figcaption>
            </figure>
          ) : cover}
          {article.fieldGuide ? (
            <>
              {article.fieldGuide.lead.map((paragraph) => <p key={paragraph}>{articleInline(paragraph)}</p>)}
              <section>
                <h2>{article.fieldGuide.heading}</h2>
                <ul className="category-list">
                  {article.fieldGuide.bullets.map((item) => <li key={item}>{articleInline(item)}</li>)}
                </ul>
              </section>
              <p>{articleInline(article.fieldGuide.closing)}</p>
            </>
          ) : (
            <>
          {article.story && (
            <section aria-label="Moving-day story">
              {article.story.lead.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          )}
          {article.example && (
            <section className="blog-card">
              <h2>What this looks like in practice</h2>
              <p>{article.example}</p>
            </section>
          )}
          {article.sections.map(({ heading, text, illustration }) => (
            <section key={heading}>
              <h2>{heading}</h2>
              {text.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {illustration && (
                <Image {...illustration} alt={illustration.alt} className="blog-article-image" sizes="(max-width: 820px) 100vw, 780px" />
              )}
            </section>
          ))}
          {article.story && (
            <section aria-label="Moving-day wrap-up">
              {article.story.closing.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p><Link href="/">{article.story.website}</Link></p>
            </section>
          )}
          <section className="blog-card">
            <h2>What to include in your enquiry</h2>
            <ul className="category-list">
              {article.checklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          {article.references && (
            <section>
              <h2>Further reading</h2>
              <ul className="category-list">
                {article.references.map(({ href, label }) => (
                  <li key={href}><a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a></li>
                ))}
              </ul>
            </section>
          )}
          <ul className="blog-topics" aria-label="Article topics">
            {article.topics.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
          <aside className="blog-card">
            <h2>Related recycling guides</h2>
            {article.related.map(({ href, label }) => (
              <Link className="text-link" key={href} href={href}>{label} ↗</Link>
            ))}
            <Link className="button" href="/#contact">Request an assessment ↗</Link>
          </aside>
            </>
          )}
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }} />
      </main>
      <SiteFooter />
    </>
  );
}
