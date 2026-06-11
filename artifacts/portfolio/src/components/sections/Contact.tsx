import React from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail, Phone, ArrowUpRight, Code2 } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative text-center">
      <div className="absolute inset-0 top-1/2 -translate-y-1/2 bg-primary/5 blur-[100px] rounded-full z-0" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl"
      >
        <h2 className="text-4xl md:text-6xl font-display font-black mb-6">Let's build <span className="text-primary glow-text">the future.</span></h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Currently open for roles where I can architect robust systems, push the boundaries of AI, and engineer experiences that matter.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <a href="mailto:23hr1a3045@gmail.com" className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all w-full md:w-auto group">
            <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm">23hr1a3045@gmail.com</span>
          </a>
          <a href="tel:+919347718219" className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-xl border border-white/10 hover:border-secondary/50 hover:bg-secondary/5 transition-all w-full md:w-auto group">
            <Phone className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm">+91 9347718219</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://linkedin.com/in/pandiritheshraja"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full bg-background border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all group"
          >
            <FaLinkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
          </a>
          <a
            href="https://github.com/rithesh2130-beep"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full bg-background border border-white/10 flex items-center justify-center hover:bg-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all group"
          >
            <SiGithub className="w-6 h-6 text-muted-foreground group-hover:text-background transition-colors" />
          </a>
        </div>
      </motion.div>
      
      <div className="mt-20 text-center text-sm font-mono text-muted-foreground opacity-50 relative z-10">
        <p>© {new Date().getFullYear()} Pandi Rithesh Raja. All rights reserved.</p>
        <p className="mt-2 flex items-center justify-center gap-2">
          Engineered with <Code2 className="w-4 h-4" />
        </p>
      </div>
    </section>
  );
}
