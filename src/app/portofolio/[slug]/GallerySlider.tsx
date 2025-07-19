"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../../contexts/LanguageContext";

type GallerySliderProps = {
  galeri: { url?: string; name?: string }[];
};

export default function GallerySlider({ galeri }: GallerySliderProps) {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrent((prev) => (prev === 0 ? galeri.length - 1 : prev - 1));
  };
  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrent((prev) => (prev === galeri.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">{t("portfolio.gallery")}</h2>
      <div className="relative flex items-center justify-center">
        <button
          onClick={goPrev}
          className="absolute left-0 z-10 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow p-2 -ml-4 transition disabled:opacity-50"
          disabled={galeri.length <= 1}
          aria-label={t("portfolio.previous")}
        >
          &#8592;
        </button>
        <button
          className="focus:outline-none mx-auto"
          onClick={openModal}
        >
          <Image
            src={`http://localhost:1337${galeri[current].url}`}
            alt={galeri[current].name || `${t("portfolio.gallery")} ${current + 1}`}
            width={320}
            height={200}
            className="object-cover w-80 h-48 rounded-lg shadow hover:scale-105 transition-transform border-2 border-orange-400"
          />
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 z-10 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow p-2 -mr-4 transition disabled:opacity-50"
          disabled={galeri.length <= 1}
          aria-label={t("portfolio.next")}
        >
          &#8594;
        </button>
      </div>
      <div className="flex justify-center items-center gap-2 mt-2">
        {galeri.map((img, i) => (
          <span
            key={i}
            className={`inline-block w-2 h-2 rounded-full ${
              i === current ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
        <span className="ml-4 text-xs text-gray-500">
          {current + 1} / {galeri.length}
        </span>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div className="relative max-w-3xl w-full flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80"
              onClick={closeModal}
              aria-label={t("portfolio.close")}
              type="button"
            >
              ×
            </button>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow p-2 transition"
              aria-label={t("portfolio.previous")}
              type="button"
            >
              &#8592;
            </button>
            <img
              src={`http://localhost:1337${galeri[current].url}`}
              alt={t("portfolio.largeImage")}
              className="rounded-lg shadow-lg max-h-[80vh] max-w-full border-4 border-white"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow p-2 transition"
              aria-label={t("portfolio.next")}
              type="button"
            >
              &#8594;
            </button>
            <div className="mt-2 text-white text-sm">
              {galeri[current].name || `${t("portfolio.gallery")} ${current + 1}`}
            </div>
            <div className="mt-1 text-white text-xs">
              {current + 1} / {galeri.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 