import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import "../tab-animations.css";
import { Helmet } from "react-helmet-async";
import { Maximize2, Minimize2 } from "lucide-react";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren", 
      staggerChildren: 0.1 
    }
  }
};

const itemAppearVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 22,
      mass: 1.2
    }
  }
};

const slideVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? '50%' : '-50%',
    rotateY: direction > 0 ? -5 : 5,
    scale: 0.95,
    filter: 'blur(4px)'
  }),
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 25,
      mass: 1,
      staggerChildren: 0.09,
      delayChildren: 0.12
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? '-25%' : '25%',
    rotateY: direction > 0 ? 3 : -3,
    scale: 0.93,
    filter: 'blur(2px)',
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 37,
      mass: 0.8,
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }),
};

const childItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 25
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const tabIndicatorVariants = {
  initial: { width: 0, opacity: 0, left: 0 },
  animate: (index: number) => ({
    width: '33.33%',
    opacity: 1,
    left: `${index * 33.33}%`,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  })
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2, ease: "easeInOut" } 
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15, ease: "easeInOut" } 
  }
};

const HowTo = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("installation");
  const [prevTab, setPrevTab] = useState("installation");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedVideo, setExpandedVideo] = useState<{ url: string; title: string } | null>(null);
  
  const handleTabChange = (value: string) => {
    setPrevTab(activeTab);
    setActiveTab(value);
  };

  useEffect(() => {
    // Simulate loading state for animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const utauVInterfacePlaceholder = "/images/UtauV.webp";
  const googleDocTutorialLink = "https://docs.google.com/document/d/1Eb43g7Tc616YRtyfLEqrwGKLS5af238-KsGQoY06oBs/edit?usp=sharing";
  const megaModelsLink = "https://mega.nz/folder/riIkRawA#urkiXGT1SsuJLhquWJegoQ";
  const trainerGitHubLink = "https://github.com/emeraldsingers/AutoPitchTrainer"; 
  
  const tabs = ["installation", "autopitch", "resources"];
  const currentTabIndex = tabs.indexOf(activeTab);
  const prevTabIndex = tabs.indexOf(prevTab);
  const direction = currentTabIndex > prevTabIndex ? 1 : -1;

  const getTabIndex = (tabName: string) => {
    return tabs.indexOf(tabName);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      ref={containerRef}
    >
      <Helmet>
        <title>How To Use - Emerald Singers</title>
        <meta name="description" content="Learn how to install UtauV Emerald Edition, use AutoPitch, and find resources for the Emerald Project singers." />
        <link rel="canonical" href="https://emeraldsingers.github.io/how-to" />
      </Helmet>

      {/* Add the background components */}
      <AnimatedBackground theme={theme} />
      <FloatingElements theme={theme} />
      <StarryBackground theme={theme} />

            
      <motion.main 
        className="flex-grow container mx-auto px-4 py-20 relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            variants={itemAppearVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary"
          >
            How To Use
          </motion.h1>
          
          <motion.div 
            variants={itemAppearVariants}
            className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl p-6 mb-8 shadow-lg overflow-hidden"
            style={{ perspective: '1200px' }}
          >
            <Tabs defaultValue="installation" className="w-full" value={activeTab} onValueChange={handleTabChange}>
              <motion.div variants={itemAppearVariants} className="tab-list-container relative">
                <TabsList className="w-full mb-6 grid grid-cols-3 relative">
                  <TabsTrigger value="installation">Installation</TabsTrigger>
                  <TabsTrigger value="autopitch">AutoPitch</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <motion.div 
                    className="absolute bottom-0 h-[3px] bg-primary rounded-full"
                    variants={tabIndicatorVariants}
                    initial="initial"
                    animate="animate"
                    custom={getTabIndex(activeTab)}
                    layoutId="tabIndicator"
                  />
                </TabsList>
              </motion.div>
              
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {/* Installation Tab */}
                {activeTab === "installation" && (
                  <TabsContent value="installation" forceMount className="space-y-4 w-full" asChild>
                    <motion.div
                      key="installation"
                      custom={direction}
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div 
                        variants={fadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                          <div className="md:w-1/2 space-y-3">
                            <motion.h3 variants={childItemVariants} className="text-xl font-semibold text-primary">Download & Install UtauV</motion.h3>
                            <motion.ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                              {[
                                "Download UtauV Emerald Edition for your OS",
                                "Run the installer or extract the files",
                                "Run OpenUtau.exe",
                                "Download any Emerald singer",
                                "Drag singer's .zip into UtauV"
                              ].map((step, index) => (
                                <motion.li 
                                  key={index}
                                  variants={childItemVariants}
                                  custom={index}
                                  transition={{ delay: 0.1 + (index * 0.05) }}
                                >
                                  {step}
                                </motion.li>
                              ))}
                            </motion.ol>
                            <motion.div variants={childItemVariants}>
                               <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                                 <a href="https://github.com/emeraldsingers/UtauV/releases/download/v1.1.0.0/UtauV.1.1.0.0.1.Installer.exe" target="_blank" rel="noopener noreferrer">
                                   Download UtauV (Windows)
                                 </a>
                               </Button>
                             </motion.div>
                           </div>
                          <motion.div 
                            variants={childItemVariants}
                            className="md:w-1/2"
                            whileHover={{ 
                              scale: 1.02,
                              transition: { duration: 0.2 } 
                            }}
                          >
                            <img
                              src={utauVInterfacePlaceholder}
                              alt="OpenUtau Interface"
                              className="rounded-lg shadow-lg w-full h-auto object-contain"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                )}
              
                {/* AutoPitch Tab */}
                {activeTab === "autopitch" && (
                  <TabsContent value="autopitch" forceMount className="space-y-4 w-full" asChild>
                    <motion.div
                      key="autopitch"
                      custom={direction}
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div 
                        variants={fadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-3"
                      >
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="md:w-1/2 space-y-3">
                            <motion.h3 variants={childItemVariants} className="text-xl font-semibold text-primary">Setting Up AutoPitch</motion.h3>
                            <motion.ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                              {[
                                "Download AutoPitch models from Mega.nz",
                                "Locate Dependencies folder in UtauV install",
                                "Create \"autopitch\" subfolder",
                                "Copy .onnx and .yaml files into folder",
                                "Restart UtauV if running",
                                "Use Ctrl+T after selecting notes"
                              ].map((step, index) => (
                                <motion.li 
                                  key={index}
                                  variants={childItemVariants}
                                  custom={index}
                                  transition={{ delay: 0.1 + (index * 0.05) }}
                                >
                                  {step}
                                </motion.li>
                              ))}
                            </motion.ol>
                            
                            <motion.div 
                              variants={childItemVariants}
                              className="mt-6"
                              whileHover={{ 
                                scale: 1.03,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                              }}
                            >
                              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                                <a href={megaModelsLink} target="_blank" rel="noopener noreferrer">
                                  Download AutoPitch Models
                                </a>
                              </Button>
                            </motion.div>
                          </div>
                          
                          <motion.div 
                            variants={childItemVariants}
                            className="md:w-1/2"
                          >
                            <motion.h3 variants={childItemVariants} className="text-xl font-semibold text-primary mb-4">Video Tutorial</motion.h3>
                            <motion.div 
                              variants={childItemVariants}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="aspect-video overflow-hidden rounded-lg shadow-lg mb-2 h-full flex flex-col"
                            >
                              <div className="relative w-full h-full flex-1">
                                <iframe
                                  src="https://www.youtube.com/embed/Sb9KlqyIHz8"
                                  title="AutoPitch Tutorial"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                ></iframe>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="absolute top-2 right-2 bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black/90 z-10"
                                  onClick={() => setExpandedVideo({ 
                                    url: "https://www.youtube.com/embed/Sb9KlqyIHz8", 
                                    title: "AutoPitch Tutorial" 
                                  })}
                                >
                                  <Maximize2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                )}
              
                {/* Resources Tab */}
                {activeTab === "resources" && (
                  <TabsContent value="resources" forceMount className="w-full" asChild>
                    <motion.div
                      key="resources"
                      custom={direction}
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div 
                        variants={fadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-4"
                      >
                        <motion.h3 variants={childItemVariants} className="text-xl font-semibold text-primary">Helpful Resources</motion.h3>
                        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Detailed Tutorial",
                              description: "Complete guide to UtauV and AutoPitch",
                              link: googleDocTutorialLink,
                              linkText: "View Tutorial"
                            },
                            {
                              title: "AutoPitch Trainer",
                              description: "Train your own AutoPitch models",
                              link: trainerGitHubLink,
                              linkText: "GitHub Repository"
                            }
                          ].map((resource, index) => (
                            <motion.div 
                              key={index}
                              variants={childItemVariants}
                              custom={index}
                              whileHover={{ 
                                scale: 1.03,
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                              }}
                              transition={{ delay: 0.2 + (index * 0.1) }}
                              className="bg-white/5 dark:bg-black/10 rounded-lg p-4"
                            >
                              <h4 className="text-lg font-medium text-primary mb-2">{resource.title}</h4>
                              <p className="text-muted-foreground mb-4">{resource.description}</p>
                              <Button variant="outline" className="w-full" asChild>
                                <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.linkText}</a>
                              </Button>
                            </motion.div>
                          ))}

                          <motion.div 
                            variants={childItemVariants}
                            custom={2}
                            whileHover={{ 
                              scale: 1.03,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            className="bg-white/5 dark:bg-black/10 rounded-lg p-4 md:col-span-2"
                          >
                            <h4 className="text-lg font-medium text-primary mb-2">Browse Our Singers</h4>
                            <p className="text-muted-foreground mb-4">Explore our UTAU voicebanks</p>
                            <Button variant="default" className="w-full" asChild>
                              <Link to="/singers">View Singers</Link>
                            </Button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                )}
              </AnimatePresence>
            </Tabs>
          </motion.div>

          {/* Contact Button Section */}
          <motion.div 
             variants={itemAppearVariants}
             className="text-center mt-8"
          >
            <p className="text-muted-foreground mb-2">Need help or have questions?</p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                asChild
              >
                <a href="mailto:contact@emeraldsingers.com">Contact Us</a>
              </Button>
            </motion.div>
          </motion.div>
        </div> 
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
  );
};

export default HowTo;
