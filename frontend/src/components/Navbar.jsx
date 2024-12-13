import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';

function Navbar({ cartItems, cartItemCount, setIsCartOpen, products }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-playfair font-bold text-amber-600">
              Nostalji
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-grow mx-8">
            <SearchBar products={products} />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500"
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500"
            >
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </motion.button>

            {/* User Profile */}
            <Link to="/user">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500"
              >
                <FaUser />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar products={products} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
