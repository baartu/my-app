
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-6 p-2 rounded-full border border-gray-300 bg-white/80 dark:bg-gray-800 dark:border-gray-700 shadow hover:scale-110 transition"
      title={theme === "dark" ? "Açık Tema" : "Karanlık Tema"}
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 7.464" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={2} /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      )}
    </button>
  );
}

export default function Navbar({ variant = "default" }: { variant?: "default" | "transparent" }) {
  const { t, language, setLanguage } = useLanguage();
  const isTransparent = variant === "transparent";
  const [menuOpen, setMenuOpen] = useState(false);
  
  const NAV_LINKS = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/portofolio", label: t("nav.projects") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/careers", label: t("nav.career") },
    { href: "/contact", label: t("nav.contact") },
  ];

  // Menü açıkken body scroll'u engelle
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`flex items-center justify-between px-4 py-3 w-full z-50 ${
        isTransparent
          ? "absolute top-0 left-0 bg-transparent text-blue"
          : "bg-orange-600 text-black"
      }`}
    >
      {/* Sol Logo kısmı */}
      <Link href="/">
        <Image
          src="/images/logo.jpeg"
          alt="Logo"
          width={60}
          height={60}
          className="bg-gray-300 rounded p-1"
        />
      </Link>

      {/* Masaüstü Menü */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-8 font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-white transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={setLanguage} 
        />
        <ThemeToggle />
      </div>

      {/* Mobil Hamburger Menü Butonu */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-orange-700 transition"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menüyü Aç/Kapat"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Mobil Açılır Menü */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg flex flex-col p-8 gap-6 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-4"
              onClick={() => setMenuOpen(false)}
              aria-label="Menüyü Kapat"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <ul className="flex flex-col gap-4 font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 px-2 rounded hover:bg-orange-100 dark:hover:bg-gray-800 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4">
              <LanguageSwitcher 
                currentLanguage={language} 
                onLanguageChange={setLanguage} 
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </nav>
  );
}
