import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set((state) => {
        const existing = state.items.find(i => i._id === product._id);
        if (existing) {
          return {
            items: state.items.map(i =>
              i._id === product._id ? { ...i, qty: i.qty + 1 } : i
            )
          };
        }
        return { items: [...state.items, { ...product, qty: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i._id !== id)
      })),
      updateQty: (id, qty) => set((state) => ({
        items: state.items.map(i => i._id === id ? { ...i, qty } : i)
      })),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      getCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);