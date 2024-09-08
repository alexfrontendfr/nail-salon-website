import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const works = [
  { id: 1, src: "/images/nailsWork1.png", alt: "Nail art design 1" },
  { id: 2, src: "/images/nailsWork2.png", alt: "Nail art design 2" },
  { id: 3, src: "/images/nailsWork3.png", alt: "Nail art design 3" },
  { id: 4, src: "/images/nailsWork4.png", alt: "Nail art design 4" },
  { id: 5, src: "/images/nailsWork5.png", alt: "Nail art design 5" },
  { id: 6, src: "/images/nailsWork6.png", alt: "Nail art design 6" },
];

const PreviousWork: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-primary">
          Our Previous Work
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden"
            >
              <Image
                src={work.src}
                alt={work.alt}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-center object-cover transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviousWork;
