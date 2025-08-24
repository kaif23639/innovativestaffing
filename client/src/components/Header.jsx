import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logoImage from "../assets/generated-image (4).png";
import api from "../api"; // your axios instance

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]); // categories + subcategories loaded

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Fetch categories and subcategories when dropdown opens and categories empty
  useEffect(() => {
    if (isServicesOpen && categories.length === 0) {
      const fetchCategoriesAndSubs = async () => {
        try {
          const [catsRes, subsRes] = await Promise.all([
            api.get("/api/categories"),
            api.get("/api/subpages")
          ]);
          // Combine categories & their subcategories in frontend
          const catsWithSubs = catsRes.data.map(cat => ({
            ...cat,
            subcategories: subsRes.data.filter(sub => 
              (sub.category?._id === cat._id || sub.category === cat._id)
            )
          }));
          setCategories(catsWithSubs);
        } catch (err) {
          console.error("Failed to load categories or subcategories", err);
        }
      };
      fetchCategoriesAndSubs();
    }
  }, [isServicesOpen, categories.length]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Styling helper classes for active state
  const silverBorder = "border-[#C0C0C0]";
  const royalBlueText = "text-[#007BFF]";
  const silverText = "text-[#C0C0C0]";

  const isActive = (path) => {
    if (path === "/services") return location.pathname.startsWith("/services");
    return location.pathname === path;
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b ${silverBorder} shadow-sm`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 relative">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-2xl tracking-tight text-[#007BFF] hover:text-[#0056b3] transition-colors"
        >
          <img src={logoImage} alt="LOGO" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center relative">
          <Link to="/" className={`${isActive("/") ? royalBlueText : silverText}`}>
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <Link
              to="/services"
              className={`${isActive("/services") ? royalBlueText : silverText} flex items-center gap-1`}
              onClick={() => setIsServicesOpen(!isServicesOpen)} // Allow toggle on click as well
            >
              Services <ChevronDown size={16} />
            </Link>

            {isServicesOpen && categories.length > 0 && (
              <div className="absolute left-0 top-full mt-2 bg-white border rounded-xl shadow-xl grid grid-cols-4 gap-8 p-8 w-[900px] z-50">
                {categories.map((cat) => (
                  <div key={cat._id}>
                    {/* Main Category */}
                    <h4 className="font-semibold text-gray-900 mb-3">
                      <Link
                        to={`/category/${cat.slug || cat._id}`}
                        className="hover:text-[#007BFF]"
                        onClick={() => setIsServicesOpen(false)} // Close dropdown on click
                      >
                        {cat.name}
                      </Link>
                    </h4>
                    {/* Subcategories */}
                    <ul className="space-y-2 text-sm text-[#C0C0C0]">
                      {cat.subcategories.map((sub) => (
                        <li key={sub._id}>
                          <Link
                            to={`/subpage/${sub.slug || sub._id}`}
                            className="hover:text-[#007BFF]"
                            onClick={() => setIsServicesOpen(false)} // Close dropdown on click
                          >
                            {sub.title || sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Nav Items */}
          {[
            { to: "/industries", label: "Industries" },
            { to: "/case-studies", label: "Case Studies" },
            { to: "/careers", label: "Careers" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className={`${isActive(to) ? royalBlueText : silverText}`}>
              {label}
            </Link>
          ))}

          {/* Logout (only if logged in) */}
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-red-500 font-semibold hover:underline">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
