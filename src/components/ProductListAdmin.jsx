// src/components/ProductListAdmin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;

  return (
    <div className="space-y-4">
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No hay productos</p>
      ) : (
        products.map((p) => (
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
        ))
      )}
    </div>
  );
};

export default ProductListAdmin;