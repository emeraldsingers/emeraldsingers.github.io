import { Youtube, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-white/5 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_60%)] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
      <div className="container relative mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-base font-semibold text-emerald-700 dark:text-emerald-200">
              Emerald Project
            </p>
            <p className="text-xs text-foreground/70">Virtual singers, voicebanks, and community creations.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/@EmeraldProjectUtau"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="group rounded-full border border-white/10 bg-white/10 p-2.5 text-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-white/20 hover:text-emerald-500"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/UtauV"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="group rounded-full border border-white/10 bg-white/10 p-2.5 text-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-white/20 hover:text-emerald-500"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.87-1.25 4.79-2.08 5.76-2.5 2.73-1.18 3.3-1.39 3.67-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
              </svg>
            </a>
            <a
              href="mailto:emeraldprojectutau@gmail.com"
              aria-label="Email"
              className="group rounded-full border border-white/10 bg-white/10 p-2.5 text-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-white/20 hover:text-emerald-500"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/emeraldpjutau"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="group rounded-full border border-white/10 bg-white/10 p-2.5 text-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-white/20 hover:text-emerald-500"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-1 border-t border-white/10 pt-3 text-[11px] text-foreground/60 md:flex-row">
          <span>© {new Date().getFullYear()} Emerald Project. All rights reserved.</span>
          <span>Made for the virtual singer community.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
