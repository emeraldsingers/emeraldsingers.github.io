import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, ChevronDown, Users, HelpCircle, FileText, TableOfContents, Origami, BriefcaseBusiness, Image, Brush, Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const parseRgb = (value: string) => {
  const matches = value.match(/\d+/g);
  if (!matches || matches.length < 3) {
    return [16, 185, 129];
  }
  return matches.slice(0, 3).map(Number);
};

const Navigation = ({ accentColors }: { accentColors?: { light: string; dark: string } }) => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccent, setShowAccent] = useState(false);

  const hasAccent = Boolean(accentColors);
  const resolvedAccent = accentColors
    ? theme === "dark"
      ? accentColors.dark
      : accentColors.light
    : "rgb(16, 185, 129)";
  const [accentRed, accentGreen, accentBlue] = parseRgb(resolvedAccent);
  const accentRgb = `${accentRed}, ${accentGreen}, ${accentBlue}`;

  useEffect(() => {
    if (hasAccent) {
      const frame = requestAnimationFrame(() => setShowAccent(true));
      return () => cancelAnimationFrame(frame);
    }
    setShowAccent(false);
  }, [hasAccent, theme]);

  const navStyle = {
    "--nav-accent": accentRgb,
    backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.55)" : "rgba(255, 255, 255, 0.75)",
    borderColor: hasAccent
      ? `rgba(${accentRgb}, 0.35)`
      : theme === "dark"
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(255, 255, 255, 0.35)",
    boxShadow: hasAccent
      ? `0 12px 30px rgba(${accentRgb}, 0.25)`
      : "0 10px 26px rgba(0, 0, 0, 0.12)",
  } as CSSProperties;

  const menuStyle = {
    "--nav-accent": accentRgb,
    backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.95)",
    borderColor: hasAccent
      ? `rgba(${accentRgb}, 0.35)`
      : theme === "dark"
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(0, 0, 0, 0.08)",
    boxShadow: hasAccent
      ? `0 24px 60px rgba(${accentRgb}, 0.22)`
      : "0 24px 60px rgba(0, 0, 0, 0.18)",
  } as CSSProperties;

  const navItemClass =
    "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-[rgb(var(--nav-accent))] transition-colors duration-500 hover:bg-[rgba(var(--nav-accent),0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--nav-accent),0.6)] dark:hover:bg-[rgba(var(--nav-accent),0.2)]";
  const menuButtonClass =
    "flex items-center gap-2 rounded-full border bg-[rgba(var(--nav-accent),0.08)] px-3 py-1.5 text-sm font-medium text-[rgb(var(--nav-accent))] shadow-sm transition-all duration-500 hover:bg-[rgba(var(--nav-accent),0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--nav-accent),0.6)]";

  const menuItems = [
    { title: "Singers", path: "/singers", icon: <Users className="w-5 h-5" />, description: "Browse our collection of virtual singers" },
    { title: "How To Use", path: "/how-to", icon: <HelpCircle className="w-5 h-5" />, description: "Learn how to use our singers and tools" },
    { title: "Terms of Use", path: "/terms", icon: <FileText className="w-5 h-5" />, description: "Guidelines for using our singers" },
    { title: "FAQ", path: "/faq", icon: <TableOfContents className="w-5 h-5" />, description: "Frequently asked questions" },
    { title: "About UtauV", path: "/about-utauv", icon: <Origami className="w-5 h-5" />, description: "Learn about UTAU and voice synthesis" },
    { title: "About Us", path: "/about-us", icon: <BriefcaseBusiness className="w-5 h-5" />, description: "Information about Emerald Project team" },
    { title: "Gallery", path: "/gallery", icon: <Image className="w-5 h-5" />, description: "Artworks and community creations" }
  ];

  return (
    <nav className="fixed top-3 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div
            className="relative flex items-center justify-between gap-3 rounded-full border px-4 py-2 backdrop-blur-xl transition-all duration-500"
            style={navStyle}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500"
              style={{
                background: theme === "dark"
                  ? `linear-gradient(130deg, rgba(${accentRgb}, 0.25), rgba(0, 0, 0, 0.35))`
                  : `linear-gradient(130deg, rgba(${accentRgb}, 0.22), rgba(255, 255, 255, 0.6))`,
                opacity: showAccent ? 1 : 0,
              }}
            />
            <Link
              to="/"
              className="relative flex items-center gap-2 text-lg font-semibold text-[rgb(var(--nav-accent))] transition-colors duration-500 hover:opacity-90"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `rgba(${accentRgb}, 0.15)`,
                  color: `rgb(${accentRgb})`,
                  boxShadow: `0 6px 16px rgba(${accentRgb}, 0.25)`
                }}
              >
                <Sparkles className="h-4 w-4" />
              </span>
              Emerald Project
            </Link>

            <div className="relative hidden md:flex items-center gap-2">
              <Link to="/singers" className={navItemClass}>
                <Users className="h-4 w-4" />
                Singers
              </Link>
              <Link to="/how-to" className={navItemClass}>
                <HelpCircle className="h-4 w-4" />
                How To Use
              </Link>
              <Link to="/about-us" className={navItemClass}>
                <BriefcaseBusiness className="h-4 w-4" />
                About Us
              </Link>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${menuButtonClass} ${isMenuOpen ? "bg-[rgba(var(--nav-accent),0.16)] dark:bg-[rgba(var(--nav-accent),0.24)]" : ""}`}
                aria-expanded={isMenuOpen}
                style={{ borderColor: `rgba(${accentRgb}, 0.4)` }}
              >
                More
                <ChevronDown className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="relative flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full transition-colors duration-500"
                aria-expanded={isMenuOpen}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="rounded-full bg-white/60 shadow-sm transition-colors duration-500 dark:bg-white/5"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-[76px] w-auto md:left-1/2 md:right-auto md:w-[520px] md:-translate-x-1/2 border rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500"
            style={menuStyle}
          >
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                background: theme === "dark"
                  ? `linear-gradient(130deg, rgba(${accentRgb}, 0.2), rgba(0, 0, 0, 0.5))`
                  : `linear-gradient(130deg, rgba(${accentRgb}, 0.2), rgba(255, 255, 255, 0.7))`,
                opacity: showAccent ? 1 : 0,
              }}
            />
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2"> 
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.10 }}
                    className="min-w-0"
                  >
                    <Link
                      to={item.path}
                      className="flex items-start gap-3 p-3 rounded-xl transition-colors w-full hover:bg-[rgba(var(--nav-accent),0.12)] dark:hover:bg-[rgba(var(--nav-accent),0.2)]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mt-0.5 shrink-0">{item.icon}</span>
                      <div>
                        <span className="font-medium text-base leading-snug block line-clamp-2">{item.title}</span>
                        <p className="text-muted-foreground text-xs leading-snug line-clamp-2">{item.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
