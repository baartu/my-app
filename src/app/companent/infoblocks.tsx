"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function InfoBlock() {
  const { t } = useLanguage();
  
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Sol Metin */}
        <div className="md:w-1/2 w-full mr-[150px]">
          <h2 className="text-2xl font-bold mb-4">{t("services.consulting.title")}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {t("services.consulting.content")}
          </p>
          <Link href="/contact">
            <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-500 hover:text-black transition">
              {t("services.contactButton")}
            </button>
          </Link>
        </div>

        {/* Sağ Görsel */}
        <div className="md:w-1/2 w-full ml-[50px]">
          <Image
            src="/images/7.jpg" 
            alt="Danışmanlık"
            width={250}
            height={250}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
