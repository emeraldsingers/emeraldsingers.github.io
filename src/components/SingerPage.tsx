import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

import Footer from "@/components/Footer";

const singersData = {
    akizora: {
        name: "Akizora",
        cv: "Seejiu",
        images: ["/images/akizora.png", "/images/akizora-2.png", "/images/akizora-3.png"],
        authors: { "/images/akizora.png": "rxko", "/images/akizora-2.png": "JustKAMAZ", "/images/akizora-3.png": "KambaL" },
        audioSamples: ["/samples/akizora/akizora-sample1.mp3", "/samples/akizora/akizora-sample2.mp3"],
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
            //VCV: {
                //url: "https://example.com/akizora-vcv",
            //    vocalModes: [
            //        { name: "VCV Whisper", description: "VCV Very soft tone", sample: "/samples/akizora/akizora-samplevcvwhisper.mp3" },
            //        { name: "VCV Natural", description: "VCV Balanced tone", sample: "/samples/akizora/akizora-samplevcvnatural.mp3" },
            //    ]
            //},
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
            light: 'rgb(207, 175, 29)', 
            dark: 'rgb(51, 10, 10)', 
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
    "simon-weber": {
        name: "Simon Weber",
        cv: "Beaver-P",
        images: ["/images/simon-weber-eu.png"],
        authors: { "/images/simon-weber-eu.png": "eulliaqzh" },
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
            light: 'rgb(209, 140, 62)', 
            dark: 'rgb(190, 112, 9)', 
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
    }
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

    useEffect(() => {
        const audio = audioRef.current;

        if (!isPlaying || !audio) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = 0;
            }
            return;
        }

        let localAudioContext: AudioContext | null = null;
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            localAudioContext = audioContextRef.current;

            if (localAudioContext.state === 'suspended') {
                localAudioContext.resume().catch(e => console.error("Error resuming AudioContext:", e));
            }
        } catch (e) {
            console.error("Web Audio API is not supported or context creation failed:", e);
            return;
        }

        let localAnalyser: AnalyserNode | null = null;
        if (localAudioContext && !analyserRef.current) {
             try {
                analyserRef.current = localAudioContext.createAnalyser();
                analyserRef.current.fftSize = 2048;
             } catch (e) {
                 console.error("Error creating AnalyserNode:", e);
                 return;
             }
        }
        localAnalyser = analyserRef.current;
        if (!localAnalyser) return;

        try {
            if (sourceRef.current && sourceRef.current.mediaElement !== audio) {
                try { sourceRef.current.disconnect(); } catch (e) {}
                sourceRef.current = null;
            }

            if (!sourceRef.current && localAudioContext) {
                sourceRef.current = localAudioContext.createMediaElementSource(audio);
                sourceRef.current.connect(localAnalyser); 
                localAnalyser.connect(localAudioContext.destination);
            }
        } catch(error) {
             console.error('Error creating/connecting media element source:', error);
             if (sourceRef.current) { try {sourceRef.current.disconnect();} catch(e){} sourceRef.current = null; }
             return;
        }
        
        const bufferLength = localAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = canvasRef.current;
        const canvasCtx = canvas?.getContext('2d');
        if (!canvasCtx || !canvas) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const draw = () => {
            if (!analyserRef.current || !isPlaying) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = 0;
                return;
            }
            animationFrameRef.current = requestAnimationFrame(draw);

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
        };

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        draw();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = 0;
            }
        };
    }, [isPlaying, src, audioRef, theme, singerColors]);

    useEffect(() => {
        const currentAudioContext = audioContextRef.current;
        return () => {
            console.log("Cleaning up AudioVisualization component completely.")
            if (animationFrameRef.current) {
                 cancelAnimationFrame(animationFrameRef.current);
            }
            if (sourceRef.current) {
                try { sourceRef.current.disconnect(); } catch(e) { console.warn("Error disconnecting source:", e); }
                sourceRef.current = null;
            }
            if (analyserRef.current && currentAudioContext) {
                try { analyserRef.current.disconnect(); } catch(e) { console.warn("Error disconnecting analyser:", e); }
                analyserRef.current = null;
            }
            if (currentAudioContext && currentAudioContext.state !== 'closed') {
                 try {
                    currentAudioContext.close().catch(e => console.warn("Error closing AudioContext:", e));
                 } catch (e) {
                     console.error("Exception closing AudioContext:", e);
                 }
                 audioContextRef.current = null;
            }
        };
    }, []);

    return (
        <div className={`w-full overflow-hidden transition-all duration-300`} style={{ height: isPlaying ? '30px' : '0px' }}>
            <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: isPlaying ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        </div>
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

    // Add animation variants
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


    if (!singer) {
        return <div>Singer not found</div>;
    }


    const currentImagePath = singer.images[currentImageIndex];
    const currentImageAuthor = singer.authors[currentImagePath];

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
                return <MessageCircleQuestionIcon className="inline-block mr-1 h-4 w-4" />;
        }
    };

    const getGenderIcon = (gender: string) => {
        switch (gender.toLowerCase()) {
            case "male":
                return <LucideMessageCircleX className="inline-block mr-1 h-4 w-4" />;
            case "female":
                return <LucideMessageCircleX className="inline-block mr-1 h-4 w-4" />;
            default:
                return <MessageCircleQuestionIcon className="inline-block mr-1 h-4 w-4" />;
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
        setSelectedVoicebankFormat(format);
    }, []);

    const voicebankFormats = Object.keys(singer.voicebanks);
    const currentVoicebankFormat = selectedVoicebankFormat || voicebankFormats[0];
    const currentVoicebank = currentVoicebankFormat ? singer.voicebanks[currentVoicebankFormat] : null;
    const vocalModesToDisplay = currentVoicebank?.vocalModes || [];
    const videoDemos = singer.videoDemos || []; 


    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: theme === "light"
                    ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${singerLightColor}, #FFFFFF)`
                    : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${singerDarkColor} , #000000)`,
                transition: 'background-image 0.3s ease',
            }}
            ref={containerRef}
        >
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
                        {/* Singer header section */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col md:flex-row gap-8 mt-8 mb-12 items-center"
                        >
                            <div className="w-full md:w-1/2 max-w-[450px] flex justify-center">
                                <div className="relative">
                                    <div className="relative w-[28rem] h-[28rem] overflow-hidden rounded-lg mx-auto transition-opacity duration-300 shadow-lg">
                                        <img
                                            ref={imageRef}
                                            key={currentImagePath}
                                            src={currentImagePath}
                                            alt={`${singer.name} artwork`}
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
                                        {singer.characterData && Object.entries(singer.characterData).map(([key, value]) => (
                                            <div key={key} className="flex items-center gap-3">
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
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Voicebanks section */}
                        {voicebankFormats.length > 0 && (
                            <motion.div
                                variants={itemVariants}
                                className="mb-16 border border-primary/10 rounded-lg p-6 bg-white/5 dark:bg-black/20 backdrop-blur-sm"
                            >
                                <h2 className="text-2xl font-semibold text-primary mb-6">Voicebanks</h2>
                                
                                {/* Voicebank format selector buttons */}
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
                                
                                {/* Current voicebank details */}
                                {currentVoicebank && (
                                    <motion.div 
                                        variants={itemVariants}
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
                                                    <div key={index} className="bg-white/5 dark:bg-black/20 rounded-lg p-4">
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
                                                        {mode.sample && currentSampleUrl === mode.sample && (
                                                            <div className="mt-2 h-16 bg-black/10 dark:bg-white/10 rounded-lg overflow-hidden">
                                                                <AudioVisualization
                                                                    audioRef={audioRef as React.RefObject<HTMLAudioElement>}
                                                                    isPlaying={isPlaying}
                                                                    theme={theme as 'light' | 'dark'}
                                                                    singerColors={singer.colors}
                                                                    src={currentSampleUrl}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* Demo videos section - updated grid layout */}
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
                                                className={`aspect-video overflow-hidden rounded-lg shadow-lg ${
                                                    singer.videoDemos.length % 2 !== 0 && index === singer.videoDemos.length - 1 
                                                    ? 'md:col-span-2 md:mx-auto md:max-w-xl' : ''
                                                }`}
                                            >
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={demo.url}
                                                    title={demo.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
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

            <Footer />
        </div>
    );
};

export default SingerPage;
