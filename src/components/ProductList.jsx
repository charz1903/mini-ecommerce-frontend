// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCartStore } from '../store/cartStore';
import { API_URL } from '../utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
        setError('');
      } catch (err) {
        setError('No se pudieron cargar los productos. ¿Backend encendido?');
        console.error('Error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // UN SOLO useEffect

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-md mx-auto mt-8">
        <p className="font-semibold">Error</p>
        <p className="text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-500 text-lg">No hay productos disponibles</p>
        <p className="text-sm text-gray-400 mt-2">
          Crea uno desde el panel de administrador
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-800 truncate">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {product.description || 'Sin descripción'}
            </p>
            <div className="flex justify-between items-center mt-3">
              <p className="text-2xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Stock: {product.stock}
              </span>
            </div>
            <button
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
              className={`mt-4 w-full py-2 rounded-lg font-semibold transition ${
                product.stock > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;