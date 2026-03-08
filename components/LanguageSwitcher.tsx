"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container") || window;

    const handleScroll = () => {
      if (container instanceof Window) {
        setIsScrolled(window.scrollY > 0);
      } else {
        setIsScrolled(container.scrollTop > 0);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div className="relative">
      {/* Language Switcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 border backdrop-blur-xl shadow-lg cursor-pointer ${isScrolled
          ? "bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200 text-gray-800 hover:border-[#D4AF37] hover:from-gray-50 hover:to-white hover:shadow-[#D4AF37]/30"
          : "bg-gradient-to-r from-white/15 to-white/10 border-white/20 text-[#D4AF37] hover:text-yellow-300 hover:border-[#D4AF37]/50 hover:from-white/25 hover:to-white/15 hover:shadow-[#D4AF37]/50"
          }`}
        style={{ flexDirection: locale === 'ar' ? 'row-reverse' : 'row' }}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm tracking-wide">
          {locale === 'en' ? 'English' : 'العربية'}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full mt-3 rounded-xl shadow-2xl border overflow-hidden z-50 min-w-[200px]  ${isScrolled
                ? "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                : "bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-2xl border-white/20"
                }`}
              style={{ [locale === 'ar' ? 'left' : 'right']: '0' }}
            >
              {[{ code: 'en', name: 'English', flag: '🇬🇧' }, { code: 'ar', name: 'العربية', flag: '🇸🇦' }].map((language, index) => (
                <motion.button
                  key={language.code}
                  initial={{ opacity: 0, x: locale === 'ar' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: isScrolled ? 'rgb(249, 250, 251)' : 'rgba(255, 255, 255, 0.15)' }}
                  onClick={() => {
                    router.push(pathname, { locale: language.code });
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-5 py-3.5 transition-all duration-200 cursor-pointer border-b last:border-b-0 ${isScrolled
                    ? locale === language.code
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-gray-100'
                      : 'text-gray-700 border-gray-100 hover:text-[#D4AF37]'
                    : locale === language.code
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-white/10'
                      : 'text-gray-200 border-white/10 hover:text-[#D4AF37]'
                    }`}
                  style={{
                    flexDirection: locale === 'ar' ? 'row-reverse' : 'row',
                  }}
                >
                  <span className="text-xl">{language.flag}</span>
                  <span className="text-sm font-medium flex-1" style={{ textAlign: locale === 'ar' ? 'right' : 'left' }}>
                    {language.name}
                  </span>
                  {locale === language.code && (
                    <motion.svg
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                      className="w-5 h-5 text-[#D4AF37] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 cursor-default"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}