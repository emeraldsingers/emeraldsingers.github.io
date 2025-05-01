import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const itemAppearVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12, duration: 0.3 }
    }
};

const slideVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? '50%' : '-50%'
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? '-50%' : '50%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
      }
    }),
};

const Gallery = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("artworks");
    const [prevTab, setPrevTab] = useState("artworks");

    const handleTabChange = (value: string) => {
        setPrevTab(activeTab);
        setActiveTab(value);
    }

    const galleryItems = [
        { image: "/images/akizora-2.png", description: "Akizora Artwork", character: "Akizora", artist: "JustKAMAZ" },
        { image: "/images/akizora-3.png", description: "Akizora \"pick me\"", character: "Akizora", artist: "KambaL" },
    ];

    const communityWorks = [
        { image: "/images/identitytilkeasoqwer.jpg", description: "Identity", character: "Tilke x Asoqwer", artist: "mnifl", href: "https://www.youtube.com/watch?v=81F29AUNDAQ" },
        { image: "/images/akizoralonely.jpg", description: "Lonely Love", character: "Akizora", artist: "Leshy-P", href: "https://www.youtube.com/watch?v=zqfyw-mbG0A" },
        { image: "/images/feb23th.jpg", description: "KING", character: "Asoqwer x Tilke x Simon Weber", artist: "mnifl", href: "https://www.youtube.com/watch?v=awOAjlqdPXc" },
    ];

    const tabs = ["artworks", "community"];
    const currentTabIndex = tabs.indexOf(activeTab);
    const prevTabIndex = tabs.indexOf(prevTab);
    const direction = currentTabIndex > prevTabIndex ? 1 : -1;

    return (
        <div
            className={cn(
                "min-h-screen flex flex-col overflow-hidden animated-background-container",
                theme === 'dark' 
                  ? "dark-theme-background" 
                  : "light-theme-background"
            )}
            ref={containerRef}
        >
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-20 relative">
                <motion.div 
                    className="max-w-5xl mx-auto glass-morphism rounded-xl p-8 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-primary mb-8 text-center">Gallery</h1>
                    
                    <Tabs defaultValue="artworks" className="w-full" value={activeTab} onValueChange={handleTabChange}>
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="artworks">Artworks</TabsTrigger>
                            <TabsTrigger value="community">Community Works</TabsTrigger>
                        </TabsList>
                        
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            {activeTab === "artworks" && (
                                <TabsContent value="artworks" forceMount className="w-full" asChild>
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                        key="artworks"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        {galleryItems.map((item, index) => (
                                            <motion.div 
                                                key={index} 
                                                className="neo-blur p-4 rounded-lg"
                                                variants={itemAppearVariants}
                                            >
                                                <img src={item.image} alt={item.description} className="w-full rounded-lg mb-4 object-contain h-64 mx-auto"/>
                                                <p className="text-primary/90 text-center font-medium">{item.description}</p>
                                                <p className="text-muted-foreground text-center text-sm">
                                                    {item.character} by {item.artist}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </TabsContent>
                            )}
                            
                            {activeTab === "community" && (
                                <TabsContent value="community" forceMount className="w-full" asChild>
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                        key="community"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        {communityWorks.map((item, index) => (
                                            <motion.a 
                                                href={item.href} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                key={`community-${index}`} 
                                                className="neo-blur p-4 rounded-lg hover:bg-primary/5 transition-colors block"
                                                variants={itemAppearVariants}
                                            >
                                                <img src={item.image} alt={item.description} className="w-full rounded-lg mb-4 object-contain h-64 mx-auto"/>
                                                <p className="text-primary/90 text-center font-medium">{item.description}</p>
                                                <p className="text-muted-foreground text-center text-sm">
                                                    {item.character} (feat. {item.artist})
                                                </p>
                                            </motion.a>
                                        ))}
                                    </motion.div>
                                </TabsContent>
                            )}
                        </AnimatePresence>
                    </Tabs>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default Gallery;