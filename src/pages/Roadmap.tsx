import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const roadmapData = {
  inPlans: [
    {
      id: 1,
      title: "New Singers",
      description: "Working on a new virtual singer",
      timeline: "Q2 2025",
      priority: "High"
    },

    {
      id: 3,
      title: "DiffSinger Voicebanks",
      description: "DiffSinger voicebanks for all singers",
      timeline: "Q2 2025",
      priority: "Medium"
    },

  ],
  inProgress: [
    {
      id: 4,
      title: "Mitsuo Voicebanks release",
      description: "JA CVVC & RU CVC voicebanks for Mitsuo",
      progress: 60,
      startedDate: "April 2025"
    },
    {
      id: 5,
      title: "Voice Bank Updates",
      description: "Refining existing voice banks",
      progress: 65,
      startedDate: "April 2025"
    }
  ],
  completed: [
    {
      id: 6,
      title: "Initial Release",
      description: "First public launch of the Emerald Project",
      completedDate: "January, 12th 2025"
    },
    {
      id: 7,
      title: "Official Site Launch",
      description: "The site was launched on February 20th, 2025",
      completedDate: "February 20th, 2025"
    },
    {
      id: 8,
      title: "AutoPitch Plugin & AutoHarmonies",
      description: "Plugins installed in UtauV",
      completedDate: "April 2025"
    },
    {
      id: 9,
      title: "Site Redesign",
      description: "New appearance of the site with improved design and functionality",
      completedDate: "May 2025"
    }
  ]
};

const Roadmap = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
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
        className="container mx-auto px-4 py-32 flex-grow"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      > 
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold text-primary mb-6 text-center"
        >
          Project Roadmap
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto"
        >
          Track our development progress and upcoming features for the Emerald Project
        </motion.p>

        {/* In Plans Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-20"
        >
          <motion.h2 className="text-2xl font-semibold text-primary mb-8 border-b border-primary/20 pb-3">
            📝 In Plans
          </motion.h2>
          
          <div className={`grid grid-cols-1 ${roadmapData.inPlans.length < 3 ? 'md:grid-cols-2 max-w-3xl' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 mx-auto`}>
            {roadmapData.inPlans.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-primary/80">Expected: {item.timeline}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.priority === "High" 
                      ? "bg-red-500/10 text-red-400" 
                      : item.priority === "Medium" 
                        ? "bg-yellow-500/10 text-yellow-400" 
                        : "bg-green-500/10 text-green-400"
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* In Progress Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-20"
        >
          <motion.h2 className="text-2xl font-semibold text-primary mb-8 border-b border-primary/20 pb-3">
            ⚙️ Currently in Progress
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmapData.inProgress.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="mb-2 text-sm text-primary/80">Started: {item.startedDate}</div>
                <div className="relative w-full h-2 bg-background rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="text-right text-sm mt-1 text-primary">{item.progress}% Complete</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Completed Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-12"
        >
          <motion.h2 className="text-2xl font-semibold text-primary mb-8 border-b border-primary/20 pb-3">
            ✅ Completed
          </motion.h2>
          
          <div className={`grid grid-cols-1 ${roadmapData.completed.length < 3 ? 'md:grid-cols-2 max-w-3xl' : 'md:grid-cols-3'} gap-6 mx-auto`}>
            {roadmapData.completed.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-primary/80">Completed: {item.completedDate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Roadmap; 