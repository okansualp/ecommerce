import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/outline';

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
          <p className="text-gray-500 mb-8">Alışverişe başlamak için ürünleri keşfedin.</p>
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Alışverişe Devam Et
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Sepetim</h2>
        
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-6">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-cover rounded"
              />
              <div className="flex-1 ml-6">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-500 mt-1">{item.description}</p>
                <div className="flex items-center mt-4">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="text-gray-500 hover:text-gray-700 border rounded-md px-3 py-1"
                  >
                    -
                  </button>
                  <span className="mx-4 text-gray-600">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700 border rounded-md px-3 py-1"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right ml-6">
                <p className="text-lg font-medium text-gray-900">{item.price} TL</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  Kaldır
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex justify-between text-xl font-medium text-gray-900 mb-6">
            <p>Toplam</p>
            <p>{total.toFixed(2)} TL</p>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Ödemeye Geç
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
