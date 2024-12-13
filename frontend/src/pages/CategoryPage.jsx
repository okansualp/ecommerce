import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

function CategoryPage({ products, addToCart, toggleFavorite, favorites }) {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Kategori başlığını formatlama
  const formatCategoryTitle = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Ürünleri filtreleme ve sıralama
  useEffect(() => {
    let filtered = products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase() &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max
    );

    // Sıralama
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // 'featured'
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [products, category, sortBy, priceRange]);

  // Fiyat aralığı için maksimum değeri bulma
  const maxPrice = Math.max(...products.map(p => p.price));

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-playfair mb-8 dark:text-white">
        {formatCategoryTitle(category)}
      </h1>

      {/* Filtreler */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-lg font-medium dark:text-white">Fiyat Aralığı</h2>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange.max === Infinity ? maxPrice : priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              className="w-full"
            />
            <span className="text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {priceRange.max === Infinity ? maxPrice : priceRange.max} TL'ye kadar
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium dark:text-white">Sıralama</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="featured">Öne Çıkanlar</option>
            <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
            <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
            <option value="name">İsim (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Ürün Listesi */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4 dark:text-white">
            Bu kategoride ürün bulunamadı.
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Lütfen farklı bir kategori seçin veya filtreleri değiştirin.
          </p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some(fav => fav.id === product.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default CategoryPage;
