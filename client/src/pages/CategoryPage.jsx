import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await api.get('/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Categories</h1>
      <ul>
        {categories.map(cat => (
          <li key={cat._id}>
            <Link to={`/subpages/${cat.slug}`}>
              {cat.name}
            </Link> 
            {cat.description && <p>{cat.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
