import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import FlipCard from '../components/FlipCard';

export default function Subpage() {
  const { slug } = useParams();
  const [subpage, setSubpage] = useState(null);
  const [flipcards, setFlipcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubpageContent() {
      setLoading(true);
      try {
        const res = await api.get(`/api/subpages/slug/${slug}`);
        setSubpage(res.data);
        setFlipcards(res.data.flipcards || []);
      } catch (error) {
        console.error('Failed to load subpage', error);
        setSubpage(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSubpageContent();
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading subpage...</p>
      </div>
    );
  if (!subpage)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 text-lg font-semibold">Subpage not found.</p>
      </div>
    );

  return (
    <main className="container mx-auto px-6 py-12 space-y-12 max-w-6xl">

      {/* Image and Title Section */}
      <section className="md:flex md:items-center md:gap-10">
        {/* Image */}
        {subpage.image && (
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src={`http://localhost:5000${subpage.image}`}
              alt={subpage.title}
              className="rounded-lg shadow-lg max-h-64 object-cover"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{subpage.title}</h1>
          {subpage.description && (
            <p className="text-lg text-gray-700 mb-6">{subpage.description}</p>
          )}
          {subpage.content && (
            <div
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: subpage.content }}
            />
          )}
        </div>
      </section>

      {/* Flipcards Section */}
      {flipcards.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {flipcards.map((card) => (
              <FlipCard key={card._id} data={card} />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}

