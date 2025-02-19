import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useEffect, useState, useRef } from "react";

const CommunityWorks = () => {
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

    const communityWorks = [];
    /* const communityWorks = [
        {
            image: "/images/akizora.png",
            description: "Akizora Cover Song",
            character: "Akizora",
            artist: "User 1",
            href: "https://www.youtube.com/watch?v=example1"
        },
        {
            image: "/images/asoqwer.png",
            description: "Asoqwer Cover song",
            character: "Asoqwer",
            artist: "User 2",
            href: "https://www.youtube.com/watch?v=example2"
        },
        {
            image: "/images/k3k0.png",
            description: "K3K0 Remix",
            character: "K3K0",
            artist: "User 3",
            href: "https://www.youtube.com/watch?v=example3"
        },
         {
             image: "/images/tilke.png",
             description: "Tilke Live",
            character: "Tilke",
            artist: "User 4",
             href: "https://www.youtube.com/watch?v=example4"
        },
         {
            image: "/images/simon-weber.png",
             description: "Simon Weber - Cover",
            character: "Simon Weber",
             artist: "User 5",
             href: "https://www.youtube.com/watch?v=example5"
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
                    <h1 className="text-4xl font-bold text-primary mb-8 text-center">Community Works</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {communityWorks.map((item, index) => (
                            <a href={item.href} target="_blank" rel="noopener noreferrer" key={index} className="neo-blur p-4 rounded-lg hover:bg-primary/5 transition-colors">
                                 <img src={item.image} alt={item.description} className="w-full rounded-lg mb-4 object-contain h-64 mx-auto"/>
                                <p className="text-primary/90 text-center">{item.description}</p>
                                <p className="text-muted-foreground text-center text-sm">
                                    {item.character} by {item.artist}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CommunityWorks;