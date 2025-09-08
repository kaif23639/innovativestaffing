import React, { useState, useEffect } from "react";
import api from "../api";

export default function TeamUpRequest() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [subpagesData, setSubpagesData] = useState([]); // State to hold all subpage data
  const [subcategories, setSubcategories] = useState([]); // State for filtered subcategories
  const [form, setForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    description: "",
    mainCategory: "",
    subCategory: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch both categories and subpages in parallel
        const [categoriesRes, subpagesRes] = await Promise.all([
          api.get("/api/categories"),
          api.get("/api/subpages"),
        ]);
        
        setCategoriesData(categoriesRes.data);
        setSubpagesData(subpagesRes.data);
      } catch (err) {
        setError("Failed to load categories and subcategories.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (form.mainCategory) {
      // Filter the list of all subpages based on the selected main category ID
      const filteredSubcategories = subpagesData.filter(
        (sub) => String(sub.category._id) === String(form.mainCategory)
      );
      setSubcategories(filteredSubcategories);
      setForm((f) => ({ ...f, subCategory: "" }));
    } else {
      setSubcategories([]);
      setForm((f) => ({ ...f, subCategory: "" }));
    }
  }, [form.mainCategory, subpagesData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    try {
      const res = await api.post("/api/teamup", form);
      console.log("✅ Backend response:", res.data);
      setSuccess(true);
    } catch (err) {
      console.error("❌ Submission error:", err.response?.data || err.message);
      alert("Failed to send request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-center text-slate-400">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-center text-red-400 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-[#F5F5F5]">
      <div className="w-full max-w-md bg-gray-900/50 rounded-xl shadow-lg p-8 border border-gray-700 mt-20">
        <h2 className="text-3xl font-extrabold text-[#008080] mb-6 text-center">Team-Up Request</h2>
        {success ? (
          <div className="text-center text-green-400 font-semibold">
            <p className="text-5xl mb-4">🎉</p>
            <p>Thank you for your request! We will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-[#40E0D0] transition"
            />
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-[#40E0D0] transition"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-[#40E0D0] transition"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-[#40E0D0] transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-[#40E0D0] transition"
            />
            <select
              name="mainCategory"
              value={form.mainCategory}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-[#40E0D0] transition appearance-none"
            >
              <option value="" disabled>
                Select Main Category
              </option>
              {categoriesData.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              disabled={!form.mainCategory}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-[#40E0D0] transition disabled:opacity-50 appearance-none"
            >
              <option value="" disabled>
                Select Sub Category
              </option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.title || sub.name}
                </option>
              ))}
            </select>
            <textarea
              name="description"
              placeholder="Staffing Needs Description in short"
              rows={4}
              value={form.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-[#40E0D0] transition"
            />
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-md font-bold transition ${
                submitting
                  ? "bg-[#2E8B57]/50 text-slate-400 cursor-not-allowed"
                  : "bg-[#40E0D0] text-black hover:bg-[#2E8B57] hover:text-white"
              }`}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}