import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Handshake, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';
import growth from "../assets/GrowthCase.jpeg"
import safe from "../assets/SafeOpp.jpeg";
import staffing from "../assets/StaffingSol.jpeg"

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a real app, you would fetch this from your backend
  const mockCaseStudies = {
    "career-growth-for-students": {
      id: "1",
      title: "Career Growth for Students",
      metaDescription: "Help students move from theory to real work: live projects, mentor-led teams, portfolio-building and assessed outcomes that make them hireable.",
      heroHeadline: "From classroom to client-ready",
      heroSubheadline: "Real project work, mentor guidance, and portfolio-grade deliverables so students graduate with experience — not just a certificate.",
      impactHighlight: "Bridge the employability gap by turning coursework into client-facing projects and measurable career outcomes.",
      image: growth,
      challenge: {
        headline: "The Challenge:",
        intro: "Many students complete courses without ever doing work that mirrors real industry expectations. Causes we identified:",
        points: [
          "Curriculum focuses on theory; hands-on project work is limited.",
          "Colleges and instructors have limited bandwidth to source real projects.",
          "Students lack mentorship, exposure to client communication, and a credible portfolio.",
          "Recruiters expect demonstrable outcomes; without them students struggle to convert applications into interviews."
        ],
        whyItMatters: "Why it matters: lack of real-world experience delays career starts, reduces confidence, and widens the skills gap between graduates and employer needs."
      },
      approach: {
        headline: "Our Approach:",
        intro: "We designed a platform and program that simulates real-world delivery while being safe and structured for learners.",
        features: [
          { name: "Curated live projects", description: "Real scoped assignments from startups, small businesses, and internal R&D that are safe for learners." },
          { name: "Mentor matching", description: "Industry mentors guide small teams through client communication, scope management, and technical reviews." },
          { name: "Micro-internships", description: "Short, outcome-focused engagements (4–12 weeks) so students can complete multiple projects during studies." },
          { name: "Portfolio builder", description: "Every completed project is packaged as a case page (problem → approach → outcome) suitable for LinkedIn/GitHub/portfolio sites." },
          { name: "Assessment & badges", description: "Standardized rubric for technical skills, soft skills, and delivery discipline." },
          { name: "Career support", description: "Resume review and employer introductions." }
        ],
        process: [
          "Project intake: Client or internal brief is refined into a student-friendly scope.",
          "Team formation: Students are matched by skill level and interest.",
          "Onboarding & training: Quick bootcamp covering tools, client etiquette, and quality standards.",
          "Mentored execution: Weekly mentor check-ins, sprint reviews, and milestone deliverables.",
          "Review & showcase: Final deliverable reviewed by mentor and packaged into a portfolio piece.",
          "Career handoff: Employer matching and interview support using student deliverables."
        ],
        solutionInAction: {
          headline: "Solution in Action",
          text: "A typical project could be a 6-week UI/UX prototype for an EdTech startup. Students perform user research, build wireframes and a clickable prototype, and present to the client in a final demo. Mentors provide feedback on scope, testing, and presentation. The end result is a portfolio case study and a live demo that the student can present during interviews."
        }
      },
      results: {
        headline: "The Results",
        intro: "Rather than promising precise ROI up-front, we focus on outcomes we systematically deliver:",
        points: [
          "Students complete portfolio-ready projects during their studies.",
          "Increased confidence in interview situations (practical experience with real feedback).",
          "Improved visibility to employers via demonstrable deliverables.",
          "Faster transition from student to entry-level contributor."
        ],
        kpis: [
          "Projects completed per cohort",
          "% of students with 1+ portfolio projects after program",
          "Employer satisfaction (qualitative ratings)",
          "Interview callback rate for participants (if tracked)"
        ]
      },
      cta: {
        headline: "Want students who are ready on day one?",
        text: "Contact us to pilot a student project program.",
        buttonText: "Contact Us to Pilot a Program",
        link: "/join-as-talent",
        buttonIcon: UserPlus
      }
    },
    "safe-opportunities-for-students-and-women": {
      id: "2",
      title: "Safe Opportunities for Students & Women",
      metaDescription: "Protect learners from scams and low-quality “opportunities” by offering a verified ecosystem of freelancing and microjob options with clear safeguards and real growth paths.",
      heroHeadline: "Safe, verified pathways to real earning and skill growth",
      heroSubheadline: "We stop scammers and fake listings before they reach learners — and create a trusted route to legitimate freelancing and gig work.",
      impactHighlight: "Reduce exploitation and create reliable income and skill-building opportunities for vulnerable aspirants.",
      image: safe,
      challenge: {
        headline: "The Challenge",
        intro: "Students and women seeking flexible income often fall prey to:",
        points: [
          "Fake freelance listings promising quick riches via affiliate marketing or get-rich-quick schemes.",
          "Unclear payment terms, lack of milestones, and no recourse if work is stolen or unpaid.",
          "Predatory “consultants” or recruiters who charge upfront fees without delivering real jobs.",
          "A lack of trusted intermediaries who verify employers and protect workers."
        ],
        whyItMatters: "Consequences include financial loss, disillusionment, and a reluctance to pursue genuine freelance work."
      },
      approach: {
        headline: "Our Approach",
        intro: "We built a verification-first ecosystem where opportunity quality, trust, and worker protection are baked into the platform.",
        features: [
          { name: "Employer verification", description: "Identity checks and business validation before listings go live." },
          { name: "Job vetting", description: "All job postings are reviewed for clarity of scope, deliverables, and payment terms." },
          { name: "Escrow & milestone payments", description: "Funds are held until agreed milestones are completed." },
          { name: "Transparent contracts", description: "Standardized micro-contracts reduce ambiguity." },
          { name: "Training to spot scams", description: "Short learning modules teach how to identify red flags and protect personal data." },
          { name: "Community moderation & grievance system", description: "Quick dispute resolution and an appeals process." },
          { name: "Women-first safeguards", description: "Option for female-only cohorts, trusted female mentors, and privacy-first work profiles." }
        ],
        process: [
          "Opportunity submission: Employer posts job; platform reviewer checks legitimacy.",
          "Job onboarding: Clear deliverables, timeline, and payment schedule added.",
          "Worker onboarding: Candidate completes a safety module and agrees to the contract.",
          "Milestone delivery: Work is submitted to the mentor/client; escrow is released per milestone.",
          "Feedback & rating: Both sides rate the engagement; flags prompt review."
        ],
        solutionInAction: {
          headline: "Solution in Action",
          text: "A student applies for a content-writing gig. The job has clear milestones (research → draft → final), payment is held in escrow, and a mentor reviews the draft before client review. If a dispute arises, the platform mediates with documented communications and the milestone process."
        }
      },
      results: {
        headline: "The Results",
        intro: "What this enables:",
        points: [
          "Fewer scams and less financial risk for workers.",
          "Better-quality gigs with transparent payment and scope.",
          "A sense of safety that encourages more women and students to pursue freelancing.",
          "A growing reputation for verified, credible opportunities."
        ],
        kpis: [
          "Number of fraudulent listings blocked",
          "% of disputes resolved in favor of verified workers (or time-to-resolution)",
          "Average earnings per verified gig",
          "Retention rate for female participants"
        ]
      },
      cta: {
        headline: "Looking for safe freelance work?",
        text: "Businesses: Post a verified opportunity.",
        buttonText: "Explore Verified Gigs",
        link: "/services",
        buttonIcon: Handshake
      }
    },
    "staffing-solutions-for-businesses": {
      id: "3",
      title: "Staffing Solutions for Businesses",
      metaDescription: "On-demand staffing that lets businesses hire for hours or days, not just months — curated talent, fast match-making, predictable SLAs and growth-ready staffing pipelines.",
      heroHeadline: "Flexible staffing for the way modern companies actually work",
      heroSubheadline: "From one-day event staffing to multi-week product sprints — we provide pre-vetted talent you can scale on demand.",
      impactHighlight: "Replace inefficient monthly hiring with flexible, cost-effective staffing that aligns to real business rhythms.",
      image: staffing,
      challenge: {
        headline: "The Challenge",
        intro: "Small and medium businesses — and even teams in larger firms — face friction when they need short-term help:",
        points: [
          "Traditional hiring platforms and agencies push minimums (month-long contracts, notice periods).",
          "Recruitment and admin overhead (interviews, payroll setup) is expensive for short tasks.",
          "Skills mismatches and poor onboarding lead to wasted time and costs.",
          "Businesses miss opportunities (e.g., seasonal spikes, events, product launches) because they can’t hire flexibly."
        ]
      },
      approach: {
        headline: "Our Approach",
        intro: "We created a micro-staffing market that removes the friction from short-term hiring, backed by curation and operational guarantees.",
        features: [
          { name: "On-demand booking", description: "Book talent for 1 day, a week, or any custom duration." },
          { name: "Curated talent pools", description: "Pre-vetted profiles with skill tags and short work histories." },
          { name: "Trial-day option", description: "Try a worker for a day before scaling to longer bookings." },
          { name: "SLA & replacement guarantee", description: "If the worker doesn’t meet the requirement, we provide a vetted replacement." },
          { name: "Admin handled", description: "Contracts, payouts, NDAs and compliance handled by us." },
          { name: "Upskilling & bench", description: "We train talent and maintain a bench for repeated or scaling needs." }
        ],
        process: [
          "Requirement intake: Business submits a brief (skills, duration, deliverables).",
          "Shortlist & trial: We provide candidates and offer a trial day.",
          "Engagement: Full booking with milestones, if applicable.",
          "Post-engagement feedback: Rapid feedback loop informs future matches.",
          "Scale or convert: Good fits can be scaled to longer engagements or converted to hires."
        ],
        solutionInAction: {
          headline: "Solution in Action",
          text: "A typical project could be a 6-week UI/UX prototype for an EdTech startup. Students perform user research, build wireframes and a clickable prototype, and present to the client in a final demo. Mentors provide feedback on scope, testing, and presentation. The end result is a portfolio case study and a live demo that the student can present during interviews."
        }
      },
      results: {
        headline: "The Results",
        intro: "What this enables:",
        points: [
          "Businesses save on recruitment time and HR admin for short-term needs.",
          "Faster time-to-market for campaigns and product features.",
          "Access to a pool of trained, reliable talent without long-term commitment.",
          "Predictable costs and SLAs."
        ],
        kpis: [
          "Average time-to-fill for short-term roles",
          "Replacement rate within first 48–72 hours",
          "Cost-savings estimate vs. traditional hiring",
          "Business satisfaction score post-engagement"
        ]
      },
      cta: {
        headline: "Book a demo",
        text: null,
        buttonText: "Book a Demo",
        link: "/team-up-request",
        buttonIcon: Briefcase
      }
    }
  };

  useEffect(() => {
    // Using mock data for demonstration
    const caseData = mockCaseStudies[slug];
    if (caseData) {
      setCaseStudy(caseData);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div className="text-center py-16 text-[#F5F5F5] bg-black min-h-screen">Loading...</div>;
  }

  if (!caseStudy) {
    return <div className="text-center py-16 text-[#F5F5F5] bg-black min-h-screen">Case study not found.</div>;
  }

  const CtaIcon = caseStudy.cta.buttonIcon;

  return (
    <motion.main
      className="min-h-screen bg-black text-[#F5F5F5] font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-center py-16 md:py-24 px-6 md:px-12">
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2 flex justify-center p-4">
            <motion.img 
                src={caseStudy.image}
                alt={caseStudy.title}
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
                {caseStudy.heroHeadline}
            </motion.h1>
            <motion.p
                className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {caseStudy.heroSubheadline}
            </motion.p>
            <motion.div
                className="text-center md:text-left mt-6 p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg max-w-xl mx-auto md:mx-0 border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <p className="text-base italic">{caseStudy.impactHighlight}</p>
            </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-16 px-6">
        
        {/* The Challenge */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-[#008080]">{caseStudy.challenge.headline}</h2>
          <p className="text-lg text-[#F5F5F5] mb-6">{caseStudy.challenge.intro}</p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            {caseStudy.challenge.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          {caseStudy.challenge.whyItMatters && (
            <p className="mt-6 text-slate-200 italic border-l-4 border-[#40E0D0] pl-4">{caseStudy.challenge.whyItMatters}</p>
          )}
        </motion.section>

        {/* Our Approach */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-[#008080]">{caseStudy.approach.headline}</h2>
          <p className="text-lg text-[#F5F5F5] mb-6">{caseStudy.approach.intro}</p>
          <h3 className="text-xl font-bold mb-4 text-[#008080]">Core Features:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
            {caseStudy.approach.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={20} className="text-[#40E0D0] mr-2 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-slate-100">{feature.name}: </strong>
                  {feature.description}
                </div>
              </li>
            ))}
          </ul>
          
          <h3 className="text-xl font-bold mt-8 mb-4 text-[#008080]">Process (step-by-step):</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            {caseStudy.approach.process.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </motion.section>

        {/* Solution in Action */}
        {caseStudy.approach.solutionInAction && (
          <motion.section
            className="mb-12 p-8 rounded-2xl bg-gray-900/50 border border-l-4 border-[#008080]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#008080]">{caseStudy.approach.solutionInAction.headline}</h3>
            <p className="text-lg text-[#F5F5F5]">{caseStudy.approach.solutionInAction.text}</p>
          </motion.section>
        )}

        {/* The Results */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-[#008080]">{caseStudy.results.headline}</h2>
          <p className="text-lg text-[#F5F5F5] mb-6">{caseStudy.results.intro}</p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            {caseStudy.results.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          {caseStudy.results.kpis && caseStudy.results.kpis.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-[#008080]">KPIs we track:</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                {caseStudy.results.kpis.map((kpi, index) => (
                  <li key={index}>{kpi}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.section>

        {/* Final Call-to-Action */}
        <motion.section
          className="text-center p-8 bg-gray-900/50 rounded-2xl shadow-xl border border-[#008080]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#F5F5F5]">{caseStudy.cta.headline}</h2>
          {caseStudy.cta.text && <p className="text-lg mb-6 text-slate-200">{caseStudy.cta.text}</p>}
          <Link to={caseStudy.cta.link} className="inline-flex items-center px-8 py-4 bg-[#40E0D0] text-black rounded-full font-semibold hover:bg-[#2E8B57] hover:text-white transition-all duration-300">
            {caseStudy.cta.buttonText} <ArrowRight className="ml-2" />
          </Link>
        </motion.section>

      </div>
    </motion.main>
  );
}
