import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

const AboutUs = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    
    return (
        <div
            className={cn(
                "min-h-screen flex flex-col overflow-hidden animated-background-container",
                theme === 'dark' ? "dark-theme-background" : "light-theme-background"
            )}
            ref={containerRef}
        >
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-20 relative">
                <motion.div 
                    className="max-w-3xl mx-auto glass-morphism rounded-xl p-8 overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="text-4xl font-bold text-primary mb-8 text-center">About Us</motion.h1>

                    <motion.section variants={itemVariants} className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
                        <p className="text-muted-foreground">
                            The Emerald Project is dedicated to creating high-quality virtual singers and tools for the UTAU community.
                            We aim to provide innovative and expressive voicebanks that are both accessible and inspiring.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold text-primary mb-4">Our Team</h2>
                        <p className="text-muted-foreground">
                            Our team is a group of passionate individuals with a shared love for music synthesis and creative expression. We are committed to pushing the boundaries of what virtual singers can achieve.
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants} className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold text-primary mb-4">Social Networks</h2>
                        <ul className="flex justify-center space-x-4">
                            <li>
                                <a
                                    href="https://www.youtube.com/@EmeraldProjectUtau"
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
                                    href="https://x.com/emeraldpjutau"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </motion.section>

                    <motion.section variants={itemVariants} className="mb-8 flex justify-center space-x-4">
                        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 button-glass-gradient" asChild>
                            <Link to="/gallery">Gallery & Community Works</Link>
                        </Button>
                    </motion.section>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;