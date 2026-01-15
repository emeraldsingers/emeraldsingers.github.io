import { useState, useRef } from "react";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";



const AnimatedBackground = ({ theme }: { theme: string }) => {
    const { scrollYProgress } = useScroll();

    const gridY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.5]);
    const globeY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const globeX = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const globeRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const wavesY = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const wavesX = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const flareOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.3]);

    const lineColor = theme === 'dark' ? 'rgba(56, 161, 105, 0.2)' : 'rgba(56, 161, 105, 0.3)';
    const accentLineColor = theme === 'dark' ? 'rgba(66, 200, 135, 0.3)' : 'rgba(66, 200, 135, 0.4)';
    const flareColor = theme === 'dark' ? '#42F0A5' : '#38D995';

    const pathStrings = useRef<string[]>([
        "M 0 50 Q 100 30, 200 50 T 400 50",
        "M 0 60 Q 100 45, 200 60 T 400 60",
        "M 0 70 Q 100 55, 200 70 T 400 70",
        "M 0 80 Q 100 70, 200 80 T 400 80",
        "M 0 90 Q 100 80, 200 90 T 400 90",
        "M 0 100 Q 100 90, 200 100 T 400 100",
        "M 0 110 Q 100 100, 200 110 T 400 110",
        "M 0 120 Q 100 110, 200 120 T 400 120",
        "M 0 130 Q 100 120, 200 130 T 400 130",
        "M 0 140 Q 100 130, 200 140 T 400 140"
    ]);

    const timelinePath = "M 50 10 L 50 90";

    return (
        <div 
            className="fixed inset-0 w-full h-full -z-10 overflow-hidden"
            style={{
                background: theme === 'dark' 
                    ? 'radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.18), transparent 45%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.12), transparent 50%), linear-gradient(120deg, #051414 0%, #081f1b 50%, #031010 100%)' 
                    : 'radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.18), transparent 45%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.12), transparent 50%), linear-gradient(120deg, #f8fffb 0%, #e3f7ef 50%, #d6efe4 100%)'
            }}
        >
            <motion.svg 
                className="absolute inset-0 w-full h-full"
                style={{ 
                    y: gridY,
                    opacity: gridOpacity,
                    rotateX: useTransform(scrollYProgress, [0, 1], [0, 5]),
                }}
            >
                <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke={lineColor} strokeWidth="0.5"/>
                    </pattern>
                    <pattern id="diagGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                         <path d="M 0 100 L 100 0 M -10 10 L 10 -10 M 90 110 L 110 90" fill="none" stroke={lineColor} strokeWidth="0.3"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <rect width="100%" height="100%" fill="url(#diagGrid)" opacity={0.5} />
            </motion.svg>

            <motion.svg 
                viewBox="0 0 100 100" 
                className="absolute top-[5%] left-[5%] w-32 h-32 md:w-40 md:h-40 opacity-70"
                style={{ 
                    y: globeY, 
                    x: globeX,
                    rotateX: globeRotate,
                    rotateY: useTransform(scrollYProgress, [0, 1], [0, 20]),
                    scale: globeScale
                }}
                animate={{
                    rotate: [0, 360]
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <ellipse cx="50" cy="50" rx="45" ry="45" fill="none" stroke={accentLineColor} strokeWidth="0.5" />
                <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke={accentLineColor} strokeWidth="0.5" /> 
                <ellipse cx="50" cy="50" rx="45" ry="35" transform="rotate(30 50 50)" fill="none" stroke={accentLineColor} strokeWidth="0.5" />
                <ellipse cx="50" cy="50" rx="45" ry="35" transform="rotate(-30 50 50)" fill="none" stroke={accentLineColor} strokeWidth="0.5" />
                
                {[0, 30, 60, 90, 120, 150].map((angle, idx) => (
                     <ellipse 
                        key={`lon-${angle}`} 
                        cx="50" 
                        cy="50" 
                        rx="10" 
                        ry="45" 
                        transform={`rotate(${angle} 50 50)`} 
                        fill="none" 
                        stroke={accentLineColor} 
                        strokeWidth="0.5" 
                        opacity={0.5 + (idx * 0.08)}
                     />
                ))}
            </motion.svg>

            <motion.svg 
                className="absolute top-1/2 left-0 w-1/2 h-1/2 opacity-50 transform -translate-y-1/2"
                style={{ 
                    y: wavesY,
                    x: wavesX,
                    rotateY: useTransform(scrollYProgress, [0, 1], [0, 10]),
                }}
                viewBox="0 0 400 200"
            >
                {[...Array(10)].map((_, i) => (
                    <motion.path
                        key={i}
                        d={pathStrings.current[i]}
                        fill="none"
                        stroke={accentLineColor}
                        strokeWidth="0.7"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0, 0.3 + (i*0.03), 0.3 + (i*0.03), 0],
                        }}
                        transition={{
                            duration: 4 + i * 0.3,
                            times: [0, 0.4, 0.7, 1],
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                        }}
                        custom={i}
                    />
                ))}
            </motion.svg>
            
            <motion.svg 
                className="absolute inset-0 w-full h-full opacity-80"
                style={{
                    rotateX: useTransform(scrollYProgress, [0, 1], [0, 8]),
                    scale: useTransform(scrollYProgress, [0, 1], [1, 0.95]),
                }}
            >
                <motion.path d="M 5% 20% L 30% 20% Q 32% 20% 32% 22% L 32% 28%" stroke={accentLineColor} strokeWidth="0.7" fill="none" />
                <motion.circle cx="32%" cy="28%" r="1.5" fill={flareColor} initial={{opacity:0}} animate={{opacity: [0,1,0]}} transition={{duration:3, repeat: Infinity, delay:1}} />
                
                <motion.path d="M 10% 85% L 40% 85% Q 42% 85% 42% 83% L 42% 78%" stroke={accentLineColor} strokeWidth="0.7" fill="none" />
                <motion.circle cx="10%" cy="85%" r="1.5" fill={flareColor} initial={{opacity:0}} animate={{opacity: [0,1,0]}} transition={{duration:3.5, repeat: Infinity, delay:2}} />
                
                <motion.path d="M 90% 10% L 70% 70% L 60% 80%" stroke={accentLineColor} strokeWidth="0.5" fill="none" />
                
                <motion.circle 
                    cx="85%" 
                    cy="88%" 
                    r="5" 
                    fill={flareColor} 
                    style={{ opacity: flareOpacity }}
                    animate={{ scale: [1, 1.3, 1]}}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut"}}
                />
                 <motion.circle 
                    cx="85%" 
                    cy="88%" 
                    r="10" 
                    fill={flareColor} 
                    opacity={0.3}
                    style={{ opacity: useTransform(flareOpacity, (v: number) => v * 0.5) }}
                    animate={{ scale: [1, 1.5, 1]}}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2}}
                />
            </motion.svg>

            <motion.div className="absolute left-1/2 h-full w-[2px] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent">
                <motion.div 
                    className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 -translate-x-1/2"
                    animate={{
                        y: [0, '100vh', 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                {[...Array(8)].map((_, i) => (
                    <motion.div 
                        key={`node-${i}`}
                        className="absolute w-3 h-3 rounded-full bg-emerald-400 -translate-x-1/2"
                        style={{ 
                            left: '50%',
                            top: `${12 + i * 10}%` 
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

const FloatingElements = ({ theme }: { theme: string }) => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div 
                className={`absolute top-20 left-[5%] w-16 h-16 rounded-full ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-300/20'
                }`}
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.7, 0.4, 0.7],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className={`absolute top-[40%] right-[8%] w-20 h-20 rounded-full ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-200/40'
                }`}
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            
            <motion.div 
                className={`absolute bottom-[20%] left-[15%] w-12 h-12 rounded-full ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-100/40'
                }`}
                animate={{
                    y: [0, 10, 0],
                    opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
            
            <motion.div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border ${
                    theme === 'dark' ? 'border-emerald-500/10' : 'border-emerald-300/20'
                }`}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.1, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className={`absolute bottom-[30%] right-[20%] w-10 h-10 rotate-45 ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-200/30'
                }`}
                animate={{
                    rotate: [45, 90, 45],
                    y: [0, -15, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
            />
        </div>
    );
};

const StarryBackground = ({ theme }: { theme: string }) => {
    const randomValuesRef = useRef<{
      starPositions: Array<{x: number, y: number, size: number, delay: number, duration: number}>;
      orbPositions: Array<{x: number, y: number, size: number, delay: number, duration: number}>;
      streakPositions: Array<{x: number, y: number, width: number, rotation: number, delay: number}>;
      particlePositions: Array<{x: number, y: number, delay: number, duration: number}>;
      shootingStarPositions: Array<{x: number, y: number, rotation: number, width: number, delay: number}>;
      pulsatingStarPositions: Array<{x: number, y: number, duration: number, delay: number}>;
    }>(null!);
    
    if (!randomValuesRef.current) {
      const starPositions = Array(40).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      }));
      
      const orbPositions = Array(10).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 100 + 50,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 10
      }));
      
      const streakPositions = Array(7).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 150 + 50,
        rotation: Math.random() * 360,
        delay: Math.random() * 8
      }));
      
      const particlePositions = Array(20).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 2 + 4
      }));
      
      const shootingStarPositions = Array(3).fill(0).map(() => ({
        x: Math.random() * 70,
        y: Math.random() * 50,
        rotation: Math.random() * 60 - 30,
        width: Math.random() * 100 + 150,
        delay: Math.random() * 5
      }));
      
      const pulsatingStarPositions = Array(5).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 2
      }));
      
      randomValuesRef.current = {
        starPositions,
        orbPositions,
        streakPositions,
        particlePositions,
        shootingStarPositions,
        pulsatingStarPositions
      };
    }
    
    const starColor = theme === 'dark' ? 'rgba(66, 200, 135, 0.8)' : 'rgba(56, 161, 105, 0.9)';
    const orbColor = theme === 'dark' ? 'rgba(66, 200, 135, 0.15)' : 'rgba(56, 161, 105, 0.25)';
    const streakColor = theme === 'dark' ? 'rgba(66, 200, 135, 0.1)' : 'rgba(56, 161, 105, 0.2)';
    const particleColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.8)' : 'rgba(56, 217, 149, 0.8)';
    const shootingStarColor = theme === 'dark' ? '#42F0A5' : '#38D995';
    const pulsatingStarColor = theme === 'dark' ? '#4eff9e' : '#20c27b';
  
    return (
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {randomValuesRef.current.starPositions.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: star.size + 'px',
              height: star.size + 'px',
              top: star.y + '%',
              left: star.x + '%',
              backgroundColor: starColor,
              opacity: 0.2 + Math.random() * 0.5,
              boxShadow: `0 0 ${2 + Math.random() * 4}px ${starColor}`
            }}
            animate={{
              opacity: [
                0.2 + Math.random() * 0.3,
                0.4 + Math.random() * 0.6,
                0.2 + Math.random() * 0.3,
              ],
              scale: [1, 1 + Math.random() * 0.4, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
  
        {randomValuesRef.current.orbPositions.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: orb.size + 'px',
              height: orb.size + 'px',
              top: orb.y + '%',
              left: orb.x + '%',
              backgroundColor: orbColor,
              opacity: 0.1 + Math.random() * 0.3,
            }}
            animate={{
              opacity: [
                0.1 + Math.random() * 0.2,
                0.2 + Math.random() * 0.3,
                0.1 + Math.random() * 0.2,
              ],
              scale: [1, 1 + Math.random() * 0.3, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
            }}
          />
        ))}
  
        {randomValuesRef.current.streakPositions.map((streak, i) => (
          <motion.div
            key={`streak-${i}`}
            className="absolute"
            style={{
              width: streak.width + 'px',
              height: '1px',
              top: streak.y + '%',
              left: streak.x + '%',
              backgroundColor: streakColor,
              boxShadow: `0 0 4px ${streakColor}`,
              opacity: 0.1 + Math.random() * 0.3,
              transform: `rotate(${streak.rotation}deg)`,
            }}
            animate={{
              opacity: [0, 0.2 + Math.random() * 0.4, 0],
              width: [0, streak.width, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: streak.delay,
              repeatDelay: 5 + Math.random() * 5,
            }}
          />
        ))}
        
        {randomValuesRef.current.particlePositions.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              top: particle.y + '%',
              left: particle.x + '%',
              backgroundColor: particleColor,
              boxShadow: `0 0 3px ${particleColor}`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -50 - Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              repeatDelay: 3 + Math.random() * 5,
            }}
          />
        ))}
        
        {randomValuesRef.current.shootingStarPositions.map((star, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute h-[1px] rounded origin-left"
            style={{
              width: 0,
              top: star.y + '%',
              left: star.x + '%',
              backgroundColor: shootingStarColor,
              boxShadow: `0 0 4px ${shootingStarColor}`,
              opacity: 0,
              transform: `rotate(${star.rotation}deg)`,
            }}
            animate={{
              width: [0, star.width, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 10 + Math.random() * 15,
              delay: star.delay,
              ease: "easeOut"
            }}
          />
        ))}
        
        {randomValuesRef.current.pulsatingStarPositions.map((star, i) => (
          <motion.div
            key={`pulse-star-${i}`}
            className="absolute rounded-full"
            style={{
              width: '3px',
              height: '3px',
              top: star.y + '%',
              left: star.x + '%',
              backgroundColor: pulsatingStarColor,
              boxShadow: `0 0 8px ${shootingStarColor}`,
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.5, 1],
              boxShadow: [
                `0 0 3px ${shootingStarColor}`,
                `0 0 8px ${shootingStarColor}`,
                `0 0 3px ${shootingStarColor}`
              ]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>
    );
};

const roadmapData = {
  completed: [
    {
      id: 1,
      date: "January 2025",
      title: "Project Launch",
      description: "Initial public release of Emerald Project with first voicebanks",
      icon: "🚀"
    },
    {
      id: 2,
      date: "February 2025",
      title: "Official Website",
      description: "Launch of emeraldsingers.github.io with full singer showcase",
      icon: "🌐"
    },
    {
      id: 3,
      date: "April 2025",
      title: "UtauV Plugins",
      description: "AutoPitch and AutoHarmonies plugins integrated into UtauV",
      icon: "🎵"
    },
    {
      id: 4,
      date: "May 2025",
      title: "Site Redesign",
      description: "Major visual overhaul with improved UX and animations",
      icon: "✨"
    },
    {
      id: 5,
      date: "October 2025",
      title: "Roadmap Update",
      description: "Complete restructuring of project roadmap and future plans",
      icon: "📋"
    }
  ],
  inProgress: [
    {
      id: 6,
      title: "Mitsuo VoiceBanks",
      description: "Japanese CVVC and Russian CVC voicebanks in production",
      progress: 75,
      eta: "Q4 2025",
      icon: "🎤"
    },
    {
      id: 7,
      title: "VoiceBank Refinement",
      description: "Improving quality and expanding existing singer libraries",
      progress: 60,
      eta: "Ongoing",
      icon: "🔧"
    },
        {
      id: 10,
      title: "New Singers",
      description: "Expanding the roster with fresh voices and characters",
      progress: 20,
      priority: "High",
      eta: "Ongoing",
      icon: "⭐"
    },
    {
      id: 8,
      title: "UtauV Enhancement",
      description: "Updating to latest OpenUtau base with new features",
      progress: 45,
      eta: "Q1 2026",
      icon: "⚙️"
    },

  ],
  planned: [
    {
      id: 9,
      title: "DiffSinger Models",
      description: "AI-based singing synthesis for all main singers",
      priority: "High",
      timeline: "Q2 2026",
      icon: "🤖"
    },

  ]
};

const Roadmap = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState<'completed' | 'inProgress' | 'planned'>('inProgress');
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="min-h-screen flex flex-col overflow-hidden"
            ref={containerRef}
        >
            <Helmet>
                <title>Roadmap - Emerald Singers</title>
                <meta name="description" content="Discover the development roadmap for the Emerald Project. Track our progress and explore upcoming features." />
                <link rel="canonical" href="https://emeraldsingers.github.io/roadmap" />
            </Helmet>
            
            <AnimatedBackground theme={theme} />
            <FloatingElements theme={theme} />
            <StarryBackground theme={theme} />
            
            
            <main className="flex-grow container mx-auto px-4 py-20 relative z-10">
                {/* Header */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1 
                        className="text-5xl md:text-6xl font-bold text-primary mb-4"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        Development Roadmap
                    </motion.h1>
                    <motion.p 
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Track our journey from launch to future innovations
                    </motion.p>
                    <motion.div
                        className="mt-2 text-sm text-emerald-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Last updated: October 3, 2025
                    </motion.div>
                </motion.div>

                {/* Tab Selector */}
                <motion.div 
                    className="flex justify-center gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {[
                        { key: 'completed', label: '✅ Completed', count: roadmapData.completed.length },
                        { key: 'inProgress', label: '🔄 In Progress', count: roadmapData.inProgress.length },
                        { key: 'planned', label: '📅 Planned', count: roadmapData.planned.length }
                    ].map((tab) => (
                        <motion.button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={cn(
                                "px-6 py-3 rounded-lg font-medium transition-all relative overflow-hidden",
                                activeTab === tab.key
                                    ? "bg-primary text-primary-foreground shadow-lg"
                                    : "glass-morphism hover:scale-105"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {tab.label}
                                <span className="text-xs opacity-70">({tab.count})</span>
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Content Area */}
                <div className="max-w-6xl mx-auto">
                    {/* Completed Section */}
                    {activeTab === 'completed' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {roadmapData.completed.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="glass-morphism rounded-xl p-6 border-l-4 border-emerald-500"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">{item.icon}</span>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                                                    <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded">
                                                        ✓ Done
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                                                <div className="text-xs text-emerald-500 font-medium">
                                                    📅 {item.date}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* In Progress Section */}
                    {activeTab === 'inProgress' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {roadmapData.inProgress.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="glass-morphism rounded-xl p-6 border-l-4 border-blue-500"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.01, y: -3 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-4xl">{item.icon}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded">
                                                    ETA: {item.eta}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground mb-4">{item.description}</p>
                                            
                                            {/* Progress Bar */}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Progress</span>
                                                    <span className="font-bold text-primary">{item.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.progress}%` }}
                                                        transition={{ duration: 1, delay: index * 0.2 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Planned Section */}
                    {activeTab === 'planned' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {roadmapData.planned.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="glass-morphism rounded-xl p-6 border-l-4 border-purple-500"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">{item.icon}</span>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded font-medium",
                                                        item.priority === 'High' 
                                                            ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                                                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                                                    )}>
                                                        {item.priority} Priority
                                                    </span>
                                                    <span className="text-purple-500 font-medium">
                                                        📅 {item.timeline}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Roadmap; 
