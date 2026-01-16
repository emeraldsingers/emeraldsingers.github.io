import Footer from "@/components/Footer";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Helmet } from 'react-helmet-async';
import { Users, HelpCircle, FileText, Origami, BriefcaseBusiness, Brush, ArrowRight, TableOfContents, Sparkles, Mic2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";

interface LatestWork {
    youtubeVideoId: string;
    image: string;
    title: string;
    description: string;
}

const FeatureCard = ({ 
    icon: Icon, 
    title, 
    description, 
    linkText, 
    linkTo, 
    theme 
}: { 
    icon: any, 
    title: string, 
    description: string, 
    linkText: string, 
    linkTo: string,
    theme: string
}) => {
    return (
        <Link to={linkTo} className="block group">
            <motion.div
                className={`relative overflow-hidden flex flex-col p-6 md:p-8 rounded-3xl transition-all duration-300 h-full border ${
                    theme === 'dark' 
                        ? 'bg-[#071312]/70 border-emerald-500/20 hover:border-emerald-400/50' 
                        : 'bg-white/80 border-emerald-200/70 hover:border-emerald-400/60'
                } backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_80px_rgba(16,185,129,0.2)]`}
                whileHover={{ y: -6 }}
            >
                <div className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    theme === 'dark'
                        ? 'bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-400/5'
                        : 'bg-gradient-to-br from-emerald-100 via-transparent to-emerald-50'
                }`} />
                <div className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-300/40'
                }`} />
                <div className="relative z-10 flex h-full flex-col">
                    <div className={`rounded-2xl p-3 w-fit mb-6 border shadow-[0_10px_30px_rgba(16,185,129,0.15)] ${
                        theme === 'dark' 
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                        <Icon className="h-8 w-8" />
                    </div>
                    <h3 className={`font-display text-2xl md:text-3xl font-semibold mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        {title}
                    </h3>
                    <p className={`mb-6 flex-grow ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        {description}
                    </p>
                    <div className={`mt-auto flex items-center font-medium ${
                        theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'
                    } group-hover:translate-x-1 transition-transform duration-300`}>
                        {linkText} <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const ProjectCard = ({
    work,
    theme
}: {
    work: LatestWork,
    theme: string
}) => {
    return (
        <motion.div 
            className={`group relative overflow-hidden rounded-3xl border ${
                theme === 'dark' 
                    ? 'bg-[#071312]/70 border-emerald-500/15' 
                    : 'bg-white/85 border-emerald-200/70'
            } shadow-[0_20px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl`}
            whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
        >
            <div className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                theme === 'dark'
                    ? 'bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-400/5'
                    : 'bg-gradient-to-br from-emerald-100 via-transparent to-emerald-50'
            }`} />
            <a
                href={`https://www.youtube.com/watch?v=${work.youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 block"
            >
                <div className="relative w-full aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
                    <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="bg-black/60 text-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play">
                                <polygon points="5 3 19 12 5 21 5 3"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div className="p-5">
                    <h3 className={`font-display text-xl font-semibold group-hover:text-emerald-500 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        {work.title}
                    </h3>
                    <p className={`mt-2 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        {work.description}
                    </p>
                </div>
            </a>
        </motion.div>
    );
};

const SectionTitle = ({ title, theme }: { title: string, theme: string }) => {
    return (
        <div className="text-center mb-12">
            <h2 className={`font-display text-3xl md:text-4xl font-semibold tracking-tight ${
                theme === 'dark' ? 'text-emerald-200' : 'text-emerald-800'
            }`}>
                {title}
            </h2>
            <div className={`mx-auto mt-4 h-[3px] w-20 rounded-full ${
                theme === 'dark' ? 'bg-emerald-400/70' : 'bg-emerald-600/70'
            }`} />
        </div>
    );
};

const Index = () => {
    const [latestWorks, setLatestWorks] = useState<LatestWork[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const { scrollY } = useScroll();
    const heroRef = useRef<HTMLDivElement>(null);
    
    const y = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const fetchLatestWorks = async () => {
            try {
                const response = await fetch("/latestWorks.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: LatestWork[] = await response.json();
                setLatestWorks(data);
            } catch (error) {
                console.error("Failed to fetch latest works:", error);
            }
        };

        fetchLatestWorks();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    const scrollAppearVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                delay: 0.4,
                duration: 0.5,
                ease: "easeOut" 
            }
        }
      };

    const pageTitle = "Emerald Project - Home Of Virtual Singers";
    const pageDescription = "Welcome to the Emerald Project, your home for discovering unique virtual singers. Browse our collection, listen to demos, and find voicebanks for your creative projects.";
    const canonicalUrl = "https://emeraldsingers.github.io/#/";

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Emerald Project",
        "url": "https://emeraldsingers.github.io/#/",
        "logo": "https://emeraldsingers.github.io/images/favicon.png",
        "description": pageDescription,
        "member": latestWorks.map(work => ({
            "@type": "MusicRecording",
            "name": work.title,
            "url": `https://www.youtube.com/watch?v=${work.youtubeVideoId}`,
            "thumbnailUrl": `https://emeraldsingers.github.io${work.image}`
        }))
    };

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={canonicalUrl} />
                <script type="application/ld+json">
                    {JSON.stringify(organizationJsonLd)}
                </script>
            </Helmet>
            
            <AnimatedBackground theme={theme} />
            
            <div
                className="min-h-screen flex flex-col overflow-hidden"
                ref={containerRef}
            >
                <FloatingElements theme={theme} />
                
                <StarryBackground theme={theme} />
                
                <div className="relative" ref={heroRef}>
                    <main className="container mx-auto px-4 py-8 md:py-16 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                                    className="py-8 md:py-16 text-center"
                                    style={{ y, opacity }}
                                >
                                
                                <motion.div 
                                    variants={itemVariants}
                                    className="inline-block mb-4"
                                >
                                    <span className={`inline-flex items-center px-3 py-1 text-sm rounded-full ${
                                        theme === 'dark' 
                                            ? 'bg-emerald-500/10 text-emerald-400' 
                                            : 'bg-emerald-100 text-emerald-700'
                                    } font-medium`}>
                                        <Sparkles className="w-4 h-4 mr-1" />
                                        Virtual Singer Collection
                                    </span>
                                </motion.div>
                                
                                
                            <motion.h1 
                                variants={itemVariants}
                                    className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight ${
                                        theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                                    }`}
                            >
                                    Emerald Project
                            </motion.h1>
                            
                            <motion.p 
                                variants={itemVariants}
                                    className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}
                            >
                                    Discover our collection of virtual singers and bring your creative projects to life.
                            </motion.p>
                            
                            <motion.div 
                                variants={itemVariants}
                                    className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12"
                            >
                                <Button
                                        size="lg"
                                        className={`${
                                            theme === 'dark'
                                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                        } shadow-lg shadow-emerald-600/20 transition-all duration-300 transform hover:scale-105 rounded-full w-full sm:w-auto px-8 py-6`}
                                    asChild
                                >
                                        <Link to="/singers" className="flex items-center justify-center">
                                            <Users className="mr-2 h-5 w-5" /> Browse Singers
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                        size="lg"
                                        className={`${
                                            theme === 'dark'
                                                ? 'border-emerald-700 text-emerald-400 hover:bg-emerald-950'
                                                : 'border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                                        } shadow-lg transition-all duration-300 transform hover:scale-105 rounded-full w-full sm:w-auto px-8 py-6`}
                                    asChild
                                >
                                        <Link to="/how-to" className="flex items-center justify-center">
                                            <HelpCircle className="mr-2 h-5 w-5" /> How To Use
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={scrollAppearVariants}
                                className="mb-16 md:mb-24 relative z-10"
                        >
                            <InfiniteScroll />
                        </motion.div>
                    </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                                className="flex justify-center mt-8 mb-16 md:mb-24 relative z-10"
                        >
                            <Button
                                    size="lg"
                                    className={`${
                                        theme === 'dark'
                                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    } transition-all duration-300 transform hover:scale-[1.02] rounded-full px-8 py-6`}
                                asChild
                            >
                                <Link to="/singers" className="flex items-center gap-2">
                                    View All Singers
                                        <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                        </motion.div>
                    </main>
                </div>

                <div className="container mx-auto px-4 py-12 md:py-20 relative">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                            className="mb-16 md:mb-24"
                        >
                            <motion.div variants={itemVariants}>
                                <SectionTitle title="Resources & Information" theme={theme} />
                            </motion.div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                <motion.div variants={cardVariants}>
                                    <FeatureCard 
                                        icon={FileText} 
                                        title="Terms of Use" 
                                        description="Guidelines and policies for using our virtual singers in your creative projects."
                                        linkText="Read More"
                                        linkTo="/terms"
                                        theme={theme}
                                    />
                                </motion.div>
                                
                                <motion.div variants={cardVariants}>
                                    <FeatureCard 
                                        icon={BriefcaseBusiness} 
                                        title="About Us" 
                                        description="Learn about the team and mission behind the Emerald Project."
                                        linkText="Read More"
                                        linkTo="/about-us"
                                        theme={theme}
                                    />
                                </motion.div>
                                
                                <motion.div variants={cardVariants}>
                                    <FeatureCard 
                                        icon={Origami} 
                                        title="About UtauV" 
                                        description="Explore the technology behind UTAU and voice synthesis."
                                        linkText="Read More"
                                        linkTo="/about-utauv"
                                        theme={theme}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                            className="mb-16 md:mb-24"
                        >
                            <motion.div variants={itemVariants}>
                                <SectionTitle title="Community" theme={theme} />
                            </motion.div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                                <motion.div variants={cardVariants}>
                                    <FeatureCard 
                                        icon={Brush} 
                                        title="Community Works" 
                                        description="Discover amazing creations from our talented community members."
                                        linkText="Explore"
                                        linkTo="/gallery"
                                        theme={theme}
                                    />
                                </motion.div>
                                
                                <motion.div variants={cardVariants}>
                                    <FeatureCard 
                                        icon={TableOfContents} 
                                        title="FAQ" 
                                        description="Frequently Asked Questions about virtual singers and the Emerald Project."
                                        linkText="View FAQ Page"
                                        linkTo="/faq"
                                        theme={theme}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {latestWorks.length > 0 && (
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={containerVariants}
                                className="mb-16 md:mb-24"
                            >
                                <motion.div variants={itemVariants}>
                                    <SectionTitle title="Latest Works" theme={theme} />
                                </motion.div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                        {latestWorks.map((work, index) => (
                                        <motion.div key={index} variants={cardVariants}>
                                            <ProjectCard work={work} theme={theme} />
                                            </motion.div>
                                        ))}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
                
                <Footer />
            </div>
        </>
    );
}; 

export default Index;
