import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import SingerCard from "@/components/SingerCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTheme } from "@/components/ThemeProvider";
import React from "react";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Filter, ChevronUp, ChevronDown } from "lucide-react";

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
    tags: ['female', 'utau', 'ja', 'cvvc'] as SingerTag[]
  },
  {
    name: "Asoqwer",
    image: "/images/asoqwer_thumb.webp",
    slug: "asoqwer",
    tags: ['male', 'utau', 'ja', 'vcv', "cvvc", "rvc"] as SingerTag[]
  },
  {
    name: "Emerald",
    image: "/images/Emerald2025NoLogo_thumb.webp",
    slug: "emerald",
    tags: ['male', 'utau', 'ja', 'rus', 'cvvc', 'cvc'] as SingerTag[]
  },
  {
    name: "Simon Weber",
    image: "/images/simon-weber-eu_thumb.webp",
    slug: "simon-weber",
    tags: ['male', 'utau', 'ja', 'cvvc'] as SingerTag[]
  },
  {
    name: "Mitsuo",
    image: "/images/mitsuo_thumb.webp",
    slug: "mitsuo",
    tags: ['male', 'rvc', 'ja'] as SingerTag[]
  },

];

const Singers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<SingerTag[]>([]);
  const [filteredSingers, setFilteredSingers] = useState(singers);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [hasFilteredOnce, setHasFilteredOnce] = useState(false);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
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
      <div
        className={cn(
          "min-h-screen flex flex-col overflow-hidden animated-background-container",
          theme === 'dark' 
            ? "dark-theme-background" 
            : "light-theme-background"
        )}
        ref={containerRef}
      >
        <Navigation />
        <motion.div 
          className="container mx-auto px-4 py-24 flex-grow"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        > 
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

          <AnimatePresence mode="wait">
            {filteredSingers.length === 0 ? (
              <motion.div 
                key="no-results"
                variants={noResultsVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-12"
              >
                <p className="text-muted-foreground mb-4">No singers match the selected filters.</p>
                <Button variant="outline" onClick={clearAllTags}>
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="singer-results"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
                variants={hasFilteredOnce ? singerGridVariants : undefined}
                initial={hasFilteredOnce ? "hidden" : false}
                animate={hasFilteredOnce ? "visible" : false}
                exit="exit"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredSingers.map((singer, index) => (
                    <motion.div
                      key={singer.slug}
                      variants={hasFilteredOnce ? singerItemVariants : getInitialLoadVariant(index)}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="w-full max-w-[512px]"
                    >
                      <SingerCard
                        name={singer.name}
                        image={singer.image}
                        slug={singer.slug}
                        tags={singer.tags.map(tag => tagDisplay[tag].label).join(', ')}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <Footer />
      </div>
    </>
  );
};

export default Singers;
