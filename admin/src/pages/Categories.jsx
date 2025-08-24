import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    order: 0,
    image: '', // stores uploaded image URL from backend
    _id: null,
  });
  const [previewURL, setPreviewURL] = useState(''); // for local preview
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/api/categories');
      setCategories(data);
    } catch {
      setError('Failed to load categories');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle file selection for preview and upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    setPreviewURL(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const { data } = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm((prev) => ({ ...prev, image: data.url })); // Save backend image URL
    } catch {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (form._id) {
        await api.put(`/api/categories/${form._id}`, form);
      } else {
        await api.post('/api/categories', form);
      }
      setForm({ name: '', slug: '', description: '', order: 0, image: '', _id: null });
      setPreviewURL('');
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save category');
    }
  };

  const handleEdit = (cat) => {
    setForm({ ...cat });
    setPreviewURL(cat.image || ''); // Show existing image preview when editing
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch {
      setError('Failed to delete category');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-3xl font-bold leading-tight text-gray-900 mb-6">Categories</h2>

        {error && <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>}

        <form onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description || ''}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="order"
            type="number"
            placeholder="Order"
            value={form.order}
            onChange={handleChange}
            className="w-full max-w-[80px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              disabled={uploading}
            />
            {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
            {previewURL && !uploading && (
              <img
                src={previewURL}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded border border-gray-300"
              />
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
              disabled={uploading}
            >
              {form._id ? 'Update' : 'Add'}
            </button>
            {form._id && (
              <button
                type="button"
                onClick={() => {
                  setForm({ name: '', slug: '', description: '', order: 0, image: '', _id: null });
                  setPreviewURL('');
                }}
                className="border border-gray-300 text-gray-700 px-5 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
                disabled={uploading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-indigo-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cat.image ? (
                      <img src={`http://localhost:5000${cat.image}`} alt={cat.name} className="w-16 h-16 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                    <button onClick={() => handleEdit(cat)} className="text-indigo-600 hover:text-indigo-900 font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:text-red-900 font-semibold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
