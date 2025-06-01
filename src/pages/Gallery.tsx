import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";
import { Image as ImageIcon, Camera, Palette, Users, ExternalLink } from "lucide-react";

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
    const [activeTab, setActiveTab] = useState("community");
    const [prevTab, setPrevTab] = useState("community");
    const [direction, setDirection] = useState(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageAlt, setSelectedImageAlt] = useState<string>("");
    const [zoomLevel, setZoomLevel] = useState(1);
    const imageRef = useRef<HTMLImageElement>(null);
    const viewerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    
    const rotateImages = useTransform(scrollYProgress, [0, 0.5], [0, 5]);
    const scaleHeader = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const opacityHeader = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    const handleTabChange = (value: string) => {
        setPrevTab(activeTab);
        setActiveTab(value);
        setDirection(tabs.indexOf(value) > tabs.indexOf(activeTab) ? 1 : -1);
    }

    const handleImageClick = (image: string, alt: string) => {
        setSelectedImage(image);
        setSelectedImageAlt(alt);
        setZoomLevel(1);
    };

    const handleCloseViewer = () => {
        setSelectedImage(null);
        setSelectedImageAlt("");
    };

    const galleryItems = [
        { image: "/images/akizora-2.webp", description: "Akizora Artwork", character: "Akizora", artist: "JustKAMAZ" },
        { image: "/images/akizora-3.webp", description: "Akizora \"pick me\"", character: "Akizora", artist: "KambaL" },
    ];

    const communityWorks = [
        { image: "/images/identitytilkeasoqwer.webp", description: "Identity", character: "Tilke x Asoqwer", artist: "mnifl", href: "https://www.youtube.com/watch?v=81F29AUNDAQ" },
        { image: "/images/akizoralonely.webp", description: "Lonely Love", character: "Akizora", artist: "Leshy-P", href: "https://www.youtube.com/watch?v=zqfyw-mbG0A" },
        { image: "/images/feb23th.webp", description: "KING", character: "Asoqwer x Tilke x Simon Weber", artist: "mnifl", href: "https://www.youtube.com/watch?v=awOAjlqdPXc" },
    ];

    const tabs = ["artworks", "community"];
    const currentTabIndex = tabs.indexOf(activeTab);
    const prevTabIndex = tabs.indexOf(prevTab);

    return (
        <div
            className="min-h-screen flex flex-col overflow-hidden"
            ref={containerRef}
        >
            <Helmet>
                <title>Gallery - Emerald Singers</title>
                <meta name="description" content="View official artworks and community creations featuring the Emerald Project singers. Discover fan art and music videos." />
                <link rel="canonical" href="https://emeraldsingers.github.io/gallery" />
            </Helmet>
            
            <AnimatedBackground theme={theme} />
            <FloatingElements theme={theme} />
            <StarryBackground theme={theme} />
            
            <Navigation />
            
            <motion.header
                className="relative pt-24 pb-12 px-4 text-center"
                style={{
                    scale: scaleHeader,
                    opacity: opacityHeader
                }}
            >
                <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-40 h-40 rounded-full border-2 border-primary/10 opacity-50"></div>
                </motion.div>
                
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Camera className="h-10 w-10 mx-auto text-primary mb-4" />
                    <h1 className="text-5xl font-bold text-primary mb-2 tracking-tight">Gallery</h1>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Explore official artwork and community creations featuring the Emerald Project singers
                    </p>
                </motion.div>
            </motion.header>
            
            <main className="flex-grow container mx-auto px-4 pb-20 relative">
                <motion.div
                    className="max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <Tabs defaultValue="artworks" className="w-full" value={activeTab} onValueChange={handleTabChange}>
                        <TabsList className="w-full max-w-md mx-auto mb-12 glass-morphism">
                            <TabsTrigger value="artworks" className="flex items-center gap-2">
                                <Palette className="h-4 w-4" />
                                <span>Official Artworks</span>
                            </TabsTrigger>
                            <TabsTrigger value="community" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>Community Works</span>
                            </TabsTrigger>
                        </TabsList>
                        
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            {activeTab === "artworks" && (
                                <TabsContent value="artworks" forceMount className="w-full" asChild>
                                    <motion.div 
                                        key="artworks"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                                            {galleryItems.map((item, index) => (
                                                <motion.div 
                                                    key={index} 
                                                    className="neo-blur p-4 rounded-lg overflow-hidden relative"
                                                    variants={itemAppearVariants}
                                                    style={{ rotate: rotateImages }}
                                                    whileHover={{ 
                                                        scale: 1.03, 
                                                        rotate: 0,
                                                        transition: { duration: 0.3 } 
                                                    }}
                                                    onClick={() => handleImageClick(item.image, item.description)}
                                                >
                                                    <div className="relative group cursor-pointer">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.description} 
                                                            className="w-full rounded-lg mb-4 object-contain h-64 mx-auto transition-transform"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                            <ImageIcon className="h-8 w-8 text-white" />
                                                        </div>
                                                    </div>
                                                    <p className="text-primary/90 text-center font-medium">{item.description}</p>
                                                    <p className="text-muted-foreground text-center text-sm">
                                                        {item.character} by {item.artist}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </TabsContent>
                            )}
                            
                            {activeTab === "community" && (
                                <TabsContent value="community" forceMount className="w-full" asChild>
                                    <motion.div 
                                        key="community"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {communityWorks.map((item, index) => (
                                                <motion.div 
                                                    key={`community-${index}`} 
                                                    className="neo-blur p-4 rounded-lg relative overflow-hidden"
                                                    variants={itemAppearVariants}
                                                    whileHover={{ 
                                                        scale: 1.03,
                                                        transition: { duration: 0.3 } 
                                                    }}
                                                >
                                                    <div className="relative group">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.description} 
                                                            className="w-full rounded-lg mb-4 object-cover h-48 mx-auto"
                                                            onClick={() => handleImageClick(item.image, item.description)}
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                            <ImageIcon className="h-8 w-8 text-white" />
                                                        </div>
                                                        
                                                        <a 
                                                            href={item.href} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                                                        >
                                                            <ExternalLink className="h-4 w-4 text-white" />
                                                        </a>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-primary/90 font-medium">{item.description}</p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {item.character} (feat. {item.artist})
                                                        </p>
                                                        <a 
                                                            href={item.href} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm mt-2"
                                                        >
                                                            Watch on YouTube
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </TabsContent>
                            )}
                        </AnimatePresence>
                    </Tabs>
                </motion.div>
            </main>
            
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseViewer}
                    >
                        <motion.div 
                            className="max-w-4xl max-h-[90vh] overflow-hidden relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            ref={viewerRef}
                        >
                            <img 
                                ref={imageRef}
                                src={selectedImage} 
                                alt={selectedImageAlt} 
                                className="max-h-[90vh] w-auto object-contain rounded-lg"
                                style={{ transform: `scale(${zoomLevel})` }}
                            />
                            <button 
                                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                onClick={handleCloseViewer}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <Footer />
        </div>
    );
};

export default Gallery;