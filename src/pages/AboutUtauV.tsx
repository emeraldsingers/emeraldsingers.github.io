import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Brush,
    Code,
    Download,
    Terminal,
    Book,
    Settings,
    FilePlus,
    Music,
    Layers,
    FileCode,
    Github,
    ExternalLink,
    Monitor,
    Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (custom: number) => ({ 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            delay: custom * 0.1 + 0.2
        }
    }),
    hover: {
        y: -5,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
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
    const [activeTab, setActiveTab] = useState("features");
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    const images = [
        "/images/UtauV.webp",
        "/images/UtauVakizora.webp",
        "/images/UtauVasoqwer.webp",
        "/images/UtauVSimon.webp",
    ];
    const authors = {
        "/images/UtauV.webp": "UtauV Interface",
        "/images/UtauVakizora.webp": "Akizora",
        "/images/UtauVasoqwer.webp": "asoqwer",
        "/images/UtauVSimon.webp": "Simon Weber"
    };

    const features = [
        {
            title: "Modern Interface",
            description: "Clean, intuitive design with improved workflow and visual feedback for an enhanced user experience.",
            icon: <Layers className="h-5 w-5" />,
            color: "bg-emerald-500/20"
        },
        {
            title: "AutoPitch",
            description: "Intelligent pitch detection that automatically maps notes based on reference audio.",
            icon: <Music className="h-5 w-5" />,
            color: "bg-blue-500/20"
        },
        {
            title: "Auto Harmonies",
            description: "Create beautiful harmonies with a single click based on the current melody.",
            icon: <Settings className="h-5 w-5" />,
            color: "bg-purple-500/20"
        },
        {
            title: "Cross-Platform",
            description: "Currently available for Windows only. We are working on macOS and Linux support.",
            icon: <Monitor className="h-5 w-5" />,
            color: "bg-indigo-500/20"
        },
        {
            title: "Performance Optimized",
            description: "Smoother rendering and faster processing for a more responsive editing experience.",
            icon: <Cpu className="h-5 w-5" />,
            color: "bg-rose-500/20"
        }
    ];

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
            className="min-h-screen flex flex-col overflow-hidden"
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            <Helmet>
                <title>About UtauV Emerald Edition - Emerald Singers</title>
                <meta name="description" content="Learn about UtauV Emerald Edition, our enhanced fork of OpenUtau, featuring unique styling, AutoPitch, Auto Harmonies, and tailored for Emerald Project singers." />
                <link rel="canonical" href="https://emeraldsingers.github.io/about-utauv" />
            </Helmet>

            {/* Background components */}
            <AnimatedBackground theme={theme} />
            <FloatingElements theme={theme} />
            <StarryBackground theme={theme} />
            
            <Navigation />
            
            {/* Hero Section */}
            <motion.header 
                className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16"
                style={{ opacity: headerOpacity, y: headerY }}
            >
                <div className="container relative z-10 text-center px-4">
                    <motion.div 
                        className="inline-flex items-center justify-center mb-6"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className={`p-4 rounded-full ${
                            theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
                        }`}>
                            <Terminal className="h-10 w-10 text-primary" />
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        UtauV <span className="text-emerald-500">Emerald</span> Edition
                    </motion.h1>
                    
                    <motion.p 
                        className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        A powerful and modern UTAU editor designed specifically for Emerald Project singers, 
                        with enhanced features and a beautiful interface.
                    </motion.p>
                    
                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button size="lg" asChild>
                            <a 
                                href="https://github.com/emeraldsingers/UtauV/releases/download/v1.1.0.0/UtauV.1.1.0.0.1.Installer.exe" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Download for Windows
                            </a>
                        </Button>
                        
                        <Button variant="outline" size="lg" asChild>
                            <a 
                                href="https://github.com/emeraldsingers/UtauV/releases" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <Github className="mr-2 h-5 w-5" />
                                View on GitHub
                            </a>
                        </Button>
                    </motion.div>
                    
                    <motion.div 
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Badge variant="outline" className="mr-2">v1.1.0.0</Badge>
                        <Badge variant="secondary" className="mr-2">Free & Open Source</Badge>
                    </motion.div>
                </div>
            </motion.header>

            <main className="flex-grow container mx-auto px-4 py-20 relative">
                <Tabs 
                    defaultValue="features" 
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="max-w-5xl mx-auto"
                >
                    <div className="flex justify-center mb-8">
                        <TabsList className="glass-morphism">
                            <TabsTrigger value="features" className="data-[state=active]:bg-primary/20">
                                <Layers className="h-4 w-4 mr-2" />
                                Features
                            </TabsTrigger>
                            <TabsTrigger value="showcase" className="data-[state=active]:bg-primary/20">
                                <Brush className="h-4 w-4 mr-2" />
                                Showcase
                            </TabsTrigger>
                            <TabsTrigger value="download" className="data-[state=active]:bg-primary/20">
                                <Download className="h-4 w-4 mr-2" />
                                Get Started
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    
                    <AnimatePresence mode="wait">
                        <TabsContent value="features" className="mt-0">
                            <motion.div
                                key="features"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="glass-morphism rounded-xl p-8 overflow-hidden">
                                    <motion.h2 
                                        className="text-3xl font-bold text-primary mb-6 text-center"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        Powerful Features
                                    </motion.h2>
                                    
                                    <motion.p 
                                        className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        UtauV Emerald Edition is packed with innovative features designed to enhance your music creation workflow
                                        and optimize the experience for our Emerald Project singers.
                                    </motion.p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {features.map((feature, index) => (
                                            <motion.div
                                                key={feature.title}
                                                variants={cardVariants}
                                                custom={index}
                                                initial="hidden"
                                                animate="visible"
                                                whileHover="hover"
                                                className="glass-morphism p-6 rounded-lg border border-primary/10 flex flex-col h-full"
                                            >
                                                <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                                                    {feature.icon}
                                                </div>
                                                <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
                                                <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>
                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>
                        
                        <TabsContent value="showcase" className="mt-0">
                            <motion.div
                                key="showcase"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="glass-morphism rounded-xl p-8 overflow-hidden">
                                    <motion.h2 
                                        className="text-3xl font-bold text-primary mb-6 text-center"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        Emerald Singers Showcase
                                    </motion.h2>
                                    
                                    <motion.p 
                                        className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        See our virtual singers in action with UtauV Emerald Edition's
                                        beautiful interface and powerful features.
                                    </motion.p>
                                    
                                    <motion.div 
                                        className="relative max-w-4xl mx-auto"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                    > 
                                        <div className="relative overflow-hidden rounded-xl mx-auto transition-opacity duration-300 shadow-2xl">
                                <img
                                    ref={imageRef}
                                    key={currentImagePath}
                                    src={currentImagePath}
                                                alt={`Emerald Singer - ${currentImageAuthor}`}
                                    className="w-full h-full object-contain"
                                    style={{ opacity: imageOpacity }}
                                />
                                            
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                                <div className="flex items-center justify-between text-white">
                                                    <div className="flex items-center">
                                                        <Brush className="w-5 h-5 mr-2" />
                                                        {currentImageAuthor}
                                                    </div>
                                                    <div className="text-xs">
                                                        {currentImageIndex + 1} / {images.length}
                                                    </div>
                                                </div>
                            </div>
                                </div>
                                        
                             {images.length > 1 && (
                                <>
                                                <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                                        <Button
                                            onClick={handlePrevImage}
                                                        size="icon"
                                                        variant="ghost"
                                                        className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
                                            aria-label="Previous Image"
                                        >
                                                        <ChevronLeft className="w-5 h-5" />
                                        </Button>
                                    </div>
                                                <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                                        <Button
                                            onClick={handleNextImage}
                                                        size="icon"
                                                        variant="ghost"
                                                        className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
                                            aria-label="Next Image"
                                        >
                                                        <ChevronRight className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                                    
                                    <motion.div 
                                        className="mt-8 grid grid-cols-4 gap-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {images.map((image, idx) => (
                                            <motion.div
                                                key={image}
                                                className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                                                    idx === currentImageIndex 
                                                    ? 'border-primary' 
                                                    : 'border-transparent hover:border-primary/50'
                                                }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setImageOpacity(0);
                                                    setTimeout(() => {
                                                        setCurrentImageIndex(idx);
                                                        setImageOpacity(1);
                                                    }, 300);
                                                }}
                                            >
                                                <img 
                                                    src={image} 
                                                    alt={authors[image]} 
                                                    className="w-full h-full object-cover aspect-video"
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </TabsContent>
                        
                        <TabsContent value="download" className="mt-0">
                            <motion.div
                                key="download"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="glass-morphism rounded-xl p-8 overflow-hidden">
                                    <motion.h2 
                                        className="text-3xl font-bold text-primary mb-6 text-center"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        Get Started with UtauV
                                    </motion.h2>
                                    
                                    <motion.p 
                                        className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Download UtauV Emerald Edition and explore the additional resources
                                        to help you get the most out of your virtual singing experience.
                                    </motion.p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                        <motion.div
                                            className="flex flex-col items-center text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                                <Download className="h-8 w-8 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-semibold text-primary mb-4">Downloads</h3>
                                            <p className="text-muted-foreground mb-6">Get UtauV Emerald Edition for your operating system</p>
                                            
                                            <div className="space-y-4 w-full">
                                                <Button variant="default" size="lg" className="w-full" asChild>
                                                    <a 
                                                        href="https://github.com/emeraldsingers/UtauV/releases/download/v1.1.0.0/UtauV.1.1.0.0.1.Installer.exe" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
                                                        Windows Installer
                                                    </a>
                                                </Button>
                                                
                                                <Button variant="outline" size="lg" className="w-full" asChild>
                                                    <a 
                                                        href="https://github.com/emeraldsingers/UtauV/releases" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
                                                        Other Platforms
                                                    </a>
                                                </Button>
                                                
                                                <Button variant="ghost" size="lg" className="w-full" asChild>
                                                    <a 
                                                        href="https://github.com/emeraldsingers/UtauV" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
                                                        Source Code
                                                    </a>
                                                </Button>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div
                                            className="flex flex-col items-center text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                                <Book className="h-8 w-8 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-semibold text-primary mb-4">Resources</h3>
                                            <p className="text-muted-foreground mb-6">Helpful guides and additional tools</p>
                                            
                                            <div className="space-y-4 w-full">
                                                <Button variant="default" size="lg" className="w-full" asChild>
                                                    <a 
                                                        href={googleDocTutorialLink} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
                                                        User Guide
                                                    </a>
                                                </Button>
                                                
                                                <Button variant="outline" size="lg" className="w-full" asChild>
                                                    <a 
                                                        href={megaModelsLink}
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
                                                        AutoPitch Models
                                                    </a>
                                                </Button>
                                                
                                                <Button variant="ghost" size="lg" className="w-full" asChild>
                                                    <Link to="/singers">
                                                        Emerald Singers
                                                    </Link>
                                                </Button>
                                            </div>
                                        </motion.div>
                                    </div>
                                    
                                    <motion.div 
                                        className="text-center mb-8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <h3 className="text-xl font-semibold text-primary mb-2">Installation Steps</h3>
                                        <p className="text-muted-foreground mb-4">Getting started is easy with UtauV Emerald Edition</p>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="max-w-3xl mx-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <div className="glass-morphism rounded-lg p-6">
                                            <ol className="space-y-4 relative border-l border-primary/30 pl-8 ml-4">
                                                {[
                                                    "Download UtauV Emerald Edition for your operating system",
                                                    "Run the installer or extract the files to your preferred location",
                                                    "Launch UtauV Emerald Edition",
                                                    "Download any Emerald singer from our singers page",
                                                    "Drag and drop the singer's .zip file into the UtauV window",
                                                    "Start creating amazing music with your new virtual singer!"
                                                ].map((step, index) => (
                                                    <motion.li 
                                                        key={index}
                                                        className="relative"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.8 + (index * 0.1) }}
                                                    >
                                                        <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full border border-primary bg-primary/20 flex items-center justify-center">
                                                            <span className="text-xs text-primary">{index + 1}</span>
                                                        </div>
                                                        <p className="text-muted-foreground">{step}</p>
                                                    </motion.li>
                                                ))}
                                            </ol>
                                        </div>
                                    </motion.div>
                                </div>
                </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUtauV;
