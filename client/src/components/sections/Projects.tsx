import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Trophy, Activity, Database, Code2, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import * as Icons from 'lucide-react';
import { API_BASE_URL } from '../../config';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  link: string;
  iconName: string;
  iconBg: string;
  isFeatured: boolean;
  external?: boolean;
}

const fallbackProjects: Project[] = [
  {
    id: 'featured-1',
    title: 'Drishta-AI',
    subtitle: 'Full Stack AI Safety Platform',
    description: 'End-to-end AI platform with feature engineering pipelines and ML classification models. Real-time backend with sub-second response times. Improved prediction accuracy 30% over baseline.',
    tags: ['Python', 'ML', 'Backend', 'Feature Engineering', 'Git'],
    year: '2026',
    link: 'https://github.com/rithesh2130-beep/drishta-ai',
    iconName: 'Trophy',
    iconBg: 'bg-yellow-500/10 text-yellow-600',
    isFeatured: true
  },
  {
    id: 'project-1',
    title: 'Cloud Analytics Dashboard',
    subtitle: 'Loan Insights Web App',
    description: 'Full cloud-to-dashboard pipeline analyzing $3.08B in loans. Built 100% data quality Python ETL processes, deployed on GCP with Looker.',
    tags: ['BigQuery', 'SQL', 'Looker', 'GCP', 'Python'],
    year: '2026',
    link: 'https://lnkd.in/gK-uHCVh',
    iconName: 'Database',
    iconBg: 'bg-rose-500/10 text-rose-600',
    isFeatured: false,
    external: true
  },
  {
    id: 'project-2',
    title: 'AI Reflex Arena',
    subtitle: 'Human Reflex Data Platform',
    description: 'Real-time data collection platform with KPI dashboards measuring human reflex metrics. Improved data collection efficiency by 40%.',
    tags: ['Python', 'Data Visualisation', 'UI/UX'],
    year: '2026',
    link: 'https://github.com/rithesh2130-beep/AI_Reflex_Arena',
    iconName: 'Activity',
    iconBg: 'bg-violet-500/10 text-violet-600',
    isFeatured: false
  },
  {
    id: 'project-3',
    title: 'Full Stack Web Applications',
    subtitle: 'Personal Portfolio Projects',
    description: 'Multi-step flight booking system in React with dark-themed responsive UI. Card-based personal web apps with advanced media integration.',
    tags: ['React.js', 'HTML5', 'CSS3', 'JavaScript'],
    year: '2025–2026',
    link: 'https://github.com/rithesh2130-beep',
    iconName: 'Code2',
    iconBg: 'bg-violet-500/10 text-violet-600',
    isFeatured: false
  }
];

function useTilt() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return { tilt, handleMouseMove, handleMouseLeave };
}

function ProjectIcon({ iconName }: { iconName: string }) {
  const IconComponent = (Icons as any)[iconName || 'Code2'] || Code2;
  return <IconComponent className="w-5 h-5" />;
}

function FeaturedProjectCard({ project }: { project: Project }) {
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
        className="group relative rounded-3xl overflow-hidden shadow-md shadow-slate-100"
      >
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-violet-600 via-rose-400 to-violet-600 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

        <div className="relative rounded-3xl bg-white border border-slate-100 p-8 md:p-10 lg:p-12">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-rose-400 to-violet-600 opacity-60" />

          <div className="flex flex-wrap gap-4 items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-500 border border-amber-100 shadow-sm">
                <Trophy className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xs font-mono tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                {project.year}
              </span>
            </div>

            {project.title === 'Drishta-AI' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-full px-4 py-2"
              >
                <span className="text-sm">🏆</span>
                <span className="text-xs font-bold text-amber-700 tracking-wide">
                  1st Place Hackathon Winner
                </span>
              </motion.div>
            )}
          </div>

          <div className="max-w-3xl">
            <h3 className="text-3xl font-display font-extrabold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-base text-violet-600 font-semibold mb-4">{project.subtitle}</p>
            <p className="text-slate-500 leading-relaxed text-base md:text-md mb-8">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-50 text-slate-500 border border-slate-100 hover:border-violet-200 hover:text-violet-600 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-violet-600 font-semibold group/link hover:gap-3 transition-all duration-300"
          >
            <SiGithub className="w-5 h-5" />
            <span>View Source Code</span>
            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
          </a>

          <div className="absolute top-1/2 right-8 -translate-y-1/2 w-48 h-48 rounded-full bg-violet-100/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-24 w-32 h-32 rounded-full bg-rose-100/10 blur-3xl pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

// ... unchanged code ...
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
        delay: index * 0.1,
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
        className="group relative h-full rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform"
      >
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-slate-100 via-slate-50 to-transparent opacity-100 group-hover:from-violet-600/30 group-hover:via-rose-400/20 group-hover:to-transparent transition-all duration-500" />

        <div className="relative h-full rounded-3xl bg-white border border-slate-100 group-hover:border-violet-200 p-6 flex flex-col transition-all duration-300 group-hover:shadow-[0_12px_30px_rgba(124,58,237,0.06)]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-600/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-start justify-between mb-5">
            <div className={`p-2.5 rounded-xl bg-violet-50/70 border border-violet-100/50 text-violet-600`}>
              <ProjectIcon iconName={project.iconName} />
            </div>
            <span className="text-xs font-mono tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
              {project.year}
            </span>
          </div>

          <h3 className="text-xl font-display font-extrabold text-slate-900 mb-1 group-hover:text-violet-600 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs text-violet-600 font-semibold mb-3">{project.subtitle}</p>

          <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-slate-50 text-slate-500 border border-slate-100 hover:border-violet-200 hover:text-violet-600 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-violet-600 font-bold group/link transition-colors duration-300 mt-auto"
          >
            {project.external ? (
              <ExternalLink className="w-3.5 h-3.5" />
            ) : (
              <SiGithub className="w-3.5 h-3.5" />
            )}
            <span>View Project</span>
            <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
        setLoading(false);
      })
      .catch(() => {
        setProjects(fallbackProjects);
        setLoading(false);
      });
  }, []);

  const featured = projects.find(p => p.isFeatured) || projects[0];
  const gridProjects = projects.filter(p => p.id !== (featured?.id || ''));

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden bg-slate-50/50">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-100/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 text-slate-900">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-violet-600 via-rose-400 to-violet-600" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {featured && <FeaturedProjectCard project={featured} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
