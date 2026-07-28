import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  User,
  Code2,
  FolderGit2,
  GraduationCap,
  Mail,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";

interface TopNavbarProps {
  activeSection: string;
}

const navItems = [
  { label: "About", id: "about", icon: User },
  { label: "Skills", id: "skills", icon: Code2 },
  { label: "Projects", id: "projects", icon: FolderGit2 },
  { label: "Education", id: "education", icon: GraduationCap },
  { label: "Contact", id: "contact", icon: Mail },
];

export default function TopNavbar({ activeSection }: TopNavbarProps) {
  const [, setLocation] = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      fetch(`${API_BASE_URL}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => { if (res.ok) setIsAdminLoggedIn(true); })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm shadow-slate-100/60"
          : "bg-white/70 backdrop-blur-md border-b border-slate-100/50"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "text-emerald-600"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <item.icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-50/80 to-amber-50/30 border border-emerald-100/50 -z-10 shadow-2xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Button */}
        <button
          onClick={() => setLocation(isAdminLoggedIn ? "/admin/dashboard" : "/admin")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-semibold transition-all ${
            isAdminLoggedIn
              ? "border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              : "border-slate-100 bg-slate-50 text-slate-500 hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600"
          }`}
        >
          {isAdminLoggedIn ? (
            <><ShieldCheck className="w-3.5 h-3.5" /><span>Admin</span></>
          ) : (
            <><Terminal className="w-3.5 h-3.5" /><span>Dev Panel</span></>
          )}
        </button>
      </div>
    </motion.header>
  );
}
