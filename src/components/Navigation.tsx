import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, ChevronDown, Users, HelpCircle, FileText, TableOfContents, Origami, BriefcaseBusiness, Image, Brush, Menu, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const menuItems = [
    { title: "Singers", path: "/singers", icon: <Users className="w-5 h-5" />, description: "Browse our collection of virtual singers" },
    { title: "How To Use", path: "/how-to", icon: <HelpCircle className="w-5 h-5" />, description: "Learn how to use our singers and tools" },
    { title: "Terms of Use", path: "/terms", icon: <FileText className="w-5 h-5" />, description: "Guidelines for using our singers" },
    { title: "FAQ", path: "/faq", icon: <TableOfContents className="w-5 h-5" />, description: "Frequently asked questions" },
    { title: "About UtauV", path: "/about-utauv", icon: <Origami className="w-5 h-5" />, description: "Learn about UTAU and voice synthesis" },
    { title: "About Us", path: "/about-us", icon: <BriefcaseBusiness className="w-5 h-5" />, description: "Information about Emerald Project team" },
    { title: "Gallery", path: "/gallery", icon: <Image className="w-5 h-5" />, description: "Artworks and community creations" },
    { title: "Roadmap", path: "/roadmap", icon: <GitBranch className="w-5 h-5" />, description: "View our development plans and progress" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 dark:bg-black/30 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-primary text-2xl font-bold hover:text-primary/80 transition-colors flex-shrink-0">
            Emerald Project
          </Link>

          <div className="hidden md:flex items-center justify-center flex-grow space-x-6">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="outline"
              className="flex items-center gap-2"
              size="sm"
            >
              <span className="hidden md:inline">Menu</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
            <Link to="/singers" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Singers
            </Link>
            <Link to="/how-to" className="text-primary hover:text-primary/80 transition-colors font-medium">
              How To
            </Link>
            <Link to="/about-us" className="text-primary hover:text-primary/80 transition-colors font-medium">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
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
            className="absolute left-0 right-0 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 top-16 w-full md:w-auto md:max-w-xl bg-background shadow-lg border border-border rounded-lg overflow-hidden"
          >
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
                      className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <div>
                        <span className="font-medium text-base block truncate">{item.title}</span>
                        <p className="text-muted-foreground text-xs truncate">{item.description}</p>
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