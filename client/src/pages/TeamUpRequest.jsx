import React, { useState, useEffect } from "react";
import api from "../api"; // Your Axios instance configured with backend

export default function TeamUpRequest() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/api/categories"); // Endpoint to fetch main categories with subcategories nested
        setCategoriesData(res.data);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Update subcategories whenever main category changes
  useEffect(() => {
    if (form.mainCategory) {
      const mainCat = categoriesData.find((cat) => cat.id === form.mainCategory);
      setSubcategories(mainCat ? mainCat.subcategories : []);
      setForm((f) => ({ ...f, subCategory: "" })); // Reset subCategory on main change
    } else {
      setSubcategories([]);
      setForm((f) => ({ ...f, subCategory: "" }));
    }
  }, [form.mainCategory, categoriesData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Submit form data to backend here (e.g., api.post('/api/teamup', form))

    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading categories...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 text-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Team-Up Request</h2>

        {success ? (
          <div className="text-center text-green-700 font-semibold">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select
              name="mainCategory"
              value={form.mainCategory}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Main Category
              </option>
              {categoriesData.map((cat) => (
                <option key={cat.id} value={cat.id}>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Sub Category
              </option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-md font-semibold text-white transition ${
                submitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
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
