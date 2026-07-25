import React, { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import Sidebar from "./components/sections/Sidebar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";
import CursorSpotlight from "./components/sections/CursorSpotlight";
import ParticleField from "./components/sections/ParticleField";

// Admin components
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-violet-100 border border-violet-200 shadow-lg shadow-violet-100 flex items-center justify-center text-violet-600 hover:bg-violet-600 hover:text-white hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Animated logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="text-6xl md:text-8xl font-display font-black gradient-text select-none">
          PR.
        </div>
        {/* Orbiting ring */}
        <motion.div
          className="absolute inset-[-20px] rounded-full border border-violet-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[-35px] rounded-full border border-teal-500/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Loading bar */}
      <motion.div className="mt-12 w-48 h-[2px] bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 via-teal-400 to-violet-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-xs font-mono text-slate-400 tracking-widest uppercase font-semibold"
      >
        Loading Experience...
      </motion.p>
    </motion.div>
  );
}

function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");

  // IntersectionObserver for Scroll-Spy
  useEffect(() => {
    if (loading) return;
    const sections = ["about", "skills", "projects", "education", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // focus area in the viewport
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Give DOM elements a tiny moment to mount
    const timer = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen
            key="loader"
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full bg-white min-h-screen overflow-x-hidden selection:bg-violet-200 selection:text-violet-900 flex flex-col md:flex-row noise-overlay"
        >
          {/* Ambient background layers */}
          <ParticleField />
          <CursorSpotlight />
          
          {/* Mesh gradient background */}
          <div className="fixed inset-0 z-0 mesh-gradient pointer-events-none" />
          
          {/* Sticky Left Sidebar */}
          <Sidebar activeSection={activeSection} />

          {/* Right Scrollable Content Pane */}
          <main className="flex-grow min-w-0 relative z-10 flex flex-col bg-slate-50/20 md:pl-80 lg:pl-96">
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <Education />
            <div className="section-divider" />
            <Contact />
          </main>
          <ScrollToTop />
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  // Set light-mode body classes
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.body.className = "bg-white text-slate-900 antialiased";
  }, []);

  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route path="/admin" component={Login} />
      <Route path="/admin/dashboard" component={Dashboard} />
      {/* Fallback */}
      <Route>
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans p-6 text-center">
          <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-2">404 - Not Found</h2>
          <p className="text-slate-500 mb-6">The page you are looking for does not exist.</p>
          <a href="/" className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-750 transition-all shadow-md">
            Go Home
          </a>
        </div>
      </Route>
    </Switch>
  );
}
