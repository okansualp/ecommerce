import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/outline';

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
            <div key={item.id + item.selectedColor} className="flex items-center border-b pb-6">
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded-md hover:opacity-75 transition-opacity"
                />
              </Link>
              <div className="flex-1 ml-6">
                <div className="flex justify-between">
                  <div>
                    <Link 
                      to={`/product/${item.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-500 mt-1">{item.description}</p>
                    {item.selectedColor && (
                      <p className="text-sm text-gray-500 mt-1">Renk: {item.selectedColor}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">{item.price} TL</p>
                    {item.oldPrice && (
                      <p className="text-sm text-gray-500 line-through">{item.oldPrice} TL</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedColor, Math.max(0, item.quantity - 1))}
                      className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span className="px-4 py-2 text-gray-900 font-medium border-x">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    <span>Kaldır</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-lg font-medium text-gray-900">Toplam</p>
              <p className="text-sm text-gray-500 mt-1">KDV Dahil</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{total.toFixed(2)} TL</p>
              {cartItems.some(item => item.oldPrice) && (
                <p className="text-sm text-green-600 mt-1">
                  Toplam Kazanç: {cartItems.reduce((sum, item) => 
                    sum + (item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0), 0
                  ).toFixed(2)} TL
                </p>
              )}
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Ödemeye Geç ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} Ürün)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
