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

    
    const communityWorks = [
        {
            image: "/images/identitytilkeasoqwer.jpg",
            description: "Identity",
            character: "Tilke x Asoqwer",
            artist: "mnifl",
            href: "https://www.youtube.com/watch?v=81F29AUNDAQ"
        },
        {
            image: "/images/akizoralonely.jpg",
            description: "Lonely Love",
            character: "Akizora",
            artist: "Leshy-P",
            href: "https://www.youtube.com/watch?v=zqfyw-mbG0A"
        },
        {
            image: "/images/tilkerroulete.jpg",
            description: "Russian Roulette",
            character: "Tilke",
            artist: "Leshy-P",
            href: "https://www.youtube.com/watch?v=IaMmtIQW6Ng"},
        {
            image: "/images/feb23th.jpg",
            description: "KING",
            character: "Asoqwer x Tilke x Simon Weber",
            artist: "mnifl",
            href: "https://www.youtube.com/watch?v=awOAjlqdPXc"}

    ];



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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {communityWorks.map((item, index) => (
                            <a href={item.href} target="_blank" rel="noopener noreferrer" key={index} className="neo-blur p-4 rounded-lg hover:bg-primary/5 transition-colors">
                                 <img src={item.image} alt={item.description} className="w-full rounded-lg mb-4 object-contain h-55 mx-auto"/>
                                <p className="text-primary/90 text-center">{item.description}</p>
                                <p className="text-muted-foreground text-center text-sm">
                                    {item.character} (feat. {item.artist})
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
