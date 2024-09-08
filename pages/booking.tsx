import type { NextPage } from "next";
import BookingSteps from "../components/BookingSteps";
import { motion } from "framer-motion";

const BookingPage: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-center mb-12 text-primary">
          Book Your Appointment
        </h1>
        <BookingSteps />
      </div>
    </motion.div>
  );
};

export default BookingPage;
