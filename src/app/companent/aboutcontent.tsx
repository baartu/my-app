"use client";
import { useLanguage } from "../contexts/LanguageContext";

export default function AboutContent() {
  const { t } = useLanguage();
  
  return (
    <section className="px-3 py-8">
      <h2 className="text-3xl font-bold mb-4">{t("about.title")}</h2>
      <p className="text-muted-foreground max-w-3xl leading-relaxed">
        {t("about.content")}
      </p>
    </section>
  );
}