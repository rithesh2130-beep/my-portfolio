import { motion, Variants } from 'framer-motion';
import { GraduationCap, Award, Trophy } from 'lucide-react';

const educationData = [
  {
    degree: 'B.Tech AI & Data Science',
    institution: '',
    period: '2023 - 2027',
    details: ['3rd Year Student', 'CGPA: 7.5'],
    active: true,
  },
  {
    degree: 'Intermediate (MPC)',
    institution: 'Mother Theresa Junior College',
    period: '',
    details: ['Score: 86.2%'],
    active: false,
  },
  {
    degree: 'SSC',
    institution: 'Elena Bettini High School',
    period: '',
    details: ['Score: 96%'],
    active: false,
  },
];

const certifications = [
  {
    title: '1st Place — Inter-College Hackathon',
    year: '2024',
    description:
      'Won first place out of numerous teams for developing Drishta-AI',
    icon: 'trophy' as const,
    accent: 'primary' as const,
  },
  {
    title: 'Google Cloud Data Analytics Certificate',
    year: '2026',
    description:
      'Certified in BigQuery, SQL, and Looker for enterprise data analysis',
    icon: 'award' as const,
    accent: 'secondary' as const,
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Education &{' '}
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Academic journey and professional achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ───────────── EDUCATION COLUMN ───────────── */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Column header */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-10"
            >
              <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20">
                <GraduationCap className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white">
                Education
              </h3>
            </motion.div>

            {/* Timeline */}
            <div className="relative pl-8">
              {/* Animated glowing vertical line */}
              <motion.div
                className="timeline-line absolute left-[11px] top-2 bottom-2 w-[2px]"
                style={{
                  background:
                    'linear-gradient(to bottom, hsl(263,80%,65%), hsl(263,80%,65%,0.15))',
                  boxShadow: '0 0 8px hsl(263,80%,65%,0.4)',
                }}
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />

              <div className="space-y-8">
                {educationData.map((edu, idx) => (
                  <motion.div
                    key={edu.degree}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <span
                      className={`timeline-dot${edu.active ? ' active' : ''} absolute -left-8 top-5 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center z-10 ${
                        edu.active
                          ? 'border-secondary bg-secondary/20 shadow-[0_0_12px_hsl(263,80%,65%,0.5)]'
                          : 'border-white/20 bg-[hsl(220,20%,12%)]'
                      }`}
                    >
                      {edu.active && (
                        <span className="block w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                      )}
                    </span>

                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`glass-card rounded-2xl p-5 ${
                        edu.active
                          ? 'border-secondary/30 bg-secondary/5'
                          : 'border-white/10 bg-white/5'
                      } backdrop-blur border`}
                    >
                      <h4 className="text-lg font-display font-semibold text-white mb-1">
                        {edu.degree}
                      </h4>

                      {edu.institution && (
                        <p className="text-white/50 text-sm mb-1">
                          {edu.institution}
                        </p>
                      )}

                      {edu.period && (
                        <span className="inline-block text-xs font-medium text-secondary bg-secondary/10 rounded-full px-3 py-0.5 mb-3">
                          {edu.period}
                        </span>
                      )}

                      <ul className="space-y-1 mt-2">
                        {edu.details.map((d) => (
                          <li
                            key={d}
                            className="text-white/60 text-sm flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-secondary/60" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ───────────── CERTIFICATIONS COLUMN ───────────── */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Column header */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-10"
            >
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white">
                Certifications
              </h3>
            </motion.div>

            <div className="space-y-8">
              {certifications.map((cert, idx) => {
                const isPrimary = cert.accent === 'primary';
                return (
                  <motion.div
                    key={cert.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`glass-card rounded-2xl p-6 backdrop-blur border cursor-default ${
                      isPrimary
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-secondary/30 bg-secondary/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`relative flex-shrink-0 p-3 rounded-xl ${
                          isPrimary
                            ? 'bg-primary/10 shadow-[0_0_20px_hsl(186,100%,50%,0.25)]'
                            : 'bg-secondary/10 shadow-[0_0_20px_hsl(263,80%,65%,0.25)]'
                        }`}
                      >
                        {cert.icon === 'trophy' ? (
                          <>
                            <Trophy
                              className="w-6 h-6 text-amber-400 relative z-10"
                              style={{
                                filter:
                                  'drop-shadow(0 0 6px rgba(251,191,36,0.6))',
                              }}
                            />
                            {/* Golden shimmer overlay */}
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              style={{
                                background:
                                  'linear-gradient(105deg, transparent 40%, rgba(251,191,36,0.25) 50%, transparent 60%)',
                                backgroundSize: '200% 100%',
                              }}
                              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                          </>
                        ) : (
                          <Award className="w-6 h-6 text-secondary" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="text-lg font-display font-semibold text-white">
                            {cert.title}
                          </h4>
                          <span
                            className={`text-xs font-medium rounded-full px-3 py-0.5 ${
                              isPrimary
                                ? 'text-primary bg-primary/10'
                                : 'text-secondary bg-secondary/10'
                            }`}
                          >
                            {cert.year}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
