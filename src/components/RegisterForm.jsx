// frontend/src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Estado para mensajes
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      
      // Guardar token
      localStorage.setItem('token', response.data.token);

      // Mensaje de éxito
      setMessage('¡Usuario registrado con éxito!');
      
      // Limpiar formulario
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Registro de Usuario
      </h2>

      {/* Mensaje de éxito */}
      {message && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center font-medium">
          {message}
        </p>
      )}

      {/* Mensaje de error */}
      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-medium">
          {error}
        </p>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input: Nombre */}
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          required
        />

        {/* Input: Email */}
        <input
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          required
        />

        {/* Input: Contraseña */}
        <input
          type="password"
          name="password"
          placeholder="Contraseña (mín. 6 caracteres)"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          required
          minLength="6"
        />

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 transform hover:scale-105"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;