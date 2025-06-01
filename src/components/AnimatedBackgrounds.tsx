import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const AnimatedBackground = ({ theme }: { theme: string }) => {
    const { scrollYProgress } = useScroll();

    const gridY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const gridOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
    const globeY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    
    const lineColor = theme === 'dark' ? 'rgba(56, 161, 105, 0.2)' : 'rgba(56, 161, 105, 0.3)'; // Muted teal lines
    const accentLineColor = theme === 'dark' ? 'rgba(66, 200, 135, 0.3)' : 'rgba(66, 200, 135, 0.4)';
    const flareColor = theme === 'dark' ? '#42F0A5' : '#38D995';

    const pathStrings = useRef<string[]>([
        "M 0 50 Q 100 30, 200 50 T 400 50",
        "M 0 80 Q 100 70, 200 80 T 400 80",
        "M 0 110 Q 100 100, 200 110 T 400 110",
        "M 0 140 Q 100 130, 200 140 T 400 140"
    ]);

    return (
        <div 
            className="fixed inset-0 w-full h-full -z-10 overflow-hidden"
            style={{
                background: theme === 'dark' 
                    ? 'radial-gradient(circle at 80% 90%, #0E2E2B 0%, #0A1919 60%)' 
                    : 'radial-gradient(circle at 80% 90%, #A7D7C5 0%, #E0F2F1 60%)'
            }}
        >
            <motion.svg 
                className="absolute inset-0 w-full h-full"
                style={{ 
                    y: gridY,
                    opacity: gridOpacity
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
                style={{ y: globeY }}
                animate={{
                    rotate: [0, 360]
                }}
                transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <ellipse cx="50" cy="50" rx="45" ry="45" fill="none" stroke={accentLineColor} strokeWidth="0.5" />
                <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke={accentLineColor} strokeWidth="0.5" /> 
                <ellipse cx="50" cy="50" rx="45" ry="35" transform="rotate(30 50 50)" fill="none" stroke={accentLineColor} strokeWidth="0.5" />
                <ellipse cx="50" cy="50" rx="45" ry="35" transform="rotate(-30 50 50)" fill="none" stroke={accentLineColor} strokeWidth="0.5" />
                
                {[0, 60, 120].map((angle, idx) => (
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
                        opacity={0.5 + (idx * 0.1)}
                     />
                ))}
            </motion.svg>

            <motion.svg 
                className="absolute top-1/2 left-0 w-1/2 h-1/2 opacity-50 transform -translate-y-1/2"
                viewBox="0 0 400 200"
            >
                {pathStrings.current.map((path, i) => (
                    <motion.path
                        key={i}
                        d={path}
                        fill="none"
                        stroke={accentLineColor}
                        strokeWidth="0.7"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            delay: i * 0.5,
                            repeatDelay: 3,
                        }}
                    />
                ))}
            </motion.svg>
            
            <svg className="absolute inset-0 w-full h-full opacity-80">
                <path d="M 5% 20% L 30% 20% Q 32% 20% 32% 22% L 32% 28%" stroke={accentLineColor} strokeWidth="0.7" fill="none" />
                <motion.circle 
                    cx="32%" 
                    cy="28%" 
                    r="1.5" 
                    fill={flareColor} 
                    animate={{opacity: [0, 0.8, 0]}} 
                    transition={{duration: 4, repeat: Infinity, repeatDelay: 2}} 
                />
                
                <path d="M 10% 85% L 40% 85% Q 42% 85% 42% 83% L 42% 78%" stroke={accentLineColor} strokeWidth="0.7" fill="none" />
                
                <path d="M 90% 10% L 70% 70% L 60% 80%" stroke={accentLineColor} strokeWidth="0.5" fill="none" />
                
                <motion.circle 
                    cx="85%" 
                    cy="88%" 
                    r="8" 
                    fill={flareColor} 
                    opacity={0.4}
                    animate={{ scale: [1, 1.2, 1]}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut"}}
                />
            </svg>
        </div>
    );
};

export const FloatingElements = ({ theme }: { theme: string }) => {
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
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className={`absolute top-[40%] right-[8%] w-20 h-20 rounded-full ${
                    theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-200/40'
                }`}
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border opacity-20 ${
                    theme === 'dark' ? 'border-emerald-500/10' : 'border-emerald-300/20'
                }`}
            />
        </div>
    );
};

export const StarryBackground = ({ theme }: { theme: string }) => {
    const randomValues = useMemo(() => {
      const starPositions = Array(20).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 3
      }));
      
      const orbPositions = Array(5).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 100 + 50,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 12
      }));
      
      const streakPositions = Array(3).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 150 + 50,
        rotation: Math.random() * 360,
        delay: Math.random() * 8
      }));
      
      const shootingStarPositions = Array(1).fill(0).map(() => ({
        x: Math.random() * 70,
        y: Math.random() * 50,
        rotation: Math.random() * 60 - 30,
        width: Math.random() * 100 + 150,
        delay: Math.random() * 5 + 5
      }));
      
      const pulsatingStarPositions = Array(5).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 2
      }));
      
      return {
        starPositions,
        orbPositions,
        streakPositions,
        shootingStarPositions,
        pulsatingStarPositions
      };
    }, []);
    
    const starColor = theme === 'dark' ? 'rgba(66, 200, 135, 0.8)' : 'rgba(56, 161, 105, 0.9)';
    const orbColor = theme === 'dark' ? 'rgba(66, 200, 135, 0.15)' : 'rgba(56, 161, 105, 0.25)';
    const streakColor = theme === 'dark' ? 'rgba(66, 200, 135, 0.1)' : 'rgba(56, 161, 105, 0.2)';
    const shootingStarColor = theme === 'dark' ? '#42F0A5' : '#38D995';
    const pulsatingStarColor = theme === 'dark' ? '#4eff9e' : '#20c27b';
  
    return (
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {randomValues.starPositions.map((star, i) => (
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
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
  
        {randomValues.orbPositions.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: orb.size + 'px',
              height: orb.size + 'px',
              top: orb.y + '%',
              left: orb.x + '%',
              backgroundColor: orbColor,
              opacity: 0.1 + Math.random() * 0.2,
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
            }}
          />
        ))}
  
        {randomValues.streakPositions.map((streak, i) => (
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
              opacity: [0, 0.3, 0],
              width: [0, streak.width, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: streak.delay,
              repeatDelay: 8,
            }}
          />
        ))}
        
        {randomValues.shootingStarPositions.map((star, i) => (
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
              repeatDelay: 15,
              delay: star.delay,
              ease: "easeOut"
            }}
          />
        ))}
        
        {randomValues.pulsatingStarPositions.map((star, i) => (
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