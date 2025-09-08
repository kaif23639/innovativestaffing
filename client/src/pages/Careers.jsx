import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, HeartHandshake, Lightbulb, TrendingUp, Sparkles, BookOpen, Users, Award, Waypoints, Leaf, Handshake, Shield } from 'lucide-react';
import logo from "../assets/CareerOverview.jpeg"
export default function CareersPage() {
  const navigate = useNavigate();

  const handleJoinTalent = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/join-as-talent");
    else navigate("/login");
  };

  return (
    <main className="min-h-screen bg-black text-[#F5F5F5] font-sans">
      
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-center py-16 md:py-24 px-6 md:px-12">
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2 flex justify-center p-4">
          <motion.img 
            src={logo}
            alt="A diverse team collaborating" 
            className="rounded-2xl shadow-2xl w-full max-w-lg aspect-square object-cover"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Right Column: Content */}
        <div className="w-full md:w-1/2 text-center md:text-left p-4 mt-8 md:mt-0">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4 text-[#008080]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Build a career that matters.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-8 text-[#F5F5F5]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Programs for early talent, returners, and seasoned professionals — designed to help you learn, contribute, and lead.
          </motion.p>
          <motion.button
            onClick={handleJoinTalent}
            className="px-8 py-4 bg-[#40E0D0] text-black font-semibold rounded-full shadow-lg hover:bg-[#2E8B57] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Talent Network
          </motion.button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-6">
        
        {/* Our Mission & Values */}
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-[#008080]">Our Mission & Values</h2>
          <p className="text-lg max-w-3xl mx-auto text-[#F5F5F5]">
            At Innovative Staffing Solutions, we go beyond jobs—we create journeys. Our mission is to connect talent with opportunities that accelerate personal growth and organizational success.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 bg-[#1a1a1a] rounded-2xl shadow-md transition hover:shadow-lg">
              <TrendingUp size={48} className="text-[#40E0D0] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#F5F5F5]">Growth</h3>
              <p className="text-sm text-[#F5F5F5]/80 text-center">Continuous learning & measurable progress.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#1a1a1a] rounded-2xl shadow-md transition hover:shadow-lg">
              <Users size={48} className="text-[#40E0D0] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#F5F5F5]">Inclusion</h3>
              <p className="text-sm text-[#F5F5F5]/80 text-center">Diverse voices drive better outcomes.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#1a1a1a] rounded-2xl shadow-md transition hover:shadow-lg">
              <HeartHandshake size={48} className="text-[#40E0D0] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#F5F5F5]">Integrity</h3>
              <p className="text-sm text-[#F5F5F5]/80 text-center">Honest work, responsible delivery.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#1a1a1a] rounded-2xl shadow-md transition hover:shadow-lg">
              <Award size={48} className="text-[#40E0D0] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#F5F5F5]">Ownership</h3>
              <p className="text-sm text-[#F5F5F5]/80 text-center">We expect and enable ownership at every level.</p>
            </div>
          </div>
        </motion.section>

        {/* Career Growth Pathways */}
        <motion.section
          className="mb-20 grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img src={logo} alt="Career growth" className="w-full h-auto" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4 text-[#008080]">Career Growth Pathways</h2>
            <p className="text-lg text-[#F5F5F5] mb-6">
              We don’t just hire talent—we nurture it. Our structured pathways ensure you evolve with us:
            </p>
            <ul className="space-y-4 text-[#F5F5F5]">
              <li className="flex items-start">
                <span className="text-[#40E0D0] mr-3 mt-1"><Sparkles size={20} /></span>
                <div>
                  <h4 className="font-semibold text-lg">Return-to-Work Programs</h4>
                  <p className="text-sm text-[#F5F5F5]/80">For professionals restarting their careers.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#40E0D0] mr-3 mt-1"><BookOpen size={20} /></span>
                <div>
                  <h4 className="font-semibold text-lg">Talent Accelerator</h4>
                  <p className="text-sm text-[#F5F5F5]/80">For fresh graduates eager to learn.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#40E0D0] mr-3 mt-1"><Lightbulb size={20} /></span>
                <div>
                  <h4 className="font-semibold text-lg">Mentorship & Upskilling</h4>
                  <p className="text-sm text-[#F5F5F5]/80">For continuous learning and leadership growth.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Life at Innovative Staffing Solutions */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-[#008080]">Life at Innovative Staffing Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-md transition hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-[#008080]">A culture where learning never stops</h3>
              <ul className="space-y-2 text-[#F5F5F5]/80 text-sm list-disc list-inside">
                <li>Hybrid and flexible work options.</li>
                <li>Regular training sessions and workshops.</li>
                <li>Supportive community built on collaboration and inclusivity.</li>
                <li>Mentorship & buddy system</li>
                <li>Mental health and wellbeing allowances</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-md transition hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-[#008080]">Safe Commute Services</h3>
              <p className="text-sm text-[#F5F5F5]/80">
                We provide pick-up and drop facilities, especially prioritizing youngsters and women, to ensure safe and convenient travel.
              </p>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-md transition hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-[#008080]">Perks</h3>
              <ul className="space-y-2 text-[#F5F5F5]/80 text-sm list-disc list-inside">
                <li>Learning stipend</li>
                <li>Performance bonuses</li>
                <li>Remote-first kit allowance</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Impact in Numbers */}
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-[#008080]">Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#1a1a1a] shadow-md">
              <p className="text-4xl font-bold text-[#40E0D0]">100+</p>
              <p className="text-[#F5F5F5]">candidates trained</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1a1a1a] shadow-md">
              <p className="text-4xl font-bold text-[#40E0D0]">65%</p>
              <p className="text-[#F5F5F5]">women returners empowered</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1a1a1a] shadow-md">
              <p className="text-4xl font-bold text-[#40E0D0]">95%</p>
              <p className="text-[#F5F5F5]">client retention rate</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1a1a1a] shadow-md">
              <p className="text-4xl font-bold text-[#40E0D0]">5+</p>
              <p className="text-[#F5F5F5]">industries served</p>
            </div>
          </div>
        </motion.section>

        {/* Final Call-to-Action */}
        <motion.section
          className="text-center bg-[#1a1a1a] text-[#F5F5F5] rounded-3xl p-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-[#008080]">Ready to Grow With Us?</h2>
          <p className="text-lg mb-8 text-[#F5F5F5]">
            Whether you’re restarting, accelerating, or reshaping your career—we’re here to support your journey.
          </p>
          <motion.button
            onClick={handleJoinTalent}
            className="px-10 py-4 bg-[#40E0D0] text-black font-semibold rounded-full shadow-lg hover:bg-[#2E8B57] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Talent Network
          </motion.button>
        </motion.section>

      </div>
    </main>
  );
}