import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Footer from './components/Footer';
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import Subpage from "./pages/Subpage";
import BlogOverviewPage from './pages/BlogOverviewPage';
import Signup from './pages/auth/Signup';
import OtpVerify from './pages/auth/OtpVerify';
import Login from './pages/auth/Login';
import PasswordReset from './pages/auth/PasswordReset';
import ContactPage from './pages/ContactPage'
import JoinAsTalent from './pages/JoinAsTalent';
import TeamUpRequest from './pages/TeamUpRequest';
import CategoryOverviewPage from './pages/CategoryOverviewPage';
import BlogPage from './pages/BlogPage';
import Careers from "./pages/Careers";
import CaseStudy from "./pages/CaseStudy";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";
import IndustriesPage from "./pages/IndustriesPage";
import IndustryPlaybookPage from "./pages/IndustryPlaybookPage";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import FAQsPage from './pages/FAQsPage';
import Chatbot from "./components/Chatbot";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null); // Assuming you might use this later
  const navigate = useNavigate();

  // This effect keeps the auth state in sync if localStorage is changed in another tab
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleVerified = (jwtToken, userInfo) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    setUser(userInfo);
    navigate('/');
  };

  // 1. CREATE THE LOGOUT FUNCTION IN THE PARENT COMPONENT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const RequireAuth = ({ children }) => {
    // This now correctly uses the up-to-date state variable `token`
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const RedirectIfAuth = ({ children }) => {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const startAuthFlow = () => {
    if (token) {
      navigate('/join-as-talent');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* 2. PASS STATE AND LOGOUT FUNCTION DOWN AS PROPS */}
      <Header isLoggedIn={!!token} onLogout={handleLogout} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage onJoinAsTalent={startAuthFlow} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/subpage/:slug" element={<Subpage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogOverviewPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/case-studies" element={<CaseStudy />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:slug" element={<IndustryPlaybookPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/category/:slug" element={<CategoryOverviewPage />} />
        <Route path="/login" element={<RedirectIfAuth><Login onVerified={handleVerified} /></RedirectIfAuth>} />
        <Route path="/signup" element={<RedirectIfAuth><Signup /></RedirectIfAuth>} />
        <Route path="/verify-otp" element={<RedirectIfAuth><OtpVerify onVerified={handleVerified} /></RedirectIfAuth>} />
        <Route path="/passwordreset" element={<RedirectIfAuth><PasswordReset /></RedirectIfAuth>} />
        <Route path="/join-as-talent" element={<RequireAuth><JoinAsTalent /></RequireAuth>} />
        <Route path="/team-up-request" element={<TeamUpRequest />} />
      </Routes>
      <Chatbot />
      <Footer />
    </>
  );
}

export default App;
