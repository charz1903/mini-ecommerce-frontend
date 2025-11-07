// src/components/ProductListAdmin.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/api';
import { useAuthStore } from '../store/useAuthStore';

const ProductListAdmin = ({ refreshTrigger }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = useAuthStore((state) => state.token);

  const fetchProducts = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      // LÍNEA 22 CORREGIDA
      const res = await axios.get(`${API_URL}/products/my-products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error al cargar productos';
      setError(msg);
      console.error('Error en fetchProducts:', err.response || err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar');
    }
  };

  if (loading) return <p className="text-center">Cargando tus productos...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (products.length === 0) return <p className="text-gray-500 text-center">No tienes productos aún</p>;

  return (
    <div className="space-y-4">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-600">
              ${p.price} | Stock: {p.stock}
            </p>
            {p.description && (
              <p className="text-xs text-gray-500 mt-1">{p.description}</p>
            )}
          </div>
          <button
            onClick={() => handleDelete(p._id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductListAdmin;