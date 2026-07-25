import React, { useState, useEffect, useRef } from "react";
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
  FileText 
} from "lucide-react";
import { API_BASE_URL } from "../../config";

interface SidebarProps {
  activeSection: string;
}

export default function Sidebar({ activeSection }: SidebarProps) {
  const [, setLocation] = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      fetch(`${API_BASE_URL}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) setIsAdminLoggedIn(true);
        })
        .catch(() => {});
    }
  }, []);

  // Framer Motion 3D tilt values for the ID Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [12, -12]);
  const rotateY = useTransform(mouseX, [-100, 100], [-12, 12]);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate coordinates relative to center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
    <div className="w-full md:w-80 lg:w-90 flex-shrink-0 bg-white border-b md:border-b-0 md:border-r border-slate-100 flex flex-col md:h-screen md:sticky md:top-0 py-8 px-6 z-40 overflow-y-auto">
      
      {/* ─── Skeuomorphic Hanging ID Badge Container ─── */}
      <div className="relative w-full flex flex-col items-center mb-8 shrink-0">
        
        {/* Lanyard Line */}
        <div className="w-[3px] bg-slate-200 h-10 shadow-inner" />
        
        {/* Lanyard Metallic Clip Clasp */}
        <div className="w-7 h-5 bg-gradient-to-r from-slate-350 via-slate-100 to-slate-400 border border-slate-300 rounded shadow-sm flex flex-col items-center justify-end pb-0.5 z-10 -mt-1">
          <div className="w-4 h-1.5 bg-slate-700/80 rounded-full" />
        </div>

        {/* Hanging ID Badge */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotate: [0, -1.2, 1.2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full max-w-[250px] bg-white rounded-[24px] border border-slate-200/80 shadow-lg shadow-slate-100/80 p-5 mt-[-1px] select-none hover:shadow-xl hover:border-violet-200/60 transition-shadow duration-300 group cursor-grab active:cursor-grabbing"
        >
          {/* Card Slot */}
          <div className="w-10 h-2 bg-slate-100 border border-slate-200/60 rounded-full mx-auto mb-4" />

          {/* Profile Photo */}
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner mx-auto mb-4.5 group-hover:scale-102 transition-transform duration-300">
            <img 
              src="/rithesh-photo.jpeg" 
              alt="Pandi Rithesh Raja" 
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" 
            />
            {/* Pulsing online indicator inside photo frame */}
            <span className="absolute bottom-2 right-2 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </span>
          </div>

          {/* Details */}
          <div className="text-center space-y-1">
            <h2 className="font-display font-extrabold text-slate-900 text-lg leading-tight tracking-tight">
              Pandi Rithesh Raja
            </h2>
            <p className="text-[11px] font-bold font-mono text-violet-600 uppercase tracking-wide">
              MERN & AI Developer
            </p>
            <p className="text-[10px] font-semibold text-slate-400">
              B.Tech AI & Data Science (Yr 3)
            </p>
          </div>

          {/* Barcode Graphic */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col items-center">
            {/* Simulated barcode */}
            <div className="w-full h-6 flex justify-between opacity-70 group-hover:opacity-100 transition-opacity">
              {[2, 4, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2].map((bar, i) => (
                <div 
                  key={i} 
                  className="bg-slate-700 h-full"
                  style={{ width: `${bar}px` }}
                />
              ))}
            </div>
            <span className="text-[8px] font-mono font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">
              ID: 23HR1A3045
            </span>
          </div>
        </motion.div>
      </div>

      {/* ─── Social CTA Links ─── */}
      <div className="flex justify-center gap-3 mb-8 shrink-0">
        <a
          href="https://github.com/rithesh2130-beep"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-violet-600 hover:border-violet-100 hover:bg-violet-50/30 transition-all shadow-2xs"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://github.com/rithesh2130-beep" // Redirect link as placeholder
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-violet-600 hover:border-violet-100 hover:bg-violet-50/30 transition-all shadow-2xs"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="/Rithesh_Raja_FullStack_1781190036910.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-violet-600 hover:border-violet-100 hover:bg-violet-50/30 transition-all shadow-2xs"
          aria-label="Download Resume"
        >
          <FileText className="w-4 h-4" />
        </a>
      </div>

      {/* ─── Navigation Tabs ─── */}
      <nav className="flex-grow space-y-1.5">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-violet-50 text-violet-600 border-l-4 border-violet-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/60 border-l-4 border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-violet-600" : "text-slate-400 group-hover:text-slate-600"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ─── Footer Console (Admin Access) ─── */}
      <div className="pt-6 border-t border-slate-50 shrink-0">
        <button
          onClick={() => setLocation(isAdminLoggedIn ? "/admin/dashboard" : "/admin")}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-slate-100 hover:border-violet-100 hover:bg-violet-50/30 text-slate-400 hover:text-violet-600 transition-all font-mono text-xs font-semibold"
        >
          {isAdminLoggedIn ? (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Admin Console</span>
            </>
          ) : (
            <>
              <Terminal className="w-4 h-4" />
              <span>Developer Panel</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
