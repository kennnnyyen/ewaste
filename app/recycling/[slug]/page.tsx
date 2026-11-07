import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../site-header";
import SiteFooter from "../../site-footer";
import { categories, enquiryUrl } from "../../recycling-content";
import { siteUrl } from "../../site-config";

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};
  const url = siteUrl ? `${siteUrl}/recycling/${slug}` : undefined;
  return {
    title: category.title,
    description: category.summary,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: `${category.title} | Recore`,
      description: category.summary,
      ...(url ? { url } : {}),
      type: "website",
      locale: "en_AU",
      siteName: "Recore",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | Recore`,
      description: category.summary,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const related = categories
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.group === category.group) - Number(a.group === category.group),
    )
    .slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: category.title,
        description: category.summary,
        provider: { "@type": "Organization", name: "Recore" },
        ...(siteUrl ? { url: `${siteUrl}/recycling/${slug}` } : {}),
      },
      ...(siteUrl
        ? [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: category.shortTitle,
                  item: `${siteUrl}/recycling/${slug}`,
                },
              ],
            },
          ]
        : []),
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#products">What we recycle</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{category.shortTitle}</span>
          </nav>
        </div>
        <section className="category-hero">
          <div className="container">
            <span className="eyebrow">
              RECORE / {category.group.toUpperCase()} RECYCLING
            </span>
            <h1>{category.title}</h1>
            <p>{category.summary}</p>
            <a
              className="button"
              href={enquiryUrl(
                `Hi Recore, I'd like to enquire about ${category.title.toLowerCase()}.`,
              )}
            >
              Ask about {category.shortTitle.toLowerCase()}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section className="section">
          <div className="container category-layout">
            <div>
              <h2>Items to enquire about</h2>
              <ul className="category-list">
                {category.examples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h2>Before you arrange recycling</h2>
              <ol className="category-list">
                {category.prepare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <p>
                Share photos, quantities and your location first. Recore will
                confirm acceptance, any charges or recovery value, and suitable
                handover arrangements for your specific load.
              </p>
            </div>
            <aside className="category-aside">
              <span className="eyebrow">A CONSIDERED APPROACH</span>
              <h2>Good to know</h2>
              <p>{category.consideration}</p>
              <Link className="text-link" href="/#security">
                Explore data handling <span aria-hidden="true">↗</span>
              </Link>
            </aside>
          </div>
        </section>
        <section className="section services-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">KEEP EXPLORING</span>
                <h2>More recycling options.</h2>
              </div>
              <Link className="text-link" href="/#products">
                View all categories <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="related-links">
              {related.map((item) => (
                <Link key={item.slug} href={`/recycling/${item.slug}`}>
                  {item.shortTitle}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
