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
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

const AboutUtauV = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageOpacity, setImageOpacity] = useState(1);
    const imageRef = useRef<HTMLImageElement>(null);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const images = [
        "/images/UtauV.png",
        "/images/UtauVakizora.png",
        "/images/UtauVasoqwer.png",
        "/images/UtauVSimon.png",
    ];
    const authors = {
        "/images/UtauV.png": "UtauV Interface",
        "/images/UtauVakizora.png": "Akizora",
        "/images/UtauVasoqwer.png": "asoqwer",
        "/images/UtauVSimon.png": "Simon Weber"
    };

    const currentImagePath = images[currentImageIndex];
    const currentImageAuthor = authors[currentImagePath];

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;

            const moveX = ((x / width) - 0.5) * 20;
            const moveY = ((y / height) - 0.5) * 20;

            setOffsetX(moveX);
            setOffsetY(moveY);
        }
    };

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

    const googleDocTutorialLink = "https://docs.google.com/document/d/1Eb43g7Tc616YRtyfLEqrwGKLS5af238-KsGQoY06oBs/edit?usp=sharing";

    const megaModelsLink = "https://mega.nz/folder/riIkRawA#urkiXGT1SsuJLhquWJegoQ";

    return (
        <div
            className={cn(
                "min-h-screen flex flex-col overflow-hidden animated-background-container",
                theme === 'dark' 
                    ? "dark-theme-background" 
                    : "light-theme-background"
            )}
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            <Helmet>
                <title>About UtauV Emerald Edition - Emerald Singers</title>
                <meta name="description" content="Learn about UtauV Emerald Edition, our enhanced fork of OpenUtau, featuring unique styling, AutoPitch, Auto Harmonies, and tailored for Emerald Project singers." />
                <link rel="canonical" href="https://emeraldsingers.github.io/about-utauv" />
            </Helmet>
            <div 
                className="background-shapes"
                style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
            ></div>
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-20 relative">
                <motion.div 
                    className="max-w-5xl mx-auto glass-morphism rounded-xl p-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="text-4xl font-bold text-primary mb-8 text-center">About UtauV Emerald Edition</motion.h1>

                    <motion.section variants={itemVariants} className="mb-8 text-center">
                        <p className="text-xl text-muted-foreground mb-4">
                            UtauV Emerald Edition is a fork of the open-source UTAU editor, OpenUtau, designed to provide enhanced features and a more polished experience for our Emerald Singers.
                        </p>
                        <p className="text-xl text-muted-foreground mb-4">
                            We've taken the solid foundation of OpenUtau and built upon it with unique styling, AutoPitch and Auto Harmonies, and other improvements tailored specifically to our project.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="mb-8">
                        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-primary mb-6 text-center">Key Features</motion.h2>
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="glass-morphism p-6 rounded-lg border border-primary/20 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2 text-primary">Unique Styling</h3>
                                <p className="text-muted-foreground">
                                    We've implemented a distinctive visual style that compliments our Emerald Singers and provides a modern, sleek look.
                                </p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="glass-morphism p-6 rounded-lg border border-primary/20 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2 text-primary">New Project Formats support</h3>
                                <p className="text-muted-foreground">
                                    We've developed a solution for uploading projects from other engines for convenient cross-platform work.
                                </p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="glass-morphism p-6 rounded-lg border border-primary/20 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2 text-primary">New Features</h3>
                                <p className="text-muted-foreground">
                                We've added new features, such as AutoPitch and Auto Harmonies, to make UtauV Emerald Edition even more user-friendly and enjoyable.
                                </p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="glass-morphism p-6 rounded-lg border border-primary/20 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2 text-primary">Focus on Emerald Singers</h3>
                                <p className="text-muted-foreground">
                                    UtauV Emerald Edition is designed to work seamlessly with our Emerald Singers, ensuring a consistent and high-quality experience.
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.section>

                   <motion.section variants={itemVariants} className="mb-8">
                        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-primary mb-6 text-center">Emerald Singers Showcase</motion.h2>
                        <motion.div variants={itemVariants} className="relative flex flex-col items-center"> 
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
                        </motion.div>
                    </motion.section>
                    <motion.section variants={itemVariants} className="mb-8 text-center">
                        <p className="text-muted-foreground">
                            We're constantly evolving and improving. Stay tuned for more updates and features!
                        </p>
                    </motion.section>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUtauV;
