// src/store/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password });
        const { token, user } = res.data;
        set({ user, token });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },

      logout: () => {
        set({ user: null, token: null });
        delete axios.defaults.headers.common['Authorization'];
      },

      init: () => {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          const state = JSON.parse(stored).state;
          if (state.token && state.user) {
            set({ user: state.user, token: state.token }); // RESTAURA user + token
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
          }
        }
      },
    }),
    { name: 'auth-storage' }
  )
);


