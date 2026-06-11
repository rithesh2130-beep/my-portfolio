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
    value: "4+",
    label: "Projects Shipped",
    icon: Code2,
  },
  {
    value: "1st",
    label: "Place Hackathon",
    icon: Trophy,
  },
  {
    value: "Google",
    label: "Cloud Certified",
    icon: Award,
  },
];

const terminalLines = [
  { text: "const ", type: "keyword" },
  { text: "developer", type: "variable" },
  { text: " = {", type: "plain" },
];

const terminalBody = [
  { indent: 2, key: "name", value: '"Pandi Rithesh Raja"' },
  { indent: 2, key: "status", value: '"🟢 Online"' },
  { indent: 2, key: "location", value: '"India"' },
  {
    indent: 2,
    key: "focus",
    value: null,
    array: ['"AI Systems"', '"Full Stack Architecture"', '"Data Pipelines"'],
  },
  { indent: 2, key: "drive", value: '"Unstoppable"' },
  { indent: 2, key: "coffee", value: "true", isKeyword: true },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-primary" />
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16"
        >
          {/* Left: Rich paragraphs */}
          <motion.div variants={fadeLeft} className="space-y-6">
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              I'm a{" "}
              <strong className="text-foreground">
                precision-focused Full Stack Developer
              </strong>{" "}
              and{" "}
              <strong className="text-foreground">
                AI &amp; Data Science student
              </strong>{" "}
              who refuses to build generic software. I don't just write
              code — I{" "}
              <strong className="text-foreground">
                architect systems that scale, perform, and leave an impact
              </strong>
              . Every project I touch is engineered with intention, obsessed
              over for quality, and built to outlast trends.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              I bridge{" "}
              <strong className="text-foreground">
                bleeding-edge AI models
              </strong>{" "}
              and{" "}
              <strong className="text-foreground">
                pixel-perfect web interfaces
              </strong>
              , creating solutions that are as intelligent as they are
              beautiful. I've secured{" "}
              <strong className="text-foreground">
                1st place at competitive hackathons
              </strong>
              , analyzed{" "}
              <strong className="text-foreground">
                $3.08B in loan data via GCP
              </strong>
              , and consistently delivered{" "}
              <strong className="text-foreground">
                production-grade results under pressure
              </strong>
              .
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="pt-4"
            >
              <span className="font-mono text-primary text-base tracking-wide inline-flex items-center gap-2">
                <span className="inline-block w-2 h-4 bg-primary/80 animate-pulse rounded-sm" />
                &gt; Ready to engineer the future.
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Terminal Window */}
          <motion.div variants={fadeRight}>
            <div className="terminal-window rounded-xl overflow-hidden border border-white/10 bg-[hsl(220,20%,6%)] shadow-2xl shadow-primary/5">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <span
                  className="terminal-dot w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#ff5f57" }}
                />
                <span
                  className="terminal-dot w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#febc2e" }}
                />
                <span
                  className="terminal-dot w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#28c840" }}
                />
                <span className="ml-3 text-xs text-muted-foreground font-mono">
                  rithesh@dev ~ %
                </span>
              </div>

              {/* Terminal Body */}
              <div className="terminal-body p-5 font-mono text-sm leading-7 overflow-x-auto">
                {/* Opening line */}
                <div>
                  <span className="text-secondary font-semibold">const</span>{" "}
                  <span className="text-foreground">developer</span>{" "}
                  <span className="text-muted-foreground">=</span>{" "}
                  <span className="text-muted-foreground">{"{"}</span>
                </div>

                {/* Properties */}
                {terminalBody.map((line, idx) => (
                  <div key={idx}>
                    <span className="text-transparent select-none">
                      {"  "}
                    </span>
                    <span className="text-foreground">{line.key}</span>
                    <span className="text-muted-foreground">: </span>
                    {line.array ? (
                      <>
                        <span className="text-muted-foreground">[</span>
                        {line.array.map((item, aIdx) => (
                          <div key={aIdx}>
                            <span className="text-transparent select-none">
                              {"    "}
                            </span>
                            <span className="text-primary">{item}</span>
                            {aIdx < line.array!.length - 1 && (
                              <span className="text-muted-foreground">,</span>
                            )}
                          </div>
                        ))}
                        <span className="text-transparent select-none">
                          {"  "}
                        </span>
                        <span className="text-muted-foreground">],</span>
                      </>
                    ) : line.isKeyword ? (
                      <span className="text-secondary font-semibold">
                        {line.value}
                      </span>
                    ) : (
                      <>
                        <span className="text-primary">{line.value}</span>
                        {idx < terminalBody.length - 1 && (
                          <span className="text-muted-foreground">,</span>
                        )}
                      </>
                    )}
                  </div>
                ))}

                {/* Closing brace */}
                <div>
                  <span className="text-muted-foreground">{"}"}</span>
                  <span className="text-muted-foreground">;</span>
                </div>

                {/* Blinking cursor */}
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-primary">❯</span>
                  <span className="inline-block w-2.5 h-5 bg-primary/90 animate-[blink_1s_steps(2)_infinite] rounded-sm" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
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
                boxShadow: "0 0 30px 0 hsla(186,100%,50%,0.12)",
              }}
              className="glass-card group relative rounded-2xl p-6 text-center border border-white/10 bg-white/5 backdrop-blur-md cursor-default transition-colors duration-300 hover:border-primary/30"
            >
              {/* Glow accent */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground tracking-wide">
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
