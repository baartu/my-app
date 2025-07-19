"use client";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Mission() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center bg-white/95 dark:bg-gray-800/80 rounded-2xl shadow-lg p-10 md:p-14">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-orange-500 inline-block text-gray-800 dark:text-gray-100">
          {t("mission.title")}
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          <strong>{t("mission.paragraph1.bold")}</strong> {t("mission.paragraph1.text")}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          {t("mission.paragraph2")}
        </p>
      </div>
    </section>
  );
}
