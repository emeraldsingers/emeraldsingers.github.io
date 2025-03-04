import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const HowTo = () => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const containerWidth = rect.width;
        const containerHeight = rect.height;
        const centerXPercentage = (x / containerWidth) * 100;
        const centerYPercentage = (y / containerHeight) * 100;

        setMousePos({ x: centerXPercentage, y: centerYPercentage });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50"
      style={{
        backgroundImage: theme === "light"
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgb(159, 223, 159), #FFFFFF)`
          : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #004040, #000000)`,
        transition: 'background-image 0.3s ease',
      }}
      ref={containerRef}
    >
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">

        <div className="rounded-xl overflow-hidden mb-16">
          <div className="relative">
            <img
              src="images/emerald.png"
              alt="DiffSinger Banner"
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 neo-blur flex flex-col justify-center items-center px-8">
              <h1 className="text-4xl font-bold mb-2 text-center">
                <span className="text-primary"></span>UTAU
              </h1>
              <p className="text-xl text-primary text-center">With UtauV (OpenUtau) Emerald Edition</p>
            </div>
          </div>
        </div>


        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Installation</h2>


          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              <span className="text-[#9b87f5]">Step 1. </span>
              Download Any Emerald Singer:
            </h3>
              <Button asChild className="bg-primary/90 hover:bg-primary text-primary-foreground button-glass-gradient">
                  <Link to="/singers">
                      Any Emerald Singer
                  </Link>
               </Button>
          </div>

          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              <span className="text-[#9b87f5]">Step 2. </span> 
              Download UtauV Emerald Edition
            </h3>
            <img
              src="images/UtauV.png"
              alt="OpenUtau Interface"
              className="rounded-lg mb-4 w-full"
            />
            <div className="flex justify-center gap-4">
              <Button
                className="bg-primary/90 hover:bg-primary text-primary-foreground button-glass-gradient"
                asChild
              >
                <a href="https://github.com/emeraldsingers/UtauV/releases/download/v1.0.1.2/UtauV.1.0.1.2.2.Installer.exe" target="_blank" rel="noopener noreferrer">
                  Windows x64
                </a>
              </Button>
             </div>
          </div>

          <div className="space-y-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-primary">
                <span className="text-[#9b87f5]">Step 3. </span> 
                Unzip OpenUtau to the folder you want and run OpenUtau.exe
              </h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">
                <span className="text-[#9b87f5]">Step 4. </span> 
                Drag and drop zip file with Any Emerald Singer into main window. Then just click Next - Install. No need to unzip
              </h3>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowTo;
