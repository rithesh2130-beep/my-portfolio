import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="font-display font-bold text-2xl tracking-tighter text-primary glow-text select-none">
        PR.
      </div>
      <nav className="hidden md:flex gap-8">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest relative group"
          >
            {item.name}
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
      <div className="md:hidden text-primary font-bold text-sm tracking-widest">
        MENU
      </div>
    </motion.header>
  );
}
