import { useEffect, useState } from "react";
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
      {/* Primary spotlight (Violet) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
        animate={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, hsl(262 83% 58% / 0.04), transparent 45%)`,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
      {/* Secondary accent spotlight (Rose/Magenta) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
        animate={{
          background: `radial-gradient(600px circle at ${position.x + 80}px ${position.y - 80}px, hsl(326 95% 60% / 0.03), transparent 40%)`,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.7 }}
      />
    </>
  );
}
