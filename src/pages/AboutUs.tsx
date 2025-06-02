import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";
import { 
  Users, 
  Rocket, 
  Code, 
  Music, 
  Heart, 
  ExternalLink, 
  Github, 
  Sparkles,
  Calendar,
  Headphones,
  Mic,
  MessageCircle,
  Youtube,
  Twitter,
  Terminal,
  Download,
  FileCode,
  Settings,
  Layers,
  Send,
  Video
} from "lucide-react";

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

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  hover: {
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
};

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  description: string;
  social?: {
    youtube?: string;
    twitter?: string;
    telegram?: string;
    tiktok?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "asoqwer",
    role: "Founder & Voice Provider",
    avatar: "/images/asoqwerwtyssll.webp",
    description: "Creator of Emerald Project, voice provider of asoqwer, website designer, UtauV developer.",
    social: {
      youtube: "https://www.youtube.com/@asoqwer",
      twitter: "https://x.com/p_former38064",
    }
  },
  {
    name: "Seejiu-C",
    role: "Founder & Voice Provider",
    avatar: "/images/akizora-3.webp",
    description: "Creator of Emerald Project, Voice provider of Akizora, and the driving force behind the project.",
    social: {
      twitter: "https://x.com/hjfgrtij",
      youtube: "https://www.youtube.com/@Seejiu-C",
    }
  },
  {
    name: "Beaver-P",
    role: "Voice Provider",
    avatar: "/images/beaverp.webp",
    description: "Voice provider of Simon Weber, talented artist behind many of our visual assets.",
    social: {
      youtube: "https://www.youtube.com/@BeaverPr",
      telegram: "https://t.me/BeaverProdMusic",
      tiktok: "https://www.tiktok.com/@beaver_pr"
    }
  },
  {
    name: "mnifl",
    role: "Voice Provider",
    avatar: "/images/mnifl.webp",
    description: "Voice provider of Mitsuo, talented artist behind many of our visual assets.",
    social: {
      youtube: "https://www.youtube.com/@mnifl8878",
      telegram: "https://t.me/mihynchikkc",
      tiktok: "https://www.tiktok.com/@aichai25"
    }
  },
  {
    name: "SouЯ",
    role: "Voice Provider & Artist",
    avatar: "/images/souR.webp",
    description: "Voice provider of Emerald, talented artist behind many of our visual assets.",
    social: {
      youtube: "https://www.youtube.com/@SouRR01",
      telegram: "https://t.me/SouRR001",
      tiktok: "https://www.tiktok.com/@sourr001"
    }
  },
  {
    name: "DIVON",
    role: "Voice Provider & Artist",
    avatar: "/images/divon.webp",
    description: "Voice provider of SHIN, talented artist behind many of our visual assets.",
    social: {
      youtube: "https://www.youtube.com/@V2DIVON",
      tiktok: "https://www.tiktok.com/@v2divon",
      twitter: "https://x.com/V2DIVON",
      telegram: "https://t.me/v2divon"
    }
  },
  {
    name: "Leshy-P",
    role: "Voice Provider",
    avatar: "/images/leshy.webp",
    description: "Voice provider of a future voicebank currently in development, talented artist behind many of our visual assets.",

    social: {
      youtube: "https://youtube.com/@LeshyP",
      telegram: "https://t.me/leshy_music",
      twitter: "https://x.com/leshy_music",
      tiktok: "https://www.tiktok.com/@leshy_music"
    }
  },
  {
    name: "Akura",
    role: "Artist",
    avatar: "/images/akura.webp",
    description: "Talented artist behind many of our visual assets.",
    social: {
      twitter: "https://x.com/shiroiakura",
      tiktok: "https://www.tiktok.com/@shiroi_akura"
    }
  },
  {
    name: "eulliaq",
    role: "Artist",
    avatar: "/images/eulliaq.webp",
    description: "Talented artist and silly KAITO lover.",
    social: {
      youtube: "https://www.youtube.com/@EmeraldProjectUtau",
      telegram: "https://t.me/falconyeulliaq",
      twitter: "https://x.com/Eulliaq",
      tiktok: "https://www.tiktok.com/@eulliaqzh"
    }
  },
  {
    name: "shui_kai",
    role: "Artist",
    avatar: "/images/shui_kai.webp",
    description: "Talented artist behind many of our visual assets.",
    social: {
      twitter: "https://x.com/shui_kai0112",
    }
  },
];

const AboutUs = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("about");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
    
    return (
        <div
      className="min-h-screen flex flex-col overflow-hidden"
            ref={containerRef}
        >
            <Helmet>
                <title>About Us - Emerald Singers</title>
                <meta name="description" content="Learn about the Emerald Project's mission to create high-quality UTAU virtual singers and tools. Meet our team and find our social media links." />
                <link rel="canonical" href="https://emeraldsingers.github.io/about-us" />
            </Helmet>

      <AnimatedBackground theme={theme} />
      <FloatingElements theme={theme} />
      <StarryBackground theme={theme} />
      
            <Navigation />
      
      {/* Hero Section without Banner */}
      <motion.header 
        className="relative h-[35vh] flex items-center justify-center overflow-hidden pt-16 sm:pt-8"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <div className="container relative z-10 text-center">
                <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className={`inline-flex items-center justify-center p-4 rounded-full mb-6 ${
              theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
            }`}
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            About <span className="text-emerald-500">Emerald</span> Project
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Creating the next generation of virtual singers
          </motion.p>
        </div>
      </motion.header>
      
      {/* Main content - reduced top padding */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        <Tabs 
          defaultValue="about" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-4">
            <TabsList className="w-full max-w-md grid grid-cols-4 gap-0 glass-morphism overflow-hidden">
              <TabsTrigger value="about" className="data-[state=active]:bg-primary/20 px-1 py-1.5 text-xs sm:text-sm">
                <Rocket className="h-4 w-4 sm:mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Mission</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-primary/20 px-1 py-1.5 text-xs sm:text-sm">
                <Users className="h-4 w-4 sm:mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger value="utauv" className="data-[state=active]:bg-primary/20 px-1 py-1.5 text-xs sm:text-sm">
                <Terminal className="h-4 w-4 sm:mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">UtauV</span>
              </TabsTrigger>
              <TabsTrigger value="connect" className="data-[state=active]:bg-primary/20 px-1 py-1.5 text-xs sm:text-sm">
                <MessageCircle className="h-4 w-4 sm:mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Connect</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <AnimatePresence mode="wait">
            <TabsContent 
              value="about" 
              className="mt-0"
            >
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-morphism rounded-xl p-6 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <motion.h2 
                        className="text-3xl font-bold text-primary mb-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        Our Mission
                      </motion.h2>
                      <motion.p 
                        className="text-muted-foreground mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                            The Emerald Project is dedicated to creating high-quality virtual singers and tools for the UTAU community.
                            We aim to provide innovative and expressive voicebanks that are both accessible and inspiring.
                      </motion.p>
                      
                      <motion.h3 
                        className="text-xl font-semibold text-primary mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        What We Do
                      </motion.h3>
                      
                      <motion.ul 
                        className="space-y-3 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <li className="flex items-start">
                          <Mic className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">Create expressive virtual singer voicebanks</span>
                        </li>
                        <li className="flex items-start">
                          <Code className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">Develop custom tools like UtauV Emerald Edition</span>
                        </li>
                        <li className="flex items-start">
                          <Music className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">Support the music synthesis community</span>
                        </li>
                        <li className="flex items-start">
                          <Heart className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">Foster creative expression through virtual singing</span>
                        </li>
                      </motion.ul>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Button variant="default" className="mt-4" asChild>
                          <Link to="/singers">
                            Explore Our Singers
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      className="relative aspect-square rounded-lg overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-lg" />
                      <img 
                        src="/images/UtauV.webp" 
                        alt="UtauV Emerald Edition" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-sm font-medium">UtauV Emerald Edition</p>
                        <p className="text-white/80 text-xs">Our custom fork of OpenUtau</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent 
              value="team" 
              className="mt-0"
            >
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-morphism rounded-xl p-6 overflow-hidden">
                  <motion.h2 
                    className="text-3xl font-bold text-primary mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Meet Our Team
                  </motion.h2>
                  
                  <motion.p 
                    className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Our team is a group of passionate individuals with a shared love for music synthesis and creative expression. 
                    We are committed to pushing the boundaries of what virtual singers can achieve.
                  </motion.p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {teamMembers.map((member, index) => (
                      <motion.div
                        key={member.name}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ delay: 0.1 * index }}
                        className={`glass-morphism rounded-xl overflow-hidden ${
                          theme === 'dark' ? 'border-emerald-500/20' : 'border-emerald-200'
                        } border`}
                      >
                        <div className="p-6">
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                              <img 
                                src={member.avatar} 
                                alt={member.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                            <p className="text-sm text-emerald-500 mb-2">{member.role}</p>
                            <p className="text-muted-foreground text-center text-sm mb-4">{member.description}</p>
                            
                            {/* Social links */}
                            <div className="flex gap-3 mt-2 flex-wrap justify-center">
                              {member.social?.youtube && (
                                <motion.a
                                  href={member.social.youtube}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 rounded-full ${
                                    theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'
                                  } hover:bg-red-500/30 transition-colors`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Youtube className="h-4 w-4 text-red-500" />
                                </motion.a>
                              )}
                              
                              {member.social?.twitter && (
                                <motion.a
                                  href={member.social.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 rounded-full ${
                                    theme === 'dark' ? 'bg-slate-500/20' : 'bg-slate-100'
                                  } hover:bg-slate-500/30 transition-colors`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Twitter className="h-4 w-4 text-slate-500" />
                                </motion.a>
                              )}
                              
                              {member.social?.telegram && (
                                <motion.a
                                  href={member.social.telegram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 rounded-full ${
                                    theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                                  } hover:bg-blue-500/30 transition-colors`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Send className="h-4 w-4 text-blue-500" />
                                </motion.a>
                              )}

                              {member.social?.tiktok && (
                                <motion.a
                                  href={member.social.tiktok}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 rounded-full ${
                                    theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                                  } hover:bg-purple-500/30 transition-colors`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Video className="h-4 w-4 text-purple-500" />
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent 
              value="utauv" 
              className="mt-0"
            >
              <motion.div
                key="utauv"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-morphism rounded-xl p-6 overflow-hidden">
                  <motion.h2 
                    className="text-3xl font-bold text-primary mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    UtauV Emerald Edition
                  </motion.h2>
                  
                  <motion.p 
                    className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Our enhanced fork of OpenUtau, designed specifically for the Emerald Project singers with unique styling and powerful features.
                  </motion.p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                      className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <img 
                        src="/images/UtauV.webp" 
                        alt="UtauV Emerald Edition Interface" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium">UtauV Emerald Edition Interface</p>
                      </div>
                    </motion.div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="mt-1 mr-3 p-2 rounded-full bg-primary/20">
                          <Layers className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-primary">Modern Interface</h3>
                          <p className="text-muted-foreground text-sm">Sleek, intuitive design with improved workflow and visual feedback</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="mt-1 mr-3 p-2 rounded-full bg-primary/20">
                          <Settings className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-primary">AutoPitch & Auto Harmonies</h3>
                          <p className="text-muted-foreground text-sm">Intelligent pitch detection and harmonization tools for faster production</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="mt-1 mr-3 p-2 rounded-full bg-primary/20">
                          <FileCode className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-primary">New Formats Support</h3>
                          <p className="text-muted-foreground text-sm">Supports new sequence formats</p>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="pt-4"
                      >
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Button variant="default" size="sm" className="w-full sm:w-auto" asChild>
                            <a 
                              href="https://github.com/emeraldsingers/UtauV/releases/download/v1.1.0.0/UtauV.1.1.0.0.1.Installer.exe" 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download UtauV
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                            <Link to="/about-utauv">
                              Learn More
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="col-span-3">
                      <h3 className="text-xl font-semibold text-primary mb-3 text-center">Works with our singers</h3>
                    </div>
                    <motion.div 
                      className="aspect-video relative rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <img 
                        src="/images/UtauVakizora.webp" 
                        alt="Akizora in UtauV" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-xs">Akizora</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="aspect-video relative rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <img 
                        src="/images/UtauVasoqwer.webp" 
                        alt="Asoqwer in UtauV" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-xs">Asoqwer</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="aspect-video relative rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <img 
                        src="/images/UtauVSimon.webp" 
                        alt="Simon Weber in UtauV" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-xs">Simon Weber</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent 
              value="connect" 
              className="mt-0"
            >
              <motion.div
                key="connect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-morphism rounded-xl p-6 overflow-hidden">
                  <motion.h2 
                    className="text-3xl font-bold text-primary mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Connect With Us
                  </motion.h2>
                  
                  <motion.p 
                    className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Follow us on social media to stay updated with our latest releases and community events.
                  </motion.p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <motion.a
                      href="https://www.youtube.com/@EmeraldProjectUtau"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center p-4 sm:p-6 rounded-xl ${
                        theme === 'dark' ? 'bg-background/40 hover:bg-background/60' : 'bg-background/60 hover:bg-background/80'
                      } backdrop-blur-sm border border-primary/10 transition-all duration-300`}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                        <Youtube className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-1">YouTube</h3>
                      <p className="text-sm text-muted-foreground text-center">Watch demos and tutorials</p>
                    </motion.a>
                    
                    <motion.a
                      href="https://t.me/UtauV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center p-4 sm:p-6 rounded-xl ${
                        theme === 'dark' ? 'bg-background/40 hover:bg-background/60' : 'bg-background/60 hover:bg-background/80'
                      } backdrop-blur-sm border border-primary/10 transition-all duration-300`}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                        <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-1">Telegram</h3>
                      <p className="text-sm text-muted-foreground text-center">Join our community chat</p>
                    </motion.a>
                    
                    <motion.a
                      href="https://x.com/emeraldpjutau"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center p-4 sm:p-6 rounded-xl ${
                        theme === 'dark' ? 'bg-background/40 hover:bg-background/60' : 'bg-background/60 hover:bg-background/80'
                      } backdrop-blur-sm border border-primary/10 transition-all duration-300`}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-500/20 flex items-center justify-center mb-4">
                        <Twitter className="h-6 w-6 sm:h-8 sm:w-8 text-slate-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-1">Twitter</h3>
                      <p className="text-sm text-muted-foreground text-center">Follow for updates</p>
                    </motion.a>

                    <motion.a
                      href="https://www.tiktok.com/@emeraldproject"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center p-4 sm:p-6 rounded-xl ${
                        theme === 'dark' ? 'bg-background/40 hover:bg-background/60' : 'bg-background/60 hover:bg-background/80'
                      } backdrop-blur-sm border border-primary/10 transition-all duration-300`}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                        <Video className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-1">TikTok</h3>
                      <p className="text-sm text-muted-foreground text-center">Short videos and demos</p>
                    </motion.a>
                  </div>
                  
                  <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className="text-muted-foreground mb-4">Want to see what our community has created?</p>
                        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 button-glass-gradient" asChild>
                      <Link to="/gallery">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Gallery & Community Works
                      </Link>
                        </Button>
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

export default AboutUs;