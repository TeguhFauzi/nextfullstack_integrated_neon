"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal mengirim pesan");

      setStatus("success");
      setFormData({ name: "", email: "", content: "" });
      
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-4xl font-bold mb-4">Mari Berdiskusi.</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Punya ide project, tawaran pekerjaan, atau sekadar ingin menyapa? 
            Jangan ragu untuk mengisi form ini. Pesan Anda akan langsung masuk ke database saya.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center">
                📍
              </div>
              <div>
                <p className="font-bold">Lokasi</p>
                <p className="text-sm text-zinc-500">Jakarta, Indonesia</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center">
                ✉️
              </div>
              <div>
                <p className="font-bold">Email</p>
                <p className="text-sm text-zinc-500">hello@nutech.dev</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            {status === "success" && (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl text-sm font-medium">
                Terima kasih! Pesan Anda telah berhasil dikirim ke database.
              </div>
            )}
            
            {status === "error" && (
              <div className="bg-red-100 text-red-700 p-4 rounded-xl text-sm font-medium">
                Maaf, terjadi kesalahan. Silakan coba lagi.
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Nama Anda</label>
              <input 
                id="name"
                type="text" 
                required
                className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Anda</label>
              <input 
                id="email"
                type="email" 
                required
                className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">Pesan</label>
              <textarea 
                id="content"
                required
                rows={4}
                className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Mengirim..." : (
                <>Kirim Pesan <Send size={18} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
