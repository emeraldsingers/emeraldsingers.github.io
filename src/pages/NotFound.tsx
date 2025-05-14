import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, Users, ArrowLeft, XCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const { theme } = useTheme();

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

  return (
    <div
      className={`min-h-screen flex flex-col animated-background-container ${
        theme === "dark" ? "dark-theme-background" : "light-theme-background"
      }`}
    >
      <Helmet>
        <title>Page Not Found - Emerald Singers</title>
        <meta name="description" content="The page you are looking for could not be found on the Emerald Singers website." />
        <link rel="canonical" href="https://emeraldsingers.github.io/404" />
      </Helmet>
      <div className="ray-three"></div>

      <main className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <motion.div
          className="max-w-2xl w-full text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <XCircle className="mx-auto h-32 w-32 text-primary/70" />
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl font-bold text-primary mb-4">
            404
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-3xl font-semibold text-primary mb-6">
            Page Not Found
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="h-5 w-5" /> Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/singers">
                <Users className="h-5 w-5" /> Singers
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.history.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-5 w-5" /> Go Back
            </Button>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound; 