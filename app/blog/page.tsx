import { getAllPublishedBlogs } from "../../components/db";
import { BlogList } from "../../components/blog-list";
import { Hero } from "../../components/hero";
import { BlogPost } from "../../components/types";

export const metadata = {
  title: "Code Lab Experiments | Shivam's Code Lab",
  description: "Browse our latest tutorials, code snippets, and technical experiments.",
};

export default async function BlogIndex() {
  const blogs: BlogPost[] = await getAllPublishedBlogs();

  // ✅ Filter only tech-space category blogs
  const techBlogs = blogs.filter(
    (blog) => blog.category === "tech-space"
  );

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Hero
        title="The Code Lab"
        subtitle="Browse all experiments and tutorials."
      />

      <div className="max-w-7xl mx-auto w-full px-6 -mt-10 relative z-20">
        <BlogList blogs={techBlogs} />
      </div>
    </div>
  );
}
