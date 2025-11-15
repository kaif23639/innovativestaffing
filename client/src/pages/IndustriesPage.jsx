import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Cloud, GraduationCap, ShoppingCart, CreditCard, Handshake } from "lucide-react";

export default function IndustriesPage() {
  const industries = [
    {
      label: "IT & SaaS",
      description: "Scale and secure your tech infrastructure – we deliver robust cloud and SaaS solutions to keep your IT operations agile.",
      icon: Cloud,
      link: "/industries/it-saas",
    },
    {
      label: "Education",
      description: "Empower learners and educators with engaging digital solutions. We help schools and edtech companies create modern, user-friendly learning platforms.",
      icon: GraduationCap,
      link: "/industries/education",
    },
    {
      label: "Retail & E-commerce",
      description: "Boost sales with an optimized online store. We focus on product-page design and checkout flow – minimizing form fields and using clear calls-to-action to improve conversions.",
      icon: ShoppingCart,
      link: "/industries/retail-ecommerce",
    },
    {
      label: "Finance",
      description: "Build trust with intuitive finance tools. We create secure, data-driven dashboards and checkout flows with clear charts/graphs – making complex financial data easy to understand.",
      icon: CreditCard,
      link: "/industries/finance",
    },
    {
      label: "Non-Profit",
      description: "Amplify your mission with strategic digital support. We help nonprofits enhance fundraising and engagement – because your mission deserves more than just a website, it needs a plan.",
      icon: Handshake,
      link: "/industries/non-profit",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] font-sans px-6 py-20 md:py-32">
      
      {/* Hero Section */}
      <motion.section
        className="max-w-7xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold mb-4">Industries We Serve</h1>
        <p className="text-lg text-slate-300 max-w-xl mx-auto">
          Every industry faces unique challenges. We create tailored playbooks that align with your goals.
        </p>
      </motion.section>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {industries.map((industry, idx) => {
          const Icon = industry.icon;
          return (
            <motion.div
              key={idx}
              className="relative p-6 bg-gray-900/50 border border-gray-700 rounded-2xl transition-colors hover:bg-gray-900 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="p-4 rounded-full bg-[#008080]/30 text-[#40E0D0] mb-4">
                <Icon size={48} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-[#F5F5F5]">{industry.label}</h3>
              <p className="text-slate-300 text-sm mb-4 flex-grow">{industry.description}</p>
              <Link
                to={industry.link}
                className="mt-auto text-[#40E0D0] font-semibold inline-flex items-center hover:underline"
              >
                View Playbook <ArrowRight className="ml-1" size={16} />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}