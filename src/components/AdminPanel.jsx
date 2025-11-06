// src/components/AdminPanel.jsx
import React from 'react';
import CreateProductForm from './CreateProductForm';
import ProductListAdmin from './ProductListAdmin';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-700 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span>Hola, {user?.name}</span>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
              Cerrar Sesión
            </button>
            <Link to="/" className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
              Tienda
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
            <CreateProductForm onSuccess={() => window.location.reload()} />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Tus Productos</h2>
            <ProductListAdmin />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;