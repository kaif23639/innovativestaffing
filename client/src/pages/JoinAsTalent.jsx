import React, { useState } from "react";

export default function JoinAsTalent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    file: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((f) => ({ ...f, file: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-200 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-3">
          Ready to work on exciting short-term projects?
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Join our <span className="font-semibold text-blue-600">team of gig professionals</span>.
        </p>

        {success ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-green-700 text-lg font-semibold mb-2">
              Thank you for your application!
            </p>
            <p className="text-gray-600">
              We'll review your info soon and contact you if there is a match.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />

            <textarea
              name="about"
              placeholder="Anything else we should know?"
              rows={4}
              value={form.about}
              onChange={handleChange}
              required
              className="resize-none rounded-lg border border-gray-300 px-4 py-3 w-full text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />

            <div>
              <label
                htmlFor="file"
                className="block mb-2 font-semibold text-gray-900"
              >
                Upload your resume and cover letter <span className="text-red-600">*</span>
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
                className="w-full rounded-lg border-2 border-dashed border-blue-600 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <p className="text-xs text-gray-500 mt-1">
                PDF or DOC, max 5MB.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-lg font-bold text-white transition ${
                submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? "Submitting..." : "Apply Now"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-purple-600">
          Made with Talentra · Need help?{" "}
          <span className="underline cursor-pointer text-blue-600">Contact us</span>
        </p>
      </div>
    </div>
  );
}
