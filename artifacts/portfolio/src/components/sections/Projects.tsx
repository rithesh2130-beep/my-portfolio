import React from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { ExternalLink, Trophy, Activity, Database, Code2 } from "lucide-react";

const projects = [
  {
    title: "Drishta-AI",
    subtitle: "1st Place Hackathon Winner | Full Stack AI Safety Platform",
    description: "End-to-end AI platform with feature engineering pipelines and ML classification models. Real-time backend with sub-second response times. Improved prediction accuracy 30% over baseline.",
    tags: ["Python", "ML", "Backend", "Feature Engineering", "Git"],
    year: "2026",
    link: "https://github.com/rithesh2130-beep/drishta-ai",
    type: "github",
    icon: <Trophy className="w-10 h-10 text-primary" />,
    color: "from-primary/20 to-transparent"
  },
  {
    title: "Cloud Analytics Dashboard",
    subtitle: "Loan Insights Web App",
    description: "Full cloud-to-dashboard pipeline analyzing $3.08B in loans. Built 100% data quality Python ETL processes, deployed on Google Cloud Platform with Looker visualisations.",
    tags: ["BigQuery", "SQL", "Looker", "GCP", "Python"],
    year: "2026",
    link: "https://lnkd.in/gK-uHCVh",
    type: "external",
    icon: <Database className="w-10 h-10 text-secondary" />,
    color: "from-secondary/20 to-transparent"
  },
  {
    title: "AI Reflex Arena",
    subtitle: "Human Reflex Data Platform",
    description: "Real-time data collection platform with KPI dashboards measuring human reflex metrics. Improved data collection efficiency by 40% through optimized UI/UX and backend flows.",
    tags: ["Python", "Data Visualisation", "UI/UX"],
    year: "2026",
    link: "https://github.com/rithesh2130-beep/AI_Reflex_Arena",
    type: "github",
    icon: <Activity className="w-10 h-10 text-primary" />,
    color: "from-primary/20 to-transparent"
  },
  {
    title: "Full Stack Web Applications",
    subtitle: "Personal Portfolio Projects",
    description: "Multi-step flight booking system in React with dark-themed responsive UI. Engineered card-based personal web apps with advanced media integration.",
    tags: ["React.js", "HTML5", "CSS3", "JavaScript"],
    year: "2025–2026",
    link: "https://github.com/rithesh2130-beep",
    type: "github",
    icon: <Code2 className="w-10 h-10 text-muted-foreground" />,
    color: "from-white/5 to-transparent"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold">Featured <span className="text-primary">Projects</span></h2>
          <div className="h-px bg-white/10 flex-grow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full"
            >
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${project.color} opacity-50`} />
              
              <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-background border border-white/10 rounded-xl">
                    {project.icon}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground border border-white/10 px-2 py-1 rounded-full bg-background">
                    {project.year}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold font-display text-foreground mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-secondary font-medium mb-4">{project.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/5 rounded text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto pt-6 border-t border-white/10">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {project.type === 'github' ? <SiGithub /> : <ExternalLink className="w-4 h-4" />}
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
