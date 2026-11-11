import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../../blog-content";
import SiteHeader from "../../site-header";
import SiteFooter from "../../site-footer";
import { organization, siteUrl } from "../../site-config";

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
    title: article.title,
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
    author: { "@type": "Organization", name: organization.name, url: siteUrl },
  };
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
          <Image {...article.image} alt={article.image.alt} className="blog-article-image" sizes="(max-width: 820px) 100vw, 780px" />
          <section className="blog-card">
            <h2>What this looks like in practice</h2>
            <p>{article.example}</p>
          </section>
          {article.sections.map(({ heading, text }) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
          <section className="blog-card">
            <h2>What to include in your enquiry</h2>
            <ul className="category-list">
              {article.checklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          {article.reference && (
            <p>
              Further reading: <a className="text-link" href={article.reference.href} target="_blank" rel="noopener noreferrer">
                {article.reference.label} ↗
              </a>
            </p>
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
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }} />
      </main>
      <SiteFooter />
    </>
  );
}
