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
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* ── Large blurred breathe-glow orb ── */}
      <motion.div
        className="breathe-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsl(186,100%,50%,0.08) 0%, hsl(263,80%,65%,0.05) 50%, transparent 70%)',
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
          className="glass-card gradient-border rounded-3xl p-8 md:p-12 bg-white/5 backdrop-blur border border-white/10 text-center mb-10"
        >
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
          >
            Let&apos;s build{' '}
            <span className="gradient-text">the future.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10"
          >
            Currently open for roles where I can architect robust systems, push
            the boundaries of AI, and engineer experiences that matter.
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
                boxShadow: '0 0 24px hsl(186,100%,50%,0.2)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/5 backdrop-blur border border-white/10 text-white/80 hover:text-white hover:border-primary/30 transition-colors w-full sm:w-auto justify-center"
            >
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium">23hr1a3045@gmail.com</span>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+919347718219"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 24px hsl(186,100%,50%,0.2)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/5 backdrop-blur border border-white/10 text-white/80 hover:text-white hover:border-primary/30 transition-colors w-full sm:w-auto justify-center"
            >
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium">+91 9347718219</span>
            </motion.a>
          </motion.div>

          {/* ── Social Icons ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-5"
          >
            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{
                scale: 1.15,
                backgroundColor: 'hsl(186,100%,50%)',
                boxShadow: '0 0 28px hsl(186,100%,50%,0.45)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="group w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur transition-colors"
            >
              <FaLinkedin className="w-5 h-5 text-white/70 group-hover:text-[hsl(220,20%,8%)] transition-colors" />
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{
                scale: 1.15,
                backgroundColor: '#ffffff',
                boxShadow: '0 0 28px rgba(255,255,255,0.35)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="group w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur transition-colors"
            >
              <SiGithub className="w-5 h-5 text-white/70 group-hover:text-[hsl(220,20%,8%)] transition-colors" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.footer
          variants={itemVariants}
          className="text-center space-y-2 pt-6"
        >
          <p className="text-white/25 text-sm">
            &copy; {currentYear} Pandi Rithesh Raja. All rights reserved.
          </p>
          <p className="text-white/20 text-xs flex items-center justify-center gap-1.5">
            Engineered with{' '}
            <Code2 className="w-3.5 h-3.5 text-white/25 inline" />
          </p>
        </motion.footer>
      </motion.div>
    </section>
  );
}
