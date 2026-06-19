import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectManager from "@/components/admin/ProjectManager";
export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-zinc-950 text-black dark:text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="opacity-70">Selamat datang, {session.user?.name}</span>
            <a href="/api/auth/signout" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
              Logout
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-zinc-50 dark:bg-zinc-900/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              📨 Pesan Masuk <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">{messages.length}</span>
            </h2>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="opacity-50 italic">Belum ada pesan masuk.</p>
              ) : (
                messages.map((m: any) => (
                  <div key={m.id} className="border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg bg-white dark:bg-zinc-800">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold">{m.name}</p>
                        <p className="text-sm opacity-70">{m.email}</p>
                      </div>
                      <span className="text-xs opacity-50">{m.createdAt.toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 text-sm">{m.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <ProjectManager initialProjects={projects} />
        </div>
      </div>
    </div>
  );
}
