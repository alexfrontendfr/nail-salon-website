import type { NextPage } from "next";
import Hero from "../components/Hero";
import ServicesShowcase from "../components/ServicesShowcase";
import PreviousWork from "../components/PreviousWork";
import CallToAction from "../components/CallToAction";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const Home: NextPage = () => {
  return (
    <>
      <SEO
        title="Nail Factory Groningen - Professional Nail Care"
        description="Experience the art of nail care at Nail Factory Groningen. Book your appointment today for professional nail services."
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <ServicesShowcase />
        <PreviousWork />
        <CallToAction />
      </motion.div>
    </>
  );
};

export default Home;
