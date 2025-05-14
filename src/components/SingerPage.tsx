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
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";

const singersData = {
    akizora: {
        name: "Akizora",
        cv: "Seejiu",
        images: ["/images/akizora.png", "/images/akizora-2.png", "/images/akizora-3.png"],
        authors: { "/images/akizora.png": "rxko", "/images/akizora-2.png": "JustKAMAZ", "/images/akizora-3.png": "KambaL" },
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
            light: 'rgb(118,170,184)',
            dark: 'rgb(102,165,164)', 
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
        images: ["/images/asoqwer.png"],
        authors: { "/images/asoqwer.png": "wtyssll" },
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
                url: "https://www.youtube.com/embed/vBb_PVDeP9c",
                title: "【Asoqwer VCV】 1000年生きてる | living millennium - いよわ【UTAUカバー】"
            },
            {
                url: "https://www.youtube.com/embed/xHtAsrCGc_k",
                title: "【asoqwer VCV】うらぽしゃ | Urapocere - Iyowa 【UTAUカバー】 + UST"
            },
            {
                url: "https://www.youtube.com/embed/RjKX723j_ws",
                title: "【Asoqwer VCV】 たぶん終わり | Almost Ended - いよわ【UTAUカバー】"
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
        images: ["/images/Emerald2025NoLogo.png"],
        authors: { "/images/Emerald2025NoLogo.png": "SouЯ" },
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
            light: 'rgb(110, 209, 143)',
            dark: 'rgb(91, 207, 143)',
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
        images: ["/images/simon-weber-eu.png"],
        authors: { "/images/simon-weber-eu.png": "eulliaqzh" },
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
            dark: 'rgb(146, 77, 16)', 
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
        images: ["/images/mitsuo.png"],
        authors: { "/images/mitsuo.png": "povidlosecret" },
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
            dark: 'rgb(196,90,38)',
        },
        voicebanks: {
            RVC: {
                url: "https://www.weights.com/ru/models/cm7p25bsz66jto915lydx2sfx",
                vocalModes: [
                    { name: "RVC", description: "680e 50 min", sample: "/samples/mitsuo/mitsuorvc.mp3" }
                ]
            }
        },
        videoDemos: []
    },
    
};


interface AudioVisualizationProps {
    audioRef: React.RefObject<HTMLAudioElement>;
    isPlaying: boolean;
    theme: 'light' | 'dark';
    singerColors: { light: string; dark: string };
    src: string;
}

// Update the AudioVisualization component with these changes

const AudioVisualization: React.FC<AudioVisualizationProps> = ({ audioRef, isPlaying, theme, singerColors, src }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    
    // Create a ref to track if setup has been completed
    const setupCompletedRef = useRef<boolean>(false);

    // Function to set up audio context and analyzer
    const setupAudioAnalyzer = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return false;
        
        try {
            // Create audio context if it doesn't exist
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            
            // Resume audio context if suspended
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume().catch(e => console.error("Error resuming AudioContext:", e));
            }
            
            // Create analyzer if it doesn't exist
            if (!analyserRef.current) {
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 2048;
            }
            
            // Check if source needs to be created or reconnected
            const needNewSource = !sourceRef.current || sourceRef.current.mediaElement !== audio;
            
            if (needNewSource) {
                // Disconnect old source if it exists
                if (sourceRef.current) {
                    try { sourceRef.current.disconnect(); } catch (e) {}
                    sourceRef.current = null;
                }
                
                // Create and connect new source
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
    
    // Draw function for visualization
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
        
        // Make sure canvas dimensions match its displayed size
        if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        // Draw visualization frame
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
        
        // Continue animation loop
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
        
        // Set up audio analyzer if not already done
        if (!setupCompletedRef.current) {
            setupCompletedRef.current = setupAudioAnalyzer();
        }
        
        // Only start visualization if setup is complete
        if (setupCompletedRef.current) {
            // Cancel any existing animation frame
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            
            // Start a new animation
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


const SingerPage: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { theme, setTheme } = useTheme();
    const singer = singersData[slug as keyof typeof singersData];
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

    useEffect(() => {
        if (!singer) return;
        
        const root = document.documentElement;
        const singerLightColor = singer.colors?.light || 'rgb(0, 0, 0)';
        const singerDarkColor = singer.colors?.dark || 'rgb(0, 0, 0)';

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
    }, [singer]);

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

    const pageTitle = singer ? `${singer.name} - Emerald Project Singer` : "Singer Not Found - Emerald Project";
    const pageDescription = singer ? singer.description || `Learn more about ${singer.name}, a virtual singer from the Emerald Project. Discover voicebanks, demos, and character information.` : "The singer you are looking for could not be found.";
    const canonicalUrl = singer ? `https://emeraldsingers.github.io/#/singer/${slug}` : `https://emeraldsingers.github.io/#/404`;

    if (!singer) {
        return (
            <>
                <Helmet>
                    <title>Singer Not Found - Emerald Project</title>
                    <meta name="description" content="The singer page you requested could not be found. Explore other virtual singers from the Emerald Project." />
                    <link rel="canonical" href={`https://emeraldsingers.github.io/#/404`} />
                </Helmet>
                <div
                    className={`min-h-screen flex flex-col animated-background-container ${
                        theme === "dark" ? "dark-theme-background" : "light-theme-background"
                    }`}
                >
                    <div className="ray-three"></div>
                    
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

                    <main className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center">
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
                                <Users className="mx-auto h-32 w-32 text-primary/70" />
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-4xl font-bold text-primary mb-4"
                            >
                                Singer Not Found
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-muted-foreground text-lg mb-8"
                            >
                                We couldn't find the singer "{slug}". They might not exist or may have been moved.
                            </motion.p>
                            
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Button asChild size="lg" className="gap-2">
                                    <Link to="/singers">
                                        <Users className="h-5 w-5" /> Browse Singers
                                    </Link>
                                </Button>
                                
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => {
                                        if (window.history.length > 2) {
                                            navigate(-1);
                                        } else {
                                            navigate('/singers');
                                        }
                                    }}
                                    className="gap-2"
                                >
                                    <ChevronLeft className="h-5 w-5" /> Go Back
                                </Button>
                            </motion.div>
                        </motion.div>
                    </main>
                    <Footer />
                </div>
            </>
        );
    }

    const currentImagePath = singer.images[currentImageIndex];
    const currentImageAuthor = singer.authors[currentImagePath];

    const singerJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": singer.name,
        "alternateName": singer.cv,
        "description": pageDescription,
        "image": `https://emeraldsingers.github.io${singer.images[0]}`,
        "url": canonicalUrl,
        "gender": singer.characterData.Gender?.toLowerCase(),
        "height": singer.characterData.Height,
        "weight": singer.characterData.Weight,
        "birthDate": singer.characterData.Birthday,
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
                prevIndex === 0 ? singer.images.length - 1 : prevIndex - 1
            );
            setImageOpacity(1);
        }, 300);
    }, [singer.images.length]);

    const handleNextImage = useCallback(() => {
        setImageOpacity(0);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === singer.images.length - 1 ? 0 : prevIndex + 1
            );
            setImageOpacity(1);
        }, 300);
    }, [singer.images.length]);

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

    const singerLightColor = singer.colors?.light || 'rgb(0, 0, 0)';
    const singerDarkColor = singer.colors?.dark || 'rgb(0, 0, 0)';

    const handlePlaySample = useCallback((sampleUrl: string) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null;
        }

        if (currentSampleUrl === sampleUrl && isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            setCurrentSampleUrl(null);
            audioRef.current = null;
            return;
        }

        const newAudio = new Audio(sampleUrl);
        audioRef.current = newAudio;
        setCurrentSampleUrl(sampleUrl);

        newAudio.onended = () => {
            setIsPlaying(false);
            setCurrentSampleUrl(null);
            audioRef.current = null;
        };

        newAudio.play()
            .then(() => {
                setIsPlaying(true);
            })
            .catch(error => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
                setCurrentSampleUrl(null);
                audioRef.current = null;
            });
    }, [isPlaying, currentSampleUrl]);

    const handlePauseSample = useCallback(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            setCurrentVocalModeSampleUrl(null);
        }
    }, [isPlaying]);

    const handleVoicebankFormatClick = useCallback((format: string) => {
        const currentIndex = voicebankFormats.indexOf(selectedVoicebankFormat || voicebankFormats[0]);
        const newIndex = voicebankFormats.indexOf(format);
        
        setAnimationDirection(newIndex > currentIndex ? 'right' : 'left');
        setSelectedVoicebankFormat(format);
    }, [selectedVoicebankFormat]);

    const voicebankFormats = Object.keys(singer.voicebanks);
    const currentVoicebankFormat = selectedVoicebankFormat || voicebankFormats[0];
    const currentVoicebank = currentVoicebankFormat ? singer.voicebanks[currentVoicebankFormat] : null;
    const vocalModesToDisplay = currentVoicebank?.vocalModes || [];
    const videoDemos = singer.videoDemos || []; 


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
            <div
                className={`min-h-screen flex flex-col overflow-hidden animated-background-container ${
                    theme === 'dark' ? 'dark-theme-background' : 'light-theme-background'
                }`}
                ref={containerRef}
            >
                <div className="ray-three"></div>
                
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
                    className="flex-grow container mx-auto px-4 py-20"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {singer && (
                        <>
                            <motion.div 
                                variants={itemVariants}
                                className="flex flex-col md:flex-row gap-8 mt-8 mb-12 items-center"
                            >
                                <div className="w-full md:w-1/2 max-w-[450px] flex justify-center">
                                    <div className="relative">
                                        <div className="relative w-full max-w-[28rem] h-auto aspect-square overflow-hidden rounded-lg mx-auto transition-opacity duration-300 shadow-lg">
                                            <img
                                                ref={imageRef}
                                                key={currentImagePath}
                                                src={currentImagePath}
                                                alt={`${singer.name} artwork - Emerald Project`}
                                                className="w-full h-full object-contain bg-black/5 dark:bg-white/5"
                                                style={{ opacity: imageOpacity }}
                                            />
                                        </div>
                                        <div className="flex flex-row items-center justify-center mt-2 text-primary/80">
                                            <Brush className="w-5 h-5 mr-1" />
                                            {currentImageAuthor && (
                                                <p className="text-xs italic">Art by {currentImageAuthor}</p>
                                            )}
                                        </div>
                                        {singer.images.length > 1 && (
                                            <>
                                                <div className="absolute top-1/2 -translate-y-1/2 left-4">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={handlePrevImage}
                                                        className="bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 rounded-full"
                                                        aria-label="Previous Image"
                                                    >
                                                        <ChevronLeft className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={handleNextImage}
                                                        className="bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 rounded-full"
                                                        aria-label="Next Image"
                                                    >
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2">
                                    <h1 className="text-4xl font-bold text-primary mb-2">{singer.name}</h1>
                                    <p className="text-muted-foreground mb-6">CV: {singer.cv}</p>

                                    <div className="mb-6">
                                        <h2 className="text-2xl font-semibold text-primary mb-4">Character Info</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            {singer.characterData && Object.entries(singer.characterData).map(([key, value], index) => (
                                                <motion.div 
                                                    key={key} 
                                                    className="flex items-center gap-3"
                                                    variants={characterDataVariants}
                                                    custom={index}
                                                    initial="hidden"
                                                    animate="visible"
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
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {voicebankFormats.length > 0 && (
                                <motion.div
                                    variants={itemVariants}
                                    className="mb-16 border border-primary/10 rounded-lg p-6 bg-white/5 dark:bg-black/20 backdrop-blur-sm"
                                    ref={voicebanksSectionRef}
                                >
                                    <h2 className="text-2xl font-semibold text-primary mb-6">Voicebanks</h2>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {voicebankFormats.map((format) => (
                                            <Button
                                                key={format}
                                                variant={selectedVoicebankFormat === format ? "default" : "outline"}
                                                className={selectedVoicebankFormat === format 
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
                                                    <a
                                                        href={currentVoicebank.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        {currentVoicebankFormat.toLowerCase().includes('rvc') 
                                                            ? "View on Weights.gg" 
                                                            : "Download"}
                                                    </a>
                                                </div>

                                                {currentVoicebank.vocalModes && currentVoicebank.vocalModes.length > 0 && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {currentVoicebank.vocalModes.map((mode, index) => (
                                                                    <motion.div 
                                                                        key={index} 
                                                                        className="bg-white/5 dark:bg-black/20 rounded-lg p-4"
                                                                        initial={{ opacity: 0, y: 20 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: index * 0.1, duration: 0.3 }}
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
                                                                                        onClick={() => handlePlaySample(mode.sample)}
                                                                                    >
                                                                                        {isPlaying && currentSampleUrl === mode.sample ? (
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
                                                                            {mode.sample && currentSampleUrl === mode.sample && (
                                                                                <motion.div 
                                                                                    className="mt-2 bg-black/10 dark:bg-white/10 rounded-lg overflow-hidden"
                                                                                    initial={{ height: 0 }}
                                                                                    animate={{ height: 'auto' }}
                                                                                    exit={{ height: 0 }}
                                                                                    transition={{ duration: 0.3 }}
                                                                                >
                                                                                    <AudioVisualization
                                                                                        audioRef={audioRef as React.RefObject<HTMLAudioElement>}
                                                                                        isPlaying={isPlaying}
                                                                                        theme={theme as 'light' | 'dark'}
                                                                                        singerColors={singer.colors}
                                                                                        src={currentSampleUrl}
                                                                                    />
                                                                                </motion.div>
                                                                            )}
                                                                        </AnimatePresence>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}

                            {singer.videoDemos && singer.videoDemos.length > 0 && (
                                <motion.div 
                                    variants={itemVariants}
                                    className="mt-8 mb-16"
                                >
                                    <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Demo Videos</h2>
                                    <div className="max-w-4xl mx-auto">
                                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${singer.videoDemos.length % 2 !== 0 ? 'md:last:col-span-2 md:last:mx-auto md:last:max-w-xl' : ''}`}>
                                            {singer.videoDemos.map((demo, index) => (
                                                <motion.div 
                                                    key={index}
                                                    variants={itemVariants}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`aspect-video overflow-hidden rounded-lg shadow-lg ${
                                                        singer.videoDemos.length % 2 !== 0 && index === singer.videoDemos.length - 1 
                                                        ? 'md:col-span-2 md:mx-auto md:max-w-xl' : ''
                                                    }`}
                                                >
                                                    <div className="relative">
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={demo.url}
                                                            title={demo.title}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="absolute top-2 right-2 bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black/90"
                                                            onClick={() => setExpandedVideo(demo)}
                                                        >
                                                            <Maximize2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <h3 className="text-lg font-medium text-primary mt-2">{demo.title}</h3>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </motion.main>

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
                                className="bg-white dark:bg-black rounded-lg overflow-hidden w-full max-w-5xl max-h-[90vh]"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-800">
                                    <h3 className="font-medium text-lg truncate pr-2">{expandedVideo.title}</h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setExpandedVideo(null)}
                                    >
                                        <Minimize2 className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="w-full aspect-video">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={expandedVideo.url}
                                        title={expandedVideo.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Footer />
            </div>
        </>
    );
};

export default SingerPage;
