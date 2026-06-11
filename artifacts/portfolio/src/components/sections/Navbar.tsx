import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Nav items                                                         */
/* ------------------------------------------------------------------ */
const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  Scroll‑spy hook                                                   */
/* ------------------------------------------------------------------ */
function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + offset;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return active;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const navVariants: Variants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 },
  },
};

const mobileMenuVariants: Variants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const mobileLinkVariants: Variants = {
  closed: { x: 40, opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

/* ================================================================== */
/*  NAVBAR COMPONENT                                                  */
/* ================================================================== */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionIds = navItems.map((n) => n.href.replace("#", ""));
  const activeSection = useScrollSpy(sectionIds, 140);

  /* Track scroll for glassmorphism bg */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setMenuOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* ---- Logo ---- */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl font-display font-bold tracking-tight"
          >
            <span className="gradient-text">PR.</span>
          </a>

          {/* ---- Desktop Links ---- */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}

                    {/* hover underline */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                        isActive ? "w-5" : "w-0 group-hover:w-4"
                      }`}
                    />

                    {/* active glow dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] w-5 rounded-full bg-primary shadow-[0_0_8px_hsl(186,100%,50%,0.6)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ---- Desktop Resume Button ---- */}
          <a
            href="/Rithesh_Raja_FullStack_1781190036910.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30
                       px-5 py-2 text-xs font-semibold text-primary
                       hover:bg-primary/20 hover:shadow-[0_0_18px_hsl(186,100%,50%,0.2)]
                       transition-all duration-300"
          >
            <FileDown className="h-3.5 w-3.5" />
            Resume
          </a>

          {/* ---- Mobile Menu Button ---- */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-50 flex md:hidden items-center justify-center h-10 w-10 rounded-lg
                       text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ---- Mobile Menu Panel ---- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Slide‑in Panel */}
            <motion.div
              key="panel"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-40 w-72 bg-background/95 backdrop-blur-xl
                         border-l border-white/10 flex flex-col pt-24 px-8 md:hidden"
            >
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={id}
                    variants={mobileLinkVariants}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-left py-3 text-lg font-medium border-b border-white/5 transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(186,100%,50%,0.5)]" />
                    )}
                  </motion.button>
                );
              })}

              {/* Resume button in mobile menu */}
              <motion.a
                variants={mobileLinkVariants}
                href="/Rithesh_Raja_FullStack_1781190036910.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3
                           text-sm font-semibold text-background
                           shadow-[0_0_24px_hsl(186,100%,50%,0.35)]
                           hover:shadow-[0_0_36px_hsl(186,100%,50%,0.55)]
                           transition-all duration-300"
              >
                <FileDown className="h-4 w-4" />
                Download Resume
              </motion.a>

              {/* Decorative gradient orb */}
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/10 blur-[100px]" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
