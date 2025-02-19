import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useEffect, useState, useRef } from "react";

const Gallery = () => {
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

    const galleryItems = {};
	/*[
        {
            image: "/images/akizora.png",
            description: "Akizora Artwork",
            character: "Akizora",
            artist: "rxko",
        },
        {
            image: "/images/asoqwer.png",
            description: "Asoqwer Chilling",
            character: "Asoqwer",
            artist: "wtyssll",
        },
        {
           image: "/images/k3k0.png",
            description: "K3K0 Model sheet",
            character: "K3K0",
           artist: "eulliaqzh"
        },
        {
            image: "/images/tilke.png",
            description: "Tilke in his casual clothes",
            character: "Tilke",
            artist: "eulliaqzh"
        },
          {
            image: "/images/simon-weber.png",
            description: "Simon Weber",
            character: "Simon",
            artist: "Dori Meru"
        },
         {
            image: "/images/favicon.png",
            description: "UtauV logo",
            character: "UtauV",
           artist: "Emerald Project"
        },
         {
           image: "/images/UtauVakizora.png",
           description: "Akizora UtauV banner",
           character: "Akizora",
           artist: "Emerald Project"
        },
        {
           image: "/images/UtauVasoqwer.png",
           description: "Asoqwer UtauV banner",
            character: "Asoqwer",
           artist: "Emerald Project"
        }
    ];*/

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
            <main className="flex-grow container mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto glass-morphism rounded-xl p-8">
                    <h1 className="text-4xl font-bold text-primary mb-8 text-center">Gallery</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {galleryItems.map((item, index) => (
                            <div key={index} className="neo-blur p-4 rounded-lg">
                                <img src={item.image} alt={item.description} className="w-full rounded-lg mb-4 object-contain h-64 mx-auto"/>
                                <p className="text-primary/90 text-center">{item.description}</p>
                                <p className="text-muted-foreground text-center text-sm">
                                    {item.character} by {item.artist}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Gallery;