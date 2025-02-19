import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
            <main className="flex-grow container mx-auto px-4 py-20">
                <div className="max-w-3xl mx-auto glass-morphism rounded-xl p-8">
                    <h1 className="text-4xl font-bold text-primary mb-8 text-center">About Us</h1>

                    <section className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
                        <p className="text-muted-foreground">
                            The Emerald Project is dedicated to creating high-quality virtual singers and tools for the UTAU community.
                            We aim to provide innovative and expressive voicebanks that are both accessible and inspiring.
                        </p>
                    </section>

                    <section className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold text-primary mb-4">Our Team</h2>
                        <p className="text-muted-foreground">
                            Our team is a group of passionate individuals with a shared love for music synthesis and creative expression. We are committed to pushing the boundaries of what virtual singers can achieve.
                        </p>
                    </section>

                    <section className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold text-primary mb-4">Social Networks</h2>
                        <ul className="flex justify-center space-x-4">
                            <li>
                                <a
                                    href="https://www.youtube.com/@EmeraldProject1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    Youtube
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me/UtauV"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    Telegram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://x.com/emerald_pj"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8 flex justify-center space-x-4">
                        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 button-glass-gradient" asChild>
                            <Link to="/gallery">Gallery</Link>
                        </Button>
                        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 button-glass-gradient" asChild>
                            <Link to="/community-works">Community Works</Link>
                        </Button>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;