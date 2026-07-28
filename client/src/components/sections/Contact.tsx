import { motion, Variants } from 'framer-motion';
import { Mail, Phone, Code2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative pt-10 pb-20 md:pt-14 md:pb-24 px-6 overflow-hidden bg-slate-50/50"
    >
      {/* ── Large blurred breathe-glow orb ── */}
      <motion.div
        className="breathe-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.06) 0%, rgba(245,158,11,0.03) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="max-w-3xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* ── Main Card ── */}
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-3xl p-8 md:p-12 bg-white border border-slate-100 text-center mb-10 shadow-xl shadow-slate-100"
        >
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-6 text-slate-900"
          >
            Let&apos;s build <span className="gradient-text">something great.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed mb-10 font-medium"
          >
            I am currently open for junior roles, internships, or interesting freelance opportunities where I can solve actual problems, write clean systems, and build software.
          </motion.p>

          {/* ── Contact Methods ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            {/* Email */}
            <motion.a
              href="mailto:23hr1a3045@gmail.com"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.08)',
                borderColor: 'rgba(16, 185, 129, 0.3)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 transition-colors w-full sm:w-auto justify-center shadow-2xs font-semibold"
            >
              <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-sm">23hr1a3045@gmail.com</span>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+919347718219"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.08)',
                borderColor: 'rgba(16, 185, 129, 0.3)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 transition-colors w-full sm:w-auto justify-center shadow-2xs font-semibold"
            >
              <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-sm">+91 9347718219</span>
            </motion.a>
          </motion.div>

          {/* ── Social Icons ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-5"
          >
            {/* LinkedIn */}
            <motion.a
              href="https://github.com/rithesh2130-beep" // Using GitHub links as destination
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{
                scale: 1.15,
                backgroundColor: 'hsl(142, 76%, 40%)',
                borderColor: 'hsl(142, 76%, 40%)',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="group w-12 h-12 rounded-full flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:text-white transition-colors shadow-2xs"
            >
              <FaLinkedin className="w-5 h-5 transition-colors" />
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/rithesh2130-beep"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{
                scale: 1.15,
                backgroundColor: 'hsl(142, 76%, 40%)',
                borderColor: 'hsl(142, 76%, 40%)',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="group w-12 h-12 rounded-full flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:text-white transition-colors shadow-2xs"
            >
              <SiGithub className="w-5 h-5 transition-colors" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.footer
          variants={itemVariants}
          className="text-center space-y-2 pt-6"
        >
          <p className="text-slate-400 text-sm font-semibold">
            &copy; {currentYear} Pandi Rithesh Raja. All rights reserved.
          </p>
          <p className="text-slate-400/70 text-xs flex items-center justify-center gap-1.5 font-medium">
            Handcrafted with <Code2 className="w-3.5 h-3.5 text-emerald-600/70 inline" />
          </p>
        </motion.footer>
      </motion.div>
    </section>
  );
}
