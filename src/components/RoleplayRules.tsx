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
      "Respect All Players: Treat everyone with respect and professionalism. Any form of discrimination, hate speech, or harassment will not be tolerated.",
      "No Cheating or Exploits: Cheating, exploiting game mechanics, or using third-party software to gain an unfair advantage is strictly prohibited.",
      "Age Requirement: Players must be at least 16 years old to join the server. If under 18, ensure parental consent is in place.",
      "Server Integrity: Do not disrupt the server’s functioning by spamming, bug abusing, or interfering with server processes.",
      "No OOC (Out-Of-Character) Interruptions: Avoid using Out-Of-Character (OOC) chat or voice for in-character (IC) matters. Use /ooc for off-topic discussions."
    ],
  },
  {
    icon: Users,
    title: "Roleplay Rules",
    rules: [
      "Stay In Character: Always stay in character unless using OOC channels. If you must leave character, use proper OOC communication.",
      "Realistic Roleplay: Roleplay should reflect realistic actions and decisions. Avoid unrealistic or excessive behavior (e.g., unrealistic vehicle maneuvers, random killings, etc.).",
      "Roleplay Within Boundaries: Respect others' roleplay boundaries. Don’t force actions or interactions on others that may make them uncomfortable.",
      "RP Continuity: Keep your actions consistent and logical with the progression of the roleplay. Avoid breaking immersion by changing character traits suddenly or acting without reason.",
      "No Random Deathmatch (RDM): Do not kill other players without proper in-character reasoning and prior interaction leading to the death."
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication Rules",
    rules: [
      "Voice Chat: Use your in-game voice for roleplay interactions. Keep your voice chat clear, concise, and relevant to the roleplay situation.",
      "Text Chat: Use text chat only for out-of-character (OOC) communication. All in-character communication must be done through voice or emotes.",
      "Prohibited OOC Conversations: Avoid discussing personal, non-roleplay topics in OOC chat. Keep the focus on the roleplay experience at all times.",
      "No Metagaming (MG): Using out-of-character knowledge to influence your in-character decisions is not allowed (e.g., knowing where a player is through OOC chat)."
    ],
  },
  {
    icon: Siren,
    title: "Combat Rules",
    rules: [
      "Realistic Combat: Use realistic tactics and decision-making in combat situations. Think about your character's resources, skills, and the situation before engaging in combat.",
      "Fear RP: If a gun or weapon is aimed at you, you must follow commands and respond realistically. Don’t initiate combat without fear of consequences.",
      "No VDM (Vehicle Deathmatch): Running over or intentionally killing players with vehicles without a proper in-character reason is prohibited.",
      "No RDM (Random Deathmatch): Killing a player without a valid in-character reason or roleplay build-up is forbidden. Always have a logical reason for initiating violence.",
      "Combat Logging: Do not log off while engaged in a combat situation or when there is an active roleplay scenario in progress."
    ],
  },
  {
    icon: AlertCircle,
    title: "Rule Violations",
    rules: [
      "Warnings and Suspensions: Players who break rules may receive warnings, temporary suspensions, or permanent bans, depending on the severity of the violation.",
      "Punishment Based on Severity: Minor infractions result in warnings or short-term bans. Major infractions (e.g., hacking, exploiting, or toxicity) will result in longer bans or permanent removal.",
      "Appeals Process: Players have the right to appeal any bans or suspensions. Follow the server’s appeal process for reconsideration.",
      "No Tolerance for Toxicity: If you are found to be constantly disruptive or toxic to other players, you will be given a warning. Repeat offenders may face harsher penalties."
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
