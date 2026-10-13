import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATIC_ARTICLES, getArticleBySlug } from "@/lib/data";
import "./ArticleDetailPage.css";

export function generateStaticParams() {
  return STATIC_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return { title: article ? `${article.title} • MCU` : "Article not found • MCU", description: article?.excerpt };
}

const authorName = (a?: { username: string; firstName?: string; lastName?: string }): string => {
  if (!a) return "Anonymous";
  const full = [a.firstName, a.lastName].filter(Boolean).join(" ");
  return full || a.username || "Anonymous";
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <div className="article-detail-page">
        <div className="article-detail-container">
          {/* Back link */}
          <Link className="ad-back-link" href="/article">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to articles
          </Link>

          <div className="article-detail-wrap">
            {/* Featured image banner */}
            {article.thumbnail && (
              <div className="ad-banner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.thumbnail} alt={article.title} />
              </div>
            )}

            <h1 className="ad-title">{article.title}</h1>

            <div className="ad-meta-row">
              <p className="ad-author">{authorName(article.author)}</p>
              <span className="ad-meta-sep">·</span>
              <p className="ad-date">
                {new Date(article.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {article.category && (
                <>
                  <span className="ad-meta-sep">·</span>
                  <span className="ad-category">{article.category.name}</span>
                </>
              )}
            </div>

            <div className="ad-content" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </div>
    </>
  );
}
