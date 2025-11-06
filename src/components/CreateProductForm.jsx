// src/components/CreateProductForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const CreateProductForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: '', price: '', description: '', stock: '' });
  const token = useAuthStore((state) => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: '', price: '', description: '', stock: '' });
      onSuccess?.();
    } catch (err) {
      alert('Error al crear producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
      <input
        placeholder="Nombre del producto"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full p-3 border rounded-lg"
        required
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-3 border rounded-lg h-24"
      />
      <input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        className="w-full p-3 border rounded-lg"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
      >
        Crear Producto
      </button>
    </form>
  );
};

export default CreateProductForm;