"use client";

import { useEffect, useState } from "react";
import BlogPages from "../companent/blogpages";
import Footer from "../companent/footer";
import { getApiUrl } from "../lib/config";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const API_URL = getApiUrl("/api/blogs?populate=*");
        const response = await fetch(API_URL);
        const data = await response.json();
        setBlogs(data.data || []);
      } catch (error) {
        console.error("Blog verileri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <BlogPages blogPosts={blogs} />
      <Footer />
    </main>
  );
}
