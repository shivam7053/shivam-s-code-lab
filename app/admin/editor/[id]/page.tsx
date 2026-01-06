"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBlogById, saveBlog } from "../../../../components/db";
import { BlogPost, BlogTopic, Category } from "../../../../components/types";
import {
  Input,
  Textarea,
  Button,
  Switch,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";

/* ------------------ Category Options ------------------ */
const CATEGORIES: { key: Category; label: string }[] = [
  { key: "horror", label: "Horror" },
  { key: "romantic", label: "Romantic" },
  { key: "government-jobs", label: "Government Jobs" },
  { key: "private-jobs", label: "Private Jobs" },
  { key: "tech-space", label: "Tech Space" },
];

/* ------------------ Empty Blog ------------------ */
const EMPTY_BLOG: Partial<BlogPost> = {
  title: "",
  slug: "",
  excerpt: "",
  category: "tech-space",
  published: false,
  topics: [],
  seoTitle: "",
  seoDescription: "",
  seoKeywords: [],
};

export default function BlogEditor() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [blog, setBlog] = useState<Partial<BlogPost>>(EMPTY_BLOG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ------------------ Fetch Blog ------------------ */
  useEffect(() => {
    if (id === "new") {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const data = await getBlogById(id);
      if (data) setBlog(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  /* ------------------ Save Blog ------------------ */
  const handleSave = async () => {
    if (!blog.title || !blog.slug || !blog.category) {
      alert("Title, slug, and category are required");
      return;
    }

    setSaving(true);
    try {
      const savedId = await saveBlog(blog, id);
      if (id === "new") {
        router.replace(`/admin/editor/${savedId}`);
      }
      alert("Saved successfully!");
    } catch (e) {
      alert("Error saving blog");
    } finally {
      setSaving(false);
    }
  };

  /* ------------------ Topic Handlers ------------------ */
  const addTopic = () => {
    const newTopic: BlogTopic = {
      id: Date.now().toString(),
      title: "New Topic",
      content: "",
      order: (blog.topics?.length || 0) + 1,
    };
    setBlog({ ...blog, topics: [...(blog.topics || []), newTopic] });
  };

  const updateTopic = (
    index: number,
    field: keyof BlogTopic,
    value: string
  ) => {
    const newTopics = [...(blog.topics || [])];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setBlog({ ...blog, topics: newTopics });
  };

  const removeTopic = (index: number) => {
    const newTopics = [...(blog.topics || [])];
    newTopics.splice(index, 1);
    setBlog({ ...blog, topics: newTopics });
  };

  if (loading) {
    return <div className="p-10 text-center">Loading Editor...</div>;
  }

  /* ------------------ UI ------------------ */
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-40 py-4 border-b border-divider">
        <div className="flex items-center gap-4">
          <Button variant="light" onPress={() => router.push("/admin/dashboard")}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">
            {id === "new" ? "New Blog" : "Edit Blog"}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Switch
            isSelected={blog.published}
            onValueChange={(val) =>
              setBlog({ ...blog, published: val })
            }
          >
            Published
          </Switch>
          <Button
            color="primary"
            isLoading={saving}
            onPress={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <Input
                label="Blog Title"
                value={blog.title}
                onValueChange={(val) =>
                  setBlog({ ...blog, title: val })
                }
              />

              <Input
                label="Slug"
                description="e.g. mastering-sql-joins"
                value={blog.slug}
                onValueChange={(val) =>
                  setBlog({ ...blog, slug: val })
                }
              />

              <Select
                label="Category"
                selectedKeys={blog.category ? [blog.category] : []}
                onSelectionChange={(keys) =>
                  setBlog({
                    ...blog,
                    category: [...keys][0] as Category,
                  })
                }
              >
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.key}>
                    {cat.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Cover Image URL"
                value={blog.coverImage || ""}
                onValueChange={(val) =>
                  setBlog({ ...blog, coverImage: val })
                }
              />

              <Textarea
                label="Excerpt"
                minRows={2}
                value={blog.excerpt}
                onValueChange={(val) =>
                  setBlog({ ...blog, excerpt: val })
                }
              />
            </CardBody>
          </Card>

          {/* Topics */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Content Topics</h2>
              <Button size="sm" variant="flat" onPress={addTopic}>
                + Add Topic
              </Button>
            </div>

            {blog.topics?.map((topic, index) => (
              <Card key={topic.id}>
                <CardBody className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      label={`Topic ${index + 1} Title`}
                      value={topic.title}
                      onValueChange={(val) =>
                        updateTopic(index, "title", val)
                      }
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onPress={() => removeTopic(index)}
                    >
                      ✕
                    </Button>
                  </div>
                  <Textarea
                    label="Content"
                    minRows={5}
                    value={topic.content}
                    onValueChange={(val) =>
                      updateTopic(index, "content", val)
                    }
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* SEO Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <h3 className="font-bold text-primary">SEO Settings</h3>

              <Input
                label="SEO Title"
                value={blog.seoTitle || ""}
                onValueChange={(val) =>
                  setBlog({ ...blog, seoTitle: val })
                }
              />

              <Textarea
                label="SEO Description"
                minRows={3}
                value={blog.seoDescription || ""}
                onValueChange={(val) =>
                  setBlog({ ...blog, seoDescription: val })
                }
              />

              <Input
                label="Keywords"
                placeholder="sql, database, joins"
                value={blog.seoKeywords?.join(", ") || ""}
                onValueChange={(val) =>
                  setBlog({
                    ...blog,
                    seoKeywords: val
                      .split(",")
                      .map((k) => k.trim()),
                  })
                }
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
