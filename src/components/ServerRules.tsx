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

const serverRules = [
  {
    title: "Respect Everyone",
    content:
      "Treat others the way you'd like to be treated. Whether you're in-character or out-of-character (OOC), respect is key. Discrimination, harassment, and hate speech have no place here.",
  },
  {
    title: "Stay in Character",
    content:
      "When you're in a roleplay session, stay in character! It’s all about the story, so keep real-world knowledge (OOC) separate from what your character knows. Let the roleplay unfold naturally.",
  },
  {
    title: "Powergaming",
    content:
      "Let’s make it fun for everyone—don’t force your actions on other players. Give them a chance to respond and play their part. Also, avoid exploiting the game’s mechanics for an unfair edge.",
  },
  {
    title: "Metagaming",
    content:
      "Don’t let OOC information influence your in-game decisions. Keep what your character knows separate from what you know to keep things fair and immersive.",
  },
  {
    title: "Random Deathmatching (RDM)",
    content:
      "Don’t attack or kill other players without a solid reason that makes sense within the roleplay. Violence should always have a purpose that fits into the story.",
  },
  {
    title: "Vehicle Deathmatching (VDM)",
    content:
      "Cars are part of the roleplay, but using them to harm other players without a good reason is not cool. Keep it realistic and responsible.",
  },
  {
    title: "Play Fair - No Mods or Hacks",
    content:
      "No one likes a cheater. Avoid using hacks, mods, or glitches to gain an advantage. Stick to approved mods that keep the playing field level for everyone.",
  },
  {
    title: "Keep it Realistic",
    content:
      "Make sure your character’s actions reflect how someone would really act in that situation. Over-the-top or unrealistic behavior breaks immersion for everyone.",
  },
  {
    title: "Value Your Character's Life",
    content:
      "Just like in real life, your character should care about staying alive! Avoid reckless actions that don’t make sense unless you’re ready to face the consequences.",
  },
  {
    title: "New Life Rule (NLR)",
    content:
      "If your character dies, they can’t remember what led to their death. Don’t return to the spot or seek revenge—let it be a fresh start.",
  },
  {
    title: "Create Unique Characters",
    content:
      "Your characters should each have their own backstory and personality. It makes the roleplay richer and more interesting for everyone.",
  },
  {
    title: "Hostage Situations",
    content:
      "If you find yourself in a hostage roleplay, play it seriously. Both the captors and the hostage should act in ways that reflect the stress and gravity of the situation.",
  },
  {
    title: "Crime and Law Enforcement",
    content:
      "Crimes in the game should be thought out and realistic. Looting police stations is off-limits, and you should always respect the role of law enforcement in the game. Corruption by law enforcement characters is not allowed. A maximum of five individuals are permitted to participate in any criminal situation (5-man Rule).",
  },
  {
    title: "Roleplay Growth",
    content:
      "Let your characters grow naturally over time. Avoid sudden or unexplained changes in their behavior or skills without a good roleplay reason.",
  },
  {
    title: "Use In-Game Channels Properly",
    content:
      "Stick to in-character (IC) communication in the game’s channels, and only use OOC chat for necessary clarifications. Keeping these separate helps maintain the immersion.",
  },
  {
    title: "Accord to Admins",
    content:
      "Admins and moderators are here to help things run smoothly. Follow their instructions and respect their decisions—they’re here to keep the fun going for everyone.",
  },
  {
    title: "Reporting Issues",
    content:
      "If you see someone breaking the rules, report it to an admin rather than handling it yourself. We’ve got a process to keep things fair and confidential.",
  },
  {
    title: "Appeal Process",
    content:
      "If you’ve been banned, there’s a way to appeal. Follow the process, and respect the final decision, whether it goes your way or not.",
  },
  {
    title: "Events and Spontaneous Roleplay",
    content:
      "Major events have their own set of rules, so be sure to follow them. We also encourage spontaneous roleplay as long as it fits the server’s overall story.",
  },
  {
    title: "Fair Play and No Abuse",
    content:
      "Abuse of any kind, whether it’s harassment, cheating, exploiting bugs, or using offensive language, won’t fly here. Play fair, respect others, and keep the experience enjoyable for everyone.",
  },
  {
    title: "Combat Logging & Storing",
    content:
      "Combat logging is when a player in an active situation quits the server, intentionally to avoid continuing the situation. Combat storing is considered when a player stores their cash, inventory, or vehicle during an active roleplay situation.",
  },
  {
    title: "Rules Explaining",
    content:
      "Do not explain the rules in character. ‘You’re not really valuing your life right now’, ‘I have a gun to your head, ahahahaha. This guy.’ There are better ways to handle this: ‘I’m gonna shoot you in the head if you keep moving.’ Report people who break rules and those who don’t value their life—shoot them, then report them. Do not ruin your RP experience for people who break the rules—admins will sort them out.",
  },
];

export function ServerRules() {
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
            Roleplay Rules
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            variants={slideUp}
          >
            Please read the City Town Roleplay rules carefully. Follow them to ensure a fun and fair roleplaying experience for everyone.
          </motion.p>
        </div>

        <div className="space-y-8">
          {serverRules.map((rule, index) => (
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

export default ServerRules;
