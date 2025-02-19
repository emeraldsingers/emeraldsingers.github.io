import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import SingerPage from "./components/SingerPage";
import HowTo from "./pages/HowTo";
import Terms from "./pages/Terms";
import Singers from "./pages/Singers";
import AboutUtauV from "@/pages/AboutUtauV";
import AboutUs from "@/pages/AboutUs";
import Gallery from "@/pages/Gallery";
import CommunityWorks from "@/pages/CommunityWorks";
import Lore from "@/pages/Story";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/singers" element={<Singers />} />
            <Route path="/singer/:slug" element={<SingerPage />} />
            <Route path="/how-to" element={<HowTo />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about-utauv" element={<AboutUtauV />} />
             <Route path="/about-us" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/community-works" element={<CommunityWorks />} />
             <Route path="/lore" element={<Lore />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;