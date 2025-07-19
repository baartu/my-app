"use client";
import { useState, useEffect } from 'react';

type Language = 'tr' | 'en';

interface LanguageSwitcherProps {
  onLanguageChange: (lang: Language) => void;
  currentLanguage: Language;
}

export default function LanguageSwitcher({ onLanguageChange, currentLanguage }: LanguageSwitcherProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLanguageChange = (newLang: Language) => {
    if (newLang === currentLanguage) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onLanguageChange(newLang);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-1">
        <button
          onClick={() => handleLanguageChange('tr')}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            currentLanguage === 'tr'
              ? 'bg-orange-500 text-white shadow-md transform scale-105'
              : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
          } ${isAnimating ? 'animate-pulse' : ''}`}
        >
          TR
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            currentLanguage === 'en'
              ? 'bg-orange-500 text-white shadow-md transform scale-105'
              : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
          } ${isAnimating ? 'animate-pulse' : ''}`}
        >
          EN
        </button>
      </div>
    </div>
  );
} 