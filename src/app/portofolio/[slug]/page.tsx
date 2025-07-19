"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";

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

// GallerySlider'ı dinamik olarak client component olarak import et
const GallerySlider = dynamic(() => import("./GallerySlider"), { ssr: false });

async function getProject(slug: string): Promise<Project | null> {
  const res = await fetch(
    `http://localhost:1337/api/projects?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (data?.data && data.data.length > 0) {
    return data.data[0];
  }
  return null;
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(params.slug);
      if (!projectData) {
        notFound();
      }
      setProject(projectData);
      setLoading(false);
    };
    fetchProject();
  }, [params.slug]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!project) return notFound();

  const kapakUrl =
    project.kapakGorseli && project.kapakGorseli.url
      ? `http://localhost:1337${project.kapakGorseli.url}`
      : "/images/7.jpg";

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold mb-4 text-center">{project.baslik}</h1>
      <div className="flex flex-col items-center mb-6">
        <Image
          src={kapakUrl}
          alt={project.baslik || t("portfolio.project")}
          width={600}
          height={400}
          className="w-full max-w-xl h-64 object-cover rounded-md shadow"
        />
      </div>
      
      <div className="mb-4">
        <span className="font-semibold text-gray-700">{t("portfolio.description")}: </span>
        <span className="text-gray-600">
          {typeof project.aciklama === "string" ? (
            <span>{project.aciklama}</span>
          ) : project.aciklama && Array.isArray(project.aciklama) ? (
            <span>{project.aciklama.map((item: any, i: number) => item.children?.map((c: any, j: number) => <span key={i + '-' + j}>{c.text}</span>))}</span>
          ) : null}
        </span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">{t("portfolio.technologies")}: </span>
        <span className="text-gray-600">{project.teknolojiler}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">{t("portfolio.date")}: </span>
        <span className="text-gray-600">{project.tarih}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">{t("portfolio.published")}: </span>
        <span className="text-gray-600">{project.yayinda ? t("portfolio.yes") : t("portfolio.no")}</span>
      </div>
      
      {/* Galeri görselleri */}
      {project.galeri && project.galeri.length > 0 && (
        <GallerySlider galeri={project.galeri} />
      )}
    </section>
  );
} 