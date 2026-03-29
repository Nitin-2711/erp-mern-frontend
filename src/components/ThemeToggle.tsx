"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl glass-panel hover:bg-white/10 transition-colors group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <Sun className="w-5 h-5 text-amber-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <Moon className="w-5 h-5 text-indigo-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary-start/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        layoutId="toggle-glow"
      />
    </button>
  );
}
