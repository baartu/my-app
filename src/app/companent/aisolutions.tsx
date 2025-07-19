"use client";
import { GlobeIcon, LockIcon, SmileIcon, CalendarIcon } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function AiSolutions() {
  const { t } = useLanguage();
  
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-12">{t("aiSolutions.title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Kart 1 */}
        <div className="flex gap-4">
          <GlobeIcon className="w-6 h-6 mt-1" />
          <div>
            <h3 className="font-semibold">{t("aiSolutions.card1.title")}</h3>
            <p className="text-sm text-gray-600">
              {t("aiSolutions.card1.description")}
            </p>
          </div>
        </div>

        {/* Kart 2 */}
        <div className="flex gap-4">
          <SmileIcon className="w-6 h-6 mt-1" />
          <div>
            <h3 className="font-semibold">{t("aiSolutions.card2.title")}</h3>
            <p className="text-sm text-gray-600">
              {t("aiSolutions.card2.description")}
            </p>
          </div>
        </div>

        {/* Kart 3 */}
        <div className="flex gap-4">
          <LockIcon className="w-6 h-6 mt-1" />
          <div>
            <h3 className="font-semibold">{t("aiSolutions.card3.title")}</h3>
            <p className="text-sm text-gray-600">
              {t("aiSolutions.card3.description")}
            </p>
          </div>
        </div>

        {/* Kart 4 */}
        <div className="flex gap-4">
          <CalendarIcon className="w-6 h-6 mt-1" />
          <div>
            <h3 className="font-semibold">{t("aiSolutions.card4.title")}</h3>
            <p className="text-sm text-gray-600">
              {t("aiSolutions.card4.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
