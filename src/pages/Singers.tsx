import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import SingerCard from "@/components/SingerCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTheme } from "@/components/ThemeProvider";
import React from "react";
import Footer from "@/components/Footer";
const singers = [
  {
    name: "Akizora",
    image: "/images/akizora.png",
    slug: "akizora",
  },
  {
    name: "Asoqwer",
    image: "/images/asoqwer.png",
    slug: "asoqwer",
  },
  {
    name: "K3K0",
    image: "/images/k3k0.png",
    slug: "k3k0",
  },

  {
    name: "Simon Weber",
    image: "/images/simon-weber-eu.png",
    slug: "simon-weber",
  },

  {
    name: "Mitsuo",
    image: "/images/mitsuo.png",
    slug: "mitsuo",
  },
];

const Singers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }


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
      <div className="container mx-auto px-4 py-24 flex-grow"> 
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Our Singers
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {singers.map((singer) => (
            <SingerCard
              key={singer.slug}
              name={singer.name}
              image={singer.image}
              slug={singer.slug}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default Singers;