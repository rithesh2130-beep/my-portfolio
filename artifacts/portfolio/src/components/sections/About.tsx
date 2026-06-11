import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold">About <span className="text-secondary">Me</span></h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              I am a precision-focused <strong className="text-foreground">Full Stack Developer</strong> and <strong className="text-foreground">AI & Data Science student</strong> who refuses to build generic software. I don't just write code; I architect systems that scale, perform, and leave an impact.
            </p>
            <p>
              Bridging the gap between bleeding-edge AI models and pixel-perfect web interfaces is where I thrive. Whether it's securing 1st place at competitive hackathons or analyzing $3.08B in loan data via GCP, I deliver production-grade results under pressure.
            </p>
            <p className="font-mono text-primary text-sm uppercase tracking-widest mt-8">
              &gt; Ready to engineer the future.
            </p>
          </div>
        </div>
        
        <div className="relative hidden md:block">
          <div className="absolute -inset-4 border border-primary/20 rounded-lg transform rotate-3" />
          <div className="absolute -inset-4 border border-secondary/20 rounded-lg transform -rotate-2" />
          <div className="bg-card border border-white/5 rounded-lg p-8 relative z-10 backdrop-blur-sm">
            <pre className="text-xs sm:text-sm font-mono text-muted-foreground overflow-hidden">
              <code className="language-json">
{`{
  "name": "Pandi Rithesh Raja",
  "status": "Online",
  "location": "India",
  "focus": [
    "AI Systems",
    "Full Stack Architecture",
    "Data Pipelines"
  ],
  "drive": "Unstoppable",
  "coffee": true
}`}
              </code>
            </pre>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
