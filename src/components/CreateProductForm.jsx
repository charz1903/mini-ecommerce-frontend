// src/components/CreateProductForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/api';
import { useAuthStore } from '../store/useAuthStore';

const CreateProductForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
  });
  const token = useAuthStore((state) => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_URL}/products`,
        {
          name: form.name,
          price: Number(form.price),
          stock: Number(form.stock),
          description: form.description || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Limpia formulario
      setForm({ name: '', price: '', description: '', stock: '' });
      onSuccess?.();
    } catch (err) {
      console.error('Error al crear producto:', err.response?.data);
      alert(
        err.response?.data?.message || 'Error al crear producto. Verifica el token.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
      <input
        placeholder="Nombre del producto"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        required
      />

      <textarea
        placeholder="Descripción (opcional)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        required
      />

      <button
        type="submit"
        disabled={!token}
        className={`w-full py-3 rounded-lg font-bold text-white transition ${
          token
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {token ? 'Crear Producto' : 'Inicia sesión'}
      </button>
    </form>
  );
};

export default CreateProductForm;