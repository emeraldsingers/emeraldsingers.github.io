import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/10 dark:bg-black/20 backdrop-blur-sm z-50 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-primary text-2xl font-bold hover:text-primary/80 transition-colors">
            Emerald Project
          </Link>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <Link to="/how-to" className="text-primary hover:text-primary/80 transition-colors">
                How To
              </Link>
              <Link to="/singers" className="text-primary hover:text-primary/80 transition-colors">
                Singers
              </Link>
               <Link to="/about-utauv" className="text-primary hover:text-primary/80 transition-colors">
                 About UtauV
                </Link>
              <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                Terms of Use
              </Link>
                 <Link to="/about-us" className="text-primary hover:text-primary/80 transition-colors">
                   About Us
                 </Link>
                  <Link to="/lore" className="text-primary hover:text-primary/80 transition-colors">
                   Lore
                 </Link>
            </div>
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
    </nav>
  );
};

export default Navigation;