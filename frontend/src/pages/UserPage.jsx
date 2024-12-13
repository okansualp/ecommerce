import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaHeart, FaHistory, FaSignOutAlt } from 'react-icons/fa';

function UserPage({ favorites = [], cartItems = [] }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, City',
    phone: '+90 555 123 4567'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    // TODO: API call to update user info
  };

  const orderHistory = [
    {
      id: 1,
      date: '2023-12-10',
      total: 1250,
      status: 'Teslim Edildi',
      items: [
        { name: 'Vintage Saat', quantity: 1, price: 750 },
        { name: 'Retro Gözlük', quantity: 1, price: 500 }
      ]
    },
    {
      id: 2,
      date: '2023-12-05',
      total: 2100,
      status: 'Kargoda',
      items: [
        { name: 'Antika Vazo', quantity: 1, price: 2100 }
      ]
    }
  ];

  const renderProfile = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">İsim</label>
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-posta</label>
            <input
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adres</label>
            <textarea
              value={editedUser.address}
              onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
            <input
              type="tel"
              value={editedUser.phone}
              onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Kaydet
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditedUser(user);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              İptal
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold dark:text-white">{user.name}</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Düzenle
            </motion.button>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">E-posta:</span> {user.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Adres:</span> {user.address}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Telefon:</span> {user.phone}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderFavorites = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((product) => (
        <motion.div
          key={product.id}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium dark:text-white">{product.name}</h3>
            <p className="text-amber-600 font-medium mt-2">
              {product.price.toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              })}
            </p>
          </div>
        </motion.div>
      ))}
      {favorites.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
          Henüz favori ürününüz bulunmuyor.
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      {orderHistory.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sipariş No: #{order.id}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tarih: {new Date(order.date).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-amber-600">
                {order.total.toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY'
                })}
              </p>
              <p className="text-sm font-medium text-green-500">{order.status}</p>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 pt-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <div className="flex items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.name}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 ml-2">
                    x{item.quantity}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {item.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      {orderHistory.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Henüz siparişiniz bulunmuyor.
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col space-y-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FaUser />
                <span>Profil</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  activeTab === 'favorites'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FaHeart />
                <span>Favoriler</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  activeTab === 'orders'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FaHistory />
                <span>Siparişlerim</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <FaSignOutAlt />
                <span>Çıkış Yap</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'favorites' && renderFavorites()}
          {activeTab === 'orders' && renderOrders()}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
