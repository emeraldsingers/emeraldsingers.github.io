import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.5 }
  }
};

const Terms = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col overflow-hidden animated-background-container",
        theme === 'dark' ? "dark-theme-background" : "light-theme-background"
      )}
      ref={containerRef}
    >
      <Helmet>
        <title>Terms of Use - Emerald Singers</title>
        <meta name="description" content="Read the terms and conditions for using the Emerald Project's virtual singers, software, and website. Understand usage guidelines, disclaimers, and commercial use policies." />
        <link rel="canonical" href="https://emeraldsingers.github.io/terms" />
      </Helmet>
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-3xl mx-auto glass-morphism rounded-xl p-8 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">Terms of Use</h1>
          <p className="text-muted-foreground mb-4">
            Welcome to the Emerald Project! By using our virtual singers, software, and website, you agree to the following terms and conditions. Please read them carefully.
          </p>
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Usage Guidelines</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Our singers are provided primarily for non-commercial use. If you wish to use them for commercial projects, please contact us at emeraldprojectutau@gmail.com to discuss licensing.</li>
            <li>Do not redistribute the original voicebank files or software components.</li>
            <li>Give clear credit to the Emerald Project and the specific singer used in your works.</li>
            <li>Do not use our singers or software for any content that is hateful, defamatory, illegal, or harmful.</li>
            <li>Modifications to voicebanks for personal use are generally permitted, but redistribution of modified files requires explicit permission.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Disclaimer</h2>
          <p className="text-muted-foreground mb-4">
            The Emerald Project materials are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Changes to Terms</h2>
          <p className="text-muted-foreground mb-4">
            We reserve the right to modify these terms at any time. Your continued use of our resources constitutes acceptance of the revised terms.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;