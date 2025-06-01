import React, { useState, useRef, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import {
    ChevronDown,
    Loader2,
    X,
    Plus,
    Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";

interface FaqItem {
    question: string;
    answer: React.ReactNode;
    category: "general" | "utauv" | "singers" | "other";
    id: string;
}

interface MediaViewerProps {
    type: "image" | "video" | null;
    src: string;
    alt?: string;
}

interface FaqPageProps {
    initialFaqs?: FaqItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const accordionVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] } 
  },
  open: {
    opacity: 1,
    height: "auto",
    marginTop: "0.5rem", 
    transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
  }
};

const Faq = ({ initialFaqs = [] }: FaqPageProps) => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<FaqItem["category"]>("general");
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mediaViewer, setMediaViewer] = useState<MediaViewerProps>({ type: null, src: "" });
    const [zoomLevel, setZoomLevel] = useState(1);
    const viewerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    
    const baseDark = '#051F20';
    const baseLight = '#0B2B26';
    const wispColor = 'rgba(145, 184, 157, 0.08)';
    const wispColorSlightlyStronger = 'rgba(145, 184, 157, 0.12)';
    
    const faqData: FaqItem[] = [
        {
            id: "gen1",
            question: "What is the Emerald Project?",
            answer: (
                <>
                    <p>Emerald Project is a team that develops singers on the UTAU engine! </p>
                    <p>We are focused on creating high-quality voicebanks and tools.</p>
                </>
            ),
            category: "general",
        },
        {
            id: "gen2",
            question: "How can I get involved?",
            answer: (
                <>
                    <p>We are not currently looking for new members to join our team.</p>
                    <p>Stay tuned to our Telegram channel for more news.</p>
                </>
            ),
            category: "general",
        },

        {
            id: "utauv2",
            question: "What is UtauV Emerald Edition?",
            answer: (
                <>
                    <p>UtauV Emerald Edition is a fork of OpenUtau, specifically optimized for our Emerald Singers.</p>
                    <img
                        src="/images/UtauV.webp"
                        alt="UtauV Interface"
                        className="my-4 rounded-lg cursor-pointer"
                        onClick={() => setMediaViewer({ type: "image", src: "/images/UtauV.webp", alt: "UtauV Interface" })}
                    />
                    <p>It features a unique visual style and an enhanced CVVC phonemizer.</p>
                </>
            ),
            category: "utauv",
        },
        {
            id: "utauv3",
            question: "How to install Emerald Singer?",
            answer: (
                <>
                    <p>Just drag'n'drop zip file with singer into OpenUtau window.</p>
                </>
            ),
            category: "utauv",
        },
        {
            id: "utauv4",
            question: "How to install and use autopitch in UtauV?",
            answer: (
                <>
                    <p>Read the tutorial on the "About UtauV" page or view the Google Docs spreadsheet below.</p>
                    <p> </p>
                    <a
                        href="https://docs.google.com/document/d/1Eb43g7Tc616YRtyfLEqrwGKLS5af238-KsGQoY06oBs/edit?usp=sharing"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline" 
                    >
                        Click here to view the tutorial!
                    </a>
                </>
            ),
            category: "utauv",
        },

        {
            id: "singers2",
            question: "Can I use the Emerald Singers commercially?",
            answer:
                <>
                    <p>No. Contact us to emeraldprojectutau@gmail.com</p>
                </>,
            category: "singers",
        },
    ];

    const toggleAccordion = useCallback((id: string) => {
        setExpandedItems((prevExpanded) =>
            prevExpanded.includes(id)
                ? prevExpanded.filter((itemId) => itemId !== id)
                : [...prevExpanded, id]
        );
    }, []);

    const closeMediaViewer = useCallback(() => {
        setMediaViewer({ type: null, src: "" });
        setZoomLevel(1);
    }, []);


    const handleOutsideClick = useCallback((event: React.MouseEvent) => {
        if (viewerRef.current && !viewerRef.current.contains(event.target as Node)) {
            closeMediaViewer();
        }
    }, [closeMediaViewer]);

    const handleZoom = useCallback((direction: "in" | "out") => {
        setZoomLevel(prevZoom => {
            const newZoom = direction === "in" ? prevZoom * 1.2 : prevZoom / 1.2;
            return Math.max(1, Math.min(newZoom, 5));
        });
    }, []);

    useEffect(() => {
        if (imageRef.current && mediaViewer.type === "image") {
            imageRef.current.style.transform = `scale(${zoomLevel})`;
        }
    }, [zoomLevel, mediaViewer.type]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);


    const filteredFaqData = faqData.filter((item) => item.category === activeCategory);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div
            className="min-h-screen flex flex-col overflow-hidden"
            ref={containerRef}
        >
            <Helmet>
                <title>FAQ - Emerald Singers</title>
                <meta name="description" content="Frequently asked questions about the Emerald Project, UtauV, and Emerald Singers. Find answers about installation, usage, and licensing." />
                <link rel="canonical" href="https://emeraldsingers.github.io/faq" />
            </Helmet>
            
            {/* Add the background components */}
            <AnimatedBackground theme={theme} />
            <FloatingElements theme={theme} />
            <StarryBackground theme={theme} />
            
            <Navigation />
            
            <main className="flex-grow container mx-auto px-4 py-20 relative">
                <motion.div 
                    className="max-w-5xl mx-auto glass-morphism rounded-xl p-8 overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="text-4xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</motion.h1>

                    <motion.div variants={itemVariants} className="flex justify-center space-x-4 mb-8">
                        <Button
                            variant={activeCategory === "general" ? "default" : "outline"}
                            onClick={() => setActiveCategory("general")}
                            className="button-glass-gradient"
                        >
                            General
                        </Button>
                        <Button
                            variant={activeCategory === "utauv" ? "default" : "outline"}
                            onClick={() => setActiveCategory("utauv")}
                            className="button-glass-gradient"
                        >
                            UtauV
                        </Button>
                        <Button
                            variant={activeCategory === "singers" ? "default" : "outline"}
                            onClick={() => setActiveCategory("singers")}
                            className="button-glass-gradient"
                        >
                            Singers
                        </Button>

                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4">
                        {filteredFaqData.map((item) => (
                            <div key={item.id} className="border border-primary/20 rounded-lg p-4 glass-morphism overflow-hidden">
                                <button
                                    className="flex items-center justify-between w-full text-left"
                                    onClick={() => toggleAccordion(item.id)}
                                    aria-expanded={expandedItems.includes(item.id)}
                                    aria-controls={`faq-content-${item.id}`}
                                >
                                    <span className="text-xl font-semibold text-primary">{item.question}</span>
                                    <motion.div animate={{ rotate: expandedItems.includes(item.id) ? 180 : 0 }}>
                                        <ChevronDown className={`w-6 h-6 text-primary transition-transform`} />
                                    </motion.div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {expandedItems.includes(item.id) && (
                                        <motion.div
                                            id={`faq-content-${item.id}`}
                                            key="content"
                                            variants={accordionVariants}
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div className="pt-2 text-muted-foreground">{item.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>

            {mediaViewer.type && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                    onClick={handleOutsideClick} 
                >
                    <div
                        ref={viewerRef}
                        className="relative bg-black rounded-lg max-w-full max-h-full overflow-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full"
                            onClick={closeMediaViewer}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        {mediaViewer.type === "image" && (
                            <>
                                <div className="absolute top-2 left-2 space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white hover:bg-white/20 rounded-full"
                                        onClick={() => handleZoom("in")}
                                    >
                                        <Plus className="h-6 w-6" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white hover:bg-white/20 rounded-full"
                                        onClick={() => handleZoom("out")}
                                    >
                                        <Minus className="h-6 w-6" />
                                    </Button>
                                </div>

                                <img
                                    ref={imageRef}
                                    src={mediaViewer.src}
                                    alt={mediaViewer.alt || "Image"}
                                    className="max-h-[90vh] max-w-[90vw] object-contain cursor-zoom-in"
                                    style={{ transition: 'transform 0.2s ease' }}
                                />
                            </>

                        )}
                        {mediaViewer.type === "video" && (
                            <video controls className="max-h-[90vh] max-w-[90vw]" autoPlay>
                                <source src={mediaViewer.src} type="video/mp4" />
                                Your browser does not support the video element.
                            </video>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Faq;
