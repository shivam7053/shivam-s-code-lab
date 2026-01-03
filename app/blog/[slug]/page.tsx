import { getBlogBySlug } from "../../../components/db";
import { Hero } from "../../../components/hero";
import { TopicViewer } from "../../../components/topic-viewer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOCSetter } from "../../../components/toc-setter";

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

  return (
    <div className="min-h-screen pb-20">
      {/* Set the topics for the sidebar */}
      <TOCSetter topics={blog.topics} />

      <Hero 
        title={blog.title} 
        subtitle={blog.excerpt} 
        image={blog.coverImage}
      />

      <div className="max-w-4xl mx-auto px-6 mt-8">
        {/* Render the topics */}
        <TopicViewer topics={blog.topics} />
      </div>
    </div>
  );
}
