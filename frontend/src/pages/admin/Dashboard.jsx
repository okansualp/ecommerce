import React from 'react';
import { motion } from 'framer-motion';
import {
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
} from 'react-icons/fa';

function Dashboard() {
  const stats = [
    {
      id: 1,
      title: 'Toplam Satış',
      value: '₺24,500',
      change: '+12%',
      icon: FaMoneyBillWave,
      color: 'bg-green-500',
    },
    {
      id: 2,
      title: 'Aktif Kullanıcılar',
      value: '1,234',
      change: '+25%',
      icon: FaUsers,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      title: 'Yeni Siparişler',
      value: '45',
      change: '+8%',
      icon: FaShoppingCart,
      color: 'bg-amber-500',
    },
    {
      id: 4,
      title: 'Dönüşüm Oranı',
      value: '%3.24',
      change: '+2%',
      icon: FaChartLine,
      color: 'bg-purple-500',
    },
  ];

  const recentOrders = [
    {
      id: 1,
      customer: 'Ahmet Yılmaz',
      date: '13 Aralık 2023',
      amount: '₺750',
      status: 'Tamamlandı',
    },
    {
      id: 2,
      customer: 'Ayşe Demir',
      date: '13 Aralık 2023',
      amount: '₺1,250',
      status: 'İşleniyor',
    },
    {
      id: 3,
      customer: 'Mehmet Kaya',
      date: '12 Aralık 2023',
      amount: '₺2,100',
      status: 'Kargoda',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          Rapor İndir
        </button>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</h3>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Satış Grafiği</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Grafik Gelecek</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Ziyaretçi Analizi</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Grafik Gelecek</p>
          </div>
        </div>
      </div>

      {/* Son Siparişler */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold dark:text-white">Son Siparişler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.customer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {order.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Tamamlandı'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'İşleniyor'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
