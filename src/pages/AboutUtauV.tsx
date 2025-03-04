import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Brush,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutUtauV = () => {
    const { theme } = useTheme();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageOpacity, setImageOpacity] = useState(1);
    const imageRef = useRef<HTMLImageElement>(null);

    const images = [
        "/images/UtauV.png",
        "/images/UtauVakizora.png",
        "/images/UtauVasoqwer.png",
        "/images/UtauVK3K0.png",
        "/images/UtauVTilke.png",
        "/images/UtauVSimon.png",
    ];
    const authors = {
        "/images/UtauV.png": "UtauV Interface",
        "/images/UtauVakizora.png": "Akizora",
        "/images/UtauVasoqwer.png": "asoqwer",
        "/images/UtauVK3K0.png": "K3K0-01",
        "/images/UtauVTilke.png": "Tilke",
        "/images/UtauVSimon.png": "Simon Weber"
    };

    const currentImagePath = images[currentImageIndex];
    const currentImageAuthor = authors[currentImagePath];

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

    const handlePrevImage = useCallback(() => {
        setImageOpacity(0);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
            setImageOpacity(1);
        }, 300);
    }, [images.length]);

    const handleNextImage = useCallback(() => {
        setImageOpacity(0);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setImageOpacity(1);
        }, 300);
    }, [images.length]);


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
                    <h1 className="text-4xl font-bold text-primary mb-8 text-center">About UtauV Emerald Edition</h1>

                    <section className="mb-8 text-center">
                        <p className="text-xl text-muted-foreground mb-4">
                            UtauV Emerald Edition is a fork of the open-source UTAU editor, OpenUtau, designed to provide enhanced features and a more polished experience for our Emerald Singers.
                        </p>
                        <p className="text-xl text-muted-foreground mb-4">
                            We've taken the solid foundation of OpenUtau and built upon it with unique styling, an updated CVVC phonemizer, and other improvements tailored specifically to our project.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-morphism p-6 rounded-lg border border-primary/20 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2 text-primary">Unique Styling</h3>
                                <p className="text-muted-foreground">
                                    We've implemented a distinctive visual style that compliments our Emerald Singers and provides a modern, sleek look.
                                </p>
                            </div>
                            <div className="glass-morphism p-6 rounded-lg border border-primary/20 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2 text-primary">New Project Formats support</h3>
                                <p className="text-muted-foreground">
                                    We've developed a solution for uploading projects from other engines for convenient cross-platform work.
                                </p>
                            </div>
                            <div className="glass-morphism p-6 rounded-lg border border-primary/20 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2 text-primary">New Features</h3>
                                <p className="text-muted-foreground">
                                    We've added new features to make UtauV Emerald Edition even more user-friendly and enjoyable.
                                </p>
                            </div>
                            <div className="glass-morphism p-6 rounded-lg border border-primary/20 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2 text-primary">Focus on Emerald Singers</h3>
                                <p className="text-muted-foreground">
                                    UtauV Emerald Edition is designed to work seamlessly with our Emerald Singers, ensuring a consistent and high-quality experience.
                                </p>
                            </div>
                        </div>
                    </section>

                   <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Emerald Singers Showcase</h2>
                        <div className="relative flex flex-col items-center"> 
                            <div className="relative w-[42rem] h-[23rem] overflow-hidden rounded-xl mx-auto transition-opacity duration-300 shadow-2xl">
                                <img
                                    ref={imageRef}
                                    key={currentImagePath}
                                    src={currentImagePath}
                                    alt={`Emerald Singer`}
                                    className="w-full h-full object-contain"
                                    style={{ opacity: imageOpacity }}
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center mt-5 text-primary/80"> 
                                    <Brush className="w-5 h-5 mr-1" />
                                    <p className="text-sm mr-2">Emerald Singer</p>
                                    {currentImageAuthor && (
                                      <p className="text-xs italic"> {currentImageAuthor}</p>
                                    )}
                                </div>
                             {images.length > 1 && (
                                <>
                                    <div className="absolute top-1/2 -translate-y-1/2 left-4">
                                        <Button
                                            onClick={handlePrevImage}
                                            className="p-2 neo-blur rounded-full text-primary hover:bg-primary/10"
                                            aria-label="Previous Image"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                        <Button
                                            onClick={handleNextImage}
                                            className="p-2 neo-blur rounded-full text-primary hover:bg-primary/10"
                                            aria-label="Next Image"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                    <section className="mb-8 text-center">
                        <p className="text-muted-foreground">
                            We're constantly evolving and improving. Stay tuned for more updates and features!
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUtauV;
