import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const HowTo = () => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  const utauVInterfacePlaceholder = "/images/UtauV.png";
  const dependenciesFolderPlaceholder = "/images/dependencies.png";
  const autopitchFolderPlaceholder = "/images/autopitch-folder.png";
  const mainBannerPlaceholder = "/images/emerald.png";

  const googleDocTutorialLink = "https://docs.google.com/document/d/1Eb43g7Tc616YRtyfLEqrwGKLS5af238-KsGQoY06oBs/edit?usp=sharing";
  const megaModelsLink = "https://mega.nz/folder/rilkRawA#urkiXGT1SsuJLhquWJegoQ";
  const trainerGitHubLink = "https://github.com/emeraldsingers/AutoPitchTrainer"; 

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50"
      style={{
        backgroundImage: theme === "light"
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgb(159, 223, 159), #FFFFFF)`
          : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #004040, #000000)`,
        transition: 'background-image 0.3s ease',
      }}
      ref={containerRef}
    >
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">

        <div className="rounded-xl overflow-hidden mb-16 shadow-lg">
          <div className="relative">
            <img
              src={mainBannerPlaceholder}
              alt="UtauV Emerald Banner"
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 neo-blur flex flex-col justify-center items-center px-8">
              <h1 className="text-5xl font-bold mb-2 text-center text-primary shadow-text">
                UTAU
              </h1>
              <p className="text-2xl text-primary text-center shadow-text">
                With UtauV (OpenUtau) Emerald Edition
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">UtauV Emerald Installation</h2>
          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              <span className="text-[#9b87f5]">Step 1. </span>
              Download Any Emerald Singer
            </h3>
            <p className="mb-4 text-muted-foreground">You need at least one voicebank to use UtauV.</p>
            <Button asChild className="bg-primary/90 hover:bg-primary text-primary-foreground button-glass-gradient">
              <Link to="/singers">
                Browse Emerald Singers
              </Link>
            </Button>
          </div>

          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              <span className="text-[#9b87f5]">Step 2. </span>
              Download UtauV Emerald Edition
            </h3>
            <img
              src={utauVInterfacePlaceholder}
              alt="OpenUtau Interface"
              className="rounded-lg mb-4 w-full" 
            />
            <p className="mb-4 text-muted-foreground">Get the installer for your operating system.</p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-primary/90 hover:bg-primary text-primary-foreground button-glass-gradient"
                asChild
              >
                <a href="https://github.com/emeraldsingers/UtauV/releases/download/v1.1.0.0/UtauV.1.1.0.0.1.Installer.exe" target="_blank" rel="noopener noreferrer">
                  Windows x64 Installer
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-8 text-center mb-16">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                <span className="text-[#9b87f5]">Step 3. </span>
                Install or Unzip UtauV
              </h3>
              <p className="text-muted-foreground">
                Run the installer or unzip the downloaded archive to your desired folder. Then run OpenUtau.exe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                <span className="text-[#9b87f5]">Step 4. </span>
                Install Emerald Singer
              </h3>
              <p className="text-muted-foreground">
                Drag and drop the downloaded singer's .zip file directly into the UtauV main window. Click "Next" then "Install". No need to unzip manually.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mt-16 mb-12 text-primary">Installing AutoPitch Model</h2>
          <p className="text-center text-muted-foreground mb-8">
            To use the automatic pitch generation feature, install a pre-trained AutoPitch model.
          </p>

          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              <span className="text-[#9b87f5]">Step 1. </span>
              Download Pre-trained AutoPitch Model
            </h3>
            <p className="mb-4 text-muted-foreground">
              You need the .onnx model file and the phoneme_vocab.yaml file.
              Download them from the link below.
            </p>
            <Button asChild className="bg-primary/90 hover:bg-primary text-primary-foreground button-glass-gradient">
              <a href={megaModelsLink} target="_blank" rel="noopener noreferrer">
                Download Models (Mega.nz)
              </a>
            </Button>
          </div>

          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              <span className="text-[#9b87f5]">Step 2. </span>
              Locate UtauV Dependency Folder
            </h3>
            <p className="mb-4 text-muted-foreground">
              Find the Dependencies folder within your UtauV installation directory (where OpenUtau.exe is located).
            </p>
            <img
              src={dependenciesFolderPlaceholder}
              alt="UtauV Dependencies Folder Location"
              className="rounded-lg mb-4 w-full max-w-lg mx-auto"
            />
          </div>

          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              <span className="text-[#9b87f5]">Step 3. </span>
              Create 'autopitch' Subfolder
            </h3>
            <p className="mb-4 text-muted-foreground">
              Inside the Dependencies folder, create a new folder named exactly autopitch if it doesn't already exist.
              The final path should look like .../Dependencies/autopitch/.
            </p>
          </div>

          <div className="mb-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              <span className="text-[#9b87f5]">Step 4. </span>
              Copy Model Files
            </h3>
            <p className="mb-4 text-muted-foreground">
              Copy the downloaded autopitch.onnx (or your renamed file) and phoneme_vocab.yaml into the Dependencies/autopitch folder you just created or found.
            </p>
            <img
              src={autopitchFolderPlaceholder}
              alt="Final autopitch Folder Structure"
              className="rounded-lg mb-4 w-full max-w-lg mx-auto"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Restart UtauV if it was running. AutoPitch should now be available (e.g., via Ctrl+T).
            </p>
          </div>

          <div className="text-center mt-16 mb-12 space-y-6">
             <h3 className="text-2xl font-semibold text-primary">Need More Help or Want to Train Your Own Model?</h3>
             <p className="text-muted-foreground">
               For detailed usage of AutoPitch within UtauV, troubleshooting, customizing randomness, and instructions on how to use the AutoPitch Trainer application to create your own models, please refer to the full documentation. You can also find the trainer's source code on GitHub.
             </p>
             <div className="flex justify-center gap-4 flex-wrap pt-4">
               <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground button-glass-gradient">
                 <a href={googleDocTutorialLink} target="_blank" rel="noopener noreferrer">
                   Full Tutorial (Google Docs)
                 </a>
               </Button>
               <Button asChild variant="outline" className="button-glass-gradient">
                 <a href={trainerGitHubLink} target="_blank" rel="noopener noreferrer">
                   Trainer GitHub Repo
                 </a>
               </Button>
             </div>
          </div>

        </div> 
      </main>
      <Footer />
    </div>
  );
};

export default HowTo;