import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import SingerPage from "./components/SingerPage";
import HowTo from "./pages/HowTo";
import Terms from "./pages/Terms";
import Singers from "./pages/Singers";
import AboutUtauV from "@/pages/AboutUtauV";
import AboutUs from "@/pages/AboutUs";
import Gallery from "@/pages/Gallery";
import Faq from "@/pages/Faq";
import Roadmap from "@/pages/Roadmap";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="app-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/singers" element={<Singers />} />
              <Route path="/singer/:slug" element={<SingerPage />} />
              <Route path="/how-to" element={<HowTo />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about-utauv" element={<AboutUtauV />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/community-works" element={<Navigate to="/gallery" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;