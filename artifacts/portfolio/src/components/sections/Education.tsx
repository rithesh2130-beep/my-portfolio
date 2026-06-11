import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Trophy } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-2 gap-16"
      >
        <div>
          <div className="flex items-center gap-3 mb-10">
            <GraduationCap className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">Education</h2>
          </div>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_hsl(var(--secondary)/0.5)] z-10 text-secondary">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-secondary/30 bg-secondary/5 backdrop-blur">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-mono text-secondary">2023 - 2027</div>
                </div>
                <h3 className="font-bold text-lg">B.Tech AI & Data Science</h3>
                <p className="text-sm text-muted-foreground mb-2">3rd Year Student</p>
                <div className="inline-block px-2 py-1 bg-background rounded text-xs font-mono text-primary border border-white/5">
                  CGPA: 7.5
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-card/50 backdrop-blur">
                <h3 className="font-bold text-lg">Intermediate (MPC)</h3>
                <p className="text-sm text-muted-foreground mb-2">Mother Theresa Junior College</p>
                <div className="inline-block px-2 py-1 bg-background rounded text-xs font-mono text-white/70 border border-white/5">
                  Score: 86.2%
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-card/50 backdrop-blur">
                <h3 className="font-bold text-lg">SSC</h3>
                <p className="text-sm text-muted-foreground mb-2">Elena Bettini High School</p>
                <div className="inline-block px-2 py-1 bg-background rounded text-xs font-mono text-white/70 border border-white/5">
                  Score: 96%
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-10">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">Certifications</h2>
          </div>
          
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur flex gap-4"
            >
              <div className="mt-1">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-xs font-mono text-primary mb-1">2024</div>
                <h3 className="font-bold text-lg mb-1">1st Place — Inter-College Hackathon</h3>
                <p className="text-sm text-muted-foreground">Won first place out of numerous teams for developing Drishta-AI, a full-stack AI safety platform.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl border border-white/10 bg-card/50 backdrop-blur flex gap-4"
            >
              <div className="mt-1">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-xs font-mono text-secondary mb-1">2026</div>
                <h3 className="font-bold text-lg mb-1">Google Cloud Data Analytics Certificate</h3>
                <p className="text-sm text-muted-foreground">Certified in BigQuery, SQL, and Looker for enterprise data analysis and visualisation.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
