// components/Hero.tsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingNails from "./FloatingNails";

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-pink-100 to-white overflow-hidden py-16">
      <FloatingNails />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-primary xl:inline">
                Nail perfection
              </span>{" "}
              <span className="block xl:inline">at Nail Factory Groningen</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Experience the art of nail care with our expert technicians. Book
              your appointment today and let your nails do the talking.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-start">
              <div className="rounded-md shadow">
                <Link href="/booking" passHref>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary md:py-4 md:text-lg md:px-10"
                  >
                    Book Now
                  </motion.a>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
