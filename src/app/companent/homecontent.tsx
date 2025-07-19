"use client";
import SwiperSlider from "./swiperslider";
import Mission from "./mission";
import FeaturedServices from "./featuredservices";
import ClientLogos from "./clientlogos";
import Footer from "./footer";
import { useLanguage } from "../contexts/LanguageContext";

export default function HomeContent() {
  const { t } = useLanguage();
  
  return (
    <main className="flex flex-col items-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
      <p className="text-lg text-gray-700 mb-[50px]">
        {t("home.subtitle")}
      </p>
      <SwiperSlider/>
      <Mission/>
      <FeaturedServices/>
      <ClientLogos/>
      <Footer/>
    </main>
  );
}