import { Youtube, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-sm py-8 mt-auto border-t border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8">
          <a
            href="https://www.youtube.com/@EmeraldProject1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Youtube className="w-6 h-6" />
          </a>
          <a
            href="https://t.me/UtauV"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.87-1.25 4.79-2.08 5.76-2.5 2.73-1.18 3.3-1.39 3.67-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
            </svg>
          </a>
          <a
            href="mailto:emeraldproject13@gmail.com"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/emerald_pj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;