import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactSection: React.FC = () => {
  return (
    <section className="py-16 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-serif font-bold text-center mb-12"
        >
          Get in Touch
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <FaInstagram className="mx-auto text-4xl mb-4" />
            <h3 className="text-xl font-serif mb-2">Follow Us</h3>
            <a
              href="https://www.instagram.com/glamournails"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @glamournails
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <FaPhone className="mx-auto text-4xl mb-4" />
            <h3 className="text-xl font-serif mb-2">Call Us</h3>
            <a href="tel:+1234567890" className="hover:underline">
              (123) 456-7890
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <FaEnvelope className="mx-auto text-4xl mb-4" />
            <h3 className="text-xl font-serif mb-2">Email Us</h3>
            <a href="mailto:info@glamournails.com" className="hover:underline">
              info@glamournails.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
