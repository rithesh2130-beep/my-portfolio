import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Primary spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
        animate={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, hsl(186 100% 50% / 0.06), transparent 40%)`,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
      {/* Secondary accent spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
        animate={{
          background: `radial-gradient(600px circle at ${position.x + 100}px ${position.y - 100}px, hsl(263 80% 65% / 0.03), transparent 40%)`,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.7 }}
      />
    </>
  );
}
