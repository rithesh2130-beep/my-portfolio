import React from "react";
import { motion } from "framer-motion";
import { 
  SiPython, SiSqlite, SiHtml5, SiCss, SiJavascript,
  SiReact, SiFlask, SiGooglecloud, SiLooker,
  SiGit, SiGithub, SiJupyter, SiLinux
} from "react-icons/si";
import { Database, Layout, Server, Cloud, Terminal, Code2, BarChart2, BarChart, FileCode } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: <Terminal className="w-5 h-5 text-primary" />,
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "Java", icon: <Code2 /> },
      { name: "SQL", icon: <SiSqlite /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss /> },
      { name: "JavaScript", icon: <SiJavascript /> },
    ]
  },
  {
    title: "Frontend",
    icon: <Layout className="w-5 h-5 text-primary" />,
    skills: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Responsive UI", icon: <Layout /> },
    ]
  },
  {
    title: "Backend & API",
    icon: <Server className="w-5 h-5 text-primary" />,
    skills: [
      { name: "Flask", icon: <SiFlask /> },
      { name: "REST APIs", icon: <Server /> },
      { name: "ETL", icon: <Database /> },
    ]
  },
  {
    title: "Databases & Cloud",
    icon: <Cloud className="w-5 h-5 text-primary" />,
    skills: [
      { name: "GCP", icon: <SiGooglecloud /> },
      { name: "BigQuery", icon: <SiGooglecloud /> },
      { name: "Looker", icon: <SiLooker /> },
      { name: "Power BI", icon: <BarChart2 /> },
      { name: "Tableau", icon: <BarChart /> },
      { name: "MySQL", icon: <SiSqlite /> },
    ]
  },
  {
    title: "Dev Tools",
    icon: <Terminal className="w-5 h-5 text-primary" />,
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "VS Code", icon: <FileCode /> },
      { name: "Jupyter", icon: <SiJupyter /> },
      { name: "Linux CLI", icon: <SiLinux /> },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative border-t border-white/5 bg-gradient-to-b from-transparent to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Technical <span className="text-primary">Arsenal</span></h2>
          <p className="text-muted-foreground max-w-2xl">A curated stack of tools, languages, and platforms used to engineer high-performance systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card/50 backdrop-blur border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                {cat.icon}
                <h3 className="font-display font-semibold text-lg">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 bg-background rounded border border-white/10 text-sm font-medium text-muted-foreground group-hover:border-primary/20 transition-colors">
                    <span className="text-primary">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
