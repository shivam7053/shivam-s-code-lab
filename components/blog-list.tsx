"use client";

import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import Link from "next/link";
import { BlogPost } from "./types";
import { getOptimizedImageUrl } from "./image-utils";

interface BlogListProps {
  blogs: BlogPost[];
}

export const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => {
        const coverImage = getOptimizedImageUrl(blog.coverImage);
        
        return (
        <Link key={blog.id} href={`/blog/${blog.slug}`} className="block h-full">
          <Card className="h-full shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
            {coverImage && (
              <div className="w-full h-48 overflow-hidden relative bg-default-100">
                {/* Using standard img tag for external GDrive links to avoid Next.js config complexity */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <div className="flex gap-2 mb-2">
                {blog.tags?.map((tag) => (
                  <Chip key={tag} size="sm" variant="flat" color="secondary" className="uppercase text-[10px]">
                    {tag}
                  </Chip>
                ))}
              </div>
              <h4 className="font-bold text-large text-primary">{blog.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-default-500 line-clamp-3">{blog.excerpt}</p>
            </CardBody>
          </Card>
        </Link>
      );
      })}
    </div>
  );
};
