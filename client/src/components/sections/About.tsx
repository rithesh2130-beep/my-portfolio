import { motion, Variants } from "framer-motion";
import { Code2, Trophy, Award } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const statCardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stats = [
  {
    value: "3+",
    label: "MERN Apps Built",
    icon: Code2,
  },
  {
    value: "1st",
    label: "Hackathon Win",
    icon: Trophy,
  },
  {
    value: "AI",
    label: "ML Models Shipped",
    icon: Award,
  },
];

const terminalBody = [
  { indent: 2, key: "name", value: '"Pandi Rithesh Raja"' },
  { indent: 2, key: "status", value: '"🟢 Coding & Shipping"' },
  { indent: 2, key: "location", value: '"India"' },
  {
    indent: 2,
    key: "stack",
    value: null,
    array: ['"MongoDB"', '"Express.js"', '"React.js"', '"Node.js"'],
  },
  {
    indent: 2,
    key: "aiInterests",
    value: null,
    array: ['"Machine Learning"', '"LLMs"', '"AI APIs"'],
  },
  { indent: 2, key: "mindset", value: '"Always Building"' },
  { indent: 2, key: "coffeeFuel", value: "true", isKeyword: true },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-slate-50/50">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 text-slate-900">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600" />
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16"
        >
          {/* Left: Rich paragraphs */}
          <motion.div variants={fadeLeft} className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight mb-2">
              Building full stack apps and intelligent systems from scratch.
            </h3>
            
            <motion.p
              variants={fadeUp}
              className="text-slate-600 text-base leading-relaxed"
            >
              I'm a <strong className="text-slate-900 font-semibold">MERN Stack Developer and AI Engineer</strong> currently in my 3rd year of B.Tech in AI & Data Science. My day-to-day is writing Express APIs, structuring MongoDB schemas, building React UIs, and wiring ML models into real applications — not just experimenting in Jupyter notebooks.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-slate-600 text-base leading-relaxed"
            >
              I care deeply about shipping{" "}
              <strong className="text-slate-900 font-semibold">production-ready code</strong>{" "}
              — clean REST APIs, authenticated backends with JWT, responsive React frontends, and AI-powered features integrated directly into web products. I've built full stack platforms end-to-end, taken 1st place in hackathons, and I'm always working on the next challenging problem.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="pt-2"
            >
              <span className="font-mono text-emerald-600 text-sm font-semibold tracking-wide inline-flex items-center gap-2">
                <span className="inline-block w-2.5 h-4.5 bg-emerald-600 animate-pulse rounded-sm" />
                &gt; Let's ship something great together.
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Terminal Window */}
          <motion.div variants={fadeRight}>
            <div className="terminal-window border border-slate-200 bg-white shadow-xl shadow-slate-100">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-50 border-b border-slate-100">
                <span
                  className="terminal-dot w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "#ff5f57" }}
                />
                <span
                  className="terminal-dot w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "#febc2e" }}
                />
                <span
                  className="terminal-dot w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "#28c840" }}
                />
                <span className="ml-3 text-xs text-slate-400 font-mono font-semibold">
                  rithesh@developer-console ~ %
                </span>
              </div>

              {/* Terminal Body (Light Editor style) */}
              <div className="terminal-body p-6 font-mono text-sm leading-7 overflow-x-auto bg-white text-slate-700">
                {/* Opening line */}
                <div>
                  <span className="text-emerald-600 font-bold">const</span>{" "}
                  <span className="text-slate-900">developer</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-slate-400">{"{"}</span>
                </div>

                {/* Properties */}
                {terminalBody.map((line, idx) => (
                  <div key={idx}>
                    <span className="text-transparent select-none">
                      {"  "}
                    </span>
                    <span className="text-slate-700 font-medium">{line.key}</span>
                    <span className="text-slate-400">: </span>
                    {line.array ? (
                      <>
                        <span className="text-slate-400">[</span>
                        {line.array.map((item, aIdx) => (
                          <div key={aIdx}>
                            <span className="text-transparent select-none">
                              {"    "}
                            </span>
                            <span className="text-amber-600 font-semibold">{item}</span>
                            {aIdx < line.array!.length - 1 && (
                              <span className="text-slate-400">,</span>
                            )}
                          </div>
                        ))}
                        <span className="text-transparent select-none">
                          {"  "}
                        </span>
                        <span className="text-slate-400">],</span>
                      </>
                    ) : line.isKeyword ? (
                      <span className="text-emerald-600 font-bold">
                        {line.value}
                      </span>
                    ) : (
                      <>
                        <span className="text-amber-600 font-semibold">{line.value}</span>
                        {idx < terminalBody.length - 1 && (
                          <span className="text-slate-400">,</span>
                        )}
                      </>
                    )}
                  </div>
                ))}

                {/* Closing brace */}
                <div>
                  <span className="text-slate-400">{"}"}</span>
                  <span className="text-slate-400">;</span>
                </div>

                {/* Blinking cursor */}
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-emerald-600">❯</span>
                  <span className="inline-block w-2.5 h-4.5 bg-emerald-600 animate-pulse rounded-sm" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -4,
                boxShadow: "0 10px 25px rgba(124,58,237,0.06)",
                borderColor: "rgba(124,58,237,0.25)"
              }}
              className="glass-card group relative rounded-3xl p-6 text-center bg-white border border-slate-100 shadow-sm cursor-default transition-all duration-300"
            >
              {/* Glow accent */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-600/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <stat.icon className="w-6 h-6 text-emerald-600 mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl font-display font-black text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
