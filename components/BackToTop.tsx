"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");

    if (!scrollContainer) return;

    const handleScroll = () => {
      setVisible(scrollContainer.scrollTop > 50); // adjust threshold if needed
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.getElementById("scroll-container");
    if (!scrollContainer) return;

    scrollContainer.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 text-white shadow-lg hover:shadow-2xl cursor-pointer z-50"
          aria-label="Back to top"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={24} className="drop-shadow" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
