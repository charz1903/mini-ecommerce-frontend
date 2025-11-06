// src/components/Cart.jsx
import React, { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

const Cart = () => {
  const { items, removeItem, updateQty, clearCart, getTotal, getCount } = useCartStore();

  // ACTUALIZA EL CONTADOR DEL HEADER EN TIEMPO REAL
  useEffect(() => {
    const count = getCount();
    const countElement = document.getElementById('cart-count');
    if (countElement) {
      countElement.textContent = count;
    }
  }, [items, getCount]); // Se ejecuta cuando cambia items

  if (items.length === 0) {
    return (
      <div className="text-center mt-12">
        <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
        <p className="text-sm text-gray-400 mt-2">¡Agrega productos para comenzar!</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-between">
        Tu Carrito
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
          {getCount()} items
        </span>
      </h2>

      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item._id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg shadow-sm"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} c/u</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item._id, parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-600 hover:text-red-800 font-medium text-sm transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-gray-800">Total:</p>
          <p className="text-2xl font-bold text-indigo-600">
            ${getTotal().toFixed(2)}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition transform hover:scale-105"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;