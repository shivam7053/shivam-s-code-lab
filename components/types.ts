export type Category ='tech-space';

export interface BlogTopic {
  id: string;
  title: string;
  content: string; // Markdown or HTML content
  order: number;   // Topic order inside a blog (1, 2, 3...)
}

export interface BlogPost {
  id: string;
  slug: string;     // URL-friendly name (e.g., "mastering-sql-joins")
  title: string;
  excerpt: string;  // Short description for cards
  coverImage?: string;

  category: Category; // ✅ Added category field

  createdAt: number;  // Unix timestamp
  updatedAt: number;

  tags: string[];
  topics: BlogTopic[]; // Structured content
  resources?: string; // Optional GDrive link for notes

  // SEO Fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // Publishing Status
  published: boolean;
}
