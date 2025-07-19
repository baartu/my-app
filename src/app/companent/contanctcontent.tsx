"use client";
import toast from 'react-hot-toast';
import { useLanguage } from "../contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(t("contact.successMessage"));
  };
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-14 text-center text-gray-800">{t("contact.title")}</h1>
      <div className="flex flex-col md:flex-row gap-16 bg-white rounded-2xl shadow-2xl p-12 relative">
        {/* Harita */}
        <div className="flex-1 flex flex-col justify-between min-h-[420px]">
          <div className="w-full h-72 md:h-[420px] rounded-lg overflow-hidden shadow mb-6">
            <iframe
              title="Konum Haritası"
              src="https://www.google.com/maps?q=Bedestenlioğlu+Mah.+Kampüs+Cad.+No:6+Merkez+Tokat+60240&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="w-full h-full border-0"
            ></iframe>
          </div>
          <div>
            <p className="text-gray-700 leading-relaxed text-center text-base font-medium">
              Bedestenlioğlu Mah. Kampüs Cad. No:6 Merkez / Tokat 60240
            </p>
          </div>
        </div>

        {/* Dikey çizgi */}
        <div className="hidden md:block w-0.5 bg-gray-300 rounded-full absolute top-10 bottom-10 left-1/2 -translate-x-1/2 z-10" />

        {/* İletişim Formu */}
        <div className="flex-1 flex flex-col justify-center">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">{t("contact.form.fullName")}</label>
              <input
                type="text"
                placeholder={t("contact.form.fullName")}
                className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-base"
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">{t("contact.form.email")}</label>
              <input
                type="email"
                value="info@deehist.com"
                readOnly
                className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-gray-100 text-gray-700 text-base"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">{t("contact.form.subject")}</label>
              <input
                type="text"
                placeholder={t("contact.form.subject")}
                className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-base"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">{t("contact.form.message")}</label>
              <textarea
                placeholder={t("contact.form.message")}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-base"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition"
            >
              {t("contact.form.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
