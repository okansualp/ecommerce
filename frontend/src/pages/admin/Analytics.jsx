import React from 'react';
import { motion } from 'framer-motion';
import {
  FaChartLine,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaDownload,
} from 'react-icons/fa';

function Analytics() {
  // Örnek veriler
  const metrics = [
    {
      id: 1,
      title: 'Toplam Gelir',
      value: '₺124,500',
      change: '+12.5%',
      period: 'Son 30 gün',
      icon: FaMoneyBillWave,
      color: 'bg-green-500',
    },
    {
      id: 2,
      title: 'Toplam Sipariş',
      value: '1,543',
      change: '+8.2%',
      period: 'Son 30 gün',
      icon: FaShoppingCart,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      title: 'Yeni Müşteriler',
      value: '324',
      change: '+15.3%',
      period: 'Son 30 gün',
      icon: FaUsers,
      color: 'bg-amber-500',
    },
    {
      id: 4,
      title: 'Dönüşüm Oranı',
      value: '%3.6',
      change: '+2.1%',
      period: 'Son 30 gün',
      icon: FaChartLine,
      color: 'bg-purple-500',
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: 'Vintage Saat',
      sales: 245,
      revenue: '₺183,750',
      growth: '+12%',
    },
    {
      id: 2,
      name: 'Retro Gözlük',
      sales: 189,
      revenue: '₺94,500',
      growth: '+8%',
    },
    {
      id: 3,
      name: 'Antika Vazo',
      sales: 156,
      revenue: '₺327,600',
      growth: '+15%',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Analitik</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center space-x-2"
        >
          <FaDownload />
          <span>Rapor İndir</span>
        </motion.button>
      </div>

      {/* Metrikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.color}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600">{metric.change}</span>
            </div>
            <h3 className="text-2xl font-bold dark:text-white">{metric.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {metric.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {metric.period}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">
            Satış Trendi
          </h2>
          <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Grafik Gelecek</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">
            Kategori Dağılımı
          </h2>
          <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded">
            <p className="text-gray-500 dark:text-gray-400">Grafik Gelecek</p>
          </div>
        </div>
      </div>

      {/* En Çok Satan Ürünler */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold dark:text-white">
            En Çok Satan Ürünler
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ürün
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Satış Adedi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Gelir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Büyüme
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {product.sales}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {product.revenue}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.growth}
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

export default Analytics;
