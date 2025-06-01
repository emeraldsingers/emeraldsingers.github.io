import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet-async';
import {
    ChevronLeft,
    ChevronRight,
    Download,
    HelpCircle,
    Home,
    Users,
    FileText,
    Moon,
    Sun,
    Brush,
    Cake,
    Ruler,
    Weight,
    Gem,
    User,
    Bot,
    MessageCircleQuestionIcon,
    LucideMessageCircleX,
    Cat,
    Album,
    BriefcaseBusiness,
    Play,
    Pause,
    MessageCircleQuestion,
    Maximize2,
    Minimize2,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import Footer from "@/components/Footer";

const singersData = {
    akizora: {
        name: "Akizora",
        cv: "Seejiu",
        images: ["/images/akizora.webp", "/images/akizora-2.webp", "/images/akizora-3.webp"],
        authors: { "/images/akizora.webp": "rxko", "/images/akizora-2.webp": "JustKAMAZ", "/images/akizora-3.webp": "KambaL" },
        audioSamples: ["/samples/akizora/akizora-sample1.mp3", "/samples/akizora/akizora-sample2.mp3"],
        description: "Akizora is a versatile human female virtual singer known for her clear and balanced vocal tone.",
        characterData: {
            Species: "Human",
            Gender: "Female",
            Age: "17 years old",
            Height: "165cm",
            Weight: "51kg",
            Birthday: "Doesn't remember",
            Stone: "Fluorite",
        },
        colors: { 
            light: 'rgb(21,188,206)',
            dark: 'rgb(40,216,229)', 
        },
        voicebanks: {
            CVVC: {
                url: "https://mega.nz/file/vrYlyQoa#cY-N8DzP3-nKZ9VcfOsaUlhJl98fr2brbfm2TovMegk",
                vocalModes: [
                    { name: "CVVC Normal", description: "CVVC Balanced and clear vocal tone", sample: "/samples/akizora/akizora-samplecvvc.mp3"},
                ]
            },
        },
        videoDemos: [ 
            {
                url: "https://www.youtube.com/embed/70_UaoD5J5c", 
                title: "【Akizora CVVC】 JUMPIN' OVER ! 【Emerald Project UTAUカバー】"
            },
        ]
    },
    asoqwer: {
        name: "Asoqwer",
        cv: "Asoqwer",
        images: ["/images/asoqwer.webp"],
        authors: { "/images/asoqwer.webp": "wtyssll" },
        description: "Asoqwer is a Neko male virtual singer with a range of voicebanks including CVVC and VCV, offering normal, whisper, and power tones.",
        characterData: {
            Species: "Neko",
            Gender: "Male",
            Age: "17 years old",
            Height: "168 cm",
            Weight: "50 kg",
            Birthday: "23.03",
            Stone: "Amber",
        },
        colors: {
            light: 'rgb(145, 36, 36)', 
            dark: 'rgb(255, 83, 83)', 
        },
        voicebanks: {
            CVVC: {
                url: "https://mega.nz/file/z6wVAC4I#KzbDLjtkegUyKfMKyWdTIdVro0EqSa01vyq-zWEj8hM",
                vocalModes: [
                    { name: "CVVC Normal", description: "CVVC Balanced and clear vocal tone", sample: "/samples/asoqwer/asoqwer-samplecvvcnormal.mp3"},
                    { name: "CVVC Whisper", description: "CVVC Whisper soft voice", sample: "/samples/asoqwer/asoqwer-samplecvvcwhisper.mp3" },
                    { name: "CVVC Power", description: "CVVC Strong voice", sample: "/samples/asoqwer/asoqwer-samplecvvcpower.mp3" }
                ]
            },
            VCV: {
                url: "https://mega.nz/file/6nh0nLiK#Vo7lP9BISClKdaRI2c1mcwYWZ_BpFuP5ePou3IlW30E",
                vocalModes: [
                    { name: "VCV Normal", description: "VCV balanced and clear vocal tone", sample: "/samples/asoqwer/asoqwer-samplevcvnormal.mp3" },
                    { name: "VCV Power", description: "VCV strong voice", sample: "/samples/asoqwer/asoqwer-samplevcvpower.mp3" },
                    { name: "VCV Weak", description: "VCV weak relaxed voice", sample: "/samples/asoqwer/asoqwer-samplevcvweak.mp3" },
                ]
            },
            "RVC Normal": {
                url: "https://www.weights.com/ru/models/cm6koudmc2ieknh192auqw96e",
                vocalModes: [
                { name: "RVC Normal", description: "75e 3450step 8 batch-size", sample: "/samples/asoqwer/asoqwer-rvc-sample.mp3" }
                ]
            },
            "RVC Raspy": {
                url: "https://www.weights.com/ru/models/cm6kp6gf02erlpj19y1va7czf",
                vocalModes: [
                { name: "RVC Raspy", description: "300e 15600step 8 batch-size", sample: "/samples/asoqwer/asoqwer-rvc-raspy.mp3" }
                ]
            }
        },
        videoDemos: [ 
            {
                url: "https://www.youtube.com/embed/QRIUFGFhuKk",
                title: "【Asoqwer VCV】 Hello Worker - KEI 【Emerald Project UTAUカバー】"
            },
            {
                url: "https://www.youtube.com/embed/vBb_PVDeP9c",
                title: "【Asoqwer VCV】 1000年生きてる | living millennium - いよわ【UTAUカバー】"
            },
            {
                url: "https://www.youtube.com/embed/xHtAsrCGc_k",
                title: "【asoqwer VCV】うらぽしゃ | Urapocere - Iyowa 【UTAUカバー】 + UST"
            },
            {
                url: "https://www.youtube.com/embed/v6ZwyaaHlkw",
                title: "【Asoqwer VCV】 今際の際 | IMAWANOKIWA - いよわ【UTAUカバー】 +Voicebank Release"
            }
        ]
    },
    "emerald": {
        name: "Emerald",
        cv: "SouЯ",
        images: ["/images/Emerald2025NoLogo.webp"],
        authors: { "/images/Emerald2025NoLogo.webp": "SouЯ" },
        description: "Emerald is a Devil male virtual singer with versatile CVVC and CVC RUS voicebanks, featuring normal, childish, dark, and soft tones.",
        characterData: {
            Species: "Devil",
            Gender: "Male",
            Age: "14 years old",
            Height: "158 cm",
            Weight: "Unknown",
            Birthday: "15.09",
            Stone: "Emerald",
        },
        colors: {
            light: 'rgb(91, 139, 107)',
            dark: 'rgb(0, 255, 42)',
        },
        voicebanks: {
            CVVC: {
                url: "https://mega.nz/file/X75EUZbB#IsI5ufOYEJpIqtLLpYH-daxGFYzZjPxuFfA5YR4itTs",
                vocalModes: [
                    { name: "Normal", description: "Universal neutral tone", sample: "/samples/emerald/emerald_normalcvvc.mp3" },
                    { name: "Childish", description: "A light and ringing voice with a childish tone", sample: "/samples/emerald/emerald_childishcvvc.mp3" },
                    { name: "Dark", description: "Deep and rich tone with a serious undertone", sample: "/samples/emerald/emerald_darkcvvc.mp3" },
                    { name: "Soft", description: "Soft and calm tone", sample: "/samples/emerald/emerald_softcvvc.mp3" },
                ]
            },
            "CVC RUS": {
                url: "https://mega.nz/file/O2p0gShD#_J9erU9itDXAavdCytTjB7LczUWuS4_ebyX4jw58aFQ",
                vocalModes: [
                    { name: "Normal", description: "Standard expressive voice", sample: "/samples/emerald/emerald_normalcvcrus.mp3" },
                    { name: "Childish", description: "Bright and naive timbre with a youthful tone", sample: "/samples/emerald/emerald_chldishcvcrus.mp3" },
                    { name: "Dark", description: "Dark and dramatic voice", sample: "/samples/emerald/emerald_darkcvcrus.mp3" },
                    { name: "Soft", description: "A quiet and velvety voice", sample: "/samples/emerald/emerald_softcvcrus.mp3" },
                ]
            }
        },
        videoDemos: [
            {
                url: "https://www.youtube.com/embed/EpeqkWKsUMk",
                title: "[Emerald CVC RUS] V.3.6.0 Release - multipitch, Dark, english phonemes "
            }
        ]
    },
    "simon-weber": {
        name: "Simon Weber",
        cv: "Beaver-P",
        images: ["/images/simon-weber-eu.webp"],
        authors: { "/images/simon-weber-eu.webp": "eulliaqzh" },
        description: "Simon Weber is a human male virtual singer with CVVC voicebanks, offering normal and power vocal tones.",
        audioSamples: ["/samples/simon/simon-sample1.mp3", "/samples/simon/simon-sample2.mp3"],
        characterData: {
            Species: "Human",
            Gender: "Male",
            Age: "18 years old",
            Height: "187cm",
            Weight: "80kg",
            Birthday: "01.08",
            Stone: "Carneol",
        },
        colors: {
            light: 'rgb(255, 136, 0)', 
            dark: 'rgb(255, 119, 0)', 
        },
        voicebanks: { 
            CVVC: {
                url: "https://mega.nz/file/uyRyRBJT#eJm82-F24dcLjxmd_liIrk5MqsPcsY22vHTPMahRgyE",
                vocalModes: [
                    { name: "CVVC Normal", description: "CVVC Normal tone", sample: "/samples/simon/simon-samplecvvc.mp3" },
                    { name: "CVVC Power", description: "CVVC Strong voice", sample: "/samples/simon/simon-samplecvvcpower.mp3" },
                ]

            }
        },
        videoDemos: [ 
            {
                url: "https://www.youtube.com/embed/F2JMYiLiNIk", 
                title: "【SIMON WEBER DEMO】 WAVE 【Emerald Project UTAUカバー】"
            }
        ]
    },
    mitsuo: {
        name: "Mitsuo",
        cv: "Mitsuo",
        images: ["/images/mitsuo.webp"],
        authors: { "/images/mitsuo.webp": "povidlosecret" },
        description: "Mitsuo is a human male virtual singer primarily available as an RVC model.",
        audioSamples: ["/samples/mitsuo/mitsuo-sample1.mp3", "/samples/mitsuo/mitsuo-sample2.mp3"],
        characterData: {
            Species: "Human",
            Gender: "Male",
            Age: "17 years old",
            Height: "178cm",
            Weight: "65kg",
            Birthday: "19.06",
            Stone: "Opal",
        },
        colors: {
            light: 'rgb(59,162,228)', 
            dark: 'rgb(255, 85, 0)',
        },
        voicebanks: {
            RVC: {
                url: "https://www.weights.com/ru/models/cm7p25bsz66jto915lydx2sfx",
                vocalModes: [
                    { name: "RVC", description: "680e 50 min", sample: "/samples/mitsuo/mitsuorvc.mp3" }
                ]
            }
        },
        videoDemos: [
            {
                url: "https://www.youtube.com/embed/fRvdPqekcAY",
                title: "【MITSUO DEMO】 虚無さん | Nihil-san - ¿?shimon 【Emerald Project Russian UTAUカバー】"
            }
        ]
    },
    
};


interface AudioVisualizationProps {
    audioRef: React.RefObject<HTMLAudioElement>;
    isPlaying: boolean;
    theme: 'light' | 'dark';
    singerColors: { light: string; dark: string };
    src: string;
}


const AudioVisualization: React.FC<AudioVisualizationProps> = ({ audioRef, isPlaying, theme, singerColors, src }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    
    const setupCompletedRef = useRef<boolean>(false);

    const setupAudioAnalyzer = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return false;
        
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume().catch(e => console.error("Error resuming AudioContext:", e));
            }
            
            if (!analyserRef.current) {
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 2048;
            }
            
            const needNewSource = !sourceRef.current || sourceRef.current.mediaElement !== audio;
            
            if (needNewSource) {
                if (sourceRef.current) {
                    try { sourceRef.current.disconnect(); } catch (e) {}
                    sourceRef.current = null;
                }
                
                sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
                sourceRef.current.connect(analyserRef.current);
                analyserRef.current.connect(audioContextRef.current.destination);
            }
            
            return true;
        } catch (error) {
            console.error('Error setting up audio analyzer:', error);
            return false;
        }
    }, [audioRef]);
    
    const draw = useCallback(() => {
        if (!analyserRef.current || !isPlaying || !canvasRef.current) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = 0;
            }
            return;
        }
        
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) return;
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        analyserRef.current.getByteTimeDomainData(dataArray);
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = theme === 'light' ? singerColors.dark : singerColors.light;
        canvasCtx.beginPath();
        
        const sliceWidth = canvas.width * 1.0 / bufferLength;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height / 2);
            
            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
        
        animationFrameRef.current = requestAnimationFrame(draw);
    }, [isPlaying, theme, singerColors]);
    
    useEffect(() => {
        if (!isPlaying) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = 0;
            }
            return;
        }
        
        if (!setupCompletedRef.current) {
            setupCompletedRef.current = setupAudioAnalyzer();
        }
        
        if (setupCompletedRef.current) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            
            draw();
        }
    
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = 0;
            }
        };
    }, [isPlaying, src, draw, setupAudioAnalyzer]);
    
    useEffect(() => {
        setupCompletedRef.current = false;
    }, [src]);
    
    useEffect(() => {
        return () => {
            console.log("Cleaning up AudioVisualization component completely.");
            
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            
            if (sourceRef.current) {
                try { sourceRef.current.disconnect(); } catch(e) { console.warn("Error disconnecting source:", e); }
                sourceRef.current = null;
            }
            
            if (analyserRef.current && audioContextRef.current) {
                try { analyserRef.current.disconnect(); } catch(e) { console.warn("Error disconnecting analyser:", e); }
                analyserRef.current = null;
            }
            
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                try {
                    audioContextRef.current.close().catch(e => console.warn("Error closing AudioContext:", e));
                } catch (e) {
                    console.error("Exception closing AudioContext:", e);
                }
                audioContextRef.current = null;
            }
        };
    }, []);
    
    return (
        <motion.div 
            className="w-full overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: isPlaying ? '30px' : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <motion.canvas 
                ref={canvasRef} 
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isPlaying ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </motion.div>
    );
};

const AnimatedBackground = ({ theme, singerColors }: { theme: string, singerColors: { light: string; dark: string; } }) => {
    const { scrollYProgress } = useScroll();
    
    const currentColor = theme === 'dark' ? singerColors.dark : singerColors.light;
    
    const rgbMatch = currentColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const r = rgbMatch ? parseInt(rgbMatch[1]) : 56;
    const g = rgbMatch ? parseInt(rgbMatch[2]) : 161;
    const b = rgbMatch ? parseInt(rgbMatch[3]) : 105;
    
    const gridY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.5]);
    const globeY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const globeX = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const globeRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const wavesY = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const wavesX = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const flareOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.3]);

    const lineColor = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.2)` 
        : `rgba(${r}, ${g}, ${b}, 0.3)`;
    const accentLineColor = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.3)` 
        : `rgba(${r}, ${g}, ${b}, 0.4)`;
    const flareColor = theme === 'dark' 
        ? `rgb(${Math.min(r + 50, 255)}, ${Math.min(g + 50, 255)}, ${Math.min(b + 50, 255)})` 
        : currentColor;

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

    const gradientDark = `radial-gradient(circle at 80% 90%, rgba(${r*0.2}, ${g*0.2}, ${b*0.2}, 1) 0%, rgba(10, 25, 25, 1) 60%)`;
    const gradientLight = `radial-gradient(circle at 80% 90%, rgba(${r*0.8}, ${g*0.8}, ${b*0.8}, 0.4) 0%, rgba(240, 250, 250, 1) 60%)`;

    return (
        <div 
            className="fixed inset-0 w-full h-full -z-10 overflow-hidden"
            style={{
                background: theme === 'dark' ? gradientDark : gradientLight,
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
        </div>
    );
};

const FloatingElements = ({ theme, singerColors }: { theme: string, singerColors: { light: string; dark: string; } }) => {
    const currentColor = theme === 'dark' ? singerColors.dark : singerColors.light;
    
    const rgbMatch = currentColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const r = rgbMatch ? parseInt(rgbMatch[1]) : 56;
    const g = rgbMatch ? parseInt(rgbMatch[2]) : 161;
    const b = rgbMatch ? parseInt(rgbMatch[3]) : 105;
    
    const bgColor1 = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.1)` 
        : `rgba(${r}, ${g}, ${b}, 0.2)`;
    
    const bgColor2 = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.1)` 
        : `rgba(${r}, ${g}, ${b}, 0.4)`;
    
    const borderColor = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.1)` 
        : `rgba(${r}, ${g}, ${b}, 0.2)`;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Top left */}
            <motion.div 
                className="absolute top-20 left-[5%] w-16 h-16 rounded-full"
                style={{ backgroundColor: bgColor1 }}
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
            
            {/* Middle right */}
            <motion.div 
                className="absolute top-[40%] right-[8%] w-20 h-20 rounded-full"
                style={{ backgroundColor: bgColor2 }}
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
            
            {/* Bottom left */}
            <motion.div 
                className="absolute bottom-[20%] left-[15%] w-12 h-12 rounded-full"
                style={{ backgroundColor: bgColor1 }}
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
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border"
                style={{ borderColor }}
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
                className="absolute bottom-[30%] right-[20%] w-10 h-10 rotate-45"
                style={{ backgroundColor: bgColor2 }}
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

const StarryBackground = ({ theme, singerColors }: { theme: string, singerColors: { light: string; dark: string; } }) => {
    const currentColor = theme === 'dark' ? singerColors.dark : singerColors.light;
    
    const rgbMatch = currentColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const r = rgbMatch ? parseInt(rgbMatch[1]) : 56;
    const g = rgbMatch ? parseInt(rgbMatch[2]) : 161;
    const b = rgbMatch ? parseInt(rgbMatch[3]) : 105;
    
    const starColor = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.8)` 
        : `rgba(${r}, ${g}, ${b}, 0.9)`;
    
    const orbColor = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.15)` 
        : `rgba(${r}, ${g}, ${b}, 0.25)`;
    
    const streakColor = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.1)` 
        : `rgba(${r}, ${g}, ${b}, 0.2)`;
    
    const particleColor = theme === 'dark' 
        ? `rgba(${r}, ${g}, ${b}, 0.8)` 
        : `rgba(${r}, ${g}, ${b}, 0.8)`;
    
    const shootingStarColor = theme === 'dark'
        ? `rgb(${Math.min(r + 50, 255)}, ${Math.min(g + 50, 255)}, ${Math.min(b + 50, 255)})`
        : `rgb(${r}, ${g}, ${b})`;
    
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
      
      const particlePositions = Array(15).fill(0).map(() => ({
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
              boxShadow: `0 0 ${Math.random() * 4 + 2}px ${starColor}`,
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
              opacity: 0.1 + Math.random() * 0.3,
              transform: `rotate(${streak.rotation}deg)`,
              boxShadow: `0 0 4px ${streakColor}`,
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
              opacity: 0,
              boxShadow: `0 0 3px ${particleColor}`,
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
              backgroundColor: theme === 'dark' 
                ? `rgb(${Math.min(r + 80, 255)}, ${Math.min(g + 80, 255)}, ${Math.min(b + 80, 255)})` 
                : `rgb(${Math.min(r + 50, 255)}, ${Math.min(g + 50, 255)}, ${Math.min(b + 50, 255)})`,
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

interface SingerNotFoundDisplayProps {
    slug?: string;
    theme: string;
    setTheme: (theme: string) => void;
    navigate: ReturnType<typeof useNavigate>;
    notFoundColors: { light: string; dark: string; };
}

const SingerNotFoundDisplay: React.FC<SingerNotFoundDisplayProps> = ({ slug, theme, setTheme, navigate, notFoundColors }) => {
    return (
        <>
            <Helmet>
                <title>Singer Not Found - Emerald Project</title>
                <meta name="description" content="The singer page you requested could not be found. Explore other virtual singers from the Emerald Project." />
                <link rel="canonical" href={`https://emeraldsingers.github.io/#/404`} />
            </Helmet>
            <div className="min-h-screen flex flex-col relative overflow-hidden">
                {/* Animated backgrounds */}
                <AnimatedBackground theme={theme} singerColors={notFoundColors} />
                <FloatingElements theme={theme} singerColors={notFoundColors} />
                <StarryBackground theme={theme} singerColors={notFoundColors} />
                
                {/* Matrix Rain Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-0 font-mono text-sm"
                            style={{
                                left: `${10 * i}%`,
                                color: theme === 'dark' ? 'rgba(66, 240, 165, 0.6)' : 'rgba(38, 157, 128, 0.5)',
                                opacity: 0.15
                            }}
                        >
                            {Array.from({ length: 10 }).map((_, j) => (
                                <motion.div
                                    key={j}
                                    initial={{ y: -20 * j, opacity: 0 }}
                                    animate={{ y: [null, window.innerHeight], opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 5 + i,
                                        repeat: Infinity,
                                        delay: j * 0.2,
                                        ease: "linear"
                                    }}
                                >
                                    {String.fromCharCode(0x30A0 + j * 5)}
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>
                
                {/* Circuit Board Effect */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {[
                        { path: "M 10 20 L 30 20 L 30 40 L 50 40", delay: 0.5 },
                        { path: "M 70 80 L 90 80 L 90 60 L 70 60", delay: 1.5 },
                        { path: "M 20 70 L 20 90 L 40 90", delay: 2.5 }
                    ].map((circuit, i) => {
                        const lineColor = theme === 'dark' ? 'rgba(66, 240, 165, 0.3)' : 'rgba(38, 157, 128, 0.3)';
                        
                        return (
                            <div key={i} className="absolute inset-0">
                                <svg className="absolute w-full h-full">
                                    <motion.path
                                        d={circuit.path}
                                        stroke={lineColor}
                                        strokeWidth="1"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.8 }}
                                        transition={{
                                            pathLength: { duration: 2, delay: circuit.delay },
                                            opacity: { duration: 0.5, delay: circuit.delay }
                                        }}
                                    />
                                    
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
                                            duration: 3,
                                            delay: circuit.delay + 1,
                                            repeat: Infinity,
                                            repeatDelay: 5
                                        }}
                                        style={{
                                            offsetPath: `path("${circuit.path}")`,
                                            offsetRotate: "0deg"
                                        }}
                                    />
                                </svg>
                            </div>
                        );
                    })}
                </div>
                
                {/* Particles Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {[
                        { x: 10, y: 20, size: 2, vx: 0.2, vy: 0.1, opacity: 0.3, duration: 15 },
                        { x: 30, y: 50, size: 3, vx: -0.2, vy: 0.2, opacity: 0.4, duration: 20 },
                        { x: 70, y: 30, size: 2, vx: 0.1, vy: -0.1, opacity: 0.5, duration: 18 },
                        { x: 50, y: 80, size: 1, vx: -0.1, vy: -0.2, opacity: 0.3, duration: 25 },
                        { x: 80, y: 60, size: 2, vx: 0.2, vy: -0.1, opacity: 0.4, duration: 22 }
                    ].map((particle, i) => {
                        const color = theme === 'dark' ? '#42F0A5' : '#38D995';
                        
                        return (
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
                                    x: [`${particle.x}%`, `${particle.x + particle.vx * 20}%`],
                                    y: [`${particle.y}%`, `${particle.y + particle.vy * 20}%`],
                                    opacity: [particle.opacity, 0]
                                }}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        );
                    })}
                </div>
                
                <nav className="fixed top-0 left-0 right-0 bg-white/10 dark:bg-black/20 backdrop-blur-sm z-50 border-b border-white/20">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => navigate(-1)}
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <div className="flex items-center space-x-4">
                                    <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
                                        <Home className="h-5 w-5" />
                                    </Link>
                                    <Link to="/singers" className="text-primary hover:text-primary/80 transition-colors">
                                        <Users className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                className="rounded-full"
                            >
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </div>
                    </div>
                </nav>

                <main className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center z-10">
                    <motion.div
                        className="max-w-2xl w-full text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                            className="mb-8"
                        >
                            <motion.div
                                animate={{
                                    filter: ["drop-shadow(0 0 8px rgba(66, 240, 165, 0.3))", "drop-shadow(0 0 16px rgba(66, 240, 165, 0.6))", "drop-shadow(0 0 8px rgba(66, 240, 165, 0.3))"]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Users className="mx-auto h-32 w-32 text-primary/70" />
                            </motion.div>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-4xl font-bold text-primary mb-4"
                        >
                            <motion.span
                                animate={{
                                    textShadow: [
                                        "0 0 10px rgba(66, 240, 165, 0.3)",
                                        "0 0 20px rgba(66, 240, 165, 0.5)",
                                        "0 0 10px rgba(66, 240, 165, 0.3)"
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                        >
                            Singer Not Found
                            </motion.span>
                        </motion.h1>
                        
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-muted-foreground text-lg mb-8 font-mono relative"
                        >
                            <div className="terminal-text">
                                <p>
                                    &gt; ERROR_404: Singer "{slug}" not found in database.<br />
                                    &gt; Scanning alternative universes...<br />
                                    &gt; No results. Singer may not exist or may have been moved.
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="inline-block w-2 h-4 bg-primary ml-1"
                                    />
                                </p>
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button asChild size="lg" className="gap-2 backdrop-blur-sm bg-primary/80 hover:bg-primary/90">
                                <Link to="/singers">
                                    <Users className="h-5 w-5" /> Browse Singers
                                </Link>
                            </Button>
                            
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate(-1)}
                                className="gap-2 backdrop-blur-sm border-primary/30 hover:border-primary/50"
                            >
                                <ChevronLeft className="h-5 w-5" /> Go Back
                            </Button>
                        </motion.div>
                    </motion.div>
                </main>
                
                {/* Scanline effect */}
                <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden opacity-10">
                    <div className="absolute inset-0" style={{
                        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)',
                        backgroundSize: '100% 2px',
                        animation: 'scanline 10s linear infinite',
                    }}></div>
                </div>
                
                {/* Add global styles for animations */}
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes scanline {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(100%); }
                    }
                    
                    .terminal-text {
                        font-family: monospace;
                        line-height: 1.6;
                        text-align: left;
                        padding: 1rem;
                        background-color: rgba(0, 0, 0, 0.2);
                        border-radius: 0.5rem;
                        border: 1px solid rgba(66, 240, 165, 0.3);
                        box-shadow: 0 0 10px rgba(66, 240, 165, 0.2);
                    }
                `}} />
                
                <Footer />
            </div>
        </>
    );
};


const SingerPage: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { theme, setTheme } = useTheme();
    const currentSinger = singersData[slug as keyof typeof singersData];
    const imageRef = useRef<HTMLImageElement>(null);
    const voicebanksSectionRef = useRef<HTMLDivElement>(null);
    const [imageOpacity, setImageOpacity] = useState(1);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSampleUrl, setCurrentSampleUrl] = useState<string | null>(null);
    const [currentVocalModeSampleUrl, setCurrentVocalModeSampleUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [selectedVoicebankFormat, setSelectedVoicebankFormat] = useState<string | null>(null);

    const [expandedVideo, setExpandedVideo] = useState<{ url: string; title: string } | null>(null);

    const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');
    
    const pageTransitionVariants = {
        initial: { 
            opacity: 0,
            y: 20
        },
        animate: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };
    
    const childVariants = {
        initial: { 
            opacity: 0,
            y: 20
        },
        animate: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };
    
    const secondarySectionVariants = {
        initial: { 
            opacity: 0,
            y: 30
        },
        animate: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.8
            }
        }
    };
    
    const demoSectionVariants = {
        initial: { 
            opacity: 0,
            y: 30
        },
        animate: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 1.2
            }
        }
    };

    useEffect(() => {
        if (!currentSinger) return;
        
        const root = document.documentElement;
        const singerLightColor = currentSinger.colors?.light || 'rgb(0, 0, 0)';
        const singerDarkColor = currentSinger.colors?.dark || 'rgb(0, 0, 0)';

        root.style.setProperty('--bg-wisp-light-1', `${singerLightColor.replace('rgb', 'rgba').replace(')', ', 0.08)')}`);
        root.style.setProperty('--bg-wisp-light-2', `${singerLightColor.replace('rgb', 'rgba').replace(')', ', 0.12)')}`);
        root.style.setProperty('--bg-wisp-light-3', `${singerLightColor.replace('rgb', 'rgba').replace(')', ', 0.1)')}`);
        
        root.style.setProperty('--bg-wisp-dark-1', `${singerDarkColor.replace('rgb', 'rgba').replace(')', ', 0.12)')}`);
        root.style.setProperty('--bg-wisp-dark-2', `${singerDarkColor.replace('rgb', 'rgba').replace(')', ', 0.16)')}`);
        root.style.setProperty('--bg-wisp-dark-3', `${singerDarkColor.replace('rgb', 'rgba').replace(')', ', 0.14)')}`);

        root.style.setProperty('--bg-base-light-1', '#ffffff');
        root.style.setProperty('--bg-base-light-2', singerLightColor.replace('rgb', 'rgba').replace(')', ', 0.1)'));
        root.style.setProperty('--bg-base-dark-1', '#000000');
        root.style.setProperty('--bg-base-dark-2', singerDarkColor.replace('rgb', 'rgba').replace(')', ', 0.2)'));
        
        root.style.setProperty('--bg-gradient-light-base', `linear-gradient(to top right, var(--bg-base-light-1), var(--bg-base-light-2))`);
        root.style.setProperty('--bg-gradient-dark-base', `linear-gradient(to top right, var(--bg-base-dark-1), var(--bg-base-dark-2))`);
        root.style.setProperty('--bg-gradient-light-wisp1', `linear-gradient(110deg, transparent 35%, var(--bg-wisp-light-1) 50%, transparent 65%)`);
        root.style.setProperty('--bg-gradient-light-wisp2', `linear-gradient(-50deg, transparent 40%, var(--bg-wisp-light-2) 55%, transparent 70%)`);
        root.style.setProperty('--bg-gradient-light-wisp3', `linear-gradient(180deg, transparent 30%, var(--bg-wisp-light-3) 50%, transparent 70%)`);
        root.style.setProperty('--bg-gradient-dark-wisp1', `linear-gradient(110deg, transparent 35%, var(--bg-wisp-dark-1) 50%, transparent 65%)`);
        root.style.setProperty('--bg-gradient-dark-wisp2', `linear-gradient(-50deg, transparent 40%, var(--bg-wisp-dark-2) 55%, transparent 70%)`);
        root.style.setProperty('--bg-gradient-dark-wisp3', `linear-gradient(180deg, transparent 30%, var(--bg-wisp-dark-3) 50%, transparent 70%)`);
        
        return () => {
            root.style.removeProperty('--bg-wisp-light-1');
            root.style.removeProperty('--bg-wisp-light-2');
            root.style.removeProperty('--bg-wisp-light-3');
            root.style.removeProperty('--bg-wisp-dark-1');
            root.style.removeProperty('--bg-wisp-dark-2');
            root.style.removeProperty('--bg-wisp-dark-3');
            root.style.removeProperty('--bg-base-light-1');
            root.style.removeProperty('--bg-base-light-2');
            root.style.removeProperty('--bg-base-dark-1');
            root.style.removeProperty('--bg-base-dark-2');
            root.style.removeProperty('--bg-gradient-light-base');
            root.style.removeProperty('--bg-gradient-dark-base');
            root.style.removeProperty('--bg-gradient-light-wisp1');
            root.style.removeProperty('--bg-gradient-light-wisp2');
            root.style.removeProperty('--bg-gradient-light-wisp3');
            root.style.removeProperty('--bg-gradient-dark-wisp1');
            root.style.removeProperty('--bg-gradient-dark-wisp2');
            root.style.removeProperty('--bg-gradient-dark-wisp3');
        };
    }, [currentSinger]);

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

    const characterDataVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i: number) => ({ 
            opacity: 1, 
            x: 0,
            transition: { 
                delay: i * 0.1,
                duration: 0.3
            }
        })
    };

    const voicebankVariants = {
        initial: (direction: string) => ({
            x: direction === 'right' ? 100 : -100,
            opacity: 0
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: (direction: string) => ({
            x: direction === 'right' ? -100 : 100,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeIn" }
        })
    };

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

    const pageTitle = currentSinger ? `${currentSinger.name} - Emerald Project Singer` : "Singer Not Found - Emerald Project";
    const pageDescription = currentSinger ? currentSinger.description || `Learn more about ${currentSinger.name}, a virtual singer from the Emerald Project. Discover voicebanks, demos, and character information.` : "The singer you are looking for could not be found.";
    const canonicalUrl = currentSinger ? `https://emeraldsingers.github.io/#/singer/${slug}` : `https://emeraldsingers.github.io/#/404`;

    const notFoundColors = {
        light: 'rgb(56, 161, 105)',
        dark: 'rgb(66, 240, 165)'
    };
    
    if (!currentSinger) {
        return <SingerNotFoundDisplay 
                    slug={slug} 
                    theme={theme} 
                    setTheme={setTheme} 
                    navigate={navigate} 
                    notFoundColors={notFoundColors} 
                />;
    }

    const currentImagePath = currentSinger.images[currentImageIndex];
    const currentImageAuthor = currentSinger.authors[currentImagePath];

    const singerJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": currentSinger.name,
        "alternateName": currentSinger.cv,
        "description": pageDescription,
        "image": `https://emeraldsingers.github.io${currentSinger.images[0]}`,
        "url": canonicalUrl,
        "gender": currentSinger.characterData.Gender?.toLowerCase(),
        "height": currentSinger.characterData.Height,
        "weight": currentSinger.characterData.Weight,
        "birthDate": currentSinger.characterData.Birthday,
        "knowsAbout": "Singing, UTAU, Voice Synthesis", 
        "memberOf": {
            "@type": "Organization",
            "name": "Emerald Project",
            "url": "https://emeraldsingers.github.io/#/"
        }
    };

    const handlePrevImage = useCallback(() => {
        setImageOpacity(0);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? currentSinger.images.length - 1 : prevIndex - 1
            );
            setImageOpacity(1);
        }, 300);
    }, [currentSinger.images.length]);

    const handleNextImage = useCallback(() => {
        setImageOpacity(0);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === currentSinger.images.length - 1 ? 0 : prevIndex + 1
            );
            setImageOpacity(1);
        }, 300);
    }, [currentSinger.images.length]);

    const scrollToVoicebanks = useCallback(() => {
        voicebanksSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const getSpeciesIcon = (species: string) => {
        switch (species.toLowerCase()) {
            case "android":
                return <Bot className="inline-block mr-1 h-4 w-4" />;
            case "neko":
                return <Cat className="inline-block mr-1 h-4 w-4" />;
            case "human":
                return <User className="inline-block mr-1 h-4 w-4" />;
            default:
                return <User className="inline-block mr-1 h-4 w-4" />;
        }
    };

    const getGenderIcon = (gender: string) => {
        switch (gender.toLowerCase()) {
            case "male":
                return <LucideMessageCircleX className="inline-block mr-1 h-4 w-4" />;
            case "female":
                return <LucideMessageCircleX className="inline-block mr-1 h-4 w-4" />;
            default:
                return <MessageCircleQuestion className="inline-block mr-1 h-4 w-4" />;
        }
    };


    const handlePlaySample = useCallback((sampleUrl: string) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null;
        }

        if (currentSampleUrl === sampleUrl && isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            setCurrentSampleUrl(null);
            return;
        }

        const newAudio = new Audio(sampleUrl);
        audioRef.current = newAudio;
        setCurrentSampleUrl(sampleUrl);
        setCurrentVocalModeSampleUrl(sampleUrl);

        newAudio.onended = () => {
            setIsPlaying(false);
            setCurrentSampleUrl(null);
            setCurrentVocalModeSampleUrl(null);
        };

        newAudio.play()
            .then(() => {
                setIsPlaying(true);
            })
            .catch(error => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
                setCurrentSampleUrl(null);
                setCurrentVocalModeSampleUrl(null);
            });
    }, [isPlaying, currentSampleUrl]);

    const handlePauseSample = useCallback(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [isPlaying]);
    
    const voicebankFormats = Object.keys(currentSinger.voicebanks || {});
    const currentVoicebankFormat = selectedVoicebankFormat || (voicebankFormats.length > 0 ? voicebankFormats[0] : null);

    const handleVoicebankFormatClick = useCallback((format: string) => {
        const currentIndex = voicebankFormats.indexOf(selectedVoicebankFormat || (voicebankFormats.length > 0 ? voicebankFormats[0] : ''));
        const newIndex = voicebankFormats.indexOf(format);
        
        setAnimationDirection(newIndex > currentIndex ? 'right' : 'left');
        setSelectedVoicebankFormat(format);
    }, [selectedVoicebankFormat, voicebankFormats]);

    
    const currentVoicebank = currentVoicebankFormat ? currentSinger.voicebanks[currentVoicebankFormat] : null;
    const vocalModesToDisplay = currentVoicebank?.vocalModes || [];
    const videoDemos = currentSinger.videoDemos || []; 


    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={canonicalUrl} />
                <script type="application/ld+json">
                    {JSON.stringify(singerJsonLd)}
                </script>
            </Helmet>
            
            <AnimatedBackground theme={theme} singerColors={currentSinger.colors} />
            <FloatingElements theme={theme} singerColors={currentSinger.colors} />
            <StarryBackground theme={theme} singerColors={currentSinger.colors} />
        
            <div className="min-h-screen relative">
                <nav className="fixed top-0 left-0 right-0 bg-white/10 dark:bg-black/20 backdrop-blur-sm z-50 border-b border-white/20">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => navigate(-1)}
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <div className="flex items-center space-x-4">
                                    <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
                                        <Home className="h-5 w-5" />
                                    </Link>
                                    <Link to="/singers" className="text-primary hover:text-primary/80 transition-colors">
                                        <Users className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                className="rounded-full"
                            >
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </div>
                    </div>
                </nav>

                <motion.main 
                    key={slug}
                    className="container mx-auto px-4 pb-20 pt-32 relative z-10"
                    variants={pageTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <motion.div 
                        className="flex flex-col md:flex-row gap-8 mt-8 mb-12 items-center"
                    >
                        <div className="w-full md:w-1/2 max-w-[450px] flex justify-center">
                            <motion.div 
                                className="relative"
                                variants={childVariants}
                            >
                                <div className="relative w-full max-w-[28rem] h-auto aspect-square overflow-hidden rounded-lg mx-auto transition-opacity duration-300 shadow-lg">
                                    <img
                                        ref={imageRef}
                                        key={currentImagePath}
                                        src={currentImagePath}
                                        alt={`${currentSinger.name} artwork - Emerald Project`}
                                        className="w-full h-full object-contain bg-black/5 dark:bg-white/5"
                                        style={{ opacity: imageOpacity }}
                                    />
                                </div>
                                <motion.div 
                                    className="flex flex-row items-center justify-center mt-2 text-primary/80"
                                    variants={childVariants}
                                >
                                    <Brush className="w-5 h-5 mr-1" />
                                    {currentImageAuthor && (
                                        <p className="text-xs italic">Art by {currentImageAuthor}</p>
                                    )}
                                </motion.div>
                                {currentSinger.images.length > 1 && (
                                    <>
                                        <motion.div 
                                            className="absolute top-1/2 -translate-y-1/2 left-4"
                                            variants={childVariants}
                                        >
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={handlePrevImage}
                                                className="bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 rounded-full"
                                                aria-label="Previous Image"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute top-1/2 -translate-y-1/2 right-4"
                                            variants={childVariants}
                                        >
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={handleNextImage}
                                                className="bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 rounded-full"
                                                aria-label="Next Image"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </motion.div>
                                    </>
                                )}
                            </motion.div>
                        </div>

                        <motion.div 
                            className="w-full md:w-1/2"
                            variants={childVariants}
                        >
                            <motion.h1 
                                className="text-4xl font-bold text-primary mb-2"
                                variants={childVariants}
                            >
                                {currentSinger.name}
                            </motion.h1>
                            <motion.p 
                                className="text-muted-foreground mb-6"
                                variants={childVariants}
                            >
                                CV: {currentSinger.cv}
                            </motion.p>

                            <motion.div 
                                className="mb-6"
                            >
                                <motion.h2 
                                    className="text-2xl font-semibold text-primary mb-4"
                                    variants={childVariants}
                                >
                                    Character Info
                                </motion.h2>
                                <motion.div className="grid grid-cols-2 gap-4" variants={containerVariants} initial="hidden" animate="visible">
                                    {currentSinger.characterData && Object.entries(currentSinger.characterData).map(([key, value], index) => (
                                        <motion.div 
                                            key={key} 
                                            className="flex items-center gap-3"
                                            variants={characterDataVariants}
                                            custom={index}
                                        >
                                            {key === "Species" && getSpeciesIcon(value as string)}
                                            {key === "Gender" && getGenderIcon(value as string)}
                                            {key === "Age" && <Cake className="h-6 w-6 text-primary" />}
                                            {key === "Height" && <Ruler className="h-6 w-6 text-primary" />}
                                            {key === "Weight" && <Weight className="h-6 w-6 text-primary" />}
                                            {key === "Birthday" && <Cake className="h-6 w-6 text-primary" />}
                                            {key === "Stone" && <Gem className="h-6 w-6 text-primary" />}
                                            <div>
                                                <span className="text-muted-foreground font-medium">{key}:</span>{" "}
                                                <span className="text-primary font-medium">{value as string}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {voicebankFormats.length > 0 && (
                        <motion.div
                            className="mb-16 border border-primary/10 rounded-lg p-6 bg-white/5 dark:bg-black/20 backdrop-blur-sm"
                            ref={voicebanksSectionRef}
                            variants={secondarySectionVariants}
                        >
                            <h2 className="text-2xl font-semibold text-primary mb-6">Voicebanks</h2>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                                {voicebankFormats.map((format) => (
                                    <Button
                                        key={format}
                                        variant={currentVoicebankFormat === format ? "default" : "outline"}
                                        className={currentVoicebankFormat === format 
                                            ? "bg-primary text-primary-foreground" 
                                            : "border-primary/20 text-primary"}
                                        onClick={() => handleVoicebankFormatClick(format)}
                                    >
                                        {format}
                                    </Button>
                                ))}
                            </div>
                            
                            <AnimatePresence mode="wait" initial={false} custom={animationDirection}>
                                {currentVoicebank && (
                                    <motion.div 
                                        key={currentVoicebankFormat}
                                        variants={voicebankVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        custom={animationDirection}
                                        className="bg-white/10 dark:bg-black/20 rounded-lg p-6"
                                    >
                                        <div className="flex flex-wrap items-center justify-between mb-6">
                                            <h3 className="text-xl font-medium text-primary">{currentVoicebankFormat}</h3>
                                            {currentVoicebank.url && (
                                                <a
                                                    href={currentVoicebank.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-primary flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    {currentVoicebankFormat && typeof currentVoicebankFormat === 'string' && currentVoicebankFormat.toLowerCase().includes('rvc') 
                                                        ? "View on Weights.gg" 
                                                        : "Download"}
                                                </a>
                                            )}
                                        </div>

                                        {vocalModesToDisplay.length > 0 && (
                                            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants} initial="hidden" animate="visible">
                                                {vocalModesToDisplay.map((mode, index) => (
                                                    <motion.div 
                                                        key={mode.name + index}
                                                        className="bg-white/5 dark:bg-black/20 rounded-lg p-4"
                                                        variants={itemVariants}
                                                    >
                                                        <div className="flex flex-wrap items-center justify-between mb-2">
                                                            <div>
                                                                <h4 className="text-lg font-medium text-primary">{mode.name}</h4>
                                                                {mode.description && (
                                                                    <p className="text-sm text-muted-foreground">{mode.description}</p>
                                                                )}
                                                            </div>
                                                            {mode.sample && (
                                                                <div className="flex items-center gap-2 mt-2 md:mt-0">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="text-xs"
                                                                        onClick={() => handlePlaySample(mode.sample!)}
                                                                    >
                                                                        {(isPlaying && currentSampleUrl === mode.sample) ? (
                                                                            <>
                                                                                <Pause className="h-3 w-3 mr-1" /> Pause
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Play className="h-3 w-3 mr-1" /> Play Sample
                                                                            </>
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <AnimatePresence>
                                                            {mode.sample && currentSampleUrl === mode.sample && isPlaying && (
                                                                <motion.div 
                                                                    className="mt-2 bg-black/10 dark:bg-white/10 rounded-lg overflow-hidden"
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                >
                                                                    <AudioVisualization
                                                                        audioRef={audioRef}
                                                                        isPlaying={true} 
                                                                        theme={theme as 'light' | 'dark'}
                                                                        singerColors={currentSinger.colors}
                                                                        src={currentSampleUrl}
                                                                    />
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {videoDemos.length > 0 && (
                        <motion.div 
                            className="mt-8 mb-16"
                            variants={demoSectionVariants}
                        >
                            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Demo Videos</h2>
                            <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${videoDemos.length % 2 !== 0 ? 'md:last:col-span-2 md:last:mx-auto md:last:max-w-xl' : ''}`}>
                                    {videoDemos.map((demo, index) => (
                                        <motion.div 
                                            key={demo.url + index}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`aspect-video overflow-hidden rounded-lg shadow-lg ${
                                                videoDemos.length % 2 !== 0 && index === videoDemos.length - 1 
                                                ? 'md:col-span-2 md:mx-auto md:max-w-xl' : ''
                                            }`}
                                            variants={itemVariants}
                                        >
                                            <div className="relative h-full">
                                                <iframe
                                                    src={demo.url}
                                                    title={demo.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                    loading="lazy"
                                                ></iframe>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="absolute top-2 right-2 bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black/90 z-10"
                                                    onClick={() => setExpandedVideo(demo)}
                                                    aria-label="Expand video"
                                                >
                                                    <Maximize2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <h3 className="text-lg font-medium text-primary mt-2 text-center">{demo.title}</h3>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </motion.main>

                <Footer />
            </div>
            
        <AnimatePresence>
            {expandedVideo && (
                <motion.div 
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 md:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setExpandedVideo(null)}
                >
                    <motion.div 
                        className="bg-background dark:bg-black rounded-lg overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-3 border-b border-border dark:border-gray-800">
                            <h3 className="font-medium text-lg truncate pr-2 text-foreground">{expandedVideo.title}</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setExpandedVideo(null)}
                                aria-label="Minimize video"
                                className="text-muted-foreground"
                            >
                                <Minimize2 className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="w-full aspect-video relative flex-grow">
                            <iframe
                                src={expandedVideo.url}
                                title={expandedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default SingerPage;
