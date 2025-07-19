"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DateRangeFilter from "./datafilterrange";
import Link from "next/link";
import { DateRange } from "react-day-picker";
import { useLanguage } from "../contexts/LanguageContext";

type Project = {
  id: number;
  baslik?: string;
  aciklama?: any;
  kisaaciklama?: string;
  kapakGorseli?: { url?: string; name?: string };
  galeri?: { url?: string; name?: string }[];
  teknolojiler?: string;
  slug?: string;
  yayinda?: boolean;
  tarih?: string;
};

export default function ProjectCards() {
  const { t } = useLanguage();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    fetch(
      `http://localhost:1337/api/projects?pagination[pageSize]=100`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllProjects(data?.data || []);
      });
  }, []);

  // Tarih filtreleme fonksiyonu
  const isProjectInDateRange = (project: Project) => {
    if (!dateRange?.from || !project.tarih) return true;
    
    const projectDate = new Date(project.tarih);
    const fromDate = dateRange.from;
    const toDate = dateRange.to || dateRange.from;
    
    return projectDate >= fromDate && projectDate <= toDate;
  };

  // Arama ve tarih filtreleme
  const filteredProjects = allProjects.filter((project) => {
    const matchTitle = project.baslik?.toLowerCase().includes(search.toLowerCase());
    const matchDate = isProjectInDateRange(project);
    return matchTitle && matchDate;
  });

  // Sayfalama
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredProjects.length / pageSize);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("portfolio.title")}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("portfolio.subtitle")}
        </p>
      </div>

      {/* Arama + Filtre */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Arama */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder={t("portfolio.searchPlaceholder")}
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

        {/* Tarih Filtresi */}
        <div className="flex items-center">
          <DateRangeFilter onDateChange={(range) => {
            setDateRange(range);
            setCurrentPage(1);
          }} />
        </div>
      </div>

      {/* Sonuç sayısı */}
      {filteredProjects.length > 0 && (
        <div className="mb-8">
          <p className="text-gray-600">
            <span className="font-semibold text-orange-600">{filteredProjects.length}</span> {t("portfolio.projectsFound")}
          </p>
        </div>
      )}

      {/* Proje Kartları */}
      {paginatedProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProjects.map((project) => {
            const kapakUrl =
              project.kapakGorseli && project.kapakGorseli.url
                ? `http://localhost:1337${project.kapakGorseli.url}`
                : "/images/7.jpg";
            return (
              <Link
                key={project.id}
                href={`/portofolio/${project.slug}`}
                className="group block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={kapakUrl}
                    alt={project.baslik || "Proje"}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.yayinda && (
                    <span className="absolute top-3 right-3 inline-block px-3 py-1 text-xs uppercase font-semibold text-green-600 bg-green-50 rounded-full">
                      {t("portfolio.published")}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    {project.baslik || "Başlık yok"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {project.kisaaciklama || ""}
                  </p>

                  {project.teknolojiler && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">{t("portfolio.technologies")}:</p>
                      <p className="text-sm text-gray-700 font-medium">{project.teknolojiler}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{project.tarih || ""}</p>
                    <span className="text-orange-500 text-sm font-medium group-hover:text-orange-600 transition-colors">
                      {t("portfolio.viewDetails")} →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{t("portfolio.noProjectsFound")}</h3>
          <p className="text-gray-500">{t("portfolio.tryDifferentSearch")}</p>
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
