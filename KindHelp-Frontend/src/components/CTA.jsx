import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroCTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#f3f3ff] py-20 px-6 md:px-16 lg:px-24 mt-16">
      {/* Decorative Gradient Blob */}
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto relative z-10">
        {/* Left: Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Make Giving Easy &{" "}
            <span className="text-[#5B3FFF] drop-shadow-md">Impactful</span>
          </h1>
          <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-xl leading-relaxed">
            KindHelp connects people who want to give with those who genuinely need.
            Help someone today by donating what you no longer use.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="px-7 py-3.5 rounded-xl bg-[#5B3FFF] text-white text-base font-semibold shadow-lg hover:bg-[#472aff] transition-transform transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-7 py-3.5 rounded-xl border border-gray-300 text-gray-800 text-base font-semibold bg-white hover:bg-gray-100 shadow-sm transition-transform transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Right: Illustration */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.img
            src="/undraw_collaborators_rgw4.png"
            alt="KindHelp Illustration"
            className="w-[90%] max-w-md md:max-w-lg drop-shadow-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCTA;
