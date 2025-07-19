"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function EducationPackages() {
  const { t } = useLanguage();
  
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">{t("educationPackages.title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sol - Featured Product */}
        <div className="md:col-span-2 border:gray-100 rounded-lg overflow-hidden shadow-sm">
          <Image
            src="/images/7.jpg"
            alt="Featured"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="p-4 text-center mt-[100px]">
            <h3 className="font-semibold">{t("educationPackages.featured.title")}</h3>
            <p className="text-gray-500 text-sm">{t("educationPackages.featured.description")}</p>
            <p className="font-semibold mt-2">{t("educationPackages.featured.price")}</p>
            <Link href="/contact">
            <button className=" mt-[10px] bg-black text-white px-5 py-2 rounded hover:bg-gray-500 hover:text-black transition">
              {t("educationPackages.contactButton")}
            </button>
          </Link>
          </div>
        </div>

        {/* Sağ - Two Stacked Products */}
        <div className="flex flex-col gap-8">
          {/* Ürün 1 */}
          <div className="border:gray-100 rounded-lg  overflow-hidden shadow-sm">
            <Image
              src="/images/7.jpg"
              alt="Product 1"
              width={400}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="p-4 text-center mt-[25px]">
              <h3 className="font-semibold">{t("educationPackages.product1.title")}</h3>
              <p className="text-gray-500 text-sm">{t("educationPackages.product1.description")}</p>
              <p className="font-semibold mt-2">{t("educationPackages.product1.price")}</p>
              <Link href="/contact">
            <button className="mt-[10px] bg-black text-white px-5 py-2 rounded hover:bg-gray-500 hover:text-black transition">
              {t("educationPackages.contactButton")}
            </button>
          </Link>
            </div>
          </div>

          {/* Ürün 2 */}
          <div className="border:gray-100 rounded-lg overflow-hidden shadow-sm">
            <Image
              src="/images/7.jpg"
              alt="Product 2"
              width={400}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="p-4 text-center mt-[25px]">
              <h3 className="font-semibold">{t("educationPackages.product2.title")}</h3>
              <p className="text-gray-500 text-sm">{t("educationPackages.product2.description")}</p>
              <p className="font-semibold mt-2">{t("educationPackages.product2.price")}</p>
              <Link href="/contact">
            <button className="mt-[10px] bg-black text-white px-5 py-2 rounded hover:bg-gray-500 hover:text-black transition">
              {t("educationPackages.contactButton")}
            </button>
          </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
