import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { FaLock, FaCreditCard, FaShieldAlt } from 'react-icons/fa';

// Stripe public key - Bu anahtarı kendi Stripe hesabınızdan almalısınız
const stripePromise = loadStripe('your_publishable_key');

function CheckoutPage({ cartItems = [] }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 500 ? 0 : 29.90;
  const grandTotal = total + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Kredi kartı numarası formatlaması
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }
    // Son kullanma tarihi formatlaması
    else if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }
    // CVC formatlaması
    else if (name === 'cvc') {
      formattedValue = value.slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const stripe = await stripePromise;
      
      // Burada normalde backend'e istek atıp payment intent oluşturulur
      // const response = await fetch('/api/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: grandTotal * 100 }) // Stripe kuruş cinsinden çalışır
      // });
      // const data = await response.json();
      
      // const result = await stripe.confirmCardPayment(data.clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: {
      //       name: formData.name,
      //       email: formData.email,
      //       address: {
      //         line1: formData.address,
      //         city: formData.city,
      //         postal_code: formData.postalCode,
      //       }
      //     }
      //   }
      // });

      // if (result.error) {
      //   throw new Error(result.error.message);
      // }

      // Başarılı ödeme simülasyonu
      setTimeout(() => {
        navigate('/order-success');
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Ödeme hatası:', error);
      setLoading(false);
      // Hata mesajını göster
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol Taraf - Ödeme Formu */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">Ödeme Bilgileri</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* İletişim Bilgileri */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-medium dark:text-white">İletişim Bilgileri</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ad Soyad</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Teslimat Adresi */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-medium dark:text-white">Teslimat Adresi</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adres</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Şehir</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Posta Kodu</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Kart Bilgileri */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-medium dark:text-white">Kart Bilgileri</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kart Numarası</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Son Kullanma</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    required
                    placeholder="AA/YY"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    required
                    placeholder="123"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 flex items-center justify-center space-x-2 rounded-md bg-amber-600 text-white font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <FaLock className="h-4 w-4" />
              <span>{loading ? 'İşleniyor...' : 'Güvenli Ödeme Yap'}</span>
            </motion.button>
          </form>
        </div>

        {/* Sağ Taraf - Sipariş Özeti */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-medium mb-4 dark:text-white">Sipariş Özeti</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium dark:text-white">{item.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Adet: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium dark:text-white">
                    {(item.price * item.quantity).toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    })}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Ara Toplam</span>
                <span className="text-sm font-medium dark:text-white">
                  {total.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Kargo</span>
                <span className="text-sm font-medium dark:text-white">
                  {shipping === 0 ? 'Ücretsiz' : shipping.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </span>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-base font-medium dark:text-white">Toplam</span>
                <span className="text-base font-medium text-amber-600">
                  {grandTotal.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Güvenlik Bildirimi */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <FaShieldAlt className="h-6 w-6 text-green-500" />
              <div>
                <h4 className="text-sm font-medium dark:text-white">Güvenli Ödeme</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tüm ödemeler 256-bit SSL sertifikası ile şifrelenir
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
