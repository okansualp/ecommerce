import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { MinusIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/outline';

const calculateTotal = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const handleCheckout = () => {
  // Add your checkout logic here
};

const Cart = ({ isOpen, setIsOpen, cartItems, removeFromCart, updateQuantity }) => {
  return (
    <div className={`fixed inset-0 overflow-hidden ${isOpen ? 'z-50' : '-z-10'}`}>
      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl transition-colors duration-200">
              <div className="flex-1 h-0 overflow-y-auto">
                <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Sepetim</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-3 h-7 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 px-4 py-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sepetiniz boş</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Alışverişe başlamak için ürün ekleyin.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {item.price} TL
                            </p>
                            <div className="mt-2 flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                              >
                                <MinusIcon className="h-5 w-5" />
                              </button>
                              <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                              >
                                <PlusIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                    <p>Toplam</p>
                    <p>{calculateTotal(cartItems).toFixed(2)} TL</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Kargo ücreti dahil değildir.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
                    >
                      Ödemeye Geç
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      ya da{' '}
                      <button
                        type="button"
                        className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Alışverişe Devam Et
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
