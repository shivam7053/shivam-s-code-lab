import { getAllPublishedBlogs } from "../components/db";
import { BlogList } from "../components/blog-list";
import { Hero } from "../components/hero";

export default async function Home() {
  const blogs = await getAllPublishedBlogs();

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Hero 
        title="Welcome to the Lab" 
        subtitle="Exploring code, one block at a time. Dive into tutorials on SQL, Next.js, and modern web development."
      />
      
      <div className="max-w-7xl mx-auto w-full px-6 -mt-10 relative z-20">
        <h2 className="text-2xl font-bold mb-6 text-primary">Latest Experiments</h2>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}