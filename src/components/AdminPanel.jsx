// src/components/AdminPanel.jsx
import React, { useState } from 'react';
import CreateProductForm from './CreateProductForm';
import ProductListAdmin from './ProductListAdmin';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // FUNCIÓN CORRECTA CON LOGOUT + REDIRECCIÓN
  const handleLogout = () => {
    logout();           // ← Limpia el store y headers
    navigate('/');      // ← Redirige al home
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span>Hola, {user?.name}</span>
            <button
              onClick={handleLogout}  // ← USA LA FUNCIÓN
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
            <CreateProductForm
              onSuccess={() => setRefreshTrigger(prev => prev + 1)}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Mis Productos</h2>
            <ProductListAdmin refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;