import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  AlertCircle,
  Users,
  MessageSquare,
  Siren,
  ArrowLeft,
} from "lucide-react";

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

const sections = [
  {
    icon: Shield,
    title: "General Rules",
    rules: [
      "Respect all players and staff members at all times.",
      "No harassment, discrimination, or hate speech.",
      "No exploiting bugs or glitches.",
      "Follow staff instructions when given.",
    ],
  },
  {
    icon: Users,
    title: "Roleplay Rules",
    rules: [
      "Stay in character at all times while in the city.",
      "No powergaming or metagaming.",
      "Value your life and roleplay accordingly.",
      "Maintain realistic scenarios and interactions.",
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication Rules",
    rules: [
      "No OOC (Out of Character) chat in-game unless necessary.",
      "Keep radio communications realistic and in character.",
      "No spam or excessive caps in any chat.",
    ],
  },
  {
    icon: Siren,
    title: "Combat Rules",
    rules: [
      "No Random Death Match (RDM).",
      "No Vehicle Death Match (VDM).",
      "Combat logging is strictly prohibited.",
      "Must have valid RP reason for engaging in combat.",
    ],
  },
  {
    icon: AlertCircle,
    title: "Rule Violations",
    rules: [
      "Violation of these rules may result in warnings, temporary bans, or permanent bans depending on the severity and frequency of the offense. All decisions made by staff are final.",
    ],
  },
];

export function Rules() {
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
            Please read CTRP Terms Rules and Regulation.
          </motion.p>
        </div>

        <div className="space-y-8">
          {sections.map(({ icon: Icon, title, rules }, index) => (
            <motion.div
              key={index}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
              variants={slideUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <Icon className="text-[#ff66c4]" size={24} />
                <h2 className="text-3xl font-bold text-white">{title}</h2>
              </div>
              <ul className="space-y-4 text-gray-300">
                {rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#ff66c4] text-lg">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Rules;
