import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Users, RefreshCw, Disc, Music, Headphones, Mic, Radio, Zap, FileAudio, Waves } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";
const MatrixRain = ({ opacity = 0.2 }: { opacity?: number }) => {
  const characters = useMemo(() => {
    return '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン#$%&あいうえおかきくけこがぎぐげござじずぜぞさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをんきゃきゅきょしゃしゅしょちゃちゅちょにゃにゅにょひゃひゅひょみゃみゅみょりゃりゅりょ日月火水木金土人山川田口目耳手足心力女男子学校先生時車白黒赤青花空海石犬猫魚鳥雨風音森林本紙画話文名年生先友家道店前後東西南北道場光電気食飲会社書店銀駅地図外内国'.split('');
  }, []);
  
  const columns = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      chars: Array.from({ length: 15 }, () => characters[Math.floor(Math.random() * characters.length)]),
      x: Math.random() * 100,
      speed: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.25
    }));
  }, [characters]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {columns.map((column, i) => (
        <div 
          key={i} 
          className="absolute top-0 text-emerald-400 font-mono text-sm"
          style={{ 
            left: `${column.x}%`,
            opacity: column.opacity * opacity,
            transform: 'translateZ(0)'
          }}
        >
          {column.chars.map((char, j) => (
            <motion.div
              key={j}
              initial={{ y: -20 * j, opacity: 0 }}
              animate={{ y: [null, window.innerHeight], opacity: [0, 1, 0] }}
              transition={{
                duration: column.speed * 5,
                repeat: Infinity,
                delay: j * 0.15,
                ease: "linear"
              }}
            >
              {char}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

const RotatingCube = ({ 
  size = 100, 
  color = "#42F0A5", 
  opacity = 0.3,
  style = {}
}: { 
  size?: number, 
  color?: string, 
  opacity?: number,
  style?: React.CSSProperties
}) => {
  return (
    <div className="cube-container" style={{ width: size, height: size, ...style }}>
      <motion.div 
        className="cube"
        animate={{ 
          rotateX: [0, 360], 
          rotateY: [0, 360] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ width: size, height: size }}
      >
        <div className="cube-face front" style={{ backgroundColor: color, opacity, width: size, height: size, transform: `translateZ(${size/2}px)` }} />
        <div className="cube-face back" style={{ backgroundColor: color, opacity, width: size, height: size, transform: `rotateY(180deg) translateZ(${size/2}px)` }} />
        <div className="cube-face right" style={{ backgroundColor: color, opacity, width: size, height: size, transform: `rotateY(90deg) translateZ(${size/2}px)` }} />
        <div className="cube-face left" style={{ backgroundColor: color, opacity, width: size, height: size, transform: `rotateY(-90deg) translateZ(${size/2}px)` }} />
        <div className="cube-face top" style={{ backgroundColor: color, opacity, width: size, height: size, transform: `rotateX(90deg) translateZ(${size/2}px)` }} />
        <div className="cube-face bottom" style={{ backgroundColor: color, opacity, width: size, height: size, transform: `rotateX(-90deg) translateZ(${size/2}px)` }} />
      </motion.div>
    </div>
  );
};

const ParticleEffect = ({ count = 50, color = "#42F0A5" }: { count?: number, color?: string }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      },
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 20 + 10
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            x: `${particle.x}%`,
            y: `${particle.y}%`
          }}
          animate={{
            x: [`${particle.x}%`, `${particle.x + particle.velocity.x * 20}%`],
            y: [`${particle.y}%`, `${particle.y + particle.velocity.y * 20}%`],
            opacity: [particle.opacity, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const CircuitBoard = ({ theme }: { theme: string }) => {
  const lineColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.3)' : 'rgba(38, 157, 128, 0.3)';
  const nodeColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.5)' : 'rgba(38, 157, 128, 0.5)';
  
  const circuits = useMemo(() => {
    return Array.from({ length: 8 }, () => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const nodes = Math.floor(Math.random() * 3) + 2;
      
      const path = [];
      let currentX = startX;
      let currentY = startY;
      
      path.push({ x: currentX, y: currentY });
      
      for (let i = 0; i < nodes; i++) {
        // Decide direction: 0 = horizontal, 1 = vertical
        const direction = Math.round(Math.random());
        
        if (direction === 0) {
          currentX += (Math.random() * 20) - 10;
        } else {
          currentY += (Math.random() * 20) - 10;
        }
        
        // Keep within bounds
        currentX = Math.max(0, Math.min(100, currentX));
        currentY = Math.max(0, Math.min(100, currentY));
        
        path.push({ x: currentX, y: currentY });
      }
      
      return {
        path,
        delay: Math.random() * 5,
        duration: Math.random() * 2 + 2,
        pulseDelay: Math.random() * 10
      };
    });
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {circuits.map((circuit, i) => (
        <div key={i} className="absolute inset-0">
          <svg className="absolute w-full h-full">
            <motion.path
              d={`M ${circuit.path.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
              stroke={lineColor}
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{
                pathLength: { duration: circuit.duration, delay: circuit.delay },
                opacity: { duration: 0.5, delay: circuit.delay }
              }}
            />
            
            {circuit.path.map((node, j) => (
              <motion.circle
                key={j}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="2"
                fill={nodeColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.7]
                }}
                transition={{
                  duration: 0.5,
                  delay: circuit.delay + (j * 0.2),
                }}
              />
            ))}
            
            {/* Pulse effect along the circuit */}
            <motion.circle
              r="3"
              fill={theme === 'dark' ? '#42F0A5' : '#38D995'}
              opacity={0.8}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                offsetDistance: ['0%', '100%']
              }}
              transition={{
                duration: circuit.duration * 1.5,
                delay: circuit.pulseDelay,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 5
              }}
              style={{
                offsetPath: `path("M ${circuit.path.map(p => `${p.x}% ${p.y}%`).join(' L ')}")`,
                offsetRotate: "0deg"
              }}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

const TypingText = ({ text, className = "", delay = 0, speed = 50 }: { 
  text: string, 
  className?: string, 
  delay?: number,
  speed?: number 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;
    
    const startTyping = () => {
      timeout = setTimeout(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.substring(0, charIndex + 1));
          charIndex++;
          startTyping();
        } else {
          setIsComplete(true);
        }
      }, speed);
    };
    
    const delayTimeout = setTimeout(() => {
      startTyping();
    }, delay);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, delay, speed]);
  
  return (
    <div className={`${className} font-mono relative`}>
      {displayedText}
      {!isComplete && (
        <motion.span 
          className="inline-block w-2 h-4 bg-primary ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  );
};

const HolographicWarning = ({ theme }: { theme: string }) => {
  const warningColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.8)' : 'rgba(38, 157, 128, 0.7)';
  
  return (
    <motion.div 
      className="absolute top-5 left-5 flex items-center gap-2 font-mono text-xs pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <motion.div 
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: warningColor }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ color: warningColor }}
      >
        SYSTEM ERROR: LOCATION NOT FOUND
      </motion.div>
    </motion.div>
  );
};

const NotFound = () => {
  const { theme } = useTheme();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isGlitching, setIsGlitching] = useState(false);
    const [glitchIntensity, setGlitchIntensity] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [showGlitchOverlay, setShowGlitchOverlay] = useState(false);
    
    const [floatingIcons, setFloatingIcons] = useState<Array<{
      icon: React.ReactNode;
      x: number;
      y: number;
      size: number;
      rotation: number;
      delay: number;
    }>>([]);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const backgroundX = useTransform(mouseX, [-500, 500], [50, -50]);
    const backgroundY = useTransform(mouseY, [-500, 500], [50, -50]);

    const glitchText = (text: string) => {
      if (!isGlitching) return text;
      
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?|';
      const glitchChance = glitchIntensity * 0.2;
      
      return text.split('').map((char, i) => {
        if (Math.random() < glitchChance) {
          return characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return char;
      }).join('');
    };
    
    useEffect(() => {
      const icons = [
        <Mic key="mic" />, <Music key="music" />, <Headphones key="headphones" />, 
        <Radio key="radio" />, <FileAudio key="fileaudio" />, 
        <Disc key="disc" />, <Waves key="waves" />, <Zap key="zap" />
      ];
      
      const newFloatingIcons = Array(15).fill(0).map(() => ({
        icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 24 + 12,
        rotation: Math.random() * 360,
        delay: Math.random() * 5
      }));
      
      setFloatingIcons(newFloatingIcons);
    }, []);
    
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const newX = e.clientX - centerX;
          const newY = e.clientY - centerY;
          
          mouseX.set(newX);
          mouseY.set(newY);
          setMousePosition({ x: newX, y: newY });
    }
  };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, [mouseX, mouseY]);
    
    useEffect(() => {
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() > 0.7;
        if (shouldGlitch) {
          setIsGlitching(true);
          setGlitchIntensity(Math.random() * 5);
          setTimeout(() => {
            setIsGlitching(false);
          }, 200 + Math.random() * 500);
        }
      }, 2000);
      
      
      return () => {
        clearInterval(glitchInterval);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, []);
    
    const handle404Click = () => {
      setClickCount(prev => prev + 1);
      
      if (clickCount >= 3) {
        setShowEasterEgg(true);
        
        if (!audioPlaying) {
          const audio = new Audio('/easter-egg-sound.mp3');
          audioRef.current = audio;
          audio.volume = 0.5;
          audio.play().catch(e => console.error("Audio playback failed:", e));
          setAudioPlaying(true);
        }
    }
  };

  return (
      <>
                  
      <Helmet>
          <title>404 - Page Not Found | Emerald Project</title>
          <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>
        
        <div 
          ref={containerRef}
          className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        >
          <AnimatedBackground theme={theme} />
          <FloatingElements theme={theme} />
          <StarryBackground theme={theme} />
          
          <MatrixRain opacity={theme === 'dark' ? 0.15 : 0.1} />
          <ParticleEffect count={30} color={theme === 'dark' ? "#42F0A5" : "#38D995"} />
          <CircuitBoard theme={theme} />
          
          <motion.div 
            className="absolute inset-0 z-0 opacity-30"
            style={{ 
              backgroundImage: theme === 'dark' 
                ? 'linear-gradient(rgba(66, 240, 165, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(66, 240, 165, 0.1) 1px, transparent 1px)'
                : 'linear-gradient(rgba(38, 157, 128, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(38, 157, 128, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              x: backgroundX,
              y: backgroundY
            }}
          />
          
          {floatingIcons.map((icon, i) => (
        <motion.div
              key={i}
              className={`absolute text-primary/20 pointer-events-none`}
              style={{ 
                top: `${icon.y}%`, 
                left: `${icon.x}%`,
                fontSize: `${icon.size}px`,
                rotate: icon.rotation
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                rotate: [icon.rotation, icon.rotation + 20, icon.rotation]
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: icon.delay,
                ease: "easeInOut"
              }}
        >
              {icon.icon}
          </motion.div>
          ))}
          
          <AnimatePresence>
            {isGlitching && (
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 * glitchIntensity }}
                exit={{ opacity: 0 }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay'
                }}
              />
            )}
          </AnimatePresence>
          
          <div className="container mx-auto px-4 py-16 z-10 text-center">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`text-[12rem] md:text-[20rem] font-bold leading-none select-none ${
                  isGlitching 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600' 
                    : 'text-primary'
                }`}
                style={{
                  textShadow: isGlitching 
                    ? `${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 10px rgba(66, 240, 165, 0.5)` 
                    : '0 0 20px rgba(66, 240, 165, 0.3)',
                  filter: isGlitching ? 'hue-rotate(30deg)' : 'none'
                }}
                animate={isGlitching ? {
                  x: [0, -5, 5, -3, 0],
                  skew: [0, -2, 2, 0]
                } : {}}
                onClick={handle404Click}
              >
            404
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold mb-4 text-primary relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                textShadow: isGlitching 
                  ? `${Math.random() * 3 - 1.5}px ${Math.random() * 3 - 1.5}px 5px rgba(66, 240, 165, 0.5)` 
                  : '0 0 10px rgba(66, 240, 165, 0.2)'
              }}
            >
              {isGlitching ? glitchText("Signal Lost") : "Signal Lost"}
              
              {isGlitching && (
                <>
                  <span className="absolute inset-0 text-red-500 opacity-70" style={{ left: `${Math.random() * 6 - 3}px` }}>
                    {glitchText("Signal Lost")}
                  </span>
                  <span className="absolute inset-0 text-blue-500 opacity-70" style={{ left: `${Math.random() * 6 - 3}px` }}>
                    {glitchText("Signal Lost")}
                  </span>
                </>
              )}
          </motion.h1>
          
            <motion.p 
              className="text-lg mb-8 max-w-md mx-auto text-primary/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <TypingText 
                text="The virtual singer you're looking for has gone off-stage or never existed in our database. System unable to locate requested resource."
                delay={800}
                speed={30}
                className={isGlitching ? "glitching-text" : "text-primary/80"}
              />
          </motion.p>
          
          <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
          >
              <Button asChild size="lg" className="gap-2 min-w-[160px]">
              <Link to="/">
                  <Home className="h-5 w-5" /> Home Stage
              </Link>
            </Button>
            
              <Button asChild variant="outline" size="lg" className="gap-2 min-w-[160px]">
              <Link to="/singers">
                  <Users className="h-5 w-5" /> All Singers
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
                className="gap-2 min-w-[160px]"
                onClick={() => navigate(-1)}
              >
                <RefreshCw className="h-5 w-5" /> Go Back
              </Button>
            </motion.div>
            
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  className="mt-16 p-6 border border-emerald-500/30 rounded-lg bg-black/20 backdrop-blur-sm max-w-xl mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-emerald-400">Hidden Track Found!</h2>
                  <p className="mb-4">You've discovered a secret message from the digital void. The missing singer is composing in the space between data packets...</p>
                  
                  <div className="relative h-20 bg-black/30 rounded-md overflow-hidden mb-4">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        background: [
                          "linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.3) 50%, rgba(16,185,129,0) 100%)",
                          "linear-gradient(90deg, rgba(16,185,129,0) 100%, rgba(16,185,129,0.3) 50%, rgba(16,185,129,0) 0%)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center gap-1">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-emerald-500"
                          animate={{ 
                            height: [
                              Math.random() * 10 + 5, 
                              Math.random() * 30 + 10, 
                              Math.random() * 5 + 2,
                              Math.random() * 20 + 5
                            ] 
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            repeatType: "reverse",
                            delay: i * 0.05
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
                    onClick={() => {
                      if (audioRef.current) {
                        if (audioPlaying) {
                          audioRef.current.pause();
                        } else {
                          audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
                        }
                        setAudioPlaying(!audioPlaying);
                      }
                    }}
                  >
                    {audioPlaying ? (
                      <>Stop Transmission</>
                    ) : (
                      <>Play Transmission</>
                    )}
            </Button>
          </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden opacity-10">
            <div className="absolute inset-0" style={{
              background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)',
              backgroundSize: '100% 2px',
              animation: 'scanline 10s linear infinite',
            }}></div>
          </div>
          
          <AnimatePresence>
            {showGlitchOverlay && (
              <motion.div 
                className="fixed inset-0 z-30 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute inset-0 bg-primary/10" style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay',
                  transform: `skew(${Math.random() * 10 - 5}deg, ${Math.random() * 10 - 5}deg)`,
                }} />
                
                <div className="absolute inset-0 bg-red-500/10" style={{ 
                  left: `${Math.random() * 10 - 5}px`,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay'
                }} />
                
                <div className="absolute inset-0 bg-blue-500/10" style={{ 
                  left: `${Math.random() * 10 - 5}px`,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay'
                }} />
        </motion.div>
            )}
          </AnimatePresence>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes scanline {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(100%);
              }
            }
            
            .glitch {
              position: relative;
            }
            
            .glitch::before,
            .glitch::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            
            .glitch::before {
              left: 2px;
              text-shadow: -1px 0 #00ffaa;
              clip: rect(24px, 550px, 90px, 0);
              animation: glitch-anim-2 3s infinite linear alternate-reverse;
            }
            
            .glitch::after {
              left: -2px;
              text-shadow: -1px 0 #ff00aa;
              clip: rect(85px, 550px, 140px, 0);
              animation: glitch-anim 2.5s infinite linear alternate-reverse;
            }
            
            @keyframes glitch-anim {
              0% {
                clip: rect(52px, 9999px, 41px, 0);
              }
              20% {
                clip: rect(19px, 9999px, 18px, 0);
              }
              40% {
                clip: rect(11px, 9999px, 51px, 0);
              }
              60% {
                clip: rect(82px, 9999px, 69px, 0);
              }
              80% {
                clip: rect(31px, 9999px, 81px, 0);
              }
              100% {
                clip: rect(23px, 9999px, 34px, 0);
              }
            }
            
            @keyframes glitch-anim-2 {
              0% {
                clip: rect(25px, 9999px, 54px, 0);
              }
              20% {
                clip: rect(67px, 9999px, 31px, 0);
              }
              40% {
                clip: rect(14px, 9999px, 85px, 0);
              }
              60% {
                clip: rect(75px, 9999px, 5px, 0);
              }
              80% {
                clip: rect(37px, 9999px, 92px, 0);
              }
              100% {
                clip: rect(8px, 9999px, 56px, 0);
              }
            }
            
            .glitching-text {
              position: relative;
              text-shadow: 0 0 5px rgba(66, 240, 165, 0.5);
              animation: text-flicker 0.2s ease-in-out infinite alternate;
            }
            
            @keyframes text-flicker {
              0% {
                opacity: 0.8;
                text-shadow: 0 0 5px rgba(66, 240, 165, 0.5);
              }
              100% {
                opacity: 1;
                text-shadow: 0 0 10px rgba(66, 240, 165, 0.8);
              }
            }
            
            /* Cube styles */
            .cube-container {
              perspective: 1000px;
              position: absolute;
              transform-style: preserve-3d;
              pointer-events: none;
            }
            
            .cube {
              position: relative;
              width: 100%;
              height: 100%;
              transform-style: preserve-3d;
            }
            
            .cube-face {
              position: absolute;
              top: 0;
              left: 0;
              border: 1px solid rgba(66, 240, 165, 0.5);
              box-shadow: 0 0 10px rgba(66, 240, 165, 0.3);
              backdrop-filter: blur(2px);
            }
          `}} />
          
          <RotatingCube size={60} opacity={0.2} style={{ top: '15%', left: '10%' }} />
          <RotatingCube size={40} opacity={0.15} style={{ top: '70%', right: '15%' }} />
          <RotatingCube size={80} opacity={0.1} style={{ top: '40%', right: '5%' }} />
          
          <HolographicWarning theme={theme} />
    </div>
      </>
  );
};

export default NotFound; 