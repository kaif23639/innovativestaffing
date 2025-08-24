import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Subpages() {
  const [subpages, setSubpages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: '',
    order: 0,
    image: '', // store image URL
    _id: null,
  });
  const [previewURL, setPreviewURL] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSubpages();
    fetchCategories();
  }, []);

  const fetchSubpages = async () => {
    try {
      const { data } = await api.get('/api/subpages');
      setSubpages(data);
    } catch {
      setError('Failed to load subpages');
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/api/categories');
      setCategories(data);
    } catch {
      setError('Failed to load categories');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Image upload handler with preview
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewURL(URL.createObjectURL(file)); // Immediate preview

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const { data } = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((prev) => ({ ...prev, image: data.url }));
    } catch {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.category) {
      setError('Category is required');
      return;
    }
    try {
      if (form._id) {
        await api.put(`/api/subpages/${form._id}`, form);
      } else {
        await api.post('/api/subpages', form);
      }
      setForm({ title: '', slug: '', description: '', content: '', category: '', order: 0, image: '', _id: null });
      setPreviewURL('');
      fetchSubpages();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save subpage');
    }
  };

  const handleEdit = (sp) => {
    const categoryId = sp.category?._id || sp.category || '';
    setForm({ ...sp, category: categoryId });
    setPreviewURL(sp.image || '');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subpage?')) return;
    try {
      await api.delete(`/api/subpages/${id}`);
      fetchSubpages();
    } catch {
      setError('Failed to delete subpage');
    }
  };

return (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Subpages</h2>

      {error && <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
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
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="order"
          type="number"
          placeholder="Order"
          value={form.order}
          onChange={handleChange}
          className="max-w-[80px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              alt="Uploaded preview"
              className="mt-2 w-48 h-48 object-cover rounded border border-gray-300"
            />
          )}
        </div>
        <div className="flex space-x-3">
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
                setForm({ title: '', slug: '', description: '', content: '', category: '', order: 0, image: '', _id: null });
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subpages.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No subpages found.</td>
              </tr>
            )}
            {subpages.map((sp) => (
              <tr key={sp._id} className="hover:bg-indigo-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  {sp.image ? (
                    <img
                      src={`http://localhost:5000${sp.image}`}
                      alt={sp.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{sp.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sp.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap">{typeof sp.category === 'object' ? sp.category.name : sp.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sp.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sp.content}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sp.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                  <button onClick={() => handleEdit(sp)} className="text-indigo-600 hover:text-indigo-900 font-semibold">Edit</button>
                  <button onClick={() => handleDelete(sp._id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
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
