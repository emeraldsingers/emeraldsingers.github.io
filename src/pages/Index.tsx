import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Users, HelpCircle, FileText, Origami, BriefcaseBusiness, Brush, ArrowRight, TableOfContents } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LatestWork {
    youtubeVideoId: string;
    image: string;
    title: string;
    description: string;
}

const Index = () => {
    const [latestWorks, setLatestWorks] = useState<LatestWork[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    
    const baseDark = '#051F20';
    const baseLight = '#0B2B26';
    const wispColor = 'rgba(145, 184, 157, 0.08)';
    const wispColorSlightlyStronger = 'rgba(145, 184, 157, 0.12)';

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

   const gridJustifyClass = latestWorks.length < 3 ? 'justify-items-start md:justify-items-center' : 'justify-items-center';

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
    
    const getBackgroundStyle = () => {
        if (theme === "light") {
          return `linear-gradient(to top right, #e0f2e0, #ffffff)`;
        } else {
            return `
                /* Wispy Overlay 3 */
                linear-gradient(130deg, transparent 30%, ${wispColor} 50%, transparent 70%),
                /* Wispy Overlay 2 */
                linear-gradient(-50deg, transparent 40%, ${wispColorSlightlyStronger} 55%, transparent 70%),
                /* Wispy Overlay 1 */
                linear-gradient(110deg, transparent 35%, ${wispColor} 50%, transparent 65%),
                /* Base Subtle Gradient */
                linear-gradient(to top right, ${baseDark}, ${baseLight})
            `;
        }
      };

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
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="py-16"
                >
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl font-bold text-primary text-center mb-4"
                    >
                        Welcome to Emerald Project
                    </motion.h1>
                    
                    <motion.p 
                        variants={itemVariants}
                        className="text-xl text-muted-foreground text-center mb-10"
                    >
                        Discover our collection of virtual singers
                    </motion.p>
                    
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-6 mb-12"
                    >
                        <Button
                            variant="default"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-300 transform hover:scale-105"
                            asChild
                        >
                            <Link to="/singers">
                                <Users className="mr-2" /> Browse Singers
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/10 shadow-md transition-all duration-300 transform hover:scale-105"
                            asChild
                        >
                            <Link to="/how-to">
                                <HelpCircle className="mr-2" /> How To Use
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={scrollAppearVariants}
                >
                    <InfiniteScroll />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center mt-4 mb-16"
                >
                    <Button
                        variant="default"
                        className="bg-primary hover:bg-primary/10 shadow-md transition-all duration-300 transform hover:scale-105"
                        asChild
                    >
                        <Link to="/singers" className="flex items-center gap-2">
                            View All Singers
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </motion.div>

                {/* Featured Cards Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
                >
                    <Link to="/terms" className="block">
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer h-full"
                        >
                            <FileText className="h-10 w-10 mb-4 text-primary" />
                            <h3 className="text-2xl font-semibold text-primary mb-3">Terms of Use</h3>
                            <p className="text-muted-foreground mb-6">Guidelines and policies for using our virtual singers in your creative projects.</p>
                            <Button 
                                variant="ghost" 
                                className="text-primary hover:bg-primary/10 mt-auto"
                            >
                                Read More
                            </Button>
                        </motion.div>
                    </Link>

                    <Link to="/about-us" className="block">
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer h-full"
                        >
                            <BriefcaseBusiness className="h-10 w-10 mb-4 text-primary" />
                            <h3 className="text-2xl font-semibold text-primary mb-3">About Us</h3>
                            <p className="text-muted-foreground mb-6">Learn about the team and mission behind the Emerald Project.</p>
                            <Button 
                                variant="ghost" 
                                className="text-primary hover:bg-primary/10 mt-auto"
                            >
                                Read More
                            </Button>
                        </motion.div>
                    </Link>

                    <Link to="/about-utauv" className="block">
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer h-full"
                        >
                            <Origami className="h-10 w-10 mb-4 text-primary" />
                            <h3 className="text-2xl font-semibold text-primary mb-3">About UtauV</h3>
                            <p className="text-muted-foreground mb-6">Explore the technology behind UTAU and voice synthesis.</p>
                            <Button 
                                variant="ghost" 
                                className="text-primary hover:bg-primary/10 mt-auto"
                            >
                                Read More
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Community Content Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
                >
                    <Link to="/gallery" className="block">
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer h-full"
                        >
                            <Brush className="h-10 w-10 mb-4 text-primary" />
                            <h3 className="text-2xl font-semibold text-primary mb-3">Community Works</h3>
                            <p className="text-muted-foreground mb-6">Discover amazing creations from our talented community members.</p>
                            <Button 
                                variant="ghost" 
                                className="text-primary hover:bg-primary/10 mt-auto"
                            >
                                Explore
                            </Button>
                        </motion.div>
                    </Link>

                    <Link to="/faq" className="block">
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer h-full"
                        >
                            <TableOfContents className="h-10 w-10 mb-4 text-primary" />
                            <h3 className="text-2xl font-semibold text-primary mb-3">FAQ</h3>
                            <p className="text-muted-foreground mb-6">Frequently Asked Questions</p>
                            <Button 
                                variant="ghost" 
                                className="text-primary hover:bg-primary/10 mt-auto"
                            >
                                View FAQ Page
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Latest Works Section */} 
                {latestWorks.length > 0 && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="mt-12 mb-24"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold text-primary mb-6 text-center"
                        >
                            Latest works
                        </motion.h2>
                        <div className="flex justify-center">
                            <div className={`grid grid-cols-1 ${latestWorks.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8 max-w-5xl mx-auto`}>
                                {latestWorks.map((work, index) => (
                                    <motion.div 
                                        key={index}
                                        variants={cardVariants}
                                        className="p-4 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors max-w-[20rem] w-full mx-auto"
                                    >
                                        <a
                                            href={`https://www.youtube.com/watch?v=${work.youtubeVideoId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block transform transition-transform hover:scale-105"
                                        >
                                            <div className="mb-4 relative w-full h-[12rem] overflow-hidden rounded-xl">
                                                <img
                                                    src={work.image}
                                                    alt={work.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                                <h3 className="text-xl font-semibold text-primary text-center">{work.title}</h3>
                                        </a>
                                        <p className="text-muted-foreground text-center mt-2">{work.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>
            <Footer />
        </div>
    );
}; 

export default Index;