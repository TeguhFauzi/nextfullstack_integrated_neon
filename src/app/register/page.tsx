"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-center mb-2">Buat Akun</h1>
        <p className="text-center text-zinc-500 mb-8">Daftar untuk mengelola portofolio Anda</p>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input 
              id="name"
              type="text" 
              required
              className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input 
              id="email"
              type="email" 
              required
              className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input 
              id="password"
              type="password" 
              required
              className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold p-3 rounded-lg mt-4 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-zinc-500">
          Sudah punya akun? <Link href="/login" className="text-blue-500 font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}
