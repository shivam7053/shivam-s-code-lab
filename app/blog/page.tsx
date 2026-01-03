import { getAllPublishedBlogs } from "../../components/db";
import { BlogList } from "../../components/blog-list";
import { Hero } from "../../components/hero";

export const metadata = {
  title: "Code Lab Experiments | Shivam's Code Lab",
  description: "Browse our latest tutorials, code snippets, and technical experiments.",
};

export default async function BlogIndex() {
  const blogs = await getAllPublishedBlogs();

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Hero title="The Code Lab" subtitle="Browse all experiments and tutorials." />
      
      <div className="max-w-7xl mx-auto w-full px-6 -mt-10 relative z-20">
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}
