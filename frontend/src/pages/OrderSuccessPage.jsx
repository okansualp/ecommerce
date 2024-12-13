import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBox, FaHome } from 'react-icons/fa';

function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <FaCheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Siparişiniz Alındı!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Siparişiniz başarıyla oluşturuldu. Sipariş detaylarını e-posta adresinize gönderdik.
        </p>

        <div className="space-y-4">
          <Link to="/user">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center space-x-2 bg-amber-600 text-white py-3 px-4 rounded-md hover:bg-amber-700 transition-colors"
            >
              <FaBox className="w-5 h-5" />
              <span>Siparişlerimi Görüntüle</span>
            </motion.button>
          </Link>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white py-3 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FaHome className="w-5 h-5" />
              <span>Ana Sayfaya Dön</span>
            </motion.button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bir sorunuz mu var?{' '}
            <a href="#" className="text-amber-600 hover:text-amber-700">
              Bize ulaşın
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderSuccessPage;
