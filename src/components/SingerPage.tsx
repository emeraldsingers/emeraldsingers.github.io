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
                    //{ name: "CVVC Soft", description: "CVVC Gentle and warm tone", sample: "/samples/akizora/akizora-samplecvvcsoft.mp3" },
                    //{ name: "CVVC Power", description: "CVVC Strong and energetic voice", sample: "/samples/akizora/akizora-samplecvvcpower.mp3" }
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
        videoDemos: [ // Added video demos for Akizora
            {
                url: "https://www.youtube.com/embed/M_G1bJ8j5H0", // Replace with actual video URL
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
    k3k0: {
        name: "K3K0",
        cv: "Dori Meru",
        images: ["/images/k3k0.png", "/images/k3k02.png", "/images/k3k03.png"],
        authors: { "/images/k3k0.png": "eulliaqzh", "/images/k3k02.png": "Dori Meru", "/images/k3k03.png": "KambaL" },
        audioSamples: ["/samples/k3k0/k3k0-sample1.mp3", "/samples/k3k0/k3k0-sample2.mp3"],
        characterData: {
            Species: "Android",
            Gender: "Female",
            Age: "15 years old (1 year as robot)",
            Height: "150cm",
            Weight: "100kg",
            Birthday: "28.11",
            Stone: "Quartz",
        },
        colors: { 
            light: 'rgb(147,145,238)', 
            dark: 'rgb(71,74,204)',  
        },
        voicebanks: {
            CV: {
                url: "https://mega.nz/file/Lz5y2KiY#b_OhQ2doE8UAg-ut7zya3qGrgcJ_XP6__gePtyhhIbc",
                vocalModes: [
                    { name: "CV Normal", description: "CV Artifical voice", sample: "/samples/k3k0/k3k0-samplecv.mp3" },
                ]
            },
            "CVVC Power": {
                url: "https://mega.nz/file/DzoBiYyZ#n7Y6gH4sqk-3CBqWWi9rBEQJcrCgyrV-xEYSVgUElhA",
                vocalModes: [
                    { name: "CVVC Power", description: "CVVC Power voice", sample: "/samples/k3k0/k3k0-samplecvvcpower.mp3" },
                ]
            },
            "CVVC Charged": {
                url: "https://mega.nz/file/uiwxSJ4J#shcDLVYoelJ9MiW8DDwgwEGDYix6EASQ7POIFYMaRHs",
                vocalModes: [
                    { name: "CVVC Charged", description: "Masculine cold voice", sample: "/samples/k3k0/k3k0-samplecvvccharged.mp3" },
                ]
            },
            "CVVC Grave": {
                url: "https://mega.nz/file/T34AkShY#gxnuLKECQNDMtJRdu4qOeei2ioZ0-5fXlkx078K45UU",
                vocalModes: [
                    { name: "Grave Normal", description: "Grave Normal tone", sample: "/samples/k3k0/k3k0-grave.mp3" },
                ]
            },
            "CVVC Virus": {
                url: "https://mega.nz/file/eiRgzLqD#P_PP7mEGZmYJ92k1quH5S0SdQtAwPuyxuqTCcnbUnbI",
                vocalModes: [
                    {name: "Virus Normal", description: "Heavy scream voice", sample: "/samples/k3k0/k3k0-virus.mp3"},
                ]
            },
            SuperPack: {
                url: "https://mega.nz/file/nvR2SDya#PEZa8VaKrRQFAv5RyK8gCA7BOD4cKk6bK73sz6cCPNU",
                vocalModes: [
                    { name: "SuperPack Normal", description: "SuperPack Normal tone", sample: "/samples/k3k0/k3k0-samplevcv.mp3" },
                    { name: "SuperPack Power", description: "SuperPack Power voice", sample: "/samples/k3k0/k3k0-samplecvvcpower.mp3" },
                    { name: "SuperPack Weak", description: "SuperPack Weak relaxed voice", sample: "/samples/k3k0/k3k0-samplecvvccharged.mp3" }
                ]
            },
            RVC: {
                url: "https://www.weights.com/ru/models/cm6dvtm140en6ju18hmfs2lw0",
                vocalModes: [
                    { name: "RVC Normal", description: "100e 6000step 8 batch-size", sample: "/samples/k3k0/k3k0-rvc-sample.mp3" }
                ]
            }

            // "English CVVC": { // Example of excluding vocalmodes for a voicebank
            //     url: "https://example.com/k3k0-en-cvvc",
            // },
        },
        videoDemos: [ 
            {
                url: "https://www.youtube.com/embed/ZNy-v4e7QZg",
                title: "【UTAU Demo】Tieredcrisis/ティアードクライシス【KEKO 01 CVVC POWER】+Voicebank DL"
            },
            {
                url: "https://www.youtube.com/embed/c5L1dZGRxbQ",
                title: "【K3K0-01】Okaasan/おかあさん【UTAUカバー】"
            },
            {
                url: "https://www.youtube.com/embed/r7y7Kx3OWF4",
                title: "【K3K0-01 POWER】 smart??? | スマート??? - まらしぃ 【Emerald Project UTAUカバー】"
            },
        ]
    },
    tilke: {
        name: "Tilke",
        cv: "Utakata",
        images: ["/images/tilke.png"],
        authors: { "/images/tilke.png": "eulliaqzh"},
        audioSamples: ["/samples/tilke/tilke-sample1.mp3", "/samples/tilke/tilke-sample2.mp3"],
        characterData: {
            Species: "Human",
            Gender: "Male",
            Age: "17 years old",
            Height: "173cm",
            Weight: "Healthy",
            Birthday: "25.07",
            Stone: "Tanzanite",
        },
        colors: {
            light: 'rgb(151,159,182)', 
            dark: 'rgb(72,79,133)',
        },
        voicebanks: {
            "TILKE CVVC -1-": {
                url: "https://mega.nz/file/qq4k2LRB#h8y7ZFIG0Nzjar7jabCFOfawWqj-CNcYhdEBxCy-IGQ",
                vocalModes: [
                    { name: "NATURAL", description: "Natural CVVC Steady and confident tone", sample: "/samples/tilke/1.mp3" },
                    { name: "WHISPER", description: "Whisper CVVC Low voice", sample: "/samples/tilke/3.mp3" },
                    { name: "POWER", description: "Power CVVC Powerful voice", sample: "/samples/tilke/2.mp3" }
                ]
            }
        },
        videoDemos: [ 
            {
               url: "https://www.youtube.com/embed/fYvjIW3xfLo?si=2J95kwg45QnzWAPC", 
               title: "【TILKE -1- DEMO】 花に風 【Emerald Project UTAUカバー】"
            }
        ]
    },
    "simon-weber": {
        name: "Simon Weber",
        cv: "Beaver-P",
        images: ["/images/simon-weber.png"],
        authors: { "/images/simon-weber.png": "Dori Meru" },
        audioSamples: ["/samples/simon/simon-sample1.mp3", "/samples/simon/simon-sample2.mp3"],
        characterData: {
            Species: "Human",
            Gender: "Male",
            Age: "18 years old",
            Height: "187cm",
            Weight: "80kg",
            Birthday: "01.08",
            Stone: "Placeholder",
        },
        colors: {
            light: 'rgb(209, 140, 62)', 
            dark: 'rgb(190, 112, 9)', 
        },
        voicebanks: { 
            CVVC: {
                //url: "https://example.com/simon-utau-cvvc",
                vocalModes: [
                    { name: "CVVC Normal", description: "CVVC Normal tone", sample: "/samples/simon/simon-samplecvvc.mp3" },
                    { name: "CVVC Power", description: "CVVC Strong voice", sample: "/samples/simon/simon-samplecvvcpower.mp3" },
                ]

            }
        },
        videoDemos: [ 
            /*{
                url: "", 
                title: ""
            }*/
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
    const [audioReady, setAudioReady] = useState(false);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        const audio = audioRef.current;

        const handleCanPlayThrough = () => {
            setAudioReady(true);
        };

        audio.addEventListener('canplaythrough', handleCanPlayThrough);

        return () => {
            audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, [audioRef, src]); 


    useEffect(() => {
      if(!isPlaying){
        setAudioReady(false);
      }
    }, [isPlaying])


    useEffect(() => {
        if (!isPlaying || !audioRef.current) {
            if (sourceRef.current) {
                sourceRef.current.disconnect();
                sourceRef.current = null;
            }
            return;
        }

        if(!audioReady) return;

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext)();
        }
        if (!analyserRef.current) {
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
        }

        const audioContext = audioContextRef.current;
        const analyser = analyserRef.current;

        if (sourceRef.current) {
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }

        try {
            const mediaElementSource = audioContext.createMediaElementSource(audioRef.current);
            sourceRef.current = mediaElementSource;
            sourceRef.current.connect(analyser);
            analyser.connect(audioContext.destination);
        } catch (error) {
            return;
        }

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const canvasCtx = canvas?.getContext('2d');
        if (!canvasCtx || !canvas) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const draw = () => {
            animationFrameRef.current = requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)';
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 1;
            canvasCtx.strokeStyle = theme === 'light' ? singerColors.dark : singerColors.light;
            canvasCtx.beginPath();

            const sliceWidth = canvas.width / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;

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

        draw();

        return () => {
            cancelAnimationFrame(animationFrameRef.current);

        };
    }, [isPlaying, audioRef, theme, singerColors, audioReady, src]);


    useEffect(() => {
        return () => {
            if (sourceRef.current) {
                sourceRef.current.disconnect();
                sourceRef.current = null;
            }
            if (analyserRef.current) {
                analyserRef.current.disconnect();
                analyserRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            audioContextRef.current = null;
            analyserRef.current = null;

        };
    }, []);

    return (
        <div className={`w-full h-12 overflow-hidden transition-all duration-300`} style={{ height: isPlaying ? '30px' : '0px' }}>
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
    const [isVisualizationVisible, setIsVisualizationVisible] = useState(false);
    const [selectedVoicebankFormat, setSelectedVoicebankFormat] = useState<string | null>(null);


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
        if (audioRef.current && currentSampleUrl === sampleUrl) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
                setIsVisualizationVisible(false);
                setCurrentVocalModeSampleUrl(null);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
                setIsVisualizationVisible(true);
                setCurrentVocalModeSampleUrl(sampleUrl);
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            audioRef.current = new Audio(sampleUrl);
            setCurrentSampleUrl(sampleUrl);
            setCurrentVocalModeSampleUrl(sampleUrl);
            setIsPlaying(true);
            setIsVisualizationVisible(true);
            audioRef.current.play();
            audioRef.current.onended = () => {
                setIsPlaying(false);
                setIsVisualizationVisible(false);
                setCurrentVocalModeSampleUrl(null);
            };
        }
    }, [isPlaying, currentSampleUrl]);

    const handlePauseSample = useCallback(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            setIsVisualizationVisible(false);
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
            className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50"
            style={{
                backgroundImage: theme === "light"
                    ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,${singerLightColor}, #FFFFFF)`
                    : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,${singerDarkColor} , #000000)`,
                transition: 'background-image 0.3s ease',
            }}
            ref={containerRef}
        >
            <main className="flex-grow container mx-auto px-4 py-20">
                <div className="flex gap-2 mb-4">
                    <Button
                        variant="outline"
                        className="border-primary/20 text-primary"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft className="mr-1" /> Back
                    </Button>
                    <Button variant="outline" className="border-primary/20 text-primary" asChild>
                        <Link to="/">
                            <Home className="mr-1" /> Home
                        </Link>
                    </Button>
                    <Button variant="outline" className="border-primary/20 text-primary" asChild>
                        <Link to="/singers">
                            <Users className="mr-1" /> Singers
                        </Link>
                    </Button>
                    <Button variant="outline" className="border-primary/20 text-primary" asChild>
                        <Link to="/how-to">
                            <HelpCircle className="mr-1" /> How To Use
                        </Link>
                    </Button>
                    <Button variant="outline" className="border-primary/20 text-primary" asChild>
                        <Link to="/terms">
                            <FileText className="mr-1" /> Terms of Use
                        </Link>
                    </Button>
                    <Button variant="outline" className="border-primary/20 text-primary" asChild>
                        <Link to="/about-us">
                            <BriefcaseBusiness className="mr-1" /> About Us
                        </Link>
                    </Button>
                    <Button variant="outline" className="border-primary/20 text-primary" asChild>
                        <Link to="/lore">
                            <Album className="mr-1" /> Lore
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="ml-auto rounded-full"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>


                {/* Singer Image and Info Section */}
                <div className="glass-morphism p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative">
                            <div className="relative w-[28rem] h-[28rem] overflow-hidden rounded-lg mx-auto transition-opacity duration-300">
                                <img
                                    ref={imageRef}
                                    key={currentImagePath}
                                    src={currentImagePath}
                                    alt={`${singer.name} artwork`}
                                    className="w-full h-full object-contain"
                                    style={{ opacity: imageOpacity }}
                                />
                            </div>
                            <div className="flex flex-row items-center justify-center mt-2 text-primary/80">
                                <Brush className="w-5 h-5 mr-1" />
                                <p className="text-sm mr-2">{singer.name}</p>
                                {currentImageAuthor && (
                                    <p className="text-xs italic">by {currentImageAuthor}</p>
                                )}
                            </div>
                            {singer.images.length > 1 && (
                                <>
                                    <div className="absolute top-1/2 -translate-y-1/2 left-4">
                                        <Button
                                            onClick={handlePrevImage}
                                            className="p-2 neo-blur rounded-full text-primary hover:bg-primary/10"
                                            aria-label="Previous Image"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                        <Button
                                            onClick={handleNextImage}
                                            className="p-2 neo-blur rounded-full text-primary hover:bg-primary/10"
                                            aria-label="Next Image"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Singer Information */}
                        <div>
                            <h1 className="text-4xl font-bold text-primary mb-2">{singer.name}</h1>
                            <p className="text-primary/80 mb-6">CV: {singer.cv}</p>
                            <div className="space-y-4 mb-8">
                                <Button
                                    variant="outline"
                                    className="w-full border-primary/20 text-primary hover:bg-primary/10"
                                    asChild
                                >
                                    <Link to="/how-to">
                                        <HelpCircle className="mr-2" /> How to Install
                                    </Link>
                                </Button>
                                {/* Character Data Section */}
                                <div className="mt-6 p-4 neo-blur rounded-lg">
                                    <h3 className="text-xl font-bold text-primary mb-4 text-center">Character Data</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(singer.characterData).map(([key, value]) => (
                                            <div key={key} className="flex items-center">
                                                <span className="font-semibold text-primary mr-1">{key}:</span>
                                                <span className="text-primary/80">{value}</span>
                                                {key === "Species" && getSpeciesIcon(value)}
                                                {key === "Gender" && getGenderIcon(value)}
                                                {key === "Age" && <Cake className="inline-block ml-1 h-4 w-41" />}
                                                {key === "Height" && <Ruler className="inline-block ml-1 h-4 w-41" />}
                                                {key === "Weight" && <Weight className="inline-block ml-1 h-4 w-41" />}
                                                {key === "Birthday" && <Cake className="inline-block ml-1 h-4 w-41" />}
                                                {key === "Stone" && <Gem className="inline-block ml-1 h-4 w-41" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* Video Demonstrations Section */}
                {videoDemos.length > 0 && (
                    <div className="glass-morphism p-8 mb-8">
                        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Video demonstrations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
                            {videoDemos.map((video, index) => (
                                <div key={index} className="rounded-lg overflow-hidden neo-blur">
                                    <iframe
                                        width="100%"
                                        height="360"
                                        src={video.url}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Voicebanks Section */}
                <div className="glass-morphism p-8" id="voicebanks-section" ref={voicebanksSectionRef}>
                    <h2 className="text-2xl font-bold text-primary mb-6 text-center">Voicebanks</h2>
                    <div className="flex flex-col items-center space-y-4 mb-8">
                        <div className="flex flex-row flex-wrap justify-center gap-2 mb-4"> 
                            {voicebankFormats.map((format) => (
                                <Button
                                    key={format}
                                    variant={selectedVoicebankFormat === format ? "default" : "outline"} 
                                    className={`border-primary/20 text-primary hover:bg-primary/10 ${selectedVoicebankFormat === format ? 'bg-primary/90 text-primary-foreground hover:bg-primary' : ''}`}
                                    onClick={() => handleVoicebankFormatClick(format)}
                                >
                                    {format} Voicebank
                                </Button>
                            ))}
                        </div>
                        {voicebankFormats.length === 0 && (
                            <p className="text-primary/80 text-center">No voicebanks available yet.</p>
                        )}
                        {currentVoicebank && currentVoicebank.url && (
                            <Button
                                asChild
                                className="w-50 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold shadow-md"
                                disabled={!currentVoicebank?.url}
                            >
                                <Link
                                    to={currentVoicebank.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Download className="mr-2 h-4 w-4" /> Download {currentVoicebankFormat} Voicebank
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Vocal Modes Section */}
                    {currentVoicebank && currentVoicebank.vocalModes && (
                        <div className="glass-morphism p-8 relative overflow-hidden transition-all duration-300" style={{ maxHeight: isVisualizationVisible ? '500px' : 'auto' }}>
                            <h2 className="text-2xl font-bold text-primary mb-6">Available Vocal Modes ({currentVoicebankFormat})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {vocalModesToDisplay.map((mode) => (
                                    <div
                                        key={mode.name}
                                        className="neo-blur p-6 hover:bg-primary/5 transition-colors rounded-lg flex flex-col"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-xl font-bold text-primary ">{mode.name}</h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handlePlaySample(mode.sample)}
                                                className="rounded-full text-primary hover:bg-primary/10"
                                                aria-label={isPlaying && currentSampleUrl === mode.sample ? "Pause Sample" : "Play Sample"}
                                            >
                                                {isPlaying && currentSampleUrl === mode.sample ? (
                                                    <Pause className="h-5 w-5" />
                                                ) : (
                                                    <Play className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-primary/80">{mode.description}</p>
                                        {isPlaying && currentVocalModeSampleUrl === mode.sample && (
                                            <div className="mt-2">
                                                <AudioVisualization
                                                    audioRef={audioRef}
                                                    isPlaying={isPlaying}
                                                    theme={theme}
                                                    singerColors={singer.colors}
                                                    src={mode.sample}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                     {voicebankFormats.length > 0 && (!currentVoicebank || !currentVoicebank.vocalModes || currentVoicebank.vocalModes.length === 0) && (
                         <div className="glass-morphism p-8 relative overflow-hidden transition-all duration-300">
                            <p className="text-primary/80 text-center">No vocal modes available for {currentVoicebankFormat} voicebank yet.</p>
                         </div>
                     )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SingerPage;
