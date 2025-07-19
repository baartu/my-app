"use client";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function FeaturedServices() {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t("featuredServices.dataAnalysis.title"),
      description: t("featuredServices.dataAnalysis.description"),
      image: "/images/service1.jpg",
    },
    {
      title: t("featuredServices.visualization.title"),
      description: t("featuredServices.visualization.description"),
      image: "/images/service2.jpg",
    },
    {
      title: t("featuredServices.prediction.title"),
      description: t("featuredServices.prediction.description"),
      image: "/images/service3.jpg",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center">{t("featuredServices.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white/95 dark:bg-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col items-center">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={400}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100 text-center">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
