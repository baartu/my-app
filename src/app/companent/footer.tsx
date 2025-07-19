"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white text-gray-700 border-t mt-16 w-full">
      <div className="w-full flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-32">
          {/* Logo + Sosyal */}
          <div className="flex flex-col items-center justify-center text-center gap-6 md:gap-8">
            <Link href="/">
              <Image
                src="/images/logo.jpeg"
                alt="Logo"
                width={70}
                height={70}
                className="bg-gray-300 rounded-xl p-2"
              />
            </Link>
            <div className="flex gap-6 text-black text-xl mt-2 justify-center">
              <a href="#" className="hover:text-orange-600 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-orange-600 transition"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-orange-600 transition"><FaYoutube /></a>
              <a href="#" className="hover:text-orange-600 transition"><FaInstagram /></a>
            </div>
          </div>
          {/* Menü Sütunları */}
          {[1, 2, 3].map((col) => (
            <div key={col} className="flex flex-col items-center justify-center text-center min-h-[120px] gap-4 md:gap-6">
              <h3 className="font-semibold mb-3 text-orange-700">{t("footer.topic")}</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition">{t("footer.page")}</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">{t("footer.page")}</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">{t("footer.page")}</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">{t("footer.page")}</a></li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-center py-4 text-xs border-t text-gray-500 bg-white">
        © 2025 DeepHist.com | {t("footer.copyright")}
      </div>
    </footer>
  );
}
