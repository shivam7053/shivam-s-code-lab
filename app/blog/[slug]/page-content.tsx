"use client";

import { Hero } from "../../../components/hero";
import { TopicViewer } from "../../../components/topic-viewer";
import { TOCSetter } from "../../../components/toc-setter";
import { Button } from "@heroui/react";
import { BlogPost } from "../../../components/types";

interface BlogPageContentProps {
  blog: BlogPost;
}

export function BlogPageContent({ blog }: BlogPageContentProps) {
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
        {blog.resources && (
          <div className="mb-8">
            <Button
              as="a"
              href={blog.resources}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="flat"
            >
              📂 View Resources / Notes
            </Button>
          </div>
        )}

        {/* Render the topics */}
        <TopicViewer topics={blog.topics} />
      </div>
    </div>
  );
}