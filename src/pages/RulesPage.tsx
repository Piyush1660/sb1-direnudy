import React from "react";
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
    section: "1. BASIC RULES",
    rules: [
      "Sexual Comments: Any form of sexual harassment or inappropriate comments related to sexual content is strictly prohibited. This includes but is not limited to sexually explicit language, unwanted advances, or making someone uncomfortable through sexual dialogue.",
      "Racial Comments: Racism is not tolerated in any form. This includes racial slurs, discriminatory remarks, or any language that targets someone’s race, ethnicity, or cultural background.",
      "Terrorism: Depictions or discussions of terrorism are banned. This rule is in place to ensure that sensitive topics like terrorism do not become part of the in-game experience, respecting real-world issues.",
      "Abuse: Any form of verbal, physical, or psychological abuse towards other players is prohibited. This rule covers bullying, harassment, and any form of mistreatment within the community.",
      "Clear Microphone: Players must use a clear and functioning microphone to communicate effectively during roleplay. Distorted, unclear, or poor-quality audio disrupts the roleplay experience.",
      "POV Requirement: Proof of View (POV) is mandatory when filing reports or defending against accusations. Players should always be prepared to provide video evidence of their gameplay to support any claims or disputes.",
      "Not Allowed RP: Certain roleplay scenarios are off-limit due to their sensitive nature or potential to disrupt the server environment: Suicide RP, Pregnancy RP, Animal RP, Torture RP, Corruption RP.",
    ],
  },
  {
    section: "2. ROLEPLAY RULES",
    rules: [
      "RDM/VDM (Random Deathmatch/Vehicle Deathmatch): RDM: Killing another player without a valid in-character reason is prohibited. There must always be a storyline or interaction leading up to such actions. VDM: Using vehicles to kill or harm other players without valid roleplay reasoning is not allowed.",
      "Character Breaking: Players must remain in character at all times. Discussing out-of-character (OOC) matters in character (IC) is prohibited as it breaks the immersion for others.",
      "NLR (New Life Rule): After dying, players should not return to the scene of their death or seek revenge. They must forget the events leading up to their death to maintain the roleplay's continuity.",
      "Doxing: Sharing personal information (real names, addresses, etc.) of other players is strictly forbidden. This is a serious offence and will result in severe punishment.",
      "Blurring: Avoid actions or discussions that blur the lines between IC and OOC. Keep OOC issues out of roleplay scenarios and vice versa.",
      "Cop Baiting: Intentionally provoking or luring police officers into a situation without proper roleplay context is not allowed.",
      "Crim Baiting: Similarly, provoking criminal players without a valid roleplay reason is prohibited. All interactions should have a meaningful narrative.",
      "Meta Gaming: Using out-of-character knowledge in character (IC) is considered metagaming and is not allowed.",
      "Combat Logging: Disconnecting from the server during a roleplay scenario to avoid consequences (like getting arrested or killed) is strictly prohibited.",
      "Combat Storing: Players are prohibited from storing items, vehicles, or money during or immediately after a combat situation.",
      "Power Gaming: Forcing actions upon others without giving them a chance to respond is considered power gaming.",
      "Safe Zones: Certain areas of the map are designated as safe zones where criminal activities are not allowed.",
      "Server Restarts: During server restarts, players should not exploit the reset to gain an advantage.",
      "Low Effort / Fail RP: All players are expected to maintain a high standard of roleplay. Actions that are unrealistic or poorly executed are considered Fail RP.",
      "Value of Life: Players must value their character’s life and make realistic decisions when threatened.",
      "Economy: Players should respect the in-game economy, avoiding exploits or cheats to gain an unfair advantage.",
    ],
  },
  {
    section: "3. SERVER-SIDED RULES",
    rules: [
      "Discord Names: Players must use appropriate Discord names that align with server rules. Offensive or misleading names can lead to disciplinary action.",
      "Third-Party Voice Chat: Using external voice communication tools (like Discord) for in-game discussions is prohibited.",
      "Hacking: Any form of hacking or cheating, including the use of aimbots, wallhacks, or other malicious software, is strictly prohibited.",
      "Graphic/Mod Advancements: Unauthorized modifications to the game client, such as graphic mods or texture packs, are not allowed.",
      "Bug Exploits: Players are required to report bugs instead of exploiting them for personal gain.",
    ],
  },
  {
    section: "4. CRIMINAL AND GANG RULES",
    rules: [
      "Gunplay Over Roleplay: Prioritize roleplay over using weapons. Guns should only be drawn and used when absolutely necessary.",
      "5-Man Rule: Gang activities are limited to a maximum of 5 participants at any given time.",
      "POV Requirement for Gang Situations: Any gang-related situation, especially confrontations, must be recorded (POV).",
      "No Refunds Without POV: If you lose items or money during a gang situation, refunds will only be granted if you can provide valid POV evidence of the incident.",
      "If Situation is Called: When a situation is initiated, all parties involved must see it through to the end.",
      "Cooldown (45 Minutes): After a gang or criminal activity, there is a mandatory 45-minute cooldown period.",
      "No Friendly/Fake Hostage: Hostages in criminal scenarios must be genuine.",
      "Third Party Involvement: Players not directly involved should not interfere or engage in the situation.",
      "Random Looting: Looting should only occur within the context of a roleplay scenario.",
    ],
  },
  {
    section: "5. ROBBERY RULES",
    rules: [
      "Max Participants (5 Total Including Radio): A maximum of 5 players, including those involved via radio, can participate in a robbery.",
      "Store Robbery (2 Minutes + 1 Hostage): Store robberies should last no longer than 2 minutes and must include at least one hostage.",
      "Bank Robbery (3 Minutes + 1 Hostage): Bank robberies can last up to 3 minutes and must involve at least one hostage.",
      "Heist (5 Minutes + 2 Hostages): Heists can last up to 5 minutes and require at least two hostages.",
      "Code Red (5 Participants Max + 2 Hostage Max): During a Code Red situation, a maximum of 5 players can be involved, with up to 2 hostages.",
    ],
  },
  {
    section: "6. MISCELLANEOUS RULES",
    rules: [
      "DM Promotion: Promoting other servers or communities (DM Promotion) within APL Nation is not allowed.",
      "Staff DM: Direct messaging (DM) staff members for non-emergency issues is discouraged.",
      "No Refund for Any Purchase: All in-game purchases are final.",
      "Account Compromise: Players are responsible for securing their accounts.",
      "Account Sharing: Sharing accounts with others is prohibited.",
    ],
  },
];

const RulesPage: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Back to Home Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <motion.h1 className="text-4xl font-bold text-center mb-6" variants={slideUp}>
        CITY TOWN ROLEPLAY (CTRP) RULES
      </motion.h1>

      <motion.p className="text-center text-gray-400 mb-4" variants={slideUp}>
        To ensure a smooth and enjoyable experience, please familiarize yourself with the rules. For any questions, contact us via our Official Discord Server.
      </motion.p>

      <motion.div
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
        >
          {rules.map((section, index) => (
            <motion.div
              key={index}
              className="space-y-4"
              variants={staggerContainer}
            >
              <motion.h2
                className="text-xl font-semibold text-gray-200 mt-6"
                variants={slideUp}
              >
                {section.section}
              </motion.h2>
              <ul className="list-disc pl-6">
                {section.rules.map((rule, ruleIndex) => (
                  <motion.li
                    key={ruleIndex}
                    className="text-gray-300"
                    variants={slideUp}
                  >
                    {rule}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RulesPage;
