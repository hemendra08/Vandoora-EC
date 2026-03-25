import React from "react";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      {/* Space for future sections like Trending Products */}
    </div>
  );
};

export default Home;
