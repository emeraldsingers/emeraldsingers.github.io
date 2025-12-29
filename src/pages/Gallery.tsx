import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";
import { Button } from "@/components/ui/button";
import { 
  Image as ImageIcon, 
  Camera, 
  Music, 
  Youtube, 
  ExternalLink, 
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Video,
  Sparkles,
  Award,
  Users
} from "lucide-react";

const buttonVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
  tap: { scale: 0.95 }
};

const galleryItemVariants = {
  initial: (direction: number) => ({ 
    opacity: 0, 
    x: direction > 0 ? 20 : -20 
  }),
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      duration: 0.3 
    }
  },
  exit: (direction: number) => ({ 
    opacity: 0, 
    x: direction > 0 ? -20 : 20,
    transition: { 
      duration: 0.2 
    }
  })
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

const Gallery = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'covers' | 'arts'>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<'all' | 'official' | 'community'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCover, setHoveredCover] = useState<string | null>(null);
  
  interface GalleryItem {
    id: string;
    type: 'official' | 'community' | 'communityArtwork';
    image: string;
    title: string;
    character: string;
    artist: string;
    href?: string;
    linkLabel?: string;
    linkType?: 'youtube' | 'telegram'; 
  }
  
  const galleryItems: GalleryItem[] = [
    { 
      id: "akizora-1", 
      type: "communityArtwork", 
      image: "/images/akizora-2.webp", 
      title: "Akizora Artwork", 
      character: "Akizora", 
      artist: "JustKAMAZ",
      href: "https://t.me/JUST_KAMAZ",
      linkLabel: "Artist's Telegram Channel",
      linkType: 'telegram'
    },
    { 
      id: "akizora-2", 
      type: "communityArtwork", 
      image: "/images/akizora-3.webp", 
      title: "Akizora \"pick me\"", 
      character: "Akizora", 
      artist: "KambaL",
      href: "https://t.me/kamba1l/108",
      linkLabel: "Open in Telegram",
      linkType: 'telegram'
    },
    {
      id: "simon-sisi",
      type: "communityArtwork",
      image: "/images/simon-sisi.webp",
      title: "сегодня мы приготовим ах ладно смотрите на мои сиськи",
      character: "Simon Weber",
      artist: "KambaL",
      href: "https://t.me/kamba1l/296",
      linkLabel: "Open in Telegram",
      linkType: 'telegram'
    },
    {
      id: "akizora-sisi",
      type: "communityArtwork",
      image: "/images/akizora-keko-sisi.webp",
      title: "сегодня день сисек",
      character: "Akizora",
      artist: "KambaL",
      href: "https://t.me/kamba1l/298",
      linkLabel: "Open in Telegram",
      linkType: 'telegram'
    },
    {
      id: "toisku",
      type: "official",
      image: "/images/toisku-artwork.webp",
      title: "Toisku Artwork",
      character: "Toisku",
      artist: "Zihiko",
      href: "https://t.me/zihiko_hikari",
      linkLabel: "Artist's Telegram Channel",
      linkType: 'telegram'
    },
    {
      id: "asoqwer1",
      type: "official",
      image: "/images/asoart.webp",
      title: "каки",
      character: "Asoqwer",
      artist: "eulliaq",
      href: "https://t.me/falconyeulliaq/289",
      linkLabel: "Open in Telegram",
      linkType: 'telegram'
    },
    {
      id: "asoqwer2",
      type: "official",
      image: "/images/sasiski.webp",
      title: "пливите сасиски....",
      character: "Asoqwer",
      artist: "eulliaq",
      href: "https://t.me/falconyeulliaq",
      linkLabel: "Artist's Telegram Channel",
      linkType: 'telegram'
    },
    { 
      id: "identity", 
      type: "community", 
      image: "/images/identitytilkeasoqwer.webp", 
      title: "Identity", 
      character: "Tilke x Asoqwer", 
      artist: "mnifl", 
      href: "https://www.youtube.com/watch?v=81F29AUNDAQ",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },
    { 
      id: "lonely-love", 
      type: "community", 
      image: "/images/akizoralonely.webp", 
      title: "Lonely Love", 
      character: "Akizora", 
      artist: "Leshy-P", 
      href: "https://www.youtube.com/watch?v=zqfyw-mbG0A",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },
    { 
      id: "king", 
      type: "community", 
      image: "/images/feb23th.webp", 
      title: "KING", 
      character: "Asoqwer x Tilke x Simon Weber", 
      artist: "mnifl", 
      href: "https://www.youtube.com/watch?v=awOAjlqdPXc",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },
    { 
      id: "simon-meltdown", 
      type: "official", 
      image: "/images/simon_meltdown.webp", 
      title: "𝑴𝑬𝑳𝑻𝑫𝑶𝑾𝑵", 
      character: "Simon Weber", 
      artist: "Beaver-P", 
      href: "https://www.youtube.com/watch?v=7__fn848Pko",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },
    { 
      id: "simon-sinking", 
      type: "official", 
      image: "/images/simon_sinking.webp", 
      title: "沈める街 (Sinking town)", 
      character: "Simon Weber", 
      artist: "Beaver-P", 
      href: "https://www.youtube.com/watch?v=rYthGmTbU1s",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },
        { 
      id: "simon_june", 
      type: "official", 
      image: "/images/simon_june.webp", 
      title: "It was a very nice June", 
      character: "Simon Weber", 
      artist: "Beaver-P", 
      href: "https://www.youtube.com/watch?v=zqfyw-mbG0A",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },
        { 
      id: "simon_error", 
      type: "official", 
      image: "/images/simon_error.webp", 
      title: "-ERROR", 
      character: "Simon Weber", 
      artist: "Beaver-P", 
      href: "https://www.youtube.com/watch?v=PMScYxi8bpA",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },
    { 
      id: "simon_alterego", 
      type: "official", 
      image: "/images/simon_alterego.webp", 
      title: "Alter Ego", 
      character: "Simon Weber", 
      artist: "Beaver-P", 
      href: "https://www.youtube.com/watch?v=j8URO9d5ddU",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },    
      { 
      id: "emerald_butterfly", 
      type: "official", 
      image: "/images/butterfly.webp", 
      title: "Butterfly on your Right Shoulder ", 
      character: "Emerald", 
      artist: "SouЯ", 
      href: "https://www.youtube.com/watch?v=IfdLe08hHvI",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },    
  { 
      id: "asoqwer_baldi", 
      type: "official", 
      image: "/images/baldi.webp", 
      title: "Basics in Behavior", 
      character: "Asoqwer", 
      artist: "asoqwer", 
      href: "https://www.youtube.com/watch?v=j8URO9d5ddU",
      linkLabel: "Watch on YouTube",
      linkType: 'youtube'
    },    
  ];
  
  const filteredItems = (() => {
    let items = galleryItems;
    
    if (activeCategory === 'covers') {
      items = items.filter(item => item.linkType === 'youtube');
    } else if (activeCategory === 'arts') {
      items = items.filter(item => 
        (item.type === 'official' || item.type === 'communityArtwork') && 
        item.linkType !== 'youtube'
      );
    }
    
    if (activeSubCategory === 'official') {
      items = items.filter(item => item.type === 'official');
    } else if (activeSubCategory === 'community') {
      items = items.filter(item => item.type === 'community' || item.type === 'communityArtwork');
    }
    
    return items;
  })();
    
  const handleCategoryChange = (category: 'all' | 'covers' | 'arts') => {
    if (category === activeCategory) return;
    
    const categories = ['all', 'covers', 'arts'];
    const currentIndex = categories.indexOf(activeCategory);
    const newIndex = categories.indexOf(category);
    
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveCategory(category);
    setActiveSubCategory('all'); 
  };

  const handleSubCategoryChange = (subCategory: 'all' | 'official' | 'community') => {
    setActiveSubCategory(subCategory);
  };
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex]);
  };
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex]);
  };
  
  const handleImageClick = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setCurrentIndex(index);
    setSelectedImage(item);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden" ref={containerRef}>
      <Helmet>
        <title>Gallery - Emerald Singers</title>
        <meta name="description" content="Explore artwork and community creations featuring the Emerald Project singers." />
        <link rel="canonical" href="https://emeraldsingers.github.io/gallery" />
      </Helmet>
      
      <AnimatedBackground theme={theme} />
      <FloatingElements theme={theme} />
      <StarryBackground theme={theme} />
      
      <Navigation />
            
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-12">
            <motion.div 
              className="mb-4"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Camera className="h-10 w-10 mx-auto text-primary" />
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Gallery
            </motion.h1>
            <motion.p 
              className="text-muted-foreground max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Explore artwork and community creations featuring the Emerald Project singers
            </motion.p>
            
            <div className="flex justify-center mt-8 gap-4">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileTap="tap"
                transition={{ delay: 0.4 }}
              >
                <Button 
                  variant={activeCategory === 'all' ? "default" : "outline"} 
                  onClick={() => handleCategoryChange('all')}
                  className={cn(
                    "min-w-[100px] relative overflow-hidden",
                    activeCategory === 'all' && "after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[30%] after:h-[2px] after:bg-current after:rounded-sm"
                  )}
                >
                  {activeCategory === 'all' && (
                    <motion.span 
                      className="absolute inset-0 bg-primary opacity-30 z-0"
                      layoutId="activeButton"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">All</span>
                </Button>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileTap="tap"
                transition={{ delay: 0.5 }}
              >
                <Button 
                  variant={activeCategory === 'arts' ? "default" : "outline"}
                  onClick={() => handleCategoryChange('arts')}
                  className={cn(
                    "min-w-[100px] relative overflow-hidden",
                    activeCategory === 'arts' && "after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[30%] after:h-[2px] after:bg-current after:rounded-sm"
                  )}
                >
                  {activeCategory === 'arts' && (
                    <motion.span 
                      className="absolute inset-0 bg-primary opacity-30 z-0"
                      layoutId="activeButton"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">Arts</span>
                </Button>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileTap="tap"
                transition={{ delay: 0.6 }}
              >
                <Button 
                  variant={activeCategory === 'covers' ? "default" : "outline"}
                  onClick={() => handleCategoryChange('covers')}
                  className={cn(
                    "min-w-[100px] relative overflow-hidden",
                    activeCategory === 'covers' && "after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[30%] after:h-[2px] after:bg-current after:rounded-sm"
                  )}
                >
                  {activeCategory === 'covers' && (
                    <motion.span 
                      className="absolute inset-0 bg-primary opacity-30 z-0"
                      layoutId="activeButton"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">Covers</span>
                </Button>
              </motion.div>
            </div>
          </header>
          
          {/* Subcategory buttons */}
          {(activeCategory === 'covers' || activeCategory === 'arts') && (
            <motion.div 
              className="flex justify-center gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button 
                variant={activeSubCategory === 'all' ? "default" : "outline"}
                onClick={() => handleSubCategoryChange('all')}
                size="sm"
                className="min-w-[80px]"
              >
                All
              </Button>
              <Button 
                variant={activeSubCategory === 'official' ? "default" : "outline"}
                onClick={() => handleSubCategoryChange('official')}
                size="sm"
                className="min-w-[80px]"
              >
                Official
              </Button>
              <Button 
                variant={activeSubCategory === 'community' ? "default" : "outline"}
                onClick={() => handleSubCategoryChange('community')}
                size="sm"
                className="min-w-[80px]"
              >
                Community
              </Button>
            </motion.div>
          )}
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={`${activeCategory}-${activeSubCategory}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
              custom={direction}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className={cn(
                    "glass-morphism rounded-lg overflow-hidden cursor-pointer transition-all flex flex-col h-full",
                    "hover:scale-[1.02]",
                    item.type === 'community' && "community-cover-card"
                  )}
                  onClick={() => handleImageClick(item)}
                  variants={galleryItemVariants}
                  custom={direction}
                  layout
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onMouseEnter={() => item.type === 'community' && setHoveredCover(item.id)}
                  onMouseLeave={() => setHoveredCover(null)}
                >
                  <div className="aspect-square relative overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={cn(
                        "w-full h-full object-cover transition-all duration-500",
                        hoveredCover === item.id && "scale-110 blur-[1px]"
                      )}
                    />
                    

                    {item.type === 'community' && (
                      <>
                        <motion.div 
                          className="absolute top-2 right-2 bg-primary/80 text-white text-xs py-1 px-2 rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                        >
                          Community Covers
                        </motion.div>
                        
                        {/* Play Button Animation */}
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: hoveredCover === item.id ? 1 : 0,
                            scale: hoveredCover === item.id ? 1 : 0.8
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="bg-primary/80 text-white rounded-full p-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Play className="h-8 w-8" />
                          </motion.div>
                        </motion.div>
                        
                        {/* Video Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredCover === item.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Animated Pulse Ring */}
                        {hoveredCover === item.id && (
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div
                              className="h-20 w-20 rounded-full border-2 border-primary/60"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.7, 0, 0.7]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut" 
                              }}
                            />
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div className="p-4 pb-6 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 flex-grow flex flex-col justify-end">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-primary flex-1 line-clamp-2 leading-tight">{item.title}</h3>
                      {item.href && (
                        <motion.div
                          className={cn(
                            "p-1.5 rounded-full flex-shrink-0",
                            item.linkType === 'youtube' 
                              ? "bg-red-100 dark:bg-red-900/30" 
                              : "bg-blue-100 dark:bg-blue-900/30"
                          )}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {item.linkType === 'youtube' && <Youtube className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />}
                          {item.linkType === 'telegram' && <ExternalLink className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                          {!item.linkType && <ExternalLink className="h-3.5 w-3.5 text-primary" />}
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 truncate flex items-center gap-1">
                      <Music className="h-3 w-3 flex-shrink-0" />
                      {item.character}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        {item.artist.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate">{item.artist}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="glass-morphism rounded-2xl overflow-hidden max-w-5xl w-full shadow-2xl border border-primary/20 my-auto max-h-[95vh] sm:max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-2/3 bg-black relative group">
                  {selectedImage.type === 'community' && selectedImage.href && getYouTubeEmbedUrl(selectedImage.href) ? (
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={getYouTubeEmbedUrl(selectedImage.href) || ''}
                        title={selectedImage.title}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <img 
                      src={selectedImage.image} 
                      alt={selectedImage.title} 
                      className="w-full h-full object-contain max-h-[70vh]"
                    />
                  )}
                  
                  {filteredItems.length > 1 && (
                    <>
                      <motion.button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
                        onClick={handlePrevImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </motion.button>
                      
                      <motion.button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
                        onClick={handleNextImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </motion.button>
                    </>
                  )}
                  
                  {selectedImage.type === 'community' && (
                    <div className="absolute top-2 right-2 bg-primary/70 text-white text-xs py-1 px-3 rounded-md flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      <span>Video Cover</span>
                    </div>
                  )}
                </div>
                
                <div className="md:w-1/3 p-4 sm:p-6 flex flex-col bg-gradient-to-b from-transparent to-primary/5 overflow-y-auto max-h-[50vh] md:max-h-none">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <motion.h2 
                      className="text-lg sm:text-2xl font-bold text-primary flex-1 pr-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {selectedImage.title}
                    </motion.h2>
                    <motion.button 
                      onClick={() => setSelectedImage(null)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10 flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                  
                  <motion.div 
                    className="mb-4 sm:mb-6 flex-grow space-y-3 sm:space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                      <p className="text-base sm:text-lg font-medium text-foreground">{selectedImage.character}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {selectedImage.artist.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Created by</p>
                        <p className="font-medium text-foreground">{selectedImage.artist}</p>
                      </div>
                    </div>
                    
                    {selectedImage.type === 'community' && (
                      <motion.div 
                        className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-primary px-3 py-2 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Video className="h-4 w-4" />
                        <span className="text-sm font-medium">Community Cover</span>
                      </motion.div>
                    )}
                    {selectedImage.type === 'communityArtwork' && (
                      <motion.div 
                        className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-primary px-3 py-2 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">Community Artwork</span>
                      </motion.div>
                    )}
                    {selectedImage.type === 'official' && (
                      <motion.div 
                        className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-primary px-3 py-2 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Award className="h-4 w-4" />
                        <span className="text-sm font-medium">Official Artwork</span>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {selectedImage.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button asChild className="w-full relative overflow-hidden group shadow-lg">
                        <motion.a 
                          href={selectedImage.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {selectedImage.linkType === 'youtube' && <Youtube className="h-5 w-5" />}
                            {selectedImage.linkType === 'telegram' && <ExternalLink className="h-5 w-5" />}
                          </motion.span>
                          <span className="font-medium">
                            {selectedImage.type === 'community' && selectedImage.linkType === 'youtube' 
                              ? 'Open on YouTube' 
                              : (selectedImage.linkLabel ?? "Open Link")}
                          </span>
                        </motion.a>
                      </Button>
                      
                      {selectedImage.type === 'community' && selectedImage.linkType === 'youtube' && (
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          Like, comment, and subscribe on YouTube!
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Gallery;