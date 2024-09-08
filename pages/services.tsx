// pages/services.tsx
import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import ServicesShowcase from "../components/ServicesShowcase";
import FloatingNails from "../components/FloatingNails";

const ServicesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Our Services | Nail Factory Groningen</title>
        <meta
          name="description"
          content="Explore our range of nail care services at Nail Factory Groningen."
        />
      </Head>
      <div className="relative bg-gradient-to-b from-pink-100 to-white overflow-hidden py-16">
        <FloatingNails />
        <div className="relative z-10">
          <ServicesShowcase showAll />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
