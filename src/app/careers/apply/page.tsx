"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useLanguage } from "../../contexts/LanguageContext";

export default function ApplyPage() {
  const { t } = useLanguage();
  const params = useSearchParams();
  const position = params.get("position") || "";

  const [form, setForm] = useState<{
    name: string;
    email: string;
    position: string;
    coverLetter: string;
    file: File | null;
  }>({
    name: "",
    email: "",
    position: position,
    coverLetter: "",
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setForm((prev) => ({ ...prev, file }));
    } else {
      toast.error(t("careers.onlyPdfAllowed"));
      e.target.value = "";
      setForm((prev) => ({ ...prev, file: null }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    toast.success(t("careers.applicationSent"));
  };

  return (
    <section className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{t("careers.applicationForm")}</h2>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("careers.fullName")}</label>
            <input
              type="text"
              name="name"
              placeholder={t("careers.fullName")}
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("careers.email")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("careers.email")}
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("careers.position")}</label>
            <input
              type="text"
              name="position"
              placeholder={t("careers.position")}
              value={form.position}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
              readOnly // değiştirilemez yap
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("careers.coverLetter")}</label>
            <textarea
              name="coverLetter"
              placeholder={t("careers.coverLetter")}
              rows={4}
              value={form.coverLetter}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("careers.cvPdf")}</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition"
          >
            {t("careers.sendApplication")}
          </button>
        </form>
      </div>
    </section>
  );
}
