// src/store/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { API_URL } from '../utils/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      // LOGIN CON try/catch Y return
      login: async (email, password) => {
        try {
          const res = await axios.post(`${API_URL}/auth/login`, { email, password });
          const { token, user } = res.data;

          set({ user, token });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('Login exitoso:', user.name);

          return { success: true };
        } catch (err) {
          console.error('Error en login:', err.response?.data);
          return {
            success: false,
            error: err.response?.data?.message || 'Error al iniciar sesión',
          };
        }
      },

      // LOGOUT
      logout: () => {
        set({ user: null, token: null });
        delete axios.defaults.headers.common['Authorization'];
        console.log('Logout exitoso');
      },

      // INICIALIZAR AL CARGAR LA APP
      init: () => {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          try {
            const state = JSON.parse(stored).state;
            if (state.token && state.user) {
              set({ user: state.user, token: state.token });
              axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
            }
          } catch (error) {
            console.error('Error al restaurar auth:', error);
          }
        }
      },
    }),
    { name: 'auth-storage' }
  )
);