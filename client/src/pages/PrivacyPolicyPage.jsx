import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from 'lucide-react';

const policyData = [
  {
    title: "Information We Collect",
    id: "info-collect",
    content: (
      <>
        <p className="mb-2">We may collect the following types of information:</p>
        <ul className="list-disc list-inside space-y-2">
          [cite_start]<li><strong>Personal Information:</strong> Name, email address, phone number, job title, resume/CV, and other details provided voluntarily by clients, candidates, or visitors. [cite: 30]</li>
          [cite_start]<li><strong>Business Information:</strong> Company name, requirements, contracts, and project-related data. [cite: 31]</li>
          [cite_start]<li><strong>Technical Information:</strong> IP address, browser type, operating system, and usage data collected via cookies and analytics tools. [cite: 32]</li>
          [cite_start]<li><strong>Sensitive Information (if applicable):</strong> Employment history, education background, or identification documents, shared voluntarily by job seekers for recruitment purposes. [cite: 33]</li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    id: "how-we-use",
    content: (
      <>
        <p className="mb-2">We use collected data for the following purposes:</p>
        <ul className="list-disc list-inside space-y-2">
          [cite_start]<li>To deliver staffing, recruitment, consulting, and technology services. [cite: 36]</li>
          [cite_start]<li>To communicate with clients, candidates, and users about inquiries, services, or updates. [cite: 37]</li>
          [cite_start]<li>To improve our website, services, and AI-driven solutions. [cite: 38]</li>
          [cite_start]<li>For legal compliance and fraud prevention. [cite: 39]</li>
          [cite_start]<li>For marketing (e.g., publishing reviews/testimonials with your consent). [cite: 40]</li>
        </ul>
        [cite_start]<p className="mt-4">We do not sell or rent your personal information to third parties. [cite: 41]</p>
      </>
    ),
  },
  {
    title: "Data Sharing",
    id: "data-sharing",
    content: (
      <>
        <p className="mb-2">We may share data only in the following circumstances:</p>
        <ul className="list-disc list-inside space-y-2">
          [cite_start]<li>With **trusted service providers or partners** assisting in delivering services (e.g., hosting, payment processing, communication tools). [cite: 44]</li>
          [cite_start]<li>With **clients** during recruitment processes (e.g., resumes shared with employers). [cite: 45]</li>
          [cite_start]<li>When **required by law, regulation, or government request.** [cite: 46]</li>
        </ul>
        [cite_start]<p className="mt-4">All third-party service providers are expected to maintain appropriate confidentiality and data protection measures. [cite: 47]</p>
      </>
    ),
  },
  {
    title: "Data Security",
    id: "data-security",
    content: (
      <>
        [cite_start]<p className="mb-2">We implement industry-standard security measures (encryption, access controls, secure servers) to safeguard your data. [cite: 49]</p>
        <p>However, no online transmission or storage system is 100% secure. [cite_start]We cannot guarantee absolute security of data shared digitally. [cite: 50]</p>
      </>
    ),
  },
  {
    title: "Cookies & Tracking",
    id: "cookies",
    content: (
      <>
        [cite_start]<p className="mb-2">Our website may use cookies and analytics tools to improve user experience. [cite: 52] [cite_start]Cookies help us analyze website traffic, personalize content, and improve services. [cite: 53]</p>
        [cite_start]<p>You may choose to disable cookies in your browser, but certain features may not function properly. [cite: 54]</p>
      </>
    ),
  },
  {
    title: "Data Retention",
    id: "data-retention",
    content: (
      <>
        [cite_start]<p>We retain personal and business data only as long as necessary for service delivery, legal obligations, or legitimate business purposes. Once data is no longer required, it will be securely deleted. [cite: 56, 57]</p>
      </>
    ),
  },
  {
    title: "Your Rights",
    id: "your-rights",
    content: (
      <>
        <p className="mb-2">As a user, you may:</p>
        <ul className="list-disc list-inside space-y-2">
          [cite_start]<li>Request access to the personal information we hold about you. [cite: 60]</li>
          [cite_start]<li>Request corrections or updates to inaccurate information. [cite: 61]</li>
          [cite_start]<li>Request deletion of your data, subject to legal/contractual obligations. [cite: 62]</li>
          [cite_start]<li>Opt out of marketing communications at any time. [cite: 63]</li>
        </ul>
        [cite_start]<p className="mt-4">To exercise your rights, please contact us at [Insert Contact Email]. [cite: 64]</p>
      </>
    ),
  },
  {
    title: "Third-Party Links",
    id: "third-party-links",
    content: (
      <>
        [cite_start]<p>Our website may include links to third-party platforms (e.g., LinkedIn, Instagram, Twitter/X, WhatsApp). [cite: 66] [cite_start]We are not responsible for the privacy practices or policies of these external sites. [cite: 67]</p>
      </>
    ),
  },
  {
    title: "Children’s Privacy",
    id: "childrens-privacy",
    content: (
      <>
        [cite_start]<p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. [cite: 69]</p>
      </>
    ),
  },
  {
    title: "International Data Transfers",
    id: "data-transfers",
    content: (
      <>
        [cite_start]<p>If you are accessing our services from outside India, your information may be transferred to and stored in servers located in India or other jurisdictions. [cite: 71] [cite_start]By using our services, you consent to such transfers. [cite: 72]</p>
      </>
    ),
  },
  {
    title: "Updates to this Privacy Policy",
    id: "updates",
    content: (
      <>
        [cite_start]<p className="mb-2">We may update this Privacy Policy from time to time. [cite: 74] [cite_start]Updated versions will be posted on our website with a revised effective date. [cite: 75] [cite_start]We encourage you to review this page periodically. [cite: 76]</p>
      </>
    ),
  },
];

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-gray-700">
    <button
      onClick={onClick}
      className="flex justify-between items-center w-full py-4 text-left font-bold text-lg text-[#F5F5F5] focus:outline-none"
    >
      <span>{title}</span>
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={24} className="text-[#40E0D0]" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden text-slate-300 pb-4"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function PrivacyPolicyPage() {
  const [openItems, setOpenItems] = useState({});

  const handleAccordionToggle = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] font-sans px-6 py-20 md:py-32 flex flex-col items-center">
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center mb-16"
      >
        [cite_start]<h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Privacy Policy [cite: 4]</h1>
        <p className="text-lg text-slate-300 max-w-xl mx-auto">
          At Innovative Staffing Solutions (“we,” “our,” “us”), we are committed to protecting your privacy and ensuring the confidentiality of your personal and business information. [cite_start]This Privacy Policy explains how we collect, use, store, and protect your data when you visit our website [innovativestaffingsolutions.online] or use our services. [cite: 5]
        </p>
        [cite_start]<p className="mt-4 text-sm font-semibold text-[#40E0D0]">Effective Date: 2023 [cite: 6]</p>
      </motion.section>

      <div className="w-full max-w-6xl bg-gray-900/50 border border-gray-700 rounded-3xl p-8 md:p-12">
        {/* Quick Navigation Menu */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Quick Navigation</h3>
          <ul className="flex flex-wrap gap-4 text-sm text-slate-300">
            {policyData.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-[#40E0D0] transition-colors duration-200">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Accordion Sections */}
        <div className="space-y-4">
          {policyData.map((item) => (
            <div key={item.id} id={item.id} className="relative pt-8 md:pt-12">
              <AccordionItem
                title={item.title}
                content={item.content}
                isOpen={openItems[item.id]}
                onClick={() => handleAccordionToggle(item.id)}
              />
            </div>
          ))}
        </div>

        {/* Closing Section */}
        <div className="mt-12 text-center border-t border-gray-700 pt-8">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm text-slate-300 mb-4">
            [cite_start]If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: [cite: 78]
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg">
            <span className="flex items-center gap-2">
              <span className="text-xl">📧</span>
              <a href="mailto:contact@innovativestaffingsolutions.online" className="hover:text-[#40E0D0] transition-colors">
                contact@innovativestaffingsolutions.online
              </a>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-xl">📞</span>
              <a href="tel:+917821929953" className="hover:text-[#40E0D0] transition-colors">
                +91 78219 29953
              </a>
            </span>
          </div>
          <p className="mt-6 text-sm italic text-slate-400">
            [cite_start]By using our website and services, you acknowledge that you have read, understood, and agreed to this Privacy Policy. [cite: 80]
          </p>
        </div>
      </div>
    </main>
  );
}