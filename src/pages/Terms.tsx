import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { AnimatedBackground, FloatingElements, StarryBackground } from "@/components/AnimatedBackgrounds";
import { Scroll, FileText, AlertCircle, Shield, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Terms = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      ref={containerRef}
    >
      <Helmet>
        <title>Terms of Use - Emerald Singers</title>
        <meta name="description" content="Read the terms and conditions for using the Emerald Project's virtual singers, software, and website. Understand usage guidelines, disclaimers, and commercial use policies." />
        <link rel="canonical" href="https://emeraldsingers.github.io/#/terms" />
      </Helmet>
      
      <AnimatedBackground theme={theme} />
      <FloatingElements theme={theme} />
      <StarryBackground theme={theme} />
      
      <Navigation />
            
      {/* Hero Section */}
      <motion.header 
        className="relative h-[35vh] flex items-center justify-center overflow-hidden pt-8"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className={`inline-flex items-center justify-center p-4 rounded-full mb-6 mt-3 ${
              theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
            }`}
          >
            <FileText className="h-8 w-8 text-primary" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Terms of <span className="text-emerald-500">Use</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Guidelines for using Emerald Project resources
          </motion.p>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-10 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto glass-morphism rounded-xl p-8 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <p className="text-muted-foreground mb-8 text-lg">
              Welcome to the Emerald Project! By using our virtual singers, software, and website, you agree to the following terms and conditions. Please read them carefully.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">Usage Guidelines</h2>
            </div>
            <div className="pl-12">
              <ul className="list-disc space-y-3 text-muted-foreground">
                <li>Our singers are provided primarily for <span className="text-primary font-medium">non-commercial use</span>. If you wish to use them for commercial projects, please contact us at <a href="mailto:emeraldprojectutau@gmail.com" className="text-emerald-500 hover:underline">emeraldprojectutau@gmail.com</a> to discuss licensing.</li>
                <li>Do not redistribute the original voicebank files or software components.</li>
                <li>Give clear credit to the Emerald Project and the specific singer used in your works.</li>
                <li>Do not use our singers or software for any content that is hateful, defamatory, illegal, or harmful.</li>
                <li>Modifications to voicebanks for personal use are generally permitted, but redistribution of modified files requires explicit permission.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <AlertCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">Disclaimer</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground">
                The Emerald Project materials are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <Sparkles className="h-5 w-5 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">Intellectual Property</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground mb-3">
                All Emerald Project voicebanks, software, and website content remain the intellectual property of their respective creators and the Emerald Project team.
              </p>
              <p className="text-muted-foreground">
                Using our resources does not transfer any ownership rights. The Emerald Project reserves all rights not explicitly granted in these terms.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <Scroll className="h-5 w-5 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">Changes to Terms</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Your continued use of our resources constitutes acceptance of the revised terms.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className={`mt-10 p-4 rounded-lg border ${theme === 'dark' ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-emerald-200 bg-emerald-50'}`}
          >
            <p className="text-center text-sm">
              Last updated: March 2025
            </p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;