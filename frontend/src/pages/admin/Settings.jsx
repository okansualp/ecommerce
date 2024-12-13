import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaSave,
  FaGlobe,
  FaEnvelope,
  FaLock,
  FaPalette,
  FaShoppingCart,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const defaultSettings = {
  siteName: 'Nostalji',
  siteDescription: 'Vintage ve Antika Ürünler',
  currency: 'TRY',
  language: 'tr',
  timezone: 'Europe/Istanbul',
  emailNotifications: true,
  orderNotifications: true,
  stockNotifications: true,
  theme: 'light',
  primaryColor: '#D97706', // amber-600
  freeShippingThreshold: 500,
  maxCartItems: 10,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    // Ayarlar değiştiğinde localStorage'ı güncelle
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to save settings
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    console.log('Settings saved:', settings);
    toast.success('Ayarlar başarıyla kaydedildi!');
  };

  const handleReset = () => {
    // Ayarları varsayılan değerlere sıfırla
    setSettings(defaultSettings);
    localStorage.setItem('siteSettings', JSON.stringify(defaultSettings));
    toast.info('Ayarlar varsayılan değerlere sıfırlandı.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Ayarlar</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
        >
          <span>Sıfırla</span>
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Genel Ayarlar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaGlobe className="text-amber-600" />
            <h2 className="text-lg font-semibold dark:text-white">
              Genel Ayarlar
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Site Adı
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Site Açıklaması
              </label>
              <input
                type="text"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Para Birimi
              </label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="TRY">Türk Lirası (TRY)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Dil
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bildirim Ayarları */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaEnvelope className="text-amber-600" />
            <h2 className="text-lg font-semibold dark:text-white">
              Bildirim Ayarları
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                E-posta Bildirimleri
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="orderNotifications"
                checked={settings.orderNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Sipariş Bildirimleri
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="stockNotifications"
                checked={settings.stockNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Stok Bildirimleri
              </label>
            </div>
          </div>
        </div>

        {/* Görünüm Ayarları */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaPalette className="text-amber-600" />
            <h2 className="text-lg font-semibold dark:text-white">
              Görünüm Ayarları
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tema
              </label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="light">Açık</option>
                <option value="dark">Koyu</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ana Renk
              </label>
              <input
                type="color"
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleChange}
                className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Alışveriş Ayarları */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaShoppingCart className="text-amber-600" />
            <h2 className="text-lg font-semibold dark:text-white">
              Alışveriş Ayarları
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ücretsiz Kargo Limiti (TL)
              </label>
              <input
                type="number"
                name="freeShippingThreshold"
                value={settings.freeShippingThreshold}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Maksimum Sepet Ürünü
              </label>
              <input
                type="number"
                name="maxCartItems"
                value={settings.maxCartItems}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center space-x-2"
          >
            <FaSave />
            <span>Kaydet</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
