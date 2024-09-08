import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ServiceCard from "./ServiceCard";
import { services } from "../data/services";
import { Service } from "../types";

interface ServicesShowcaseProps {
  showAll?: boolean;
}

const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({
  showAll = false,
}) => {
  const displayedServices = showAll ? services : services.slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-serif font-bold text-center mb-12 text-primary"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service: Service, index: number) => (
            <ServiceCard key={service.name} {...service} index={index} />
          ))}
        </div>
        {!showAll && (
          <div className="mt-12 text-center">
            <Link href="/services">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary transition-colors"
              >
                See All Services
              </motion.span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesShowcase;
