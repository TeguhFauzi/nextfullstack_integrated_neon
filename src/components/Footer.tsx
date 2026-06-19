export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-zinc-500 border-t border-zinc-200 dark:border-zinc-800">
      <p>© {new Date().getFullYear()} NUTECH. All rights reserved.</p>
      <p className="mt-2">Built with Next.js, Tailwind CSS, & Framer Motion.</p>
    </footer>
  );
}
