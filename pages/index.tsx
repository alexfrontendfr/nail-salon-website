import type { NextPage } from "next";
import Hero from "../components/Hero";
import ServicesShowcase from "../components/ServicesShowcase";
import PreviousWork from "../components/PreviousWork";
import CallToAction from "../components/CallToAction";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
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
  );
};

export default Home;
