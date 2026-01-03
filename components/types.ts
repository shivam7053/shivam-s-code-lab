export interface BlogTopic {
  id: string;
  title: string;
  content: string; // This will store Markdown or HTML content
  order: number;   // To sort topics within a blog (1, 2, 3...)
}

export interface BlogPost {
  id: string;
  slug: string;    // URL friendly name (e.g., "mastering-sql-joins")
  title: string;
  excerpt: string; // Short description for cards
  coverImage?: string;
  
  createdAt: number; // Unix timestamp
  updatedAt: number;
  
  tags: string[];
  topics: BlogTopic[]; // The structured contenjalt you requested
  
  // SEO Specific Fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[]; // For meta keywords
  
  // Publishing Status
  published: boolean;
}