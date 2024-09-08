import React from "react";
import { FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">
              Nail Factory Groningen
            </h3>
            <p className="text-gray-300">Bringing beauty to your fingertips</p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">
              Our Commitment
            </h3>
            <ul className="space-y-2">
              <li>High-quality products</li>
              <li>Expert technicians</li>
              <li>Relaxing atmosphere</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">
              Connect With Us
            </h3>
            <a
              href="https://www.instagram.com/nailfactorygroningen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaInstagram />
              <span>@nailfactorygroningen</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Nail Factory Groningen. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
