import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary to-secondary text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-serif font-bold mb-8"
        >
          Ready for Your Nail Transformation?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-8"
        >
          Experience the artistry and care at Nail Factory Groningen. Book your
          appointment today and let your nails tell your story.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/booking"
            className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            Book Your Appointment
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
