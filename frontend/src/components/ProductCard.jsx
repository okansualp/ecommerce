import React from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { motion } from 'framer-motion'

function ProductCard({ product, addToCart, toggleFavorite, isFavorite }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-w-4 aspect-h-3">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 space-y-2">
          <button
            onClick={() => toggleFavorite(product)}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <HeartIcon
              className={`h-5 w-5 ${
                isFavorite
                  ? 'text-red-500'
                  : 'text-gray-400 dark:text-gray-300'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
            {product.category}
          </span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {product.price.toLocaleString('tr-TR', {
              style: 'currency',
              currency: 'TRY',
            })}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors duration-200"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Sepete Ekle</span>
          </button>
        </div>

        {product.stock === 1 && (
          <div className="mt-2 text-sm text-red-500 dark:text-red-400">
            Son 1 ürün!
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ProductCard
