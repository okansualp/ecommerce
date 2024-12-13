import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { useTheme } from '../context/ThemeContext'

function HomePage({ products, addToCart, toggleFavorite, favorites }) {
  const { isDark } = useTheme()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1534353341328-aede12f06b84?q=80&w=1400')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            className="text-5xl md:text-6xl font-playfair mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nostaljiyi Yaşa.
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Özenle seçilmiş vintage ve antika koleksiyonumuzla geçmişin büyüsünü keşfedin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/products" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
              >
                Hemen Keşfet
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12 text-gray-800 dark:text-gray-100">
          Öne Çıkan Ürünler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.slice(0, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some(fav => fav.id === product.id)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 md:px-8 bg-amber-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12 text-gray-800 dark:text-gray-100">
            Kategoriler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Vintage Giyim', 'Retro Aksesuarlar', 'Nostaljik Dekor'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={`/categories/category-${index + 1}.jpg`}
                    alt={category}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl font-medium">{category}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
