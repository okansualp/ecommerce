import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ProductPage({ products, addToCart, toggleFavorite, favorites }) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));
  const isFavorite = favorites.some(fav => fav.id === product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-playfair text-gray-600 dark:text-gray-300">
          Ürün bulunamadı.
        </h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success('Ürün sepete eklendi!');
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Ürün Görseli */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Ürün Detayları */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="flex justify-between items-start">
            <h1 className="text-3xl md:text-4xl font-playfair mb-4 dark:text-white">
              {product.name}
            </h1>
            <button
              onClick={() => toggleFavorite(product)}
              className="text-2xl text-amber-600 hover:text-amber-700 transition-colors"
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <div className="text-2xl font-semibold mb-6 text-amber-600">
            {product.price.toLocaleString('tr-TR', {
              style: 'currency',
              currency: 'TRY'
            })}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {product.description}
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold dark:text-white">Özellikler:</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex items-center">
                  <span className="font-medium mr-2">{key}:</span>
                  {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border rounded-lg dark:border-gray-600">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                -
              </button>
              <span className="px-4 py-2 text-gray-800 dark:text-gray-200">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.stock} adet stokta
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Sepete Ekle
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductPage;
