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

export function ServerRules() {
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
        variants={slideUp}
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-6xl font-extrabold text-[#ff66c4] mb-6 shadow-lg"
            variants={slideUp}
          >
            Server Rules
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            variants={slideUp}
          >
            Read the server rules to ensure a smooth and enjoyable experience for everyone.
          </motion.p>
        </div>

        <motion.div
          className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
          variants={slideUp}
        >
          <h2 className="text-3xl font-bold text-[#ff66c4] mb-6">
            General Server Rules
          </h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-[#ff66c4] text-lg">•</span>
              Respect all players and staff.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff66c4] text-lg">•</span>
              Do not use any cheats or exploits.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff66c4] text-lg">•</span>
              Keep it family-friendly in all forms of communication.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff66c4] text-lg">•</span>
              No griefing, trolling, or harassment.
            </li>
            {/* Add more server rules as needed */}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ServerRules;
