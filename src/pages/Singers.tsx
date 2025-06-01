import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import SingerCard from "@/components/SingerCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTheme } from "@/components/ThemeProvider";
import React from "react";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Filter, ChevronUp, ChevronDown, Play, Pause, Loader2 } from "lucide-react";

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

    const randomValuesRef = useRef<{
        waveOffsets: number[];
    }>(null!);
    
    if (!randomValuesRef.current) {
        randomValuesRef.current = {
            waveOffsets: Array(10).fill(0).map(() => Math.random() * 10),
        };
    }
    
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
                            times: [0, 0.4, 0.7, 1], // Draw, hold, fade out
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatDelay: 1.5, // Pause before repeating
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
        </div>
    );
};

const FloatingElements = ({ theme }: { theme: string }) => {
    const randomValuesRef = useRef<{
        positions: Array<{top: string, left: string, size: string, delay: number, duration: number}>;
    }>(null!);
    
    if (!randomValuesRef.current) {
        randomValuesRef.current = {
            positions: [
                {top: '20px', left: '5%', size: '16px', delay: 0, duration: 6},
                {top: '40%', left: '92%', size: '20px', delay: 1, duration: 7},
                {top: '80%', left: '15%', size: '12px', delay: 2, duration: 5},
                {top: '30%', left: '80%', size: '10px', delay: 1.5, duration: 9},
            ]
        };
    }

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div 
                className={`absolute w-16 h-16 rounded-full ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-300/20'
                }`}
                style={{
                    top: randomValuesRef.current.positions[0].top,
                    left: randomValuesRef.current.positions[0].left,
                    width: randomValuesRef.current.positions[0].size,
                    height: randomValuesRef.current.positions[0].size,
                }}
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.7, 0.4, 0.7],
                }}
                transition={{
                    duration: randomValuesRef.current.positions[0].duration,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className={`absolute w-20 h-20 rounded-full ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-200/40'
                }`}
                style={{
                    top: randomValuesRef.current.positions[1].top,
                    right: randomValuesRef.current.positions[1].left,
                    width: randomValuesRef.current.positions[1].size,
                    height: randomValuesRef.current.positions[1].size,
                }}
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: randomValuesRef.current.positions[1].duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: randomValuesRef.current.positions[1].delay
                }}
            />
            
            <motion.div 
                className={`absolute w-12 h-12 rounded-full ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-100/40'
                }`}
                style={{
                    bottom: randomValuesRef.current.positions[2].top,
                    left: randomValuesRef.current.positions[2].left,
                    width: randomValuesRef.current.positions[2].size,
                    height: randomValuesRef.current.positions[2].size,
                }}
                animate={{
                    y: [0, 10, 0],
                    opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                    duration: randomValuesRef.current.positions[2].duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: randomValuesRef.current.positions[2].delay
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
                className={`absolute rotate-45 ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-200/30'
                }`}
                style={{
                    bottom: randomValuesRef.current.positions[3].top,
                    right: randomValuesRef.current.positions[3].left,
                    width: randomValuesRef.current.positions[3].size,
                    height: randomValuesRef.current.positions[3].size,
                }}
                animate={{
                    rotate: [45, 90, 45],
                    y: [0, -15, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: randomValuesRef.current.positions[3].duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: randomValuesRef.current.positions[3].delay
                }}
            />
        </div>
    );
};

const StarryBackground = ({ theme }: { theme: string }) => {
  const shootingStarColor = theme === 'dark' ? '#42F0A5' : '#38D995';
  const pulsatingStarColor = theme === 'dark' ? '#4eff9e' : '#20c27b';
  const starColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.8)' : 'rgba(56, 217, 149, 0.9)';
  const orbColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.15)' : 'rgba(56, 217, 149, 0.25)';
  const streakColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.1)' : 'rgba(56, 217, 149, 0.2)';
  const particleColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.8)' : 'rgba(56, 217, 149, 0.8)';
  
  const randomValuesRef = useRef<{
    starPositions: Array<{x: number, y: number, size: number, delay: number, duration: number, opacity: number, scale: number}>;
    orbPositions: Array<{x: number, y: number, size: number, delay: number, duration: number, opacity: number, scale: number}>;
    streakPositions: Array<{x: number, y: number, width: number, rotation: number, delay: number, duration: number, repeatDelay: number}>;
    particlePositions: Array<{x: number, y: number, delay: number, duration: number, xOffset: number, yOffset: number, repeatDelay: number}>;
    shootingStarPositions: Array<{x: number, y: number, rotation: number, width: number, delay: number, repeatDelay: number}>;
    pulsatingStarPositions: Array<{x: number, y: number, duration: number, delay: number}>;
  }>(null!);
  
  if (!randomValuesRef.current) {
    const starPositions = Array(40).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      opacity: 0.2 + Math.random() * 0.5,
      scale: 1 + Math.random() * 0.4
    }));
    
    const orbPositions = Array(10).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 10,
      opacity: 0.1 + Math.random() * 0.3,
      scale: 1 + Math.random() * 0.3
    }));
    
    const streakPositions = Array(7).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 150 + 50,
      rotation: Math.random() * 360,
      delay: Math.random() * 8,
      duration: 2 + Math.random() * 3,
      repeatDelay: 5 + Math.random() * 5
    }));
    
    const particlePositions = Array(15).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 2 + 4,
      xOffset: (Math.random() - 0.5) * 50,
      yOffset: -50 - Math.random() * 100,
      repeatDelay: 3 + Math.random() * 5
    }));
    
    const shootingStarPositions = Array(3).fill(0).map(() => ({
      x: Math.random() * 70,
      y: Math.random() * 50,
      rotation: Math.random() * 60 - 30,
      width: Math.random() * 100 + 150,
      delay: Math.random() * 5,
      repeatDelay: 10 + Math.random() * 15
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
            opacity: star.opacity,
            boxShadow: `0 0 ${Math.random() * 4 + 2}px ${starColor}`,
          }}
          animate={{
            opacity: [
              star.opacity,
              star.opacity + 0.2,
              star.opacity
            ],
            scale: [1, star.scale, 1],
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
            opacity: orb.opacity,
          }}
          animate={{
            opacity: [
              orb.opacity,
              orb.opacity + 0.1,
              orb.opacity
            ],
            scale: [1, orb.scale, 1],
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
            opacity: 0.1 + Math.random() * 0.3,
            transform: `rotate(${streak.rotation}deg)`,
            boxShadow: `0 0 4px ${streakColor}`,
          }}
          animate={{
            opacity: [0, 0.2 + Math.random() * 0.4, 0],
            width: [0, streak.width, 0],
          }}
          transition={{
            duration: streak.duration,
            repeat: Infinity,
            delay: streak.delay,
            repeatDelay: streak.repeatDelay,
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
            opacity: 0,
            boxShadow: `0 0 3px ${particleColor}`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, particle.yOffset],
            x: [0, particle.xOffset],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            repeatDelay: particle.repeatDelay,
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
            repeatDelay: star.repeatDelay,
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

export type SingerTag = 
  | 'male' 
  | 'female' 
  | 'utau' 
  | 'diffsinger' 
  | 'rvc' 
  | 'ja' 
  | 'en' 
  | 'rus' 
  | 'cvvc' 
  | 'vcv' 
  | 'vccv' 
  | 'cvc';

const tagCategories = [
  { 
    name: 'Gender', 
    tags: ['male', 'female'] 
  },
  { 
    name: 'Technology', 
    tags: ['utau', 'diffsinger', 'rvc'] 
  },
  { 
    name: 'Language', 
    tags: ['ja', 'en', 'rus'] 
  },
  { 
    name: 'Phoneme System', 
    tags: ['cvvc', 'vcv', 'vccv', 'cvc'] 
  }
];


const tagDisplay: Record<SingerTag, { label: string, color: string }> = {
  male: { label: 'Male', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  female: { label: 'Female', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' },
  utau: { label: 'UTAU', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  diffsinger: { label: 'DiffSinger', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
  rvc: { label: 'RVC', color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300' },
  ja: { label: 'Japanese', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
  en: { label: 'English', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  rus: { label: 'Russian', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  cvvc: { label: 'CVVC', color: 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300' },
  vcv: { label: 'VCV', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  vccv: { label: 'VCCV', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300' },
  cvc: { label: 'CVC', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' }
};

const singers = [
  {
    name: "Akizora",
    image: "/images/akizora_thumb.webp",
    slug: "akizora",
    tags: ['female', 'utau', 'ja', 'cvvc'] as SingerTag[],
    audioSample: "/samples/akizora/akizora-samplecvvc.mp3"
  },
  {
    name: "Asoqwer",
    image: "/images/asoqwer_thumb.webp",
    slug: "asoqwer",
    tags: ['male', 'utau', 'ja', 'vcv', "cvvc", "rvc"] as SingerTag[],
    audioSample: "/samples/asoqwer/asoqwer-samplecvvcnormal.mp3"
  },
  {
    name: "Emerald",
    image: "/images/Emerald2025NoLogo_thumb.webp",
    slug: "emerald",
    tags: ['male', 'utau', 'ja', 'rus', 'cvvc', 'cvc'] as SingerTag[],
    audioSample: "/samples/emerald/emerald_normalcvvc.mp3"
  },
  {
    name: "Simon Weber",
    image: "/images/simon-weber-eu_thumb.webp",
    slug: "simon-weber",
    tags: ['male', 'utau', 'ja', 'cvvc'] as SingerTag[],
    audioSample: "/samples/simon/simon-samplecvvc.mp3"
  },
  {
    name: "Mitsuo",
    image: "/images/mitsuo_thumb.webp",
    slug: "mitsuo",
    tags: ['male', 'rvc', 'ja'] as SingerTag[],
    audioSample: "/samples/mitsuo/mitsuorvc.mp3"
  },
];

// Augmented SingerCard component with audio playback
const SingerCardWithAudio = ({ 
  singer, 
  theme, 
  isPlaying, 
  onPlayToggle 
}: { 
  singer: { name: string; image: string; slug: string; tags: SingerTag[]; audioSample: string; };
  theme: string; 
  isPlaying: boolean; 
  onPlayToggle: (slug: string) => void; 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const progressAnimationRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      
      // Start progress animation
      const updateProgress = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          progressAnimationRef.current = requestAnimationFrame(updateProgress);
        }
      };
      progressAnimationRef.current = requestAnimationFrame(updateProgress);
    } else {
      audioRef.current?.pause();
      
      // Stop progress animation
      if (progressAnimationRef.current) {
        cancelAnimationFrame(progressAnimationRef.current);
        progressAnimationRef.current = null;
      }
    }
    
    return () => {
      if (progressAnimationRef.current) {
        cancelAnimationFrame(progressAnimationRef.current);
        progressAnimationRef.current = null;
      }
    };
  }, [isPlaying]);
  
  // Get audio duration when metadata is loaded
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      if (audio) {
        setAudioDuration(audio.duration);
      }
    };
    
    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // If already loaded
      if (audio.duration) {
        setAudioDuration(audio.duration);
      }
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  return (
    <div className="relative">
      <SingerCard 
        name={singer.name}
        image={singer.image}
        slug={singer.slug}
        tags={singer.tags.map(tag => tagDisplay[tag].label).join(', ')}
      />
      <audio 
        ref={audioRef} 
        src={singer.audioSample} 
        loop 
      />
      
      <motion.button
        initial={{ opacity: 0.8, scale: 1 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        className={`absolute top-4 right-4 rounded-full p-2 z-10 ${
          theme === 'dark' 
            ? 'bg-gray-800/80 text-emerald-400 hover:bg-gray-700 shadow-lg shadow-emerald-500/20' 
            : 'bg-white/80 text-emerald-600 hover:bg-gray-100 shadow-lg shadow-emerald-500/10'
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPlayToggle(singer.slug);
        }}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </motion.button>
      
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/10">
          <motion.div 
            className="h-full bg-emerald-500/30"
            style={{ 
              width: audioDuration ? `${(currentTime / audioDuration) * 100}%` : "0%" 
            }}
          />
        </div>
      )}
    </div>
  );
};

const Singers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<SingerTag[]>([]);
  const [filteredSingers, setFilteredSingers] = useState(singers);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [hasFilteredOnce, setHasFilteredOnce] = useState(false);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [playingSinger, setPlayingSinger] = useState<string | null>(null);

  const pageTitle = "Browse Virtual Singers - Emerald Project";
  const pageDescription = "Explore the full collection of virtual singers from the Emerald Project. Filter by gender, technology, language, and phoneme system to find the perfect voice.";
  const canonicalUrl = "https://emeraldsingers.github.io/#/singers";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 250, 
        damping: 20,
        mass: 1
      }
    }
  };

  const filterPanelVariants = {
    closed: { 
      height: 0, 
      opacity: 0,
      y: -20
    },
    open: { 
      height: "auto", 
      opacity: 1,
      y: 0,
      transition: { 
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        y: { type: "spring", stiffness: 500, damping: 30 }
      }
    }
  };

  const singerGridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const getInitialLoadVariant = (index: number) => ({
    hidden: { 
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotateY: -15,
      rotateZ: index % 2 === 0 ? -3 : 3,
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        mass: 1.3,
        delay: 0.3 + (index * 0.2)
      }
    }
  });
  
  const singerItemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 350, 
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: { 
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };

  const noResultsVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 30
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        delay: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      transition: { duration: 0.2 }
    }
  };

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredSingers(singers);
    } else {
      const filtered = singers.filter(singer => 
        selectedTags.every(tag => singer.tags.includes(tag))
      );
      setFilteredSingers(filtered);
    }

    if (selectedTags.length > 0) {
      setHasFilteredOnce(true);
    }
  }, [selectedTags]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTag = (tag: SingerTag) => {
    setHasFilteredOnce(true);
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearAllTags = () => {
    setHasFilteredOnce(true);
    setSelectedTags([]);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };
  
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": singers.map((singer, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Person",
                "name": singer.name,
                "url": `https://emeraldsingers.github.io/#/singer/${singer.slug}`,
                "image": `https://emeraldsingers.github.io${singer.image}`
            }
        }))
    }
  };

  const handlePlayToggle = (singerSlug: string) => {
    if (playingSinger === singerSlug) {
      setPlayingSinger(null);
    } else {
      setPlayingSinger(singerSlug);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
            {JSON.stringify(webPageJsonLd)}
        </script>
      </Helmet>

      {/* Add animated background and floating elements */}
      <AnimatedBackground theme={theme} />
      <FloatingElements theme={theme} />
      <StarryBackground theme={theme} />
      
      <div className="min-h-screen flex flex-col" ref={containerRef}>
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 md:py-24 flex-grow relative z-10">
          <motion.div 
            variants={itemVariants}
            className="mb-6 flex flex-col"
          >
            <h1 className="text-4xl font-bold text-primary mb-8 text-center">
              Our Singers
            </h1>
            
            <div className="flex justify-center mb-4">
              <Button
                onClick={toggleFilterPanel}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {isFilterPanelOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex justify-center mb-6">
              {selectedTags.length > 0 && (
                <Button
                  onClick={clearAllTags}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear all filters ({selectedTags.length})
                </Button>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {isFilterPanelOpen && (
              <motion.div 
                initial="closed"
                animate="open"
                exit="closed"
                variants={filterPanelVariants}
                className="overflow-hidden mb-8"
              >
                <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-primary/20 max-w-3xl mx-auto shadow-lg">
                  <div className="space-y-3">
                    {tagCategories.map(category => (
                      <div key={category.name} className="mb-2">
                        <h3 className="text-xs font-medium text-muted-foreground mb-1">{category.name}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {category.tags.map(tag => {
                            const isSelected = selectedTags.includes(tag as SingerTag);
                            
                            return (
                              <button
                                key={tag}
                                onClick={() => toggleTag(tag as SingerTag)}
                                className={cn(
                                  tagDisplay[tag as SingerTag].color,
                                  "px-2 py-0.5 rounded-full text-xs font-medium transition-colors",
                                  isSelected ? "ring-1 ring-primary" : "opacity-80 hover:opacity-100"
                                )}
                              >
                                {tagDisplay[tag as SingerTag].label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

              <motion.div 
            variants={singerGridVariants}
                initial="hidden"
                animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence>
              {isLoading ? (
              <motion.div
                  className="col-span-full flex justify-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </motion.div>
              ) : filteredSingers.length > 0 ? (
                filteredSingers.map((singer, index) => (
                    <motion.div
                      key={singer.slug}
                    className="h-full"
                      variants={hasFilteredOnce ? singerItemVariants : getInitialLoadVariant(index)}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                  >
                    <SingerCardWithAudio 
                      singer={singer} 
                      theme={theme} 
                      isPlaying={playingSinger === singer.slug}
                      onPlayToggle={handlePlayToggle}
                      />
                    </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full text-center py-20"
                  variants={noResultsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className={`text-2xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    No singers found
                  </div>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    Try adjusting your filters or check back later for new voices.
                  </p>
                  <Button
                    onClick={clearAllTags}
                    className={`mt-6 ${theme === 'dark' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                  >
                    Clear all filters
                  </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Singers;
