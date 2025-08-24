import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function CategoryOverviewPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryAndSubs = async () => {
      try {
        // Fetch category by slug
        const { data: cat } = await api.get(`/api/categories/slug/${slug}`);
        setCategory(cat);

        // Fetch related subcategories/subpages by category ID
        if (cat?._id) {
          const { data: subs } = await api.get(`/api/subpages?category=${cat._id}`);
          setSubCategories(subs);
        }
      } catch {
        setError('Failed to load category data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndSubs();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading category...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!category) return <div className="text-center py-20">Category not found</div>;

  return (
    <main className="container mx-auto px-6 py-12 space-y-20">

      {/* Hero Section */}
      <section className="md:flex md:items-center md:justify-between bg-indigo-900 text-white rounded-lg p-8">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold mb-4">{category.heroHeadline || category.name}</h1>
          <p className="text-xl mb-8">{category.heroSubtext || category.description}</p>
          <div className="space-x-4">
            {category.heroCTAs?.map((btn, idx) => (
              <a
                key={idx}
                href={btn.link}
                className="inline-block bg-white text-indigo-900 px-6 py-3 rounded font-semibold hover:bg-indigo-100 transition"
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>
        {category.image && (
          <div className="md:w-1/2 mt-8 md:mt-0 text-center">
            <img
              src={`http://localhost:5000${category.image}`}
              alt={category.name}
              className="inline-block w-3/4 rounded shadow-lg"
            />
          </div>
        )}
      </section>

      {/* Overview Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">What are {category.name}?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">{category.overviewDescription || category.description}</p>

        <h3 className="text-2xl font-semibold mb-3">Why Choose Our {category.name}?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {category.whyChoose?.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Subcategories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Our {category.name} Subcategories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subCategories.length ? (
            subCategories.map((subcat) => (
           <Link
  to={`/subpage/${subcat.slug}`}
  key={subcat._id}
  className="border rounded-lg p-6 shadow hover:shadow-lg transition block cursor-pointer"
>
  {subcat.image && (
    <img
      src={`http://localhost:5000${subcat.image}`}
      alt={subcat.title}
      className="mb-4 w-12 h-12 object-cover"
    />
  )}
  <h3 className="font-semibold text-xl mb-2">{subcat.title}</h3>
  <p className="text-gray-700 mb-4">{subcat.description}</p>
  <button className="text-indigo-700 font-semibold hover:underline">Learn More</button>
</Link>

            ))
          ) : (
            <p className="text-gray-500">No subcategories added.</p>
          )}
        </div>
      </section>

      {/* Industries Section */}
      {category.industries?.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">Industries We Serve</h2>
          <ul className="flex flex-wrap gap-4 text-indigo-700 font-semibold">
            {category.industries.map((industry, i) => (
              <li key={i} className="bg-indigo-100 rounded-full px-4 py-2">{industry}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Process Flow Section */}
      {category.processFlow?.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <ol className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            {category.processFlow.map((step, idx) => (
              <li key={idx} className="flex-1 bg-indigo-50 p-6 rounded shadow text-center">
                <div className="text-indigo-600 font-bold text-xl mb-2">{idx + 1}</div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Case Studies Section */}
      {category.caseStudies?.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">Case Studies / Success Stories</h2>
          <div className="space-y-6">
            {category.caseStudies.map((caseStudy, idx) => (
              <div key={idx} className="border rounded-lg p-6 shadow">
                <h3 className="font-semibold text-xl mb-2">{caseStudy.title}</h3>
                <p className="text-gray-700">{caseStudy.summary}</p>
                {caseStudy.link && (
                  <a href={caseStudy.link} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                    Read More
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call To Action Section */}
      {category.cta && (
        <section className="bg-indigo-700 text-white rounded-lg p-10 text-center">
          <h2 className="text-4xl font-bold mb-4">{category.cta.headline}</h2>
          <p className="mb-6 text-lg">{category.cta.subtext}</p>
          {category.cta.buttons?.map((btn, i) => (
            <a
              key={i}
              href={btn.link}
              className="inline-block bg-white text-indigo-700 px-6 py-3 rounded font-semibold mx-2 hover:bg-indigo-100 transition"
            >
              {btn.text}
            </a>
          ))}
        </section>
      )}
    </main>
  );
}
