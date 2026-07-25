import { useState, useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ChevronDown, Download, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

import { API_BASE_URL } from "../../config";

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
  { size: 380, x: "10%", y: "15%", color: "hsl(262,80%,58%)", delay: 0 },
  { size: 260, x: "75%", y: "10%", color: "hsl(180,100%,38%)", delay: 1.2 },
  { size: 180, x: "60%", y: "70%", color: "hsl(262,80%,58%)", delay: 0.6 },
  { size: 320, x: "85%", y: "55%", color: "hsl(180,100%,38%)", delay: 1.8 },
  { size: 140, x: "25%", y: "80%", color: "hsl(262,80%,58%)", delay: 2.4 },
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

/* ================================================================== */
/*  HERO COMPONENT                                                    */
/* ================================================================== */
export default function Hero() {
  const [projectCount, setProjectCount] = useState(4); // Fallback to 4

  // Fetch dynamic projects count
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectCount(data.length);
        }
      })
      .catch(() => {});
  }, []);

  const typedRole = useTypewriter(
    [
      "MERN Stack Developer",
      "AI & Machine Learning Engineer",
      "REST API Architect",
      "Passionate Builder",
    ],
    85,
    45,
    2400
  );

  const metrics = [
    { value: projectCount, suffix: "+", label: "Projects Shipped" },
    { value: 1, suffix: "st", label: "Hackathon Winner" },
    { value: 96, suffix: "%", label: "Academic Merit" },
  ];

  /* counter hooks (called at top‑level, unconditionally) */
  const c0 = useCountUp(metrics[0].value, 1600);
  const c1 = useCountUp(metrics[1].value, 800);
  const c2 = useCountUp(metrics[2].value, 2000);
  const counters = [c0, c1, c2];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
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
              opacity: 0.04,
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 20, -15, 0],
              y: [0, -15, 10, 0],
              scale: [1, 1.1, 0.95, 1],
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
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pt-24 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ---- Status Badge ---- */}
        <motion.div
          custom={0}
          variants={fadeUp}
          className="mb-8 flex items-center gap-2 rounded-full bg-violet-50/70 border border-violet-100/50 px-5 py-2 text-sm text-violet-700 font-semibold shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Open to Collaboration</span>
          <Sparkles className="h-3.5 w-3.5 text-violet-500" />
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
              className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold text-slate-900 leading-tight tracking-tight"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            custom={2}
            variants={nameWordVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold leading-tight tracking-tight gradient-text"
          >
            Raja
          </motion.span>
        </div>

        {/* ---- Typewriter Role ---- */}
        <motion.p
          custom={0.5}
          variants={fadeUp}
          className="font-mono text-lg sm:text-xl text-violet-600 font-semibold mb-8 h-8"
        >
          <span>{typedRole}</span>
          <span className="ml-1 inline-block w-[2px] h-5 bg-violet-600 animate-pulse align-middle" />
        </motion.p>

        {/* Humanized Subtitle */}
        <motion.p
          custom={0.6}
          variants={fadeUp}
          className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          Hey! I'm a student engineer based in India. I love designing intelligent data pipelines, training ML classifiers, and building beautiful, responsive user interfaces.
        </motion.p>

        {/* ---- Metric Counters ---- */}
        <motion.div
          custom={0.7}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {metrics.map((m, i) => {
            const { count } = counters[i];
            return (
              <div
                key={m.label}
                className="flex flex-col items-center min-w-[130px] rounded-3xl bg-white border border-slate-100 px-6 py-4.5
                           shadow-sm hover:border-violet-200 hover:shadow-md transition-all duration-300"
              >
                <span className="text-3xl sm:text-4xl font-display font-black text-slate-900">
                  {count}
                  {m.suffix}
                </span>
                <span className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">
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
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href="/Rithesh_Raja_FullStack_1781190036910.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white
                       shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/35
                       hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Download Resume
          </a>

          <a
            href="https://github.com/rithesh2130-beep"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white
                       px-8 py-3.5 text-sm font-semibold text-slate-700
                       hover:border-violet-300 hover:text-violet-600 hover:shadow-md
                       hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <SiGithub className="h-4 w-4" />
            View GitHub
          </a>
        </motion.div>

        {/* ---- Scroll Indicator ---- */}
        <motion.a
          href="#about"
          custom={1.2}
          variants={fadeUp}
          className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-violet-600 transition-colors"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Discover More</span>
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
