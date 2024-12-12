import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline'
import { products } from '../data/products'

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const [selectedColor, setSelectedColor] = useState(product?.specs.color[0])
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ürün bulunamadı</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedColor })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ürün Görseli */}
        <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-center object-cover"
          />
        </div>

        {/* Ürün Detayları */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-gray-500">{product.description}</p>

          {/* Fiyat */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-900">{product.price} TL</h2>
            {product.oldPrice && (
              <p className="mt-1">
                <span className="text-gray-500 line-through">{product.oldPrice} TL</span>
                <span className="ml-2 text-red-500">%{product.discount} indirim</span>
              </p>
            )}
          </div>

          {/* Renk Seçimi */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Renk</h3>
            <div className="mt-2 flex space-x-2">
              {product.specs.color.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`p-2 rounded-md \${
                    selectedColor === color
                      ? 'ring-2 ring-indigo-500'
                      : 'ring-1 ring-gray-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Miktar */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Miktar</h3>
            <div className="mt-2 flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                -
              </button>
              <span className="text-gray-700">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.specs.stock, quantity + 1))}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                +
              </button>
              <span className="text-sm text-gray-500">
                ({product.specs.stock} adet stokta)
              </span>
            </div>
          </div>

          {/* Özellikler */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Özellikler</h3>
            <ul className="mt-2 space-y-2">
              {product.specs.features.map((feature, index) => (
                <li key={index} className="text-gray-500">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Butonlar */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Sepete Ekle</span>
            </button>
            <button className="p-3 rounded-md border border-gray-300 hover:border-gray-400 transition-colors">
              <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
