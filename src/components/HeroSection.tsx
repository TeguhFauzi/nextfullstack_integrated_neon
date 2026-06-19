"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium"
        >
          Available for new projects
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
        >
          Membangun Pengalaman Web <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            Digital Modern.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10"
        >
          Saya seorang Fullstack Developer yang berfokus pada performa, aksesibilitas, 
          dan animasi indah menggunakan Next.js & Tailwind CSS.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#projects" 
            className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Lihat Karya Saya
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="/cv.pdf" 
            className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-full font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download size={18} />
            Unduh CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
