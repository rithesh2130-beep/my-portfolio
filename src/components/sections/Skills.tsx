import { motion, Variants } from "framer-motion";
import {
  SiPython,
  SiSqlite,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiFlask,
  SiGooglecloud,
  SiLooker,
  SiGit,
  SiGithub,
  SiJupyter,
  SiLinux,
} from "react-icons/si";
import {
  Database,
  Layout,
  Server,
  Cloud,
  Terminal,
  Code2,
  BarChart2,
  BarChart,
  FileCode,
} from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type SkillIcon = IconType | LucideIcon;

interface Skill {
  name: string;
  icon: SkillIcon;
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FileCode },
      { name: "SQL", icon: SiSqlite },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      { name: "React.js", icon: SiReact },
      { name: "Responsive UI", icon: Layout },
    ],
  },
  {
    title: "Backend & API",
    icon: Server,
    skills: [
      { name: "Flask", icon: SiFlask },
      { name: "REST APIs", icon: Server },
      { name: "ETL", icon: Database },
    ],
  },
  {
    title: "Databases & Cloud",
    icon: Cloud,
    skills: [
      { name: "GCP", icon: SiGooglecloud },
      { name: "BigQuery", icon: Database },
      { name: "Looker", icon: SiLooker },
      { name: "Power BI", icon: BarChart2 },
      { name: "Tableau", icon: BarChart },
      { name: "MySQL", icon: Database },
    ],
  },
  {
    title: "Dev Tools",
    icon: Terminal,
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: Code2 },
      { name: "Jupyter", icon: SiJupyter },
      { name: "Linux CLI", icon: SiLinux },
    ],
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const pillContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-primary" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-14"
        >
          A curated stack of tools, languages, and platforms used to engineer
          high-performance systems.
        </motion.p>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -4,
                boxShadow: "0 0 30px 0 hsla(186,100%,50%,0.08)",
              }}
              className="glass-card gradient-border group relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 hover:border-primary/25"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <category.icon className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {category.title}
                </h3>
              </div>

              {/* Skill Pills */}
              <motion.div
                variants={pillContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative z-10 flex flex-wrap gap-2.5 p-6"
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill.name}
                    variants={pillVariants}
                    whileHover={{
                      y: -1,
                      boxShadow: "0 0 16px 0 hsla(186,100%,50%,0.15)",
                    }}
                    className="skill-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium text-muted-foreground bg-white/[0.04] border border-white/10 cursor-default transition-all duration-250 hover:text-foreground hover:border-primary/30 hover:bg-white/[0.07]"
                  >
                    <skill.icon className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors" />
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
