import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
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
                    ? 'radial-gradient(circle at 80% 90%, #0E2E2B 0%, #0A1919 60%)' 
                    : 'radial-gradient(circle at 80% 90%, #A7D7C5 0%, #E0F2F1 60%)',
                perspective: '1000px'
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
  inPlans: [
    {
      id: 1,
      title: "New Singers",
      description: "Working on a new virtual singer",
      timeline: "Q2 2025",
      priority: "High"
    },

    {
      id: 3,
      title: "DiffSinger Voicebanks",
      description: "DiffSinger voicebanks for all singers",
      timeline: "Q2 2025",
      priority: "Medium"
    },

  ],
  inProgress: [
    {
      id: 4,
      title: "Mitsuo Voicebanks release",
      description: "JA CVVC & RU CVC voicebanks for Mitsuo",
      progress: 60,
      startedDate: "April 2025"
    },
    {
      id: 5,
      title: "Voice Bank Updates",
      description: "Refining existing voice banks",
      progress: 65,
      startedDate: "April 2025"
    }
  ],
  completed: [
    {
      id: 6,
      title: "Initial Release",
      description: "First public launch of the Emerald Project",
      completedDate: "January, 12th 2025"
    },
    {
      id: 7,
      title: "Official Site Launch",
      description: "The site was launched on February 20th, 2025",
      completedDate: "February 20th, 2025"
    },
    {
      id: 8,
      title: "AutoPitch Plugin & AutoHarmonies",
      description: "Plugins installed in UtauV",
      completedDate: "April 2025"
    },
    {
      id: 9,
      title: "Site Redesign",
      description: "New appearance of the site with improved design and functionality",
      completedDate: "May 2025"
    }
  ]
};

const Roadmap = () => {
    const { theme } = useTheme();
    const [activePhase, setActivePhase] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const phases = [
        {
            title: "Phase 1: Foundation",
            subtitle: "January 2025",
            items: [
                roadmapData.completed[0].title,
                roadmapData.completed[0].description,
            ],
            completed: true
        },
        {
            title: "Phase 2: Website Development",
            subtitle: "February 2025",
            items: [
                roadmapData.completed[1].title,
                roadmapData.completed[1].description,
            ],
            completed: true
        },
        {
            title: "Phase 3: Plugin Development",
            subtitle: "April 2025",
            items: [
                roadmapData.completed[2].title,
                roadmapData.completed[2].description,
                roadmapData.inProgress[0].title,
                roadmapData.inProgress[0].description,
                roadmapData.inProgress[1].title,
                roadmapData.inProgress[1].description,
            ],
            completed: true
        },
        {
            title: "Phase 4: Site Enhancement",
            subtitle: "May 2025",
            items: [
                roadmapData.completed[3].title,
                roadmapData.completed[3].description,
            ],
            completed: true
        },
        {
            title: "Phase 5: New Features",
            subtitle: "Q3 2025",
            items: [
              "New Website design(again)",
              "AutoPitch Plugin based on Transformers",
              "DiffSinger Voicebanks for all singers",
            ],
            completed: false
        },
    ];

    return (
        <div
            className="min-h-screen flex flex-col overflow-hidden"
            ref={containerRef}
        >
            <Helmet>
                <title>Roadmap - Emerald Singers</title>
                <meta name="description" content="Discover the development roadmap for the Emerald Project. Learn about our future plans and features for Emerald singers." />
                <link rel="canonical" href="https://emeraldsingers.github.io/roadmap" />
            </Helmet>
            
            <AnimatedBackground theme={theme} />
            <FloatingElements theme={theme} />
            <StarryBackground theme={theme} />
            
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-24 relative">
                <motion.div 
                    className="max-w-5xl mx-auto glass-morphism rounded-xl p-8 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-primary mb-8 text-center">Emerald Project Roadmap</h1>
                    <p className="text-lg text-center mb-8">
                        Our development plan outlines the journey of the Emerald Project from conception to future innovations.
                    </p>
                </motion.div>
                
                <div className="space-y-16 pb-20">
                    {phases.map((phase, index) => (
                        <motion.div 
                            key={index} 
                            className="relative"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        >
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full top-0">
                                <div className={`w-[3px] h-full ${index === phases.length - 1 ? 'h-0' : 'h-full'} ${phase.completed ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                            </div>
                            
                            <div className="flex items-center justify-center mb-4 relative z-10">
                                <motion.div 
                                    className={`w-8 h-8 rounded-full ${phase.completed ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => setActivePhase(index)}
                                >
                                    {index + 1}
                                </motion.div>
                            </div>
                            
                            <motion.div 
                                className={`glass-morphism rounded-xl p-6 max-w-3xl mx-auto ${activePhase === index ? 'border-l-4 border-emerald-500' : ''}`}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setActivePhase(index)}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-primary">{phase.title}</h2>
                                    <div className={`px-3 py-1 rounded-full text-sm ${phase.completed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
                                        {phase.subtitle}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {phase.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start">
                                            <span className={`mr-2 mt-1 ${phase.completed ? 'text-emerald-500' : 'text-gray-400'}`}>•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 text-right">
                                    <span className={`text-sm font-medium ${phase.completed ? 'text-emerald-500' : 'text-gray-400'}`}>
                                        {phase.completed ? 'Completed' : 'Planned'}
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Roadmap; 