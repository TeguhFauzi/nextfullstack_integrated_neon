"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered");
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });

      if (res?.error) {
        setError("Email atau password salah");
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      console.error("Login err:", err);
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isRegistered && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm text-center">
          Registrasi berhasil! Silakan login.
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          {loading ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-center mb-2">Login Admin</h1>
        <p className="text-center text-zinc-500 mb-8">Masuk untuk mengelola portofolio</p>
        
        <Suspense fallback={<p className="text-center">Loading form...</p>}>
          <LoginForm />
        </Suspense>
        
        <p className="text-center mt-6 text-sm text-zinc-500">
          Belum punya akun? <Link href="/register" className="text-blue-500 font-bold hover:underline">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}
