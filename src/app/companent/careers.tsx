// app/careers/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

type Job = {
  id: number;
  title: string;
  type: string;
  location: string;
  shortDescription: string;
};

export default function CareersPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(t("careers.all"));
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const types = [t("careers.all"), t("careers.remote"), t("careers.onSite"), t("careers.hybrid")];

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:1337/api/careers")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Strapi'den gelen veriyi uygun şekilde dönüştür
  const filteredJobs = jobs
    .filter(item => item && item.name) // name olanları al
    .map((item) => ({
      id: item.id,
      title: item.name,
      type: item.type,
      location: item.location,
      shortDescription: item.content,
      slug: item.slug, // slug alanını ekle
    }))
    .filter((job) => {
      const matchSearch = job.title.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedType === t("careers.all") || job.type === selectedType;
      return matchSearch && matchType;
    });

  const pageSize = 3;
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredJobs.length / pageSize);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{t("careers.title")}</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder={t("careers.searchPlaceholder")}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />
        <div className="flex gap-2 flex-wrap">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 shadow-sm ${
                selectedType === type
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-8">
        {paginatedJobs.map((job) => (
          <div
            key={job.id}
            className="border-2 border-gray-100 rounded-2xl p-6 shadow hover:shadow-lg transition-all bg-white group"
          >
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-700 transition-colors">{job.title}</h3>
            <p className="text-base text-gray-600 mb-2">{job.shortDescription}</p>
            <p className="text-xs mb-4 text-gray-500">
              <span className="font-medium">{t("careers.type")}:</span> {job.type} |{" "}
              <span className="font-medium">{t("careers.location")}:</span> {job.location}
            </p>
            <div className="mt-2 flex gap-3">
              <Link href={`/careers/${job.slug}`}>
                <button className="text-sm px-5 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition">
                  {t("careers.details")}
                </button>
              </Link>
              <Link href={`/careers/apply?position=${encodeURIComponent(job.title)}`}>
                <button className="text-sm px-5 py-2 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition">
                  {t("careers.apply")}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 border-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
                i + 1 === currentPage
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
