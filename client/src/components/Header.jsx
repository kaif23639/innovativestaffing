import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/generated-image (4).png"
import api from "../api";

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [logoHovered, setLogoHovered] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    if (isServicesOpen && categories.length === 0) {
      (async () => {
        try {
          const [catsRes, subsRes] = await Promise.all([
            api.get("/api/categories"),
            api.get("/api/subpages"),
          ]);
          const cats = catsRes.data;
          const subs = subsRes.data;
          const catsWithSubs = cats.map((cat) => {
            const catId = String(cat._id);
            return {
              ...cat,
              subcategories: subs.filter((sub) => {
                const subCat = sub.category;
                if (!subCat) return false;
                if (typeof subCat === "string") return subCat === catId;
                if (typeof subCat === "object") {
                  return (
                    String(subCat._id) === catId || String(subCat.id) === catId
                  );
                }
                return false;
              }),
            };
          });
          setCategories(catsWithSubs);
        } catch (err) {
          console.error("Failed to load categories/subpages", err);
        }
      })();
    }
  }, [isServicesOpen, categories.length]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const isActive = (path) =>
    path === "/services"
      ? location.pathname.startsWith(path)
      : location.pathname === path;

  // Desktop NavLink
  const DesktopNavLink = ({ to, label, isActive, children, showDropdown }) => (
    <div
      className="relative"
      onMouseEnter={() => showDropdown && setIsServicesOpen(true)}
      onMouseLeave={() => setIsServicesOpen(false)}
    >
      <Link
        to={to}
        className={`flex items-center gap-1 px-2 py-1 rounded transition ${
          isActive ? "text-[#40E0D0] font-semibold" : "text-white"
        } hover:text-[#40E0D0]`}
      >
        {label}
        {children}
      </Link>
    </div>
  );

  // Mobile NavLink
  const MobileNavLink = ({ to, label, isActive, children, showDropdown }) => (
    <Link
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className={`block w-full px-4 py-3 rounded transition ${
        isActive ? "text-[#40E0D0] font-semibold bg-white/10" : "text-white"
      } hover:bg-white/10`}
    >
      <div className="flex justify-between items-center">
        {label}
        {children}
      </div>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black md:bg-black/50 md:backdrop-blur-sm border-b border-[#008080]/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-[72px]">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-white flex items-center gap-2"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
             <h4 className=" font-bold text-2xl mb-4 pt-8"><img className="h-20 w-20" src={logo} alt="" /></h4>
        </Link>

        {/* Hamburger / Close Button */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <motion.div
            key={isMobileMenuOpen ? "x" : "menu"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <DesktopNavLink to="/" label="Home" isActive={isActive("/")} />
          <DesktopNavLink to="/about" label="About" isActive={isActive("/about")} />
          <DesktopNavLink
            to="/services"
            label="Services"
            isActive={isActive("/services")}
            showDropdown
          >
            <ChevronDown size={14} />
          </DesktopNavLink>
          <DesktopNavLink to="/careers" label="Careers" isActive={isActive("/careers")} />
          <DesktopNavLink to="/case-studies" label="Case Studies" isActive={isActive("/case-studies")} />
          <DesktopNavLink to="/industries" label="Industries" isActive={isActive("/industries")} />
          <DesktopNavLink to="/blogs" label="Blog" isActive={isActive("/blogs")} />
          <DesktopNavLink to="/contact" label="Contact" isActive={isActive("/contact")} />

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-[#008080] to-[#40E0D0] text-black font-semibold rounded-lg shadow hover:from-[#40E0D0] hover:to-[#2E8B57]"
            >
              Register Now
            </Link>
          )}
        </nav>
      </div>

      {/* Desktop Dropdown */}
      <AnimatePresence>
        {isServicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-black text-white shadow-lg p-4 md:w-96 mx-auto rounded"
          >
            <ul>
              {categories.map((cat) => (
                <li key={cat._id} className="mb-2">
                  <Link
                    to={`/category/${cat.slug || cat._id}`}
                    className="block px-3 py-1 font-semibold hover:text-[#40E0D0]"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {cat.name}
                  </Link>
                  {cat.subcategories && (
                    <ul className="pl-4 text-sm">
                      {cat.subcategories.map((sub) => (
                        <li key={sub._id}>
                          <Link
                            to={`/subpage/${sub.slug || sub._id}`}
                            className="block hover:text-[#40E0D0] py-0.5"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            {sub.title || sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full bg-black z-40 flex flex-col md:bg-black/50 md:backdrop-blur-sm"
          >
 

            <div className="flex-1 p-6 space-y-2">
              <MobileNavLink to="/" label="Home" isActive={isActive("/")} />
              <MobileNavLink to="/about" label="About" isActive={isActive("/about")} />
              <MobileNavLink to="/services" label="Services" isActive={isActive("/services")} showDropdown>
                <ChevronDown size={14} />
              </MobileNavLink>

              {/* Services Expand */}
              {isServicesOpen && (
                <div className="pl-6 space-y-1 text-sm">
                  {categories.map((cat) => (
                    <div key={cat._id}>
                      <Link
                        to={`/category/${cat.slug || cat._id}`}
                        className="block hover:text-[#40E0D0]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                      {cat.subcategories && (
                        <ul className="pl-4 text-xs text-gray-300">
                          {cat.subcategories.map((sub) => (
                            <li key={sub._id}>
                              <Link
                                to={`/subpage/${sub.slug || sub._id}`}
                                className="block hover:text-[#40E0D0]"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.title || sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <MobileNavLink to="/careers" label="Careers" isActive={isActive("/careers")} />
              <MobileNavLink to="/case-studies" label="Case Studies" isActive={isActive("/case-studies")} />
              <MobileNavLink to="/industries" label="Industries" isActive={isActive("/industries")} />
              <MobileNavLink to="/blogs" label="Blog" isActive={isActive("/blogs")} />
              <MobileNavLink to="/contact" label="Contact" isActive={isActive("/contact")} />

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-500 font-semibold hover:underline"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-4 py-2 bg-gradient-to-r from-[#008080] to-[#40E0D0] text-black font-semibold rounded-lg shadow hover:from-[#40E0D0] hover:to-[#2E8B57]"
                >
                  Register Now
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
