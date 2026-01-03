import { db } from "./firebase";
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { BlogPost } from "./types";

const BLOG_COLLECTION = "blogs";

// Fetch all published blogs for the main page
export const getAllPublishedBlogs = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

// Fetch ALL blogs (Published & Drafts) for Admin Dashboard
export const getAllBlogs = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return [];
  }
};

// Fetch a single blog by its URL slug
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      where("slug", "==", slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as BlogPost;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
};

// Fetch a single blog by its Firestore ID (for Editor)
export const getBlogById = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, BLOG_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    return null;
  }
};

// Save or Update a blog
export const saveBlog = async (blog: Partial<BlogPost>, id?: string): Promise<string> => {
  try {
    const data = { ...blog, updatedAt: Date.now() };

    if (id && id !== "new") {
      // Update existing
      await setDoc(doc(db, BLOG_COLLECTION, id), data, { merge: true });
      return id;
    } else {
      // Create new
      const docRef = await addDoc(collection(db, BLOG_COLLECTION), { ...data, createdAt: Date.now() });
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving blog:", error);
    throw error;
  }
};