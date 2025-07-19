"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";

type Job = {
  name: string;
  type: string;
  location: string;
  content: string;
  image?: string;
};

export default function CareerDetailPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage();
  const { slug } = params;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:1337/api/careers?filters[slug][$eq]=${slug}&populate=*`);
        if (!res.ok) {
          notFound();
        }

        const data = await res.json();
        const jobData = data.data && data.data[0];
        if (!jobData) {
          notFound();
        }

        // attributes varsa oradan, yoksa kökten al
        const name = jobData.attributes ? jobData.attributes.name : jobData.name;
        const type = jobData.attributes ? jobData.attributes.type : jobData.type;
        const location = jobData.attributes ? jobData.attributes.location : jobData.location;
        const content = jobData.attributes ? jobData.attributes.content : jobData.content;
        const image = jobData.attributes && jobData.attributes.image && jobData.attributes.image.data
          ? jobData.attributes.image.data.attributes.url
          : null;

        setJob({ name, type, location, content, image });
        setLoading(false);
      } catch (error) {
        notFound();
      }
    };

    fetchJob();
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!job) return notFound();

  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{job.name}</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium border border-blue-100">
            <strong>{t("careers.type")}:</strong> {job.type}
          </span>
          <span className="inline-block bg-green-50 text-green-700 px-4 py-1 rounded-full text-sm font-medium border border-green-100">
            <strong>{t("careers.location")}:</strong> {job.location}
          </span>
        </div>
        {job.image && (
          <img src={job.image.startsWith("http") ? job.image : `http://localhost:1337${job.image}`} alt={job.name} className="mb-6 rounded-lg w-full object-cover max-h-64" />
        )}
        <div className="prose prose-neutral mb-8 text-gray-700">
          <p>{job.content}</p>
          <p>
            {t("careers.contactInfo")}{' '}
            <Link href="/contact" className="text-blue-600 underline hover:text-blue-800 transition">
              {t("careers.contactUs")}
            </Link>.
          </p>
        </div>
        <Link
          href={`/careers/apply?position=${encodeURIComponent(job.name)}`}
          className="inline-block w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition text-center"
        >
          {t("careers.applyForPosition")}
        </Link>
      </div>
    </section>
  );
} 