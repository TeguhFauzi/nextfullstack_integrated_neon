import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white selection:bg-blue-500/30">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
