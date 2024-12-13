import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes
} from 'react-icons/fa';

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/products', icon: FaBox, label: 'Ürünler' },
    { path: '/admin/users', icon: FaUsers, label: 'Kullanıcılar' },
    { path: '/admin/analytics', icon: FaChartBar, label: 'Analizler' },
    { path: '/admin/settings', icon: FaCog, label: 'Ayarlar' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobil Menü Butonu */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Kenar Çubuğu */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? '240px' : '0px',
          opacity: isSidebarOpen ? 1 : 0
        }}
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg z-40 overflow-hidden ${
          isSidebarOpen ? 'w-60' : 'w-0'
        }`}
      >
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <h1 className="text-xl font-bold text-amber-600">Admin Panel</h1>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-100 dark:bg-amber-900 text-amber-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Ana İçerik */}
      <main
        className={`transition-all duration-200 ${
          isSidebarOpen ? 'lg:ml-60' : 'lg:ml-0'
        }`}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
