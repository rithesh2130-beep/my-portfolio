import { useState, useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ChevronDown, Download, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Custom hook – animates a number from 0 → target over `duration`ms */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (startOnView && !inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, startOnView, inView]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Floating background orbs                                          */
/* ------------------------------------------------------------------ */
const orbs = [
  { size: 380, x: "10%", y: "15%", color: "hsl(186,100%,50%)", delay: 0 },
  { size: 260, x: "75%", y: "10%", color: "hsl(263,80%,65%)", delay: 1.2 },
  { size: 180, x: "60%", y: "70%", color: "hsl(186,100%,50%)", delay: 0.6 },
  { size: 320, x: "85%", y: "55%", color: "hsl(263,80%,65%)", delay: 1.8 },
  { size: 140, x: "25%", y: "80%", color: "hsl(186,100%,50%)", delay: 2.4 },
  { size: 100, x: "45%", y: "35%", color: "hsl(263,80%,65%)", delay: 0.3 },
  { size: 220, x: "5%",  y: "55%", color: "hsl(186,100%,50%)", delay: 1.5 },
  { size: 160, x: "50%", y: "5%",  color: "hsl(263,80%,65%)", delay: 2.1 },
];

/* ------------------------------------------------------------------ */
/*  Typewriter hook                                                   */
/* ------------------------------------------------------------------ */
function useTypewriter(texts: string[], typingSpeed = 80, deletingSpeed = 40, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIdx === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, textIdx, texts, typingSpeed, deletingSpeed, pause]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18, delay },
  }),
};

const nameWordVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
      delay: 0.8 + i * 0.18,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Metrics data                                                      */
/* ------------------------------------------------------------------ */
const metrics = [
  { value: 4, suffix: "+", label: "Projects Built" },
  { value: 1, suffix: "st", label: "Hackathon Rank" },
  { value: 96, suffix: "%", label: "SSC Score" },
];

/* ================================================================== */
/*  HERO COMPONENT                                                    */
/* ================================================================== */
export default function Hero() {
  const typedRole = useTypewriter(
    [
      "Full Stack Developer",
      "AI & Data Science Student",
      "Google Cloud Certified",
      "Problem Solver",
    ],
    85,
    45,
    2400
  );

  /* counter hooks (called at top‑level, unconditionally) */
  const c0 = useCountUp(metrics[0].value, 1600);
  const c1 = useCountUp(metrics[1].value, 800);
  const c2 = useCountUp(metrics[2].value, 2000);
  const counters = [c0, c1, c2];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ---- Floating Orbs ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              opacity: 0.08,
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* ---- Content ---- */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ---- Status Badge ---- */}
        <motion.div
          custom={0}
          variants={fadeUp}
          className="mb-8 flex items-center gap-2 rounded-full bg-white/5 backdrop-blur border border-white/10 px-5 py-2 text-sm text-white/70"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span>Available for Hire</span>
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </motion.div>

        {/* ---- Profile Photo with Rotating Gradient Ring ---- */}
        <motion.div
          custom={0.15}
          variants={fadeUp}
          className="relative mb-10 group"
        >
          {/* rotating gradient ring */}
          <div className="rotating-gradient-ring absolute -inset-1.5 rounded-full z-0" />
          {/* photo */}
          <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-background">
            <img
              src="/rithesh-photo.jpeg"
              alt="Pandi Rithesh Raja"
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        {/* ---- Name ---- */}
        <div className="flex flex-wrap justify-center gap-x-4 mb-4 perspective-[600px]">
          {["Pandi", "Rithesh"].map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={nameWordVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-tight"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            custom={2}
            variants={nameWordVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-tight gradient-text"
          >
            Raja
          </motion.span>
        </div>

        {/* ---- Typewriter Role ---- */}
        <motion.p
          custom={0.5}
          variants={fadeUp}
          className="font-mono text-lg sm:text-xl text-primary/70 mb-10 h-8"
        >
          <span>{typedRole}</span>
          <span className="ml-0.5 inline-block w-[2px] h-5 bg-primary animate-pulse align-middle" />
        </motion.p>

        {/* ---- Metric Counters ---- */}
        <motion.div
          custom={0.7}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {metrics.map((m, i) => {
            const { count, ref } = counters[i];
            return (
              <div
                key={m.label}
                className="flex flex-col items-center min-w-[120px] rounded-2xl bg-white/5 backdrop-blur border border-white/10 px-6 py-4
                           hover:border-primary/30 transition-colors duration-300"
              >
                <span ref={ref} className="text-3xl sm:text-4xl font-display font-bold text-white">
                  {count}
                  {m.suffix}
                </span>
                <span className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* ---- CTA Buttons ---- */}
        <motion.div
          custom={0.9}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <a
            href="/Rithesh_Raja_FullStack_1781190036910.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-background
                       shadow-[0_0_24px_hsl(186,100%,50%,0.35)] hover:shadow-[0_0_36px_hsl(186,100%,50%,0.55)]
                       hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Download Resume
          </a>

          <a
            href="https://github.com/rithesh2130-beep"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur
                       px-7 py-3 text-sm font-semibold text-white
                       hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_hsl(186,100%,50%,0.15)]
                       hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <SiGithub className="h-4 w-4" />
            View GitHub
          </a>
        </motion.div>

        {/* ---- Social Links ---- */}
        <motion.div
          custom={1.05}
          variants={fadeUp}
          className="flex items-center gap-3 mb-16"
        >
          {[
            {
              icon: <SiGithub className="h-5 w-5" />,
              href: "https://github.com/rithesh2130-beep",
              label: "GitHub",
            },
            {
              icon: <FaLinkedin className="h-5 w-5" />,
              href: "https://linkedin.com/in/pandiritheshraja",
              label: "LinkedIn",
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5
                         text-white/50 hover:text-primary hover:border-primary/40
                         hover:shadow-[0_0_14px_hsl(186,100%,50%,0.2)]
                         transition-all duration-300"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* ---- Scroll Indicator ---- */}
        <motion.a
          href="#about"
          custom={1.2}
          variants={fadeUp}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-primary transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
