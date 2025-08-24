import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api'; // axios instance configured with backend URL
import "./FlipCard.css"; // existing flip card styles

export default function ServicesPage() {
  const [allCategories, setAllCategories] = useState([]);
  const [subpages, setSubpages] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, subpagesRes] = await Promise.all([
          api.get('/api/categories'),
          api.get('/api/subpages'),
        ]);
        setAllCategories(categoriesRes.data);
        setSubpages(subpagesRes.data);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleCategory = (catName) => {
    setSelectedCats(prev =>
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  // Filter subpages by selected categories (based on category name)
  const filteredSubpages =
    selectedCats.length === 0
      ? subpages
      : subpages.filter(sp => selectedCats.includes(sp.category.name || sp.category));

  if (loading) return <p className="text-center mt-10">Loading services...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="md:w-80 bg-gradient-to-br from-blue-700 to-blue-500 p-6 rounded-lg m-6 md:mr-0 md:ml-6 shadow-lg max-h-[calc(100vh-3rem)] overflow-y-auto">
        <h2 className="text-white font-bold text-xl mb-4">Categories</h2>
        <ul className="space-y-3">
          {allCategories.map(cat => (
            <li key={cat._id}>
              <label className="flex items-center gap-3 cursor-pointer text-white select-none">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat.name)}
                  onChange={() => toggleCategory(cat.name)}
                  className="form-checkbox h-5 w-5"
                />
                <span className="font-semibold">{cat.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </aside>

      {/* Flip Service Cards */}
      <main className="flex-1 p-6 mt-6 md:mt-0 max-w-full overflow-x-hidden">
        <div className="grid md:grid-cols-3 gap-8">
          {filteredSubpages.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 mt-20 text-lg">
              No services found for selected categories.
            </div>
          ) : (
            filteredSubpages.map(service => (
              <FlipServiceCard key={service._id} service={service} navigate={navigate} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function FlipServiceCard({ service, navigate }) {
  // Construct full image URL assuming backend serves images under '/uploads' path
  const imageUrl = service.image
    ? `http://localhost:5000${service.image}` // adjust host accordingly
    : service.img
    ? service.img
    : '/default-image.jpg'; // fallback image

  return (
    <div
      className="flip-card w-full h-96 rounded-xl shadow-md bg-transparent cursor-pointer"
      tabIndex={0}
      onClick={() => navigate(`/subpage/${service.slug}`)}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/subpage/${service.slug}`); }}
      role="button"
      aria-label={`View details for ${service.title}`}
    >
      <div className="flip-card-inner w-full h-full rounded-xl">
        {/* Front Side */}
        <div className="flip-card-front w-full h-full rounded-xl bg-white flex flex-col">
          <div className="h-48 overflow-hidden rounded-t-xl">
            <img
              src={imageUrl}
              alt={service.title || service.name}
              draggable={false}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/default-image.jpg'; }} // fallback
            />
          </div>
          <div className="flex-1 flex items-center justify-center px-4">
            <div>
              <h3 className="font-bold text-lg mt-4 text-center">
                {service.title || service.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back w-full h-full rounded-xl bg-white border flex flex-col justify-between p-6">
          <div>
            <h3 className="font-semibold">{service.title || service.name}</h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-3">{service.description || service.desc}</p>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/subpage/${service.slug}`); }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-900 transition shadow"
              aria-label={`Learn more about ${service.title || service.name}`}
            >
              Learn More
              <span className="ml-1">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M5 3l5 5-5 5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
