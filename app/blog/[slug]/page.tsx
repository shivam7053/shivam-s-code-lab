import { getBlogBySlug } from "../../../components/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPageContent } from "./page-content";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Generate SEO Metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    keywords: blog.seoKeywords,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
    },
  };
}

// 2. Render the Page
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogPageContent blog={blog} />;
}
