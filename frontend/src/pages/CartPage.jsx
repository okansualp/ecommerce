import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

function CartPage({ cartItems, removeFromCart, updateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-playfair mb-4 text-center dark:text-white">
          Sepetiniz boş
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Alışverişe başlamak için ürünlerimize göz atın.
        </p>
        <Link
          to="/"
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-playfair mb-8 dark:text-white">
        Sepetim
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ürün Listesi */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </Link>

              <div className="flex-grow">
                <Link 
                  to={`/product/${item.id}`}
                  className="text-lg font-medium hover:text-amber-600 dark:text-white dark:hover:text-amber-500 transition-colors"
                >
                  {item.name}
                </Link>
                <div className="text-amber-600 font-medium mt-1">
                  {item.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg dark:border-gray-600">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-gray-800 dark:text-gray-200">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sipariş Özeti */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-playfair mb-4 dark:text-white">
              Sipariş Özeti
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Ara Toplam</span>
                <span>
                  {total.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Kargo</span>
                <span>Ücretsiz</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-3">
                <div className="flex justify-between font-semibold text-lg dark:text-white">
                  <span>Toplam</span>
                  <span>
                    {total.toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Ödemeye Geç
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
