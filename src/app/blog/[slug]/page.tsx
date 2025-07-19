import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getApiUrl } from "../../lib/config";

type Blog = {
  id: number;
  title?: string;
  description?: string;
  content?: string;
  date?: string;
  slug?: string;
  tag?: string;
};

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      getApiUrl(`/api/blogs?filters[slug][$eq]=${slug}&populate=*`),
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data?.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error("Blog fetch error:", error);
    return null;
  }
}

async function getAllBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(getApiUrl("/api/blogs?populate=*"), { cache: "no-store" });
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Blogs fetch error:", error);
    return [];
  }
}

export async function generateStaticParams() {
  // Return empty array for static export - pages will be generated on demand
  return [];
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-16 bg-white rounded-lg shadow-md mt-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span className="mr-4">{blog.date}</span>
          {blog.tag && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {blog.tag}
            </span>
          )}
        </div>
        {blog.description && (
          <p className="text-xl text-gray-700 mb-6">{blog.description}</p>
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        {blog.content && (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        )}
      </div>
    </article>
  );
}
