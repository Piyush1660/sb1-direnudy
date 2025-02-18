import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

export function RulesPage() {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[#ff66c4] hover:text-[#d94fc7] mb-8 font-bold text-lg"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>
      <motion.div
        className="max-w-4xl mx-auto px-4 py-16"
        variants={staggerContainer}
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-6xl font-extrabold text-[#ff66c4] mb-6 shadow-lg"
            variants={slideUp}
          >
            City Town Roleplay
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            variants={slideUp}
          >
            Please read the CTRP Terms Rules and Regulations below.
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* Whitelisting Rules Button */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
            variants={slideUp}
          >
            <Link
              to="/whitelisting-rules"
              className="block text-center py-4 px-8 text-xl font-bold text-[#ff66c4] bg-[#1a1a1a] rounded-lg border border-[#ff66c4] hover:bg-[#ff66c4] hover:text-white transition"
            >
              Whitelisting Rules
            </Link>
          </motion.div>

          {/* Server Rules Button */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
            variants={slideUp}
          >
            <Link
              to="/server-rules"
              className="block text-center py-4 px-8 text-xl font-bold text-[#ff66c4] bg-[#1a1a1a] rounded-lg border border-[#ff66c4] hover:bg-[#ff66c4] hover:text-white transition"
            >
              Server Rules
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RulesPage;
