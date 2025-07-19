"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

type RichTextBlock = {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
};

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  content: string | RichTextBlock[];
  date: string;
  tag: string;
};

const pageSize = 6;

export default function BlogPages({ blogPosts }: { blogPosts: BlogPost[] }) {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(t("blog.allPosts"));
  const [currentPage, setCurrentPage] = useState(1);

  // Dil değiştiğinde selectedTag'i güncelle
  useEffect(() => {
    setSelectedTag(t("blog.allPosts"));
  }, [language, t]);

  const tags = [t("blog.allPosts"), ...Array.from(new Set(blogPosts.map((p) => p.tag).filter(Boolean)))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchTitle = post.title.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === t("blog.allPosts") || post.tag === selectedTag;
    return matchTitle && matchTag;
  });

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredPosts.length / pageSize);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("blog.title")}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("blog.subtitle")}
        </p>
      </div>

      {/* Arama + Filtre */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Arama */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder={t("blog.searchPlaceholder")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg shadow-sm focus:border-orange-500 focus:outline-none transition-colors"
          />
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filtre */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm rounded-full border-2 transition-all duration-200 ${
                selectedTag === tag
                  ? "bg-orange-500 text-white border-orange-500 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Sonuç sayısı */}
      {filteredPosts.length > 0 && (
        <div className="mb-8">
          <p className="text-gray-600">
            <span className="font-semibold text-orange-600">{filteredPosts.length}</span> {t("blog.postsFound")}
          </p>
        </div>
      )}

      {/* Blog Kartları */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-6">
                {post.tag && (
                  <span className="inline-block px-3 py-1 text-xs uppercase font-semibold text-orange-600 bg-orange-50 rounded-full mb-3">
                    {post.tag}
                  </span>
                )}
                <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                
                {/* Description */}
                <div className="text-gray-600 text-sm mb-3 line-clamp-2 blog-card-content">
                  {post.description}
                </div>

                {/* Content özeti */}
                <div className="text-gray-500 text-sm mb-4 line-clamp-3 blog-card-content">
                  {(() => {
                    const contentText = typeof post.content === 'string' 
                      ? post.content 
                      : post.content.map(block => 
                          block.children?.map(child => child.text).join(' ')
                        ).join(' ');
                    return contentText.slice(0, 120) + '...';
                  })()}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">{post.date}</p>
                  <span className="text-orange-500 text-sm font-medium group-hover:text-orange-600 transition-colors">
                    {t("blog.readMore")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{t("blog.noPostsFound")}</h3>
          <p className="text-gray-500">{t("blog.noPostsMessage")}</p>
        </div>
      )}

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-16">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 text-sm border-2 rounded-lg transition-all duration-200 ${
                  pageNum === currentPage
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
