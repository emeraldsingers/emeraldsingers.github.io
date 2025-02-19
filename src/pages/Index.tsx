import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Users, HelpCircle, FileText, Origami, BriefcaseBusiness, Album} from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface LatestWork {
    youtubeVideoId: string;
    image: string;
    title: string;
    description: string;
}

const Index = () => {
    const [latestWorks, setLatestWorks] = useState<LatestWork[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

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
                <div className="glass-morphism rounded-xl p-8 mb-8">
                    <h1 className="text-5xl font-bold text-primary text-center mb-8">
                        Welcome to Emerald Project
                    </h1>
                    <p className="text-xl text-muted-foreground text-center mb-8">
                        Discover our collection of virtual singers
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/10 button-glass-gradient"
                            asChild
                        >
                            <Link to="/singers">
                                <Users className="mr-2" /> Browse Singers
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/10 button-glass-gradient"
                            asChild
                        >
                            <Link to="/how-to">
                                <HelpCircle className="mr-2" /> How To Use
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/10 button-glass-gradient"
                            asChild
                        >
                            <Link to="/terms">
                                <FileText className="mr-2" /> Terms of Use
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/10 button-glass-gradient"
                            asChild
                        >
                            <Link to="/about-utauv">
                                <Origami className="mr-2" /> About UtauV
                            </Link>
                        </Button>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 button-glass-gradient" asChild>
                        <Link to="/about-us">
                            <BriefcaseBusiness className="mr-1" /> About Us
                        </Link>
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 button-glass-gradient"  asChild>
                        <Link to="/lore">
                            <Album className="mr-1" /> Lore
                        </Link>
                    </Button>
                    </div>
                </div>
                <InfiniteScroll />

                <div className="flex justify-center mt-4 mb-8">
                    <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10 button-glass-gradient"
                        asChild
                    >
                        <Link to="/singers">
                            Discover All
                        </Link>
                    </Button>
                </div>

                {/* Latest Works Section */}
                {latestWorks.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Latest works</h2>
                         <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${gridJustifyClass}`}>
                            {latestWorks.map((work, index) => (
                                <div key={index} className="neo-blur p-4 rounded-xl max-w-[20rem] w-full hover:bg-primary/5 transition-colors">
                                     <a
                                         href={`https://www.youtube.com/watch?v=${work.youtubeVideoId}`}
                                         target="_blank"
                                         rel="noopener noreferrer"
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
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Index;