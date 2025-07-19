"use client";

import { notFound } from "next/navigation";
import Footer from "../../companent/footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    slug: string;
  };
};

type RichTextBlock = {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
};

type BlogFromStrapi = {
  id: number;
  attributes?: {
    title?: string;
    description?: string;
    content?: RichTextBlock[];
    date?: string;
    slug: string;
    tag?: string;
  };
  // Doğrudan kök seviye alanlar (eski format için)
  title?: string;
  description?: string;
  content?: RichTextBlock[];
  date?: string;
  slug: string;
  tag?: string;
};

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tag: string;
};

function extractTextFromContent(content?: RichTextBlock[]): string {
  if (!Array.isArray(content)) return "";
  return content
    .map((block) =>
      Array.isArray(block.children)
        ? block.children.map((c) => c.text).join(" ")
        : ""
    )
    .join("\n");
}

async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.error("API yanıt vermedi:", res.status);
      return null;
    }
    const json = await res.json();
    const item = json.data?.[0];
    if (!item) {
      console.error("Blog bulunamadı:", slug);
      return null;
    }
    return {
      slug: item.attributes?.slug || item.slug || `slug-${item.id}`,
      title: item.attributes?.title || item.title || "Başlık yok",
      description: item.attributes?.description || item.description || "",
      content: extractTextFromContent(item.attributes?.content || item.content),
      date: item.attributes?.date || item.date || "",
      tag: item.attributes?.tag || item.tag || "",
    };
  } catch (err) {
    console.error("Blog verisi alınamadı:", err);
    return null;
  }
}

export default function BlogDetailPage(props: Props) {
  const { t } = useLanguage();
  const { slug } = props.params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await getBlog(slug);
      if (!blogData) {
        notFound();
      }
      setPost(blogData);
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/blog" className="hover:text-orange-600 transition-colors">
                {t("blog.title")}
              </a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-medium">{post.title}</li>
          </ol>
        </nav>
        {/* Blog Header */}
        <article className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {post.tag && (
            <span className="inline-block px-4 py-2 text-sm uppercase font-semibold text-orange-600 bg-orange-50 rounded-full mb-6">
              {post.tag}
            </span>
          )}
          <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500 mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          {post.description && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed italic text-center">
                "{post.description}"
              </p>
            </div>
          )}
        </article>
        {/* Blog Content */}
        <article className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed markdown-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
          {/* Blog Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500"></span>
                
              </div>
              <a href="/blog" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t("blog.backToAll")}
              </a>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
