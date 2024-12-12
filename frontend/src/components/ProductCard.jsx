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
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link to={`/product/${id}`} className="block relative">
        <div className="relative">
          <img src={image} alt={name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              %{discount} İndirim
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-gray-500 text-sm">{description}</p>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{price} TL</span>
            {oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
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
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Sepete Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
