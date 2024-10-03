import type { NextPage } from "next";
import BookingSteps from "../components/BookingSteps";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const BookingPage: NextPage = () => {
  return (
    <>
      <SEO
        title="Book Your Appointment | Nail Factory Groningen"
        description="Book your nail appointment at Nail Factory Groningen. Choose from our wide range of services and find a time that suits you."
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingSteps />
        </div>
      </motion.div>
    </>
  );
};

export default BookingPage;
