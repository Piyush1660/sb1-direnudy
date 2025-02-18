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

const rules = [
  {
    title: "Age Requirement",
    content:
      "Players must be at least 16 years old. This ensures maturity and a better roleplaying experience.",
  },
  {
    title: "Roleplay Experience",
    content:
      "Previous roleplay experience is required. This can be verified by asking about their past roleplay servers or requesting references. If the player is new to RP, offer a beginner’s guide or trial roleplay session to help them understand the basics.",
  },
  {
    title: "Server-specific Knowledge",
    content:
      "Players must be familiar with City Town Roleplay rules and lore (e.g., city structure, law enforcement, economy). A short quiz or written test can be used to check their knowledge of the server’s core values, rules, and roleplay standards.",
  },
  {
    title: "Roleplay Behavior",
    content:
      "Applicants should demonstrate an understanding of realistic roleplaying behaviors, like staying in character, avoiding meta-gaming, and respecting others' roles. No trolling: Trolling is strictly prohibited, including random deaths, griefing, or any disruptive behavior.",
  },
  {
    title: "Character Creation",
    content:
      "Players must create a unique character with a backstory, goals, and personality that fits within the server’s world. No powergaming: Players cannot create overpowered characters who bend the rules for personal gain.",
  },
  {
    title: "Discord & Communication",
    content:
      "Players must join the Discord server and stay active on it for communication and updates. Use of Voice Chat for roleplay is required, as text RP can severely limit immersion.",
  },
  {
    title: "Code of Conduct Agreement",
    content:
      "Applicants must read and agree to the server’s code of conduct, including rules about conduct during roleplay, behavior toward others, and consequences for breaking server rules.",
  },
  {
    title: "Behavior During Whitelisting",
    content:
      "No disrespectful behavior during the whitelisting process, including complaining or arguing with admins about decisions. Applicants should show they’re willing to follow the server's direction.",
  },
  {
    title: "Regular Activity Requirement",
    content:
      "Players should commit to a minimum level of activity (e.g., logging in at least once a week) to avoid inactive members.",
  },
  {
    title: "Ban History Check",
    content:
      "Applicants with a history of bans or misconduct on other servers may be denied access unless they can prove they’ve changed and show a genuine desire for positive roleplay.",
  },
  {
    title: "Respect for Roleplay Immersion",
    content:
      "Encourage players to respect immersion, meaning no out-of-character chat during scenes or using information their character wouldn’t know.",
  },
];

export function WhitelistingRules() {
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
        <ArrowLeft className="w-5 h-5" /> Back to Rules
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
            Whitelisting Rules
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            variants={slideUp}
          >
            Please read the City Town Roleplay whitelisting requirements and guidelines carefully.
          </motion.p>
        </div>

        <div className="space-y-8">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
              variants={slideUp}
            >
              <h2 className="text-2xl font-bold text-[#ff66c4] mb-4">{rule.title}</h2>
              <p className="text-gray-300">{rule.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WhitelistingRules;
