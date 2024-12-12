import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const HomePage = ({ addToCart, toggleFavorite, favorites }) => {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Teknoloji Tutkunları İçin En İyi Ürünler
        </h1>
        <p className="text-lg text-gray-600">
          En son teknoloji ürünlerini keşfedin ve avantajlı fiyatlarla satın alın
        </p>
      </div>

      {/* Featured Products */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Öne Çıkan Ürünler</h2>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Tümünü Gör
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Kategoriler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Elektronik', 'Aksesuarlar', 'Bilgisayarlar', 'Telefonlar'].map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-3 aspect-h-2">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-medium text-white">{category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
