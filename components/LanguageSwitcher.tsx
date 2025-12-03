"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname;
    
    router.push(currentPath, { locale: newLocale });
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <div className="relative">
      {/* Language Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-yellow-400 hover:text-yellow-400 hover:cursor-pointer"
        style={{ flexDirection: locale === 'ar' ? 'row-reverse' : 'row' }}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full mt-2 rounded-lg shadow-lg border border-gray-200 min-w-[160px] z-50 hover:cursor-pointer"
          style={{ [locale === 'ar' ? 'left' : 'right']: '0' }}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                locale === language.code ? ' text-yellow-500' : 'text-gray-500'
              } hover:cursor-pointer`}
              style={{ 
                flexDirection: locale === 'ar' ? 'row-reverse' : 'row',
                textAlign: locale === 'ar' ? 'right' : 'left'
              }}
            >
              <span className="text-sm font-medium">{language.name}</span>
              {locale === language.code && (
                <span className="absolute right-4 text-yellow-600 font-bold text-lg">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}