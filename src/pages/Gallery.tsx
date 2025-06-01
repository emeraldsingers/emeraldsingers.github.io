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
  Video
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
  const [activeCategory, setActiveCategory] = useState<'all' | 'official' | 'community'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCover, setHoveredCover] = useState<string | null>(null);
  
  interface GalleryItem {
    id: string;
    type: 'official' | 'community';
    image: string;
    title: string;
    character: string;
    artist: string;
    href?: string;
  }
  
  const galleryItems: GalleryItem[] = [
    { 
      id: "akizora-1", 
      type: "official", 
      image: "/images/akizora-2.webp", 
      title: "Akizora Artwork", 
      character: "Akizora", 
      artist: "JustKAMAZ"
    },
    { 
      id: "akizora-2", 
      type: "official", 
      image: "/images/akizora-3.webp", 
      title: "Akizora \"pick me\"", 
      character: "Akizora", 
      artist: "KambaL"
    },
    { 
      id: "identity", 
      type: "community", 
      image: "/images/identitytilkeasoqwer.webp", 
      title: "Identity", 
      character: "Tilke x Asoqwer", 
      artist: "mnifl", 
      href: "https://www.youtube.com/watch?v=81F29AUNDAQ"
    },
    { 
      id: "lonely-love", 
      type: "community", 
      image: "/images/akizoralonely.webp", 
      title: "Lonely Love", 
      character: "Akizora", 
      artist: "Leshy-P", 
      href: "https://www.youtube.com/watch?v=zqfyw-mbG0A"
    },
    { 
      id: "king", 
      type: "community", 
      image: "/images/feb23th.webp", 
      title: "KING", 
      character: "Asoqwer x Tilke x Simon Weber", 
      artist: "mnifl", 
      href: "https://www.youtube.com/watch?v=awOAjlqdPXc"
    }
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeCategory);
    
  const handleCategoryChange = (category: 'all' | 'official' | 'community') => {
    if (category === activeCategory) return;
    
    const categories = ['all', 'official', 'community'];
    const currentIndex = categories.indexOf(activeCategory);
    const newIndex = categories.indexOf(category);
    
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveCategory(category);
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
                  variant={activeCategory === 'official' ? "default" : "outline"}
                  onClick={() => handleCategoryChange('official')}
                  className={cn(
                    "min-w-[100px] relative overflow-hidden",
                    activeCategory === 'official' && "after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[30%] after:h-[2px] after:bg-current after:rounded-sm"
                  )}
                >
                  {activeCategory === 'official' && (
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
                  variant={activeCategory === 'community' ? "default" : "outline"}
                  onClick={() => handleCategoryChange('community')}
                  className={cn(
                    "min-w-[100px] relative overflow-hidden",
                    activeCategory === 'community' && "after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[30%] after:h-[2px] after:bg-current after:rounded-sm"
                  )}
                >
                  {activeCategory === 'community' && (
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
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    "glass-morphism rounded-lg overflow-hidden cursor-pointer transition-all",
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
                  <div className="aspect-square relative overflow-hidden">
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
                  
                  <div className="p-4">
                    <h3 className="font-medium text-primary truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{item.character}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">by {item.artist}</span>
                      {item.href && (
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Youtube className="h-4 w-4 text-muted-foreground" />
                        </motion.div>
                      )}
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
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="bg-background dark:bg-black/90 rounded-lg overflow-hidden max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 bg-black relative">
                  <img 
                    src={selectedImage.image} 
                    alt={selectedImage.title} 
                    className="w-full h-full object-contain max-h-[70vh]"
                  />
                  
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
                
                <div className="md:w-1/3 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-primary">{selectedImage.title}</h2>
                    <motion.button 
                      onClick={() => setSelectedImage(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                  
                  <div className="mb-6 flex-grow">
                    <p className="text-lg text-foreground">{selectedImage.character}</p>
                    <p className="text-muted-foreground">Artist: {selectedImage.artist}</p>
                    
                    {selectedImage.type === 'community' && (
                      <motion.div 
                        className="mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="inline-block bg-primary/80 text-primary-foreground text-xs py-1 px-3 rounded-md">
                          Covers
                        </span>
                      </motion.div>
                    )}
                  </div>
                  
                  {selectedImage.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button asChild className="mt-4 w-full relative overflow-hidden group">
                        <motion.a 
                          href={selectedImage.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.span
                            animate={{ 
                              x: [0, 5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Youtube className="h-4 w-4" />
                          </motion.span>
                          Watch on YouTube
                        </motion.a>
                      </Button>
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