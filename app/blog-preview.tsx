import Image from "next/image";
import Link from "next/link";
import { articles } from "./blog-content";

export default function BlogPreview({ nested = false }: { nested?: boolean }) {
  const Heading = nested ? "h3" : "h2";
  const visibleArticles = nested ? articles.slice(0, 3) : articles;
  return (
    <div className="blog-grid">
      {visibleArticles.map((article) => (
        <article className="blog-card" key={article.slug}>
          <Link href={`/blogs/${article.slug}`} className="blog-preview-link">
            <Image
              {...article.image}
              alt={article.image.alt}
              className="blog-preview-image"
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className="eyebrow">{article.category}</span>
            <Heading>{article.title}</Heading>
          </Link>
          <p>{article.description}</p>
        </article>
      ))}
    </div>
  );
}
