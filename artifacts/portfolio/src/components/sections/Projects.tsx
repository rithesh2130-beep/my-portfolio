import { useState, useRef, MouseEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Trophy, Activity, Database, Code2, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  link: string;
  icon: React.ReactNode;
  iconBg: string;
  featured?: boolean;
  external?: boolean;
}

const projects: Project[] = [
  {
    title: 'Cloud Analytics Dashboard',
    subtitle: 'Loan Insights Web App',
    description:
      'Full cloud-to-dashboard pipeline analyzing $3.08B in loans. Built 100% data quality Python ETL processes, deployed on GCP with Looker.',
    tags: ['BigQuery', 'SQL', 'Looker', 'GCP', 'Python'],
    year: '2026',
    link: 'https://lnkd.in/gK-uHCVh',
    icon: <Database className="w-5 h-5" />,
    iconBg: 'bg-secondary/20 text-secondary',
    external: true,
  },
  {
    title: 'AI Reflex Arena',
    subtitle: 'Human Reflex Data Platform',
    description:
      'Real-time data collection platform with KPI dashboards measuring human reflex metrics. Improved data collection efficiency by 40%.',
    tags: ['Python', 'Data Visualisation', 'UI/UX'],
    year: '2026',
    link: 'https://github.com/rithesh2130-beep/AI_Reflex_Arena',
    icon: <Activity className="w-5 h-5" />,
    iconBg: 'bg-primary/20 text-primary',
  },
  {
    title: 'Full Stack Web Applications',
    subtitle: 'Personal Portfolio Projects',
    description:
      'Multi-step flight booking system in React with dark-themed responsive UI. Card-based personal web apps with advanced media integration.',
    tags: ['React.js', 'HTML5', 'CSS3', 'JavaScript'],
    year: '2025–2026',
    link: 'https://github.com/rithesh2130-beep',
    icon: <Code2 className="w-5 h-5" />,
    iconBg: 'bg-primary/20 text-primary',
  },
];

function useTilt() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return { tilt, handleMouseMove, handleMouseLeave };
}

function FeaturedProject() {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: tilt.rotateX === 0 && tilt.rotateY === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
        }}
        className="group relative rounded-2xl overflow-hidden"
      >
        {/* Animated border glow */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card content */}
        <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent backdrop-blur-xl border border-white/10 p-8 md:p-10 lg:p-12">
          {/* Gradient overlay top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

          {/* Top row: icon + badge */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400 shadow-lg shadow-yellow-500/10">
                <Trophy className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono tracking-wider text-white/40 bg-white/5 px-3 py-1 rounded-full">
                2026
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full px-4 py-2"
            >
              <span className="text-lg">🏆</span>
              <span className="text-sm font-semibold text-yellow-300 tracking-wide">
                1st Place Hackathon Winner
              </span>
            </motion.div>
          </div>

          {/* Title & description */}
          <div className="max-w-3xl">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
              Drishta-AI
            </h3>
            <p className="text-lg text-primary/80 font-medium mb-4">Full Stack AI Safety Platform</p>
            <p className="text-white/60 leading-relaxed text-base md:text-lg mb-8">
              End-to-end AI platform with feature engineering pipelines and ML classification models. Real-time backend
              with sub-second response times. Improved prediction accuracy 30% over baseline.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Python', 'ML', 'Backend', 'Feature Engineering', 'Git'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono tracking-wider rounded-full bg-white/5 text-white/50 border border-white/10 hover:border-primary/40 hover:text-primary/80 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          <a
            href="https://github.com/rithesh2130-beep/drishta-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium group/link hover:gap-3 transition-all duration-300"
          >
            <SiGithub className="w-5 h-5" />
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
          </a>

          {/* Background decorative elements */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-24 w-32 h-32 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition:
            tilt.rotateX === 0 && tilt.rotateY === 0
              ? 'transform 0.5s ease-out, box-shadow 0.3s ease'
              : 'transform 0.1s ease-out, box-shadow 0.3s ease',
        }}
        className="group relative h-full rounded-2xl overflow-hidden hover:-translate-y-1"
      >
        {/* Gradient border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-100 group-hover:from-primary/40 group-hover:via-secondary/20 group-hover:to-transparent transition-all duration-500" />

        {/* Card body */}
        <div className="relative h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-primary/20 p-6 flex flex-col transition-all duration-300 group-hover:shadow-[0_0_30px_-5px_hsl(186,100%,50%,0.15)]">
          {/* Animated gradient overlay at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div className={`p-2.5 rounded-xl ${project.iconBg}`}>{project.icon}</div>
            <span className="text-xs font-mono tracking-wider text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-primary/70 font-medium mb-3">{project.subtitle}</p>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[10px] font-mono tracking-wider rounded-full bg-white/5 text-white/40 border border-white/5 hover:border-primary/30 hover:text-primary/70 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-primary font-medium group/link transition-colors duration-300 mt-auto"
          >
            {project.external ? (
              <ExternalLink className="w-4 h-4" />
            ) : (
              <SiGithub className="w-4 h-4" />
            )}
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary" />
        </motion.div>

        {/* Featured Hero Card */}
        <FeaturedProject />

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Shimmer keyframe — injected once via style tag */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
