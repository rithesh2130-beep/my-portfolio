import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  User,
  Code2,
  FolderGit2,
  GraduationCap,
  Mail,
  Terminal,
  ShieldCheck,
  Github,
  Linkedin,
  FileText,
} from "lucide-react";
import { API_BASE_URL } from "../../config";

interface SidebarProps {
  activeSection: string;
}

export default function Sidebar({ activeSection }: SidebarProps) {
  const [, setLocation] = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      fetch(`${API_BASE_URL}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) setIsAdminLoggedIn(true);
        })
        .catch(() => {});
    }
  }, []);

  // Framer Motion 3D tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [12, -12]);
  const rotateY = useTransform(mouseX, [-100, 100], [-12, 12]);
  const springConfig = { damping: 20, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = window.innerWidth < 768 ? -120 : -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "About", id: "about", icon: User },
    { label: "Skills", id: "skills", icon: Code2 },
    { label: "Projects", id: "projects", icon: FolderGit2 },
    { label: "Education", id: "education", icon: GraduationCap },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  return (
    <>
      {/* ─── MOBILE STICKY HEADER ─── */}
      <div className="md:hidden sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 px-4 py-3 flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-100">
              <img src="/rithesh-photo.jpeg" alt="Pandi Rithesh Raja" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <h2 className="text-sm font-display font-extrabold text-slate-900 leading-none">Pandi Rithesh Raja</h2>
              <span className="text-[9px] font-bold text-emerald-600 font-mono tracking-wide">MERN & AI Dev</span>
            </div>
          </div>
          <button
            onClick={() => setLocation(isAdminLoggedIn ? "/admin/dashboard" : "/admin")}
            className="p-2 rounded-xl border border-slate-150 text-slate-400 hover:text-emerald-600 bg-white shadow-sm transition-colors"
          >
            {isAdminLoggedIn ? <ShieldCheck className="w-4 h-4 text-emerald-500" /> : <Terminal className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Nav Bar */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar border-t border-slate-50 mt-1 pt-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSection === item.id
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <item.icon className="w-3 h-3" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── DESKTOP FIXED SIDEBAR (ID Card + Socials only, no nav list) ─── */}
      <div className="hidden md:flex w-80 lg:w-96 flex-shrink-0 bg-white border-r border-slate-100 flex-col h-screen fixed left-0 top-0 py-8 px-6 z-40 overflow-y-auto">

        {/* Skeuomorphic Hanging ID Badge */}
        <div className="relative w-full flex flex-col items-center mb-8 shrink-0">
          {/* Lanyard Line */}
          <div className="w-[3px] bg-slate-200 h-10 shadow-inner" />

          {/* Clip Clasp */}
          <div className="w-7 h-5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border border-slate-300 rounded shadow-sm flex flex-col items-center justify-end pb-0.5 z-10 -mt-1">
            <div className="w-4 h-1.5 bg-slate-700/80 rounded-full" />
          </div>

          {/* Hanging ID Badge */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
            animate={{ rotate: [0, -1.2, 1.2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[250px] bg-white rounded-[24px] border border-slate-200/80 shadow-lg shadow-slate-100/80 p-5 mt-[-1px] select-none hover:shadow-xl hover:border-emerald-200/60 transition-shadow duration-300 group cursor-grab active:cursor-grabbing"
          >
            {/* Slot */}
            <div className="w-10 h-2 bg-slate-100 border border-slate-200/60 rounded-full mx-auto mb-4" />

            {/* Profile Photo */}
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner mx-auto mb-4 group-hover:scale-102 transition-transform duration-300">
              <img
                src="/rithesh-photo.jpeg"
                alt="Pandi Rithesh Raja"
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
              <span className="absolute bottom-2 right-2 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </span>
            </div>

            {/* Name Details */}
            <div className="text-center space-y-1">
              <h2 className="font-display font-extrabold text-slate-900 text-lg leading-tight tracking-tight">
                Pandi Rithesh Raja
              </h2>
              <p className="text-[11px] font-bold font-mono text-emerald-600 uppercase tracking-wide">
                MERN Stack & AI Developer
              </p>
              <p className="text-[10px] font-semibold text-slate-400">
                Building · Learning · Shipping
              </p>
            </div>

            {/* Barcode Graphic */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col items-center">
              <div className="w-full h-6 flex justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                {[2, 4, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2].map((bar, i) => (
                  <div key={i} className="bg-slate-700 h-full" style={{ width: `${bar}px` }} />
                ))}
              </div>
              <span className="text-[8px] font-mono font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">
                ID: 23HR1A3045
              </span>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mb-6 shrink-0">
          <a href="https://github.com/rithesh2130-beep" target="_blank" rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all shadow-sm" aria-label="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/rithesh2130" target="_blank" rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all shadow-sm" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="/Rithesh_Raja_FullStack_1781190036910.pdf" target="_blank" rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all shadow-sm" aria-label="Resume">
            <FileText className="w-4 h-4" />
          </a>
        </div>

        {/* Admin Console Button */}
        <div className="pt-4 border-t border-slate-50 shrink-0 mt-auto">
          <button
            onClick={() => setLocation(isAdminLoggedIn ? "/admin/dashboard" : "/admin")}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/30 text-slate-400 hover:text-emerald-600 transition-all font-mono text-xs font-semibold"
          >
            {isAdminLoggedIn ? (
              <><ShieldCheck className="w-4 h-4 text-emerald-500" /><span>Admin Console</span></>
            ) : (
              <><Terminal className="w-4 h-4" /><span>Developer Panel</span></>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
