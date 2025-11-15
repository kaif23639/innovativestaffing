import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CreditCard, ScrollText, Settings, Wrench, GraduationCap, Briefcase, ChevronDown, Rocket } from 'lucide-react';

// Data for the FAQ content
const faqsData = {
  clients: [
    {
      category: "Verification",
      icon: <Lock size={24} />,
      questions: [
        { q: "How do I verify my business account?", a: "You will need to sign a Letter of Agreement based on your business type and specific requirements." },
        { q: "What documents are required for verification?", a: "Signing the official agreement document is mandatory to complete verification." },
        { q: "How long does the verification take?", a: "Verification is typically completed within 24–48 hours." },
        { q: "Is my business information secure?", a: "Yes. All business information is kept strictly confidential and secure." },
      ],
    },
    {
      category: "Payments",
      icon: <CreditCard size={24} />,
      questions: [
        { q: "What payment methods do you accept?", a: "We accept UPI, RTGS, NEFT, Cash, Cheque, and Demand Draft (DD)." },
        { q: "Do you offer refunds or cancellations?", a: "All fees are non-refundable, unless otherwise stated in a signed contract." },
        { q: "Are there any hidden charges?", a: "Transaction charges may apply, depending on the chosen payment mode." },
        { q: "Can I pay in installments?", a: "Yes. We offer subscription-based payment options: Monthly, Three months, Six months, Yearly (Available for both project-based and subscription-based services)." },
      ],
    },
    {
      category: "NDAs & Confidentiality",
      icon: <ScrollText size={24} />,
      questions: [
        { q: "Do I need to sign an NDA before hiring?", a: "Yes. All projects require a signed NDA for confidentiality." },
        { q: "Will project details remain confidential?", a: "Yes. We ensure complete confidentiality for all client projects." },
        { q: "Can I request a custom NDA?", a: "No. We follow a standard NDA format for all clients." },
        { q: "How do you handle sensitive or proprietary information?", a: "All sensitive data is stored securely and only accessible to authorized personnel involved in the project." },
      ],
    },
    {
      category: "General Services",
      icon: <Settings size={24} />,
      questions: [
        { q: "How do I start working with your platform?", a: "Simply fill out the enquiry form. A project consultant will reach out via your preferred mode of communication." },
        { q: "Can I track project progress?", a: "Yes. Daily progress reports are shared with you via email." },
        { q: "What support do you provide?", a: "We provide 24/7 client support for all active projects." },
        { q: "Where can I view case studies or reviews?", a: "You can explore our Case Studies and Testimonials sections directly on the website." },
      ],
    },
    {
      category: "Technical Support",
      icon: <Wrench size={24} />,
      questions: [
        { q: "Who do I contact for technical issues?", a: "You can directly contact your assigned project consultant via email or phone (details provided on our website)." },
        { q: "Is support available 24/7?", a: "Yes. Our support team is available round the clock." },
      ],
    },
  ],
  gigWorkers: [
    {
      category: "Verification",
      icon: <Lock size={24} />,
      questions: [
        { q: "How do I verify my identity as a gig worker?", a: "Verification involves completing KYC and an aptitude assessment based on your chosen domain of interest." },
        { q: "What documents are needed before starting?", a: "You will need to provide: Aadhar Card (mandatory), Qualification certificates (if any), Experience letter (if applicable)." },
        { q: "How long does verification take?", a: "Verification is usually completed within 24–48 hours." },
        { q: "Is my personal data safe?", a: "Yes. Your data is kept strictly confidential. If clients request access, it is only shared in a non-disclosable format with full confidentiality maintained." },
      ],
    },
    {
      category: "Stipend & Payments",
      icon: <CreditCard size={24} />,
      questions: [
        { q: "Do all gigs/internships come with a stipend?", a: "Mostly yes, unless otherwise specified for specific opportunities." },
        { q: "When will I receive payment?", a: "Payments are released immediately after project completion." },
        { q: "Are there any hidden deductions?", a: "No hidden charges. Transaction-based deductions may apply depending on the mode of payment." },
        { q: "What if I leave the gig midway—will I still get paid?", a: "No. Payments are made only upon successful completion of the assigned project." },
      ],
    },
    {
      category: "NDAs & Confidentiality",
      icon: <ScrollText size={24} />,
      questions: [
        { q: "Do I need to sign an NDA before starting work?", a: "Yes. All gig workers and interns are required to sign an NDA before starting any project." },
        { q: "Can I showcase my work in my portfolio?", a: "Yes. With client approval, you can add completed work to your portfolio." },
        { q: "How do you protect the projects I’ll be working on?", a: "All resources and tools provided are secure, reliable, and access-controlled." },
        { q: "What should I do if I have concerns about confidentiality?", a: "A formal agreement between the client and our company ensures confidentiality at every step." },
      ],
    },
    {
      category: "Gig/Internship Process",
      icon: <Briefcase size={24} />,
      questions: [
        { q: "How do I apply for gigs/internships?", a: "You can apply by filling out the Join Talent form or by emailing us directly, based on your preference." },
        { q: "How will I be matched with projects/clients?", a: "Matching is based on your aptitude performance during the selection process." },
        { q: "Can I choose between remote and on-site work?", a: "The work mode depends on client requirements." },
        { q: "Will I get a certificate or proof of work?", a: "Yes. You will receive a Letter of Recommendation (LOR), Internship Certificate, and a Project Completion Certificate." },
      ],
    },
    {
      category: "Training & Support",
      icon: <GraduationCap size={24} />,
      questions: [
        { q: "Do you provide training before or during gigs?", a: "Yes. We provide quick, hands-on training while you work on live projects." },
        { q: "Who do I contact if I face challenges during work?", a: "You can directly reach out to your assigned Project Manager." },
        { q: "Will I get mentorship or guidance?", a: "Yes, 100% mentorship and guidance are provided throughout the project." },
        { q: "Is support available outside working hours?", a: "Yes. Our support team is available 24/7." },
      ],
    },
    {
      category: "Career Growth",
      icon: <Rocket size={24} />,
      questions: [
        { q: "Will this gig/internship help me get a full-time role?", a: "Yes. Based on your performance and experience, there may be opportunities for full-time placement within our company." },
        { q: "Can I extend my gig/internship for more experience?", a: "Yes. Extensions are possible upon mutual agreement." },
        { q: "Are there networking opportunities?", a: "Yes. You will have opportunities to connect with peers, mentors, and industry professionals." },
      ],
    },
  ],
};

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-700 py-4">
    <button
      onClick={onClick}
      className="flex justify-between items-center w-full text-left font-semibold text-lg text-[#F5F5F5] focus:outline-none"
    >
      <span>{question}</span>
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
          className="overflow-hidden mt-2 text-slate-300"
        >
          <p className="pb-4">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQsPage() {
  const [activeTab, setActiveTab] = useState("clients");
  const [openItems, setOpenItems] = useState({});

  const handleAccordionToggle = (category, index) => {
    setOpenItems((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [`${category}-${index}`]: !prev[activeTab]?.[`${category}-${index}`],
      },
    }));
  };

  const faqs = activeTab === "clients" ? faqsData.clients : faqsData.gigWorkers;
  const contactLink = activeTab === "clients" ? "/team-up-request" : "/join-as-talent";

  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] font-sans px-6 py-20 md:py-32 flex flex-col items-center">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Got Questions? We’ve Got Answers.</h1>
        <p className="text-lg text-slate-300 max-w-xl mx-auto">
          Whether you’re a client looking to hire or a gig worker looking to start your journey, here are quick answers to the most common questions.
        </p>
      </motion.section>

      <div className="w-full max-w-6xl bg-gray-900/50 border border-gray-700 rounded-3xl p-8 md:p-12">
        {/* Tabs for Audience Split */}
        <div className="flex justify-center mb-8 space-x-4 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("clients")}
            className={`py-3 px-6 text-lg font-semibold transition-colors duration-300 focus:outline-none ${
              activeTab === "clients"
                ? "text-[#40E0D0] border-b-2 border-[#40E0D0]"
                : "text-slate-400 hover:text-[#40E0D0]"
            }`}
          >
            For Clients
          </button>
          <button
            onClick={() => setActiveTab("gigWorkers")}
            className={`py-3 px-6 text-lg font-semibold transition-colors duration-300 focus:outline-none ${
              activeTab === "gigWorkers"
                ? "text-[#40E0D0] border-b-2 border-[#40E0D0]"
                : "text-slate-400 hover:text-[#40E0D0]"
            }`}
          >
            For Gig Workers
          </button>
        </div>

        {/* FAQ Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {faqs.map((categoryGroup, catIndex) => (
            <div key={catIndex} className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4 text-[#008080]">
                {categoryGroup.icon}
                <h3 className="text-2xl font-bold">{categoryGroup.category}</h3>
              </div>
              <div className="divide-y divide-gray-700">
                {categoryGroup.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openItems[activeTab]?.[`${categoryGroup.category}-${index}`]}
                    onClick={() => handleAccordionToggle(categoryGroup.category, index)}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Closing Buttons */}
        <div className="mt-12 text-center">
          <p className="text-xl text-[#F5F5F5] font-semibold mb-6">Still have questions? Contact our support team.</p>
          <Link
            to={contactLink}
            className="inline-block px-8 py-4 rounded-lg bg-[#40E0D0] text-black font-bold text-lg hover:bg-[#2E8B57] hover:text-white shadow-lg transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}