import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ myListings: 0, myOrders: 0, totalViews: 0 });
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);

  const COLORS = ['#713600', '#ea580c', '#f59e0b', '#84cc16'];

  useEffect(() => {
    document.title = 'Dashboard | PawMart';

    const fetchStats = async () => {
      try {
        const [listingsRes, ordersRes] = await Promise.all([
          axios.get(`https://backend-a10.vercel.app/services?email=${user?.email}`),
          axios.get(`https://backend-a10.vercel.app/orders?email=${user?.email}`)
        ]);

        const listingsData = listingsRes.data;
        const ordersData = ordersRes.data;

        setStats({
          myListings: listingsData.length,
          myOrders: ordersData.length,
          totalViews: listingsData.reduce((acc, item) => acc + (item.views || 0), 0)
        });

        setRecentListings(listingsData.slice(0, 3));

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const activity = months.map((month, i) => ({
          month,
          listings: listingsData.length ? Math.max(1, Math.floor(listingsData.length / 6)) : 0,
          orders: ordersData.length ? Math.max(1, Math.floor(ordersData.length / 6)) : 0
        }));

        setActivityData(activity);

        setDistributionData([
          { name: 'Listings', value: listingsData.length },
          { name: 'Orders', value: ordersData.length }
        ]);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (user?.email) fetchStats();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-24">

      {/* ================= WELCOME ================= */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.displayName} 👋</h1>
        <p className="text-neutral-600">Here’s what’s happening today.</p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: 'My Listings', value: stats.myListings, icon: '📝' },
          { title: 'My Orders', value: stats.myOrders, icon: '🛒' },
          { title: 'Views', value: stats.totalViews, icon: '👁️' },
          { title: 'Profile', value: '100%', icon: '✅' }
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-xl shadow-md">
            <p className="text-2xl">{stat.icon}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-neutral-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Activity */}
        <div className="rounded-xl p-6 min-h-[420px] shadow-md">
          <h2 className="text-xl font-bold mb-6">📈 Activity Trends</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="listings" stroke="#713600" strokeWidth={3} />
                <Line dataKey="orders" stroke="#ea580c" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance */}
        <div className="rounded-xl p-6 min-h-[420px] shadow-md">
          <h2 className="text-xl font-bold mb-6">📊 Performance Overview</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="listings" fill="#713600" />
                <Bar dataKey="orders" fill="#ea580c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ================= ACTIONS + LISTINGS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        <div className="rounded-xl p-6 min-h-[360px] shadow-md">
          <h2 className="text-xl font-bold mb-4">⚡ Quick Actions</h2>
          <Link to="/dashboard/add-listing" className="block p-3 hover:bg-neutral-100 rounded-lg">➕ Add Listing</Link>
          <Link to="/services" className="block p-3 hover:bg-neutral-100 rounded-lg">🔍 Browse Pets</Link>
          <Link to="/dashboard/profile" className="block p-3 hover:bg-neutral-100 rounded-lg">⚙️ Edit Profile</Link>
        </div>

        <div className="rounded-xl p-6 min-h-[360px] shadow-md">
          <h2 className="text-xl font-bold mb-4">📋 Recent Listings</h2>
          {recentListings.length ? recentListings.map(item => (
            <div key={item._id} className="flex gap-3 mb-3">
              <img src={item.image} className="w-12 h-12 rounded object-cover" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm">{item.price} tk</p>
              </div>
            </div>
          )) : <p>No listings yet</p>}
        </div>

      </div>

      {/* ================= PIE ================= */}
      <div className="rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">🎯 Distribution</h2>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={distributionData} dataKey="value" outerRadius={90}>
                {distributionData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default DashboardOverview;
