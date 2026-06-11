import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      animate={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    />
  );
}
