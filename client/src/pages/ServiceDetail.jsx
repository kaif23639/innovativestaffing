import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const animationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const serviceDisplayNames = {
  "data-scraping": "Data Scraping",
  "personalized-mailing": "Personalized Mailing",
  automations: "Automations",
  "custom-agents": "Custom Agents",
  "data-management": "Data Management",
  "data-storage": "Data Storage",
  testing: "Testing",
  enhancement: "Enhancement",
};

export default function ServiceDetail() {
  const { serviceName } = useParams();
  const displayName = serviceDisplayNames[serviceName] || "Service";

  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 py-10"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-extrabold mb-6">{displayName}</h1>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">Problem</h2>
        <p>
          Many businesses struggle with {displayName.toLowerCase()} inefficiencies that limit their potential.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">Solution</h2>
        <p>
          Our {displayName} service provides tailored solutions to address these challenges effectively.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-xl mb-2">Benefits</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Improved productivity</li>
          <li>Cost savings</li>
          <li>Enhanced data accuracy</li>
        </ul>
      </section>

      <button
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
        onClick={() => alert("Contact/Quote form coming soon!")}
      >
        Contact / Get a Quote
      </button>
    </motion.main>
  );
}
