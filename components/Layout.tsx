import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Nail Factory Groningen</title>
        <meta
          name="description"
          content="Experience the art of nail care with our expert technicians."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <div className="fixed bottom-4 right-4">
        <Link href="/admin">
          <a className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition-colors">
            Admin
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
