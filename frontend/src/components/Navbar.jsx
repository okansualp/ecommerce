import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon, MenuIcon, SearchIcon, SunIcon, MoonIcon } from '@heroicons/react/outline'
import { useTheme } from '../context/ThemeContext'

const Navbar = ({ cartItems, cartItemCount, setIsCartOpen }) => {
  const navigate = useNavigate()
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const categories = [
    { name: 'Antiques', path: '/products/antiques' },
    { name: 'Clothes', path: '/products/clothes' },
    { name: 'Shoes', path: '/products/shoes' },
    { name: 'Watches', path: '/products/watches' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo ve Ana Menü */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                SHOP
              </span>
            </Link>
            
            <div className="hidden sm:ml-12 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Ana Sayfa
              </Link>
              <div className="relative">
                <button
                  onMouseEnter={() => setIsProductsMenuOpen(true)}
                  onMouseLeave={() => setIsProductsMenuOpen(false)}
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Ürünler
                </button>
                {isProductsMenuOpen && (
                  <div
                    onMouseEnter={() => setIsProductsMenuOpen(true)}
                    onMouseLeave={() => setIsProductsMenuOpen(false)}
                    className="absolute z-10 -ml-4 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 transition-colors duration-200"
                  >
                    <div className="py-1" role="menu">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Arama Çubuğu */}
          <div className="flex-1 max-w-lg mx-8 hidden lg:flex items-center">
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-sm placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
                  placeholder="Ürün ara..."
                />
              </div>
            </div>
          </div>

          {/* Sağ Menü */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <SunIcon className="h-6 w-6 text-gray-300 hover:text-white transition-colors duration-200" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-500 hover:text-gray-900 transition-colors duration-200" />
              )}
              <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
            
            <Link
              to="/user"
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative group"
            >
              <div className="relative">
                <UserIcon className="h-6 w-6" />
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Hesabım
                </span>
              </div>
            </Link>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group"
            >
              <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full transition-transform hover:scale-105">
                <ShoppingCartIcon className="h-5 w-5 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium border-2 border-indigo-500 dark:border-indigo-400">
                    {cartItemCount}
                  </span>
                )}
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Sepetim
                </span>
              </div>
            </button>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="flex items-center sm:hidden">
            <button className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
