"use client";

import { useEffect, useState } from "react";
import { getAllBlogs } from "../../../components/db";
import { BlogPost } from "../../../components/types";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import Link from "next/link";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getAllBlogs();
      setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <Button as={Link} href="/admin/editor/new" color="primary">
          Create New Blog
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading workspace...</div>
      ) : (
        <div className="grid gap-4">
          {blogs.length === 0 ? (
            <p className="text-default-500">No blogs found. Start writing!</p>
          ) : (
            blogs.map((blog) => (
              <Card key={blog.id} className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardBody className="flex flex-row items-center justify-between p-4">
                  <div>
                    <h3 className="text-lg font-bold">{blog.title}</h3>
                    <p className="text-small text-default-500">/{blog.slug}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Chip color={blog.published ? "success" : "warning"} variant="flat">
                      {blog.published ? "Published" : "Draft"}
                    </Chip>
                    <Button as={Link} href={`/admin/editor/${blog.id}`} size="sm" variant="flat">
                      Edit
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
