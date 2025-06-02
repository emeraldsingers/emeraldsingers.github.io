import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import {
    ChevronDown,
    Loader2,
    X,
    Plus,
    Minus,
    HelpCircle,
    Settings,
    Music,
    Search,
    Info,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";
import { Input } from "@/components/ui/input";

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

// Оптимизированные варианты анимаций для мобильных устройств
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const mobileContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 }
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

const mobileItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.15 }
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

// Предварительно загруженное содержимое для мобильных устройств
const mobileAccordionVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.15, ease: [0.4, 0.0, 0.2, 1] } 
  },
  open: {
    opacity: 1,
    height: "auto",
    marginTop: "0.5rem", 
    transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }
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
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
    
    const faqData: FaqItem[] = [
        {
            id: "gen1",
            question: "What is the Emerald Project?",
            answer: (
                <>
                    <p className="mb-2">Emerald Project is a team that develops singers on the UTAU engine!</p>
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
                    <p className="mb-2">We are not currently looking for new members to join our team.</p>
                    <p>Stay tuned to our Telegram channel for more news.</p>
                </>
            ),
            category: "general",
        },
        {
            id: "gen3",
            question: "How can I contact the team?",
            answer: (
                <>
                    <p className="mb-2">You can reach us at emeraldprojectutau@gmail.com or through our Telegram channel.</p>
                    <p>For more details, check the Connect section on our About Us page.</p>
                </>
            ),
            category: "general",
        },
        {
            id: "utauv1",
            question: "What is UtauV Emerald Edition?",
            answer: (
                <>
                    <p className="mb-4">UtauV Emerald Edition is a fork of OpenUtau, specifically optimized for our Emerald Singers.</p>
                    <div className="relative rounded-lg overflow-hidden mb-4">
                        <img
                            src="/images/UtauV.webp"
                            alt="UtauV Interface"
                            className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setMediaViewer({ type: "image", src: "/images/UtauV.webp", alt: "UtauV Interface" })}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                            <p className="text-white text-xs">Click to enlarge</p>
                        </div>
                    </div>
                </>
            ),
            category: "utauv",
        },
        {
            id: "utauv2",
            question: "Is UtauV compatible with other UTAU voices?",
            answer: (
                <>
                    <p className="mb-2">Yes, UtauV is compatible with all standard UTAU voicebanks.</p>
                </>
            ),
            category: "utauv",
        },
        {
            id: "utauv3",
            question: "How to install Emerald Singers?",
            answer: (
                <>
                    <p className="mb-2">Just drag and drop the zip file with the singer into the OpenUtau or UtauV window.</p>
                    <p>The software will automatically extract and install the voicebank for you.</p>
                </>
            ),
            category: "utauv",
        },
        {
            id: "utauv4",
            question: "How to install and use autopitch in UtauV?",
            answer: (
                <>
                    <p className="mb-3">Read the tutorial on the "About UtauV" page or view the Google Docs spreadsheet below.</p>
                    <div className="flex items-center">
                        <a
                            href="https://docs.google.com/document/d/1Eb43g7Tc616YRtyfLEqrwGKLS5af238-KsGQoY06oBs/edit?usp=sharing"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-primary hover:text-primary/80 transition-colors" 
                        >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View the tutorial
                        </a>
                    </div>
                </>
            ),
            category: "utauv",
        },
        {
            id: "utauv5",
            question: "Is UtauV available for Mac or Linux?",
            answer: (
                <>
                    <p>Currently, UtauV Emerald Edition is only available for Windows. We don't have immediate plans for Mac or Linux versions.</p>
                </>
            ),
            category: "utauv",
        },
        {
            id: "singers1",
            question: "Are the Emerald Singers free to use?",
            answer: (
                <>
                    <p>Yes, all Emerald Singers are free to use for non-commercial purposes.</p>
                </>
            ),
            category: "singers",
        },
        {
            id: "singers2",
            question: "Can I use the Emerald Singers commercially?",
            answer: (
                <>
                    <p className="mb-2">No, our singers are not available for commercial use.</p>
                    <p>For commercial inquiries, please contact us at emeraldprojectutau@gmail.com.</p>
                </>
            ),
            category: "singers",
        },
        {
            id: "singers3",
            question: "What languages do the Emerald Singers support?",
            answer: (
                <>
                    <p>Most of our singers support Japanese. Some voicebanks may have additional language support.</p>
                </>
            ),
            category: "singers",
        },
        {
            id: "singers4",
            question: "Where can I download Emerald Singers?",
            answer: (
                <>
                    <p className="mb-2">You can download all Emerald Singers from our Singers page.</p>
                    <p>Each singer has their own dedicated page with download links and usage information.</p>
                </>
            ),
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

    // Определяем, является ли устройство мобильным
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Предварительно вычисляем отфильтрованные данные для улучшения производительности
    const filteredFaqData = useMemo(() => {
        return faqData.filter((item) => {
            // Filter by category
            const categoryMatch = item.category === activeCategory;
            
            // Filter by search query if one exists
            if (!searchQuery) return categoryMatch;
            
            const questionMatch = item.question.toLowerCase().includes(searchQuery.toLowerCase());
            const answerMatch = typeof item.answer === 'string' 
                ? item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                : React.Children.toArray(item.answer).some(child => 
                    typeof child === 'string' && child.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    React.isValidElement(child) && typeof child.props.children === 'string' && 
                    child.props.children.toLowerCase().includes(searchQuery.toLowerCase())
                );
                
            return categoryMatch && (questionMatch || answerMatch);
        });
    }, [activeCategory, searchQuery]);

    // Оптимизированная функция для получения иконки категории
    const getCategoryIcon = useCallback((category: FaqItem["category"]) => {
        switch (category) {
            case "general":
                return <Info className="h-4 w-4 mr-2" />;
            case "utauv":
                return <Settings className="h-4 w-4 mr-2" />;
            case "singers":
                return <Music className="h-4 w-4 mr-2" />;
            default:
                return <HelpCircle className="h-4 w-4 mr-2" />;
        }
    }, []);

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
                <link rel="canonical" href="https://emeraldsingers.github.io/#/faq" />
            </Helmet>
            
            <AnimatedBackground theme={theme} />
            <FloatingElements theme={theme} />
            <StarryBackground theme={theme} />
            
            <Navigation />
            
            {/* Hero Section */}
            <motion.header 
                className="relative h-[35vh] flex items-center justify-center overflow-hidden pt-8"
                style={{ opacity: headerOpacity, y: headerY }}
            >
                <div className="container relative z-10 text-center">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                        className={`inline-flex items-center justify-center p-4 rounded-full mb-6 mt-3 ${
                            theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
                        }`}
                    >
                        <HelpCircle className="h-8 w-8 text-primary" />
                    </motion.div>
                    
                    <motion.h1 
                        className="text-5xl md:text-6xl font-bold mb-4 text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Frequently Asked <span className="text-emerald-500">Questions</span>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        Find answers to common questions about Emerald Project
                    </motion.p>
                </div>
            </motion.header>
            <main className="container mx-auto px-4 py-10 relative z-10">
                <motion.div 
                    className="max-w-5xl mx-auto glass-morphism rounded-xl p-4 sm:p-8 overflow-hidden"
                    variants={isMobile ? mobileContainerVariants : containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div 
                        variants={isMobile ? mobileItemVariants : itemVariants} 
                        className="flex flex-col md:flex-row justify-between mb-6 gap-4"
                    >
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <Button
                                variant={activeCategory === "general" ? "default" : "outline"}
                                onClick={() => setActiveCategory("general")}
                                className={`button-glass-gradient ${activeCategory === "general" ? 'bg-primary/20' : ''}`}
                            >
                                <Info className="h-4 w-4 mr-2" />
                                General
                            </Button>
                            <Button
                                variant={activeCategory === "utauv" ? "default" : "outline"}
                                onClick={() => setActiveCategory("utauv")}
                                className={`button-glass-gradient ${activeCategory === "utauv" ? 'bg-primary/20' : ''}`}
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                UtauV
                            </Button>
                            <Button
                                variant={activeCategory === "singers" ? "default" : "outline"}
                                onClick={() => setActiveCategory("singers")}
                                className={`button-glass-gradient ${activeCategory === "singers" ? 'bg-primary/20' : ''}`}
                            >
                                <Music className="h-4 w-4 mr-2" />
                                Singers
                            </Button>
                        </div>
                        
                        <div className="relative w-full md:w-64">
                            <Input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 glass-morphism border-primary/20"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </motion.div>

                    {filteredFaqData.length === 0 ? (
                        <motion.div 
                            variants={isMobile ? mobileItemVariants : itemVariants}
                            className="text-center py-8 text-muted-foreground"
                        >
                            <div className="flex justify-center mb-4">
                                <HelpCircle className="h-12 w-12 text-primary/50" />
                            </div>
                            <h3 className="text-lg font-medium text-primary mb-2">No questions found</h3>
                            <p>Try adjusting your search query or category</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            variants={isMobile ? mobileItemVariants : itemVariants} 
                            className="space-y-3"
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredFaqData.map((item, index) => {
                                const isExpanded = expandedItems.includes(item.id);
                                // Для мобильных устройств предварительно рендерим содержимое, но скрываем его
                                const shouldPrerender = isMobile && index < 5;
                                
                                return (
                                    <div 
                                        key={item.id} 
                                        className="border border-primary/20 rounded-lg p-3 sm:p-4 glass-morphism overflow-hidden"
                                    >
                                        <button
                                            className="flex items-center justify-between w-full text-left"
                                            onClick={() => toggleAccordion(item.id)}
                                            aria-expanded={isExpanded}
                                            aria-controls={`faq-content-${item.id}`}
                                        >
                                            <div className="flex items-center">
                                                {getCategoryIcon(item.category)}
                                                <span className="text-lg sm:text-xl font-semibold text-primary">{item.question}</span>
                                            </div>
                                            <motion.div 
                                                animate={{ 
                                                    rotate: isExpanded ? 180 : 0 
                                                }}
                                                transition={{ 
                                                    duration: isMobile ? 0.15 : 0.3, 
                                                    ease: "easeInOut" 
                                                }}
                                            >
                                                <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-primary`} />
                                            </motion.div>
                                        </button>
                                        
                                        {shouldPrerender ? (
                                            // Предварительно отрендеренный контент для первых 5 вопросов на мобильных
                                            <div 
                                                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                                                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <div className="pt-2 text-muted-foreground border-t border-primary/10 mt-3 sm:mt-4 text-sm sm:text-base">
                                                    {item.answer}
                                                </div>
                                            </div>
                                        ) : (
                                            // Обычная анимация для остальных вопросов
                                            <AnimatePresence initial={false}>
                                                {isExpanded && (
                                                    <motion.div
                                                        id={`faq-content-${item.id}`}
                                                        key="content"
                                                        variants={isMobile ? mobileAccordionVariants : accordionVariants}
                                                        initial="collapsed"
                                                        animate="open"
                                                        exit="collapsed"
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <div className="pt-2 text-muted-foreground border-t border-primary/10 mt-3 sm:mt-4 text-sm sm:text-base">
                                                            {item.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
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
