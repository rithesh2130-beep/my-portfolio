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
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_30px_rgba(124,58,237,0.02)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* ---- Logo ---- */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl font-display font-extrabold tracking-tight"
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
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive ? "text-violet-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.label}

                    {/* hover underline */}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-violet-600 origin-left transition-transform duration-350 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ---- Desktop Actions (Resume PDF & Admin Portal) ---- */}
          <div className="hidden md:flex items-center gap-3.5">
            <a
              href="/admin"
              className="text-slate-500 hover:text-violet-600 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Console
            </a>
            
            <a
              href="/Rithesh_Raja_FullStack_1781190036910.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-100 px-4 py-2
                         text-xs font-bold text-violet-700
                         shadow-sm hover:shadow-md hover:bg-violet-100
                         transition-all duration-300"
            >
              <FileDown className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>

          {/* ---- Mobile Menu Trigger ---- */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50 text-slate-600 hover:text-slate-900 md:hidden transition-colors"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ---- Mobile Navigation Panel ---- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden"
            />

            {/* Menu container */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed bottom-0 right-0 top-0 z-40 w-72 max-w-[80vw] bg-white
                         border-l border-slate-100 flex flex-col pt-24 px-8 md:hidden shadow-2xl"
            >
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={id}
                    variants={mobileLinkVariants}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-left py-3.5 text-lg font-bold border-b border-slate-50 transition-colors duration-200 ${
                      isActive ? "text-violet-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-violet-600 shadow-[0_0_6px_rgba(124,58,237,0.5)]" />
                    )}
                  </motion.button>
                );
              })}

              {/* Console & Resume buttons in mobile menu */}
              <motion.div variants={mobileLinkVariants} className="mt-8 flex flex-col gap-4">
                <a
                  href="/admin"
                  className="text-center py-2.5 text-slate-500 hover:text-violet-600 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Admin Console
                </a>
                
                <a
                  href="/Rithesh_Raja_FullStack_1781190036910.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3
                             text-sm font-semibold text-white
                             shadow-lg shadow-violet-600/10 hover:shadow-violet-600/30
                             transition-all duration-300"
                >
                  <FileDown className="h-4 w-4" />
                  Download Resume
                </a>
              </motion.div>

              {/* Decorative gradient orb */}
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-violet-100/40 blur-[80px]" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
