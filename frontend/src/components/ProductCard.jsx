import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, addToCart, isFavorite, onToggleFavorite }) => {
  const { id, name, description, price, oldPrice, discount, image, specs } = product

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ ...product, quantity: 1, selectedColor: specs.color[0] })
  }

  return (
    <div className="relative group">
      <Link to={`/product/${id}`} className="block relative">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors duration-200">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              %{discount} İndirim
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              {name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{price} TL</p>
                {oldPrice && (
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                    {oldPrice} TL
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    onToggleFavorite()
                  }}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isFavorite
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400'
                  }`}
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-indigo-500 dark:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-200"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Sepete Ekle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
