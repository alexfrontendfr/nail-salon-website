import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const links = [
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/nailfactorygroningen",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/nailfactorygroningen",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    url: "https://www.twitter.com/nailfactorygroningen",
  },
  { name: "Book Appointment", url: "/booking" },
];

const LinktreeContact: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary to-secondary text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-serif font-bold text-center mb-8"
        >
          Connect with Nail Factory Groningen
        </motion.h2>
        <div className="space-y-4">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.name !== "Book Appointment" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 rounded-md bg-white text-primary hover:bg-gray-100 transition-colors duration-200 text-center font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon && <link.icon className="inline-block mr-2" />}
              {link.name}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinktreeContact;
