import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CogIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/react/outline'

const UserPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')

  const userInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+90 555 123 4567',
    address: 'İstanbul, Türkiye'
  }

  const orderHistory = [
    {
      id: 1,
      date: '2024-01-10',
      status: 'Teslim Edildi',
      total: 1299.99,
      items: [
        { name: 'Ürün 1', quantity: 2, price: 649.99 }
      ]
    }
  ]

  const tabs = [
    { id: 'orders', name: 'Siparişlerim', icon: ShoppingBagIcon },
    { id: 'favorites', name: 'Favorilerim', icon: HeartIcon },
    { id: 'settings', name: 'Hesap Ayarları', icon: CogIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profil Kartı */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
              {userInfo.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{userInfo.name}</h1>
              <p className="text-gray-500">{userInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Sekmeler */}
        <div className="bg-gray-50 rounded-2xl shadow-sm mb-8">
          <nav className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-4 flex items-center justify-center space-x-2 bg-white ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-500 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sekme İçerikleri */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Siparişler */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orderHistory.map(order => (
                <div key={order.id} className="border border-gray-100 rounded-lg p-6 hover:border-indigo-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">Sipariş No: #{order.id}</p>
                      <p className="text-sm text-gray-500">Tarih: {order.date}</p>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-full bg-green-50 text-green-700 font-medium">
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                        <span className="text-gray-700">{item.name} x{item.quantity}</span>
                        <span className="font-medium">{item.price} TL</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Toplam</span>
                      <span className="font-medium text-indigo-600">{order.total} TL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Favoriler */}
          {activeTab === 'favorites' && (
            <div className="text-center py-12">
              <HeartIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Henüz favori ürününüz bulunmuyor.</p>
            </div>
          )}

          {/* Hesap Ayarları */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    defaultValue={userInfo.name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    defaultValue={userInfo.email}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    defaultValue={userInfo.phone}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Adres
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    defaultValue={userInfo.address}
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPage
