import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import { useAuthStore } from './store/useAuthStore';
import './index.css';

function AppContent() {
  const { user, init } = useAuthStore();
  const navigate = useNavigate();

  // Auto-login si hay token
  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl md:text-3xl font-bold text-indigo-700">
            Mini E-Commerce
          </Link>
          <div className="flex items-center gap-4">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              Cart: <span id="cart-count">0</span> items
            </span>
            {user ? (
              <Link
                to="/admin"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
              >
                Admin
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* RUTAS */}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
                    Productos Disponibles
                  </h2>
                  <ProductList />
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
                    Tu Carrito
                  </h2>
                  <Cart />
                </section>
              </>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-16">
        <p className="text-sm">
          © 2025 <span className="font-bold">Hecho por Charz</span> — Full Stack Developer
        </p>
        <p className="text-xs text-gray-400 mt-1">
          MERN + Zustand + Tailwind + JWT
        </p>
      </footer>
    </div>
  );
}

// ENVUELVE CON BrowserRouter
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}