import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // Axios instance configured with your backend base URL
import { useNavigate } from 'react-router-dom';

export default function HomePage(){
  const [activeTab, setActiveTab] = useState("business");
  const [clients, setClients] = useState([]);
  const [featuredSolutions, setFeaturedSolutions] = useState([]);
  const [businessSteps, setBusinessSteps] = useState([]);
  const [talentSteps, setTalentSteps] = useState([]);
  const [loading, setLoading] = useState(true);
const [categories, setCategories] = useState([]);
 const navigate = useNavigate();
  // Refs for autoscroll animations
  const clientsWrapperRef = useRef(null);
  const clientsInnerRef = useRef(null);
  const featuredSolutionsWrapperRef = useRef(null);
  const featuredSolutionsInnerRef = useRef(null);
  const stepsWrapperRef = useRef(null);
  const stepsInnerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth < 640 : false)
  );
useEffect(() => {
  async function fetchCategories() {
    const res = await api.get('/api/categories');
    setCategories(res.data);
  }
  fetchCategories();
}, []);

  const onJoinAsTalent = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // User is logged in, redirect to join as talent form
      navigate("/join-as-talent"); // update with your join as talent form route
    } else {
      // User not logged in, redirect to login page
      navigate("/login");
    }
  };

    const goToTeamUpRequest = () => {
    navigate("/team-up-request"); // The route to your Team-Up Request page
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchHomePageData() {
      try {
        setLoading(true);
        const [clientsRes, solutionsRes, stepsRes] = await Promise.all([
          api.get("/api/clients"),
          api.get("/api/featuredSolutions"),
        ]);
        setClients(clientsRes.data);
        setFeaturedSolutions(solutionsRes.data);
      } catch (error) {
        console.error("Failed to load home page data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomePageData();
  }, []);

  useEffect(() => {
    const wrapper = clientsWrapperRef.current;
    const inner = clientsInnerRef.current;
    if (!wrapper || !inner) return;

    let clientsTranslateX = 0;
    const speed = 0.5;

    let animationFrameId;
    function animate() {
      clientsTranslateX -= speed;
      const maxScroll = inner.scrollWidth / 2;
      if (-clientsTranslateX >= maxScroll) clientsTranslateX = 0;
      inner.style.transform = `translateX(${clientsTranslateX}px)`;
      animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [clients]);

  useEffect(() => {
    const wrapper = featuredSolutionsWrapperRef.current;
    const inner = featuredSolutionsInnerRef.current;
    if (!wrapper || !inner) return;

    let solutionsTranslateX = 0;
    const speed = 0.5;

    let animationFrameId;
    function animate() {
      solutionsTranslateX -= speed;
      const maxScroll = inner.scrollWidth / 2;
      if (-solutionsTranslateX >= maxScroll) solutionsTranslateX = 0;
      inner.style.transform = `translateX(${solutionsTranslateX}px)`;
      animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [featuredSolutions]);

  useEffect(() => {
    const wrapper = stepsWrapperRef.current;
    const inner = stepsInnerRef.current;
    if (!wrapper || !inner) return;

    if (!isMobile) {
      inner.style.transform = "none";
      return;
    }

    let translateX = 0;
    const speed = 0.75;

    let animationFrameId;
    function animate() {
      translateX -= speed;
      const maxScroll = inner.scrollWidth / 2;
      if (-translateX >= maxScroll) translateX = 0;
      inner.style.transform = `translateX(${translateX}px)`;
      animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, isMobile, businessSteps, talentSteps]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Colors & styles
  const silverText = "text-[#c0c0c0]";
  const silverBorder = "border-[#c0c0c0]";
  const royalBlue = "bg-[#007bff]";
  const royalBlueText = "text-[#007bff]";
  const royalBlueHover = "hover:bg-[#005bca]";
  const gradientBg = "bg-gradient-to-br from-[#0f2027] to-[#2c5364]";

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 px-6 py-20 md:py-28 items-center">
        <div className="md:col-span-7 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-[#0f2027]">
            Build your dream team & digital stack
          </h1>
          <p className="text-lg text-[#c0c0c0]">
            Staffing + Software + Websites + AI Agents for startups & MSMEs — powered by trained talent and women re-entering workforce.
          </p>
          <div className="flex gap-4 flex-wrap">
             <button
      onClick={goToTeamUpRequest}
      className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
    >
      Request Proposal
    </button>
            <Link to="/services" className={`px-6 py-3 border ${silverBorder} rounded-lg font-semibold ${royalBlueText} hover:bg-[#e6f6ff] transition`}>
              Explore Services
            </Link>
            <button  onClick={onJoinAsTalent}
              className="px-6 py-3 border border-[#c0c0c0] rounded-lg font-semibold text-[#007bff] hover:bg-[#e6f6ff] transition"
            >
              Join as Talent
            </button>
          </div>
          <div className="text-sm flex gap-4 flex-wrap pt-4 text-[#c0c0c0] font-medium">
            <span>Budget-friendly</span>
            <span>- </span>
            <span>ISO-ready quality</span>
            <span>- </span>
            <span>Fast onboarding</span>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className={`rounded-xl h-80 border ${silverBorder} shadow-inner flex items-center justify-center ${gradientBg}`}>
            <span className={`${silverText} font-medium`}>[Dashboard Mockup Illustration]</span>
          </div>
        </div>
      </section>

      {/* Trusted Clients */}
      <section className="bg-[#f8fcff] py-16">
        <div className="max-w-[870px] mx-auto px-6 text-center">
          <p className={`${silverText} text-sm font-semibold mb-8 tracking-wide`}>Trusted by growing startups & MSMEs</p>
          <div ref={clientsWrapperRef} className="relative overflow-hidden max-w-[720px] mx-auto">
            <div ref={clientsInnerRef} className="flex gap-6 select-none" style={{ userSelect: "none" }}>
              {[...clients, ...clients].map((client, idx) => (
                <span key={idx} className={`${silverText} font-bold text-xl whitespace-nowrap px-6 py-3 rounded shadow-md bg-white`}>
                  {client.name || client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* Four Pillars */}
<section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-20 md:py-28">
  {categories.map((cat) => (
    <div key={cat._id} className="p-6 border rounded shadow-sm" style={{ borderColor: "#c0c0c0" }}>
      <h3 className="font-bold text-xl mb-2 text-[#0f2027]">{cat.name}</h3>
      <p className={`${silverText} mb-4`}>{cat.description}</p>
      <Link to={`/category/${cat.slug}`} className={`${royalBlueText} font-semibold hover:underline`}>
        View {cat.name} Services
      </Link>
      {cat.subText && <div className="mt-2 text-xs text-[#c0c0c0]">{cat.subText}</div>}
    </div>
  ))}
</section>


{/* How We Work Section */}
<section className="bg-[#f8fcff] py-24">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold mb-16 text-[#0f2027]">How We Work</h2>

    {/* Tabs */}
    <div className="inline-flex rounded-lg mb-16 ring-1 ring-[#c0c0c0] bg-[#c0c0c0] overflow-hidden">
      {["For Businesses", "For Talent"].map((label, idx) => {
        const isActive = activeTab === (idx === 0 ? "business" : "talent");
        return (
          <button
            key={label}
            onClick={() => setActiveTab(idx === 0 ? "business" : "talent")}
            className={`px-8 py-3 text-lg font-semibold whitespace-nowrap transition duration-300 ${
              isActive
                ? "bg-gradient-to-br from-[#0f2027] to-[#2c5364] text-white shadow-lg"
                : "text-[#4b5563] hover:bg-white hover:text-[#0f2027]"
            }`}
            style={{ minWidth: 160 }}
          >
            {label}
          </button>
        );
      })}
    </div>

    {/* Steps with mobile auto scroll */}
    <div
      ref={stepsWrapperRef}
      className="relative overflow-hidden max-w-full mx-auto"
      style={{ minHeight: 220 }}
    >
      <div
        ref={stepsInnerRef}
        className="flex gap-10 select-none"
        style={{ userSelect: "none" }}
      >
        {(isMobile
          ? [
              ...(activeTab === "business"
                ? ["Share goals", "Tailored plan", "Build team/stack", "QA & launch", "Ongoing care"]
                : ["Apply", "Train on real projects", "Get matched", "Grow"]),
              ...(activeTab === "business"
                ? ["Share goals", "Tailored plan", "Build team/stack", "QA & launch", "Ongoing care"]
                : ["Apply", "Train on real projects", "Get matched", "Grow"]),
            ]
          : activeTab === "business"
          ? ["Share goals", "Tailored plan", "Build team/stack", "QA & launch", "Ongoing care"]
          : ["Apply", "Train on real projects", "Get matched", "Grow"]).map((text, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center flex-shrink-0 min-w-[160px] rounded-lg p-6 bg-white border border-[#c0c0c0] shadow-lg transition hover:scale-105"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0f2027] to-[#2c5364] text-white text-xl font-bold flex items-center justify-center shadow-lg">
              {(idx % (activeTab === "business" ? 5 : 4)) + 1}
            </div>
            <p className="mt-5 text-[#0f2027] font-semibold text-center leading-snug max-w-xs">{text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* CTA button */}
    <div className="mt-20 flex justify-center">
      {activeTab === "business" ? (
        <button className="px-12 py-4 bg-gradient-to-br from-[#0f2027] to-[#2c5364] text-white rounded-lg font-semibold shadow-lg hover:from-[#141e15] hover:to-[#1a2a39] transition duration-300">
          Get a Custom Plan
        </button>
      ) : (
        <button className="px-12 py-4 bg-gradient-to-br from-[#0f2027] to-[#2c5364] text-white rounded-lg font-semibold shadow-lg hover:from-[#141e15] hover:to-[#1a2a39] transition duration-300">
          Join as Talent
        </button>
      )}
    </div>
  </div>
</section>

      {/* Spotlight: Impact & Mission */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <h2 className="text-3xl font-bold text-[#0F2027]">Empowering careers. Accelerating businesses.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-12">
          <div className={`${gradientBg} p-6 rounded-lg shadow-lg text-white`}>
            <p className="text-4xl font-bold">300+</p>
            <p>Candidates Trained</p>
          </div>
          <div className={`${gradientBg} p-6 rounded-lg shadow-lg text-white`}>
            <p className="text-4xl font-bold">65%</p>
            <p>Women Returners</p>
          </div>
          <div className={`${gradientBg} p-6 rounded-lg shadow-lg text-white`}>
            <p className="text-4xl font-bold">95%</p>
            <p>Client Retention</p>
          </div>
          <div className={`${gradientBg} p-6 rounded-lg shadow-lg text-white`}>
            <p className="text-4xl font-bold">2-week</p>
            <p>Avg. Onboarding</p>
          </div>
        </div>
        <Link
          to="/about/impact"
          className={`${royalBlueText} font-semibold border px-6 py-3 rounded-lg border-[#007BFF] hover:bg-[#e6f0f6] transition`}
        >
          Learn About Our Programs
        </Link>
      </section>

      {/* Featured solutions infinite auto-scroll */}
      <section className="bg-[#F8FAFC] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F2027]">Featured Solutions</h2>
          <div ref={featuredSolutionsWrapperRef} className="relative overflow-hidden max-w-[1000px] mx-auto">
            <div
              ref={featuredSolutionsInnerRef}
              className="flex gap-6 will-change-transform"
              style={{ userSelect: "none" }}
            >
              {[...featuredSolutions, ...featuredSolutions].map((solution, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] bg-white p-6 rounded-xl border border-[#c0c0c0] shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <h3 className="font-bold text-lg mb-2 text-[#0F2027]">{solution.title}</h3>
                  <p className="text-[#c0c0c0] mb-4 flex-grow">{solution.description}</p>
                  <button className="text-[#007bff] font-semibold text-sm hover:underline self-start" type="button">
                    {solution.button}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies / Results */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0F2027]">Proof Promises</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Link
            to="/case-studies/ecom"
            className="block bg-white p-8 rounded-xl border hover:shadow-xl transition"
            style={{ borderColor: "#C0C0C0" }}
          >
            <p className={`${silverText} font-semibold text-sm`}>E-com Brand</p>
            <h3 className="text-xl font-bold mt-2 text-[#0F2027]">35% conversion lift with AI outreach</h3>
          </Link>
          <Link
            to="/case-studies/msme"
            className="block bg-white p-8 rounded-xl border hover:shadow-xl transition"
            style={{ borderColor: "#C0C0C0" }}
          >
            <p className={`${silverText} font-semibold text-sm`}>MSME Manufacturer</p>
            <h3 className="text-xl font-bold mt-2 text-[#0F2027]">ISO quality with QA/QC staffing</h3>
          </Link>
          <Link
            to="/case-studies/edtech"
            className="block bg-white p-8 rounded-xl border hover:shadow-xl transition"
            style={{ borderColor: "#C0C0C0" }}
          >
            <p className={`${silverText} font-semibold text-sm`}>EdTech Startup</p>
            <h3 className="text-xl font-bold mt-2 text-[#0F2027]">Faster releases via automation testing</h3>
          </Link>
        </div>
        <div className="text-center mt-12">
          <Link to="/case-studies" className={`${royalBlue} text-white px-6 py-3 rounded-lg font-semibold ${royalBlueHover} transition`}>
            View All Case Studies
          </Link>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="max-w-7xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#0F2027]">Industries We Serve</h2>
        <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center space-y-2 w-28">
            <div className="w-16 h-16 rounded-full bg-[#0F2027] flex items-center justify-center text-[#C0C0C0] font-bold text-xl">IT</div>
            <p className="text-sm font-semibold text-[#0F2027]">IT & SaaS</p>
            <p className="text-xs text-[#C0C0C0]">Playbooks and solutions for tech</p>
          </div>
          <div className="flex flex-col items-center space-y-2 w-28">
            <div className="w-16 h-16 rounded-full bg-[#2C5364] flex items-center justify-center text-[#C0C0C0] font-bold text-xl">ED</div>
            <p className="text-sm font-semibold text-[#0F2027]">Education</p>
            <p className="text-xs text-[#C0C0C0]">Innovative learning solutions</p>
          </div>
          <div className="flex flex-col items-center space-y-2 w-28">
            <div className="w-16 h-16 rounded-full bg-[#0F2027] flex items-center justify-center text-[#C0C0C0] font-bold text-xl">RE</div>
            <p className="text-sm font-semibold text-[#0F2027]">Retail & E-com</p>
            <p className="text-xs text-[#C0C0C0]">Seamless online experiences</p>
          </div>
          <div className="flex flex-col items-center space-y-2 w-28">
            <div className="w-16 h-16 rounded-full bg-[#2C5364] flex items-center justify-center text-[#C0C0C0] font-bold text-xl">FI</div>
            <p className="text-sm font-semibold text-[#0F2027]">Finance</p>
            <p className="text-xs text-[#C0C0C0]">Manage finances with confidence</p>
          </div>
          <div className="flex flex-col items-center space-y-2 w-28">
            <div className="w-16 h-16 rounded-full bg-[#0F2027] flex items-center justify-center text-[#C0C0C0] font-bold text-xl">HL</div>
            <p className="text-sm font-semibold text-[#0F2027]">Healthcare</p>
            <p className="text-xs text-[#C0C0C0]">Improve patient care</p>
          </div>
          <div className="flex flex-col items-center space-y-2 w-28">
            <div className="w-16 h-16 rounded-full bg-[#2C5364] flex items-center justify-center text-[#C0C0C0] font-bold text-xl">NP</div>
            <p className="text-sm font-semibold text-[#0F2027]">Non-profit</p>
            <p className="text-xs text-[#C0C0C0]">Giving back to communities</p>
          </div>
        </div>
        <Link to="/industries" className={`${royalBlueText} mt-8 inline-block font-semibold hover:underline`}>
          See industry playbooks →
        </Link>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#0F2027]">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <blockquote className="border rounded p-6 shadow bg-white italic" style={{ borderColor: "#C0C0C0" }}>
            "They delivered beyond expectations and improved our conversion rates significantly."
            <footer className="mt-4">
              <p className="font-semibold text-[#0F2027]">John Doe</p>
              <p className={`${silverText} text-sm`}>CEO, E-Com Brand</p>
            </footer>
          </blockquote>
          <blockquote className="border rounded p-6 shadow bg-white italic" style={{ borderColor: "#C0C0C0" }}>
            "Their QA staffing gave us ISO-level quality assurance."
            <footer className="mt-4">
              <p className="font-semibold text-[#0F2027]">Aditi Mehra</p>
              <p className={`${silverText} text-sm`}>Director, MSME Manufacturer</p>
            </footer>
          </blockquote>
          <blockquote className="border rounded p-6 shadow bg-white italic" style={{ borderColor: "#C0C0C0" }}>
            "Thanks to their automation testing, we reduced release cycles by 40%."
            <footer className="mt-4">
              <p className="font-semibold text-[#0F2027]">Rahul Singh</p>
              <p className={`${silverText} text-sm`}>Founder, EdTech Startup</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Resources & Insights */}
      <section className="bg-[#F8FAFC] py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0F2027]">Resources & Insights</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <Link
            to="/blog/hiring-trends"
            className="block p-6 border rounded bg-white hover:shadow"
            style={{ borderColor: "#C0C0C0" }}
          >
            <h3 className="font-bold mb-2 text-[#0F2027]">Top Hiring Trends for 2025</h3>
            <p className={`${silverText} text-sm`}>Stay ahead with recruitment trends</p>
          </Link>
          <Link
            to="/blog/qa-checklist"
            className="block p-6 border rounded bg-white hover:shadow"
            style={{ borderColor: "#C0C0C0" }}
          >
            <h3 className="font-bold mb-2 text-[#0F2027]">QA Checklist for ISO readiness</h3>
            <p className={`${silverText} text-sm`}>Ensure compliance with standards</p>
          </Link>
          <Link
            to="/blog/ai-agents"
            className="block p-6 border rounded bg-white hover:shadow"
            style={{ borderColor: "#C0C0C0" }}
          >
            <h3 className="font-bold mb-2 text-[#0F2027]">AI Agents in Real Business</h3>
            <p className={`${silverText} text-sm`}>How AI powers MSMEs in 2025</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link to="/blog" className={`${royalBlueText} inline-block font-semibold hover:underline`}>
            Read the Blog →
          </Link>
        </div>
      </section>

      {/* Big Conversion Band */}
      <section className="bg-[#007BFF] text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to assemble your team or ship your next release?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-[#007BFF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Request Proposal
          </button>
          <button className="border border-white/50 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
            Talk to an Expert
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F2027] text-[#C0C0C0] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-4">LOGO</h4>
            <p className="text-[#C0C0C0] text-sm">Empowering careers. Accelerating businesses.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-white">
                  Impact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/hr" className="hover:text-white">
                  HR
                </Link>
              </li>
              <li>
                <Link to="/services/software" className="hover:text-white">
                  Software
                </Link>
              </li>
              <li>
                <Link to="/services/ai" className="hover:text-white">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link to="/services/websites" className="hover:text-white">
                  Websites
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-white">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <a href="mailto:contact@company.com" className="hover:text-white">
                  contact@company.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+123456789" className="hover:text-white">
                  +1 234 567 89
                </a>
              </li>
              <li>Address: 123 Business Rd, City, Country</li>
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  View Map
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <label htmlFor="newsletter" className="block mb-2 text-sm text-[#C0C0C0]">
                Subscribe to our newsletter
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Your email"
                  className="flex-grow rounded border border-[#C0C0C0] px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
                <button className={`${royalBlue} px-4 py-2 rounded text-white hover:bg-[#0056b3] transition`}>
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-[#C0C0C0] mt-2">
                By subscribing, you agree to our privacy policy and terms.
              </p>
            </div>

            <div className="mt-6 flex gap-4 justify-start">
              <a href="#" className={`${silverText} hover:text-white`}>
                FB
              </a>
              <a href="#" className={`${silverText} hover:text-white`}>
                TW
              </a>
              <a href="#" className={`${silverText} hover:text-white`}>
                LN
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-[#C0C0C0] border-t border-[#C0C0C0] pt-6">
          © {new Date().getFullYear()} TALENTRA INNOVATIVE STAFFING SOLUTIONS (OPC) PRIVATE LIMITED. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
