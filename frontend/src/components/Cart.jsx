import React from 'react';
import { XIcon } from '@heroicons/react/outline';

const Cart = ({ isOpen, setIsOpen, cartItems, removeFromCart, updateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Sepetim</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Sepetiniz boş</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.price} TL</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="text-gray-500 hover:text-gray-700 px-2"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-4 py-6">
          <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
            <p>Toplam</p>
            <p>{total.toFixed(2)} TL</p>
          </div>
          <button
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            disabled={cartItems.length === 0}
          >
            Ödemeye Geç
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
