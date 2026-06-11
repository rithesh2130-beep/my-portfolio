import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const roleText = "Full Stack Developer | AI & Data Science Student";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(roleText.slice(0, i));
      i++;
      if (i > roleText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid pt-20">
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/20 rounded-full"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8 group"
        >
          <div className="absolute inset-0 rounded-full glow-border animate-pulse" />
          <img
            src="/rithesh-photo.jpeg"
            alt="Pandi Rithesh Raja"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-2 border-primary/50 relative z-10 filter grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-foreground mb-4 drop-shadow-2xl">
            Pandi Rithesh <span className="text-primary glow-text block sm:inline">Raja</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="h-8 mb-8"
        >
          <p className="text-lg md:text-xl font-mono text-secondary tracking-wide">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-5 ml-1 bg-primary align-middle"
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="https://github.com/rithesh2130-beep"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-sm font-medium hover:bg-white/10 hover:border-primary/50 transition-all group"
          >
            <SiGithub className="text-xl group-hover:text-primary transition-colors" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/pandiritheshraja"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-sm font-medium hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all group"
          >
            <FaLinkedin className="text-xl text-primary" />
            <span className="text-primary group-hover:glow-text">LinkedIn</span>
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
      </motion.div>
    </section>
  );
}
