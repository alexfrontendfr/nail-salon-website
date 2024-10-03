import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const nailDesigns = [
  { id: 1, src: "/images/nail1.png", alt: "Nail art design 1" },
  { id: 2, src: "/images/nail2.png", alt: "Nail art design 2" },
  { id: 3, src: "/images/nail3.png", alt: "Nail art design 3" },
  { id: 4, src: "/images/nail4.png", alt: "Nail art design 4" },
  { id: 5, src: "/images/nail5.png", alt: "Nail art design 5" },
];

const FloatingNails: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {nailDesigns.map((nail) => (
        <motion.div
          key={nail.id}
          className="absolute w-16 h-16"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src={nail.src}
            alt={nail.alt}
            width={64}
            height={64}
            style={{
              borderRadius: "50%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingNails;
