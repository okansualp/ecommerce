import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

function SearchBar({ products }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  // Dışarı tıklandığında arama sonuçlarını kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Arama fonksiyonu
  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim() === '') {
      setResults([]);
      return;
    }

    const searchValue = value.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
    ).slice(0, 5); // En fazla 5 sonuç göster

    setResults(filtered);
    setIsOpen(true);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Ürün, kategori veya marka ara..."
          className="w-full md:w-80 pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            {results.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="text-sm font-medium dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </p>
                  <p className="text-sm font-medium text-amber-600">
                    {product.price.toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
