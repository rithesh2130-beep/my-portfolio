import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { GraduationCap, Award, Trophy, ExternalLink, FileText } from 'lucide-react';
import { API_BASE_URL } from '../../config';

const educationData = [
  {
    degree: 'B.Tech AI & Data Science',
    institution: 'College of Engineering & Technology (3rd Year)',
    period: '2023 - 2027',
    details: ['Focusing on Machine Learning, ETL pipelines, and Cloud Analytics', 'Current CGPA: 7.5'],
    active: true,
  },
  {
    degree: 'Intermediate (MPC)',
    institution: 'Mother Theresa Junior College',
    period: '2021 - 2023',
    details: ['Score: 86.2%'],
    active: false,
  },
  {
    degree: 'SSC (Secondary School Certificate)',
    institution: 'Elena Bettini High School',
    period: '2020 - 2021',
    details: ['Score: 96%'],
    active: false,
  },
];

const staticCertifications = [
  {
    title: '1st Place — Inter-College Hackathon',
    year: '2024',
    description: 'Won first place out of numerous teams for developing Drishta-AI safety classification platform.',
    icon: 'trophy' as const,
    accent: 'primary' as const,
    fileUrl: '',
    credentialLink: ''
  },
  {
    title: 'Google Cloud Data Analytics Certificate',
    year: '2026',
    description: 'Certified in BigQuery, SQL, and Looker for enterprise data analysis.',
    icon: 'award' as const,
    accent: 'secondary' as const,
    fileUrl: '',
    credentialLink: 'https://coursera.org/verify/placeholder'
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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
  const [dynamicCerts, setDynamicCerts] = useState<any[]>([]);

  useEffect(() => {
    // Dynamic Fetch Certs from Server
    fetch(`${API_BASE_URL}/api/certificates`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setDynamicCerts(data);
        }
      })
      .catch(() => {});
  }, []);

  // Merge static and fetched certs
  const allCertifications = [
    ...staticCertifications,
    ...dynamicCerts.map((c) => ({
      title: c.title,
      year: c.year,
      description: `${c.issuer} — ${c.description || ""}`,
      icon: "award" as const,
      accent: "secondary" as const,
      fileUrl: c.fileUrl ? `${API_BASE_URL}${c.fileUrl}` : '',
      credentialLink: c.credentialLink || ''
    }))
  ];

  return (
    <section
      id="education"
      className="relative py-24 md:py-32 px-6 overflow-hidden bg-white"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-50/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 text-slate-900">
            Education &{' '}
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium">
            My academic timeline and professional credentials
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
              <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 shadow-2xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900">
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
                    'linear-gradient(to bottom, hsl(262,83%,58%), hsl(262,83%,58%,0.15))',
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
                          ? 'border-teal-500 bg-teal-50 shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {edu.active && (
                        <span className="block w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                      )}
                    </span>

                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`glass-card rounded-3xl p-5 border ${
                        edu.active
                          ? 'border-teal-200/80 bg-teal-50/30'
                          : 'border-slate-100 bg-white shadow-sm'
                      }`}
                    >
                      <h4 className="text-lg font-display font-extrabold text-slate-900 mb-1">
                        {edu.degree}
                      </h4>

                      {edu.institution && (
                        <p className="text-slate-500 text-sm mb-1.5 font-medium">
                          {edu.institution}
                        </p>
                      )}

                      {edu.period && (
                        <span className="inline-block text-xs font-bold text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-3 py-0.5 mb-3">
                          {edu.period}
                        </span>
                      )}

                      <ul className="space-y-1.5 mt-2">
                        {edu.details.map((d) => (
                          <li
                            key={d}
                            className="text-slate-500 text-sm flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500/70" />
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
              <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 shadow-2xs">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Certifications
              </h3>
            </motion.div>

            <div className="space-y-8">
              {allCertifications.map((cert, idx) => {
                const isPrimary = cert.accent === 'primary';
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`glass-card rounded-3xl p-6 border cursor-default bg-white shadow-sm ${
                      isPrimary
                        ? 'border-violet-150 hover:border-violet-300'
                        : 'border-slate-100 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`relative flex-shrink-0 p-3 rounded-xl ${
                          isPrimary
                            ? 'bg-violet-50 text-violet-600 border border-violet-100'
                            : 'bg-teal-50 text-teal-600 border border-teal-100'
                        }`}
                      >
                        {cert.icon === 'trophy' ? (
                          <>
                            <Trophy
                              className="w-6 h-6 text-amber-500 relative z-10"
                              style={{
                                filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.3))',
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              style={{
                                background:
                                  'linear-gradient(105deg, transparent 40%, rgba(245,158,11,0.2) 50%, transparent 60%)',
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
                          <Award className="w-6 h-6" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="text-lg font-display font-extrabold text-slate-900">
                            {cert.title}
                          </h4>
                          <span
                            className={`text-xs font-bold rounded-full px-3 py-0.5 ${
                              isPrimary
                                ? 'text-violet-600 bg-violet-50 border border-violet-100'
                                : 'text-teal-600 bg-teal-50 border border-teal-100'
                            }`}
                          >
                            {cert.year}
                          </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {cert.description}
                        </p>

                        {/* View uploaded document */}
                        {cert.fileUrl && (
                          <a
                            href={cert.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-700 font-extrabold mt-3.5 bg-violet-50/50 hover:bg-violet-50 px-3 py-1.5 rounded-xl border border-violet-100 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Certificate File</span>
                          </a>
                        )}

                        {cert.credentialLink && !cert.fileUrl && (
                          <a
                            href={cert.credentialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700 font-extrabold mt-3.5 bg-teal-50/50 hover:bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Verify Credential</span>
                          </a>
                        )}
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
