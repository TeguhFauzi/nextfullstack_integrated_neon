"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectManager({ initialProjects }: { readonly initialProjects: any[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: ""
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus project ini?")) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
        router.refresh();
      } else {
        alert("Gagal menghapus project");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newProject = await res.json();
        setProjects([newProject, ...projects]);
        setIsModalOpen(false);
        setFormData({ title: "", description: "", imageUrl: "", githubUrl: "", liveUrl: "" });
        router.refresh();
      } else {
        alert("Gagal menyimpan project");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          💼 Projects <span className="bg-indigo-500 text-white text-sm px-2 py-1 rounded-full">{projects.length}</span>
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Tambah Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="opacity-50 italic text-center py-8">Belum ada project yang ditambahkan.</p>
        ) : (
          projects.map((p: any) => (
            <div key={p.id} className="border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg bg-white dark:bg-zinc-800 flex justify-between items-start group">
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-sm my-2 opacity-80">{p.description}</p>
                <div className="flex gap-4 text-xs opacity-60">
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="hover:text-blue-500">Live Demo</a>}
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-500">GitHub</a>}
                </div>
              </div>
              <button 
                onClick={() => handleDelete(p.id)}
                className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                Hapus
              </button>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Tambah Project Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm mb-1">Judul Project *</label>
                <input 
                  id="title"
                  type="text" required
                  className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm mb-1">Deskripsi *</label>
                <textarea 
                  id="description"
                  required rows={3}
                  className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent resize-none"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm mb-1">URL Gambar (Opsional)</label>
                <input 
                  id="imageUrl"
                  type="url" 
                  className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
                  value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="liveUrl" className="block text-sm mb-1">Live URL (Opsional)</label>
                  <input 
                    id="liveUrl"
                    type="url" 
                    className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="githubUrl" className="block text-sm mb-1">GitHub URL (Opsional)</label>
                  <input 
                    id="githubUrl"
                    type="url" 
                    className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 font-medium">Batal</button>
                <button type="submit" disabled={loading} className="flex-1 p-2 rounded-lg bg-indigo-600 text-white font-medium disabled:opacity-50">
                  {loading ? "Menyimpan..." : "Simpan Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
