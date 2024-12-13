import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    activeUsers: 0,
    lowStockProducts: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you would have an endpoint that returns all this data
        const [usersResponse, productsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/users'),
          axios.get('http://localhost:5000/api/products')
        ]);

        setStats({
          totalUsers: usersResponse.data.total || 0,
          activeUsers: usersResponse.data.users.filter(user => user.status === 'active').length,
          totalProducts: productsResponse.data.total || 0,
          lowStockProducts: productsResponse.data.products.filter(product => product.stock < 10).length
        });

        // Mock recent activities for now
        setRecentActivities([
          { id: 1, type: 'user', action: 'New user registered', timestamp: new Date() },
          { id: 2, type: 'product', action: 'Product stock updated', timestamp: new Date() },
          { id: 3, type: 'settings', action: 'Settings updated', timestamp: new Date() }
        ]);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Low Stock Products</h3>
          <p className="text-3xl font-bold">{stats.lowStockProducts}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          to="/admin/products"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-bold mb-2">Manage Products</h3>
          <p className="text-gray-600">Add, edit, or remove products</p>
        </Link>
        <Link
          to="/admin/users"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-bold mb-2">Manage Users</h3>
          <p className="text-gray-600">View and manage user accounts</p>
        </Link>
        <Link
          to="/admin/settings"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-bold mb-2">Settings</h3>
          <p className="text-gray-600">Configure system settings</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: activity.type === 'user' ? '#E3F2FD' : activity.type === 'product' ? '#F3E5F5' : '#E8F5E9' }}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
