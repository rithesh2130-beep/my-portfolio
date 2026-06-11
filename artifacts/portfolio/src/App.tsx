import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";
import CursorSpotlight from "./components/sections/CursorSpotlight";

const queryClient = new QueryClient();

function Portfolio() {
  return (
    <div className="relative w-full bg-background min-h-screen overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <CursorSpotlight />
      <Navbar />
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

function App() {
  // Force dark mode
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Portfolio />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
