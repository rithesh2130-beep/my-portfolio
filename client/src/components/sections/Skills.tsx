import { motion, Variants } from "framer-motion";
import {
  SiPython,
  SiSqlite,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiJupyter,
  SiTensorflow,
  SiScikitlearn,
  SiDocker,
} from "react-icons/si";
import {
  Database,
  Layout,
  Server,
  Terminal,
  Code2,
  BarChart2,
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
    title: "MERN Stack",
    icon: Code2,
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "Express.js", icon: SiExpress },
      { name: "React.js", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "Responsive UI", icon: Layout },
    ],
  },
  {
    title: "Backend & API",
    icon: Server,
    skills: [
      { name: "REST APIs", icon: Server },
      { name: "JWT Auth", icon: Database },
      { name: "Python", icon: SiPython },
      { name: "SQL", icon: SiSqlite },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: BarChart2,
    skills: [
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "Scikit-Learn", icon: SiScikitlearn },
      { name: "Jupyter", icon: SiJupyter },
      { name: "LLM APIs", icon: Code2 },
    ],
  },
  {
    title: "Dev Tools",
    icon: Terminal,
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Docker", icon: SiDocker },
      { name: "VS Code", icon: Code2 },
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
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-rose-50/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-violet-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 text-slate-900">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-violet-600 via-rose-400 to-violet-600" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center text-slate-500 text-lg max-w-2xl mx-auto mb-14"
        >
          A handpicked toolbox of languages, libraries, databases, and platforms I work with.
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
                boxShadow: "0 12px 30px rgba(124, 58, 237, 0.06)",
                borderColor: "rgba(124, 58, 237, 0.2)"
              }}
              className="glass-card relative rounded-3xl bg-white border border-slate-100 overflow-hidden transition-all duration-300"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/[0.02] to-rose-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center gap-3 px-6 py-4.5 border-b border-slate-50">
                <category.icon className="w-5 h-5 text-violet-600" />
                <h3 className="font-display font-bold text-slate-900 text-lg">
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
                      boxShadow: "0 4px 12px rgba(124, 58, 237, 0.08)",
                      borderColor: "rgba(124, 58, 237, 0.3)",
                      color: "hsl(var(--primary))"
                    }}
                    className="skill-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 bg-slate-50/50 border border-slate-100 cursor-default transition-all duration-250 hover:bg-white"
                  >
                    <skill.icon className="w-3.5 h-3.5 text-violet-600/80 group-hover:text-violet-600 transition-colors" />
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
