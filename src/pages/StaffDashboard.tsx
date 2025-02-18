import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clipboard, Users, LogOut, Calendar } from "lucide-react";

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

export function StaffDashboard() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loaStatus, setLoaStatus] = useState<string>("");

  useEffect(() => {
    // Placeholder for fetching staff information. This could be fetched from an API.
    setUsername("John Doe");
    setEmail("johndoe@example.com");
    setLoaStatus("Approved"); // You could fetch LOA status from your backend.
  }, []);

  // Simulate submitting the LOA form
  const handleLoaSubmit = () => {
    alert("Leave of Absence request has been submitted!");
  };

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
        <span className="w-5 h-5">←</span> Back to Home
      </Link>

      <motion.div className="max-w-4xl mx-auto px-4 py-16" variants={staggerContainer}>
        <div className="text-center mb-16">
          <motion.h1
            className="text-6xl font-extrabold text-[#ff66c4] mb-6 shadow-lg"
            variants={slideUp}
          >
            Welcome to Staff Dashboard
          </motion.h1>
          <motion.p className="text-gray-400 text-lg" variants={slideUp}>
            Manage requests, view data, and interact with users here.
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* LOA Form Section */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
            variants={slideUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <Clipboard className="text-[#ff66c4]" size={24} />
              <h2 className="text-3xl font-bold text-white">Leave of Absence (LOA)</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-[#ff66c4] text-lg">•</span> Request time off
                from work with a simple form.
              </p>
            </div>
            <Link
              to="/staff-loa"  
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold text-white"
            >
              <Calendar className="w-5 h-5" />
              Submit LOA Request
            </Link>
          </motion.div>

          {/* Team Management Section */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
            variants={slideUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-[#ff66c4]" size={24} />
              <h2 className="text-3xl font-bold text-white">Team Management</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-[#ff66c4] text-lg">•</span> View current team
                members and roles.
              </p>
              <p>
                <span className="text-[#ff66c4] text-lg">•</span> Assign tasks or
                interact with other staff members.
              </p>
            </div>
          </motion.div>

          {/* Logout Section */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 mt-16"
            variants={slideUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <LogOut className="text-[#ff66c4]" size={24} />
              <h2 className="text-3xl font-bold text-white">Log Out</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-[#ff66c4] text-lg">•</span> Click the button
                below to log out from your staff dashboard.
              </p>
            </div>
            <button
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold text-white"
            >
              Log Out
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default StaffDashboard;
