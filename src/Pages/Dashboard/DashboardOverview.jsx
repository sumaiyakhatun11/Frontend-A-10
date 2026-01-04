import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

                const generateActivityData = () => {
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    const currentMonth = new Date().getMonth();
                    const last6Months = [];

                    for (let i = 5; i >= 0; i--) {
                        const monthIndex = (currentMonth - i + 12) % 12;
                        const monthData = { month: months[monthIndex], listings: 0, orders: 0 };

                        listingsData.forEach(listing => {
                            if (listing.createdAt) {
                                const listingMonth = new Date(listing.createdAt).getMonth();
                                if (listingMonth === monthIndex) monthData.listings++;
                            }
                        });

                        ordersData.forEach(order => {
                            if (order.createdAt) {
                                const orderMonth = new Date(order.createdAt).getMonth();
                                if (orderMonth === monthIndex) monthData.orders++;
                            }
                        });

                        if (monthData.listings === 0 && listingsData.length > 0)
                            monthData.listings = Math.max(1, Math.floor(listingsData.length / 6) + Math.floor(Math.random() * 3));

                        if (monthData.orders === 0 && ordersData.length > 0)
                            monthData.orders = Math.max(1, Math.floor(ordersData.length / 6) + Math.floor(Math.random() * 2));

                        last6Months.push(monthData);
                    }
                    return last6Months;
                };

                const generateDistributionData = () => {
                    const totalListings = listingsData.length;
                    const totalOrders = ordersData.length;
                    const inProgress = Math.ceil(totalOrders * 0.4);
                    const completed = totalOrders - inProgress;

                    return [
                        { name: 'Active Listings', value: totalListings || 0 },
                        { name: 'Total Orders', value: totalOrders || 0 },
                        { name: 'In Progress', value: inProgress || 0 },
                        { name: 'Completed', value: completed || 0 },
                    ].filter(item => item.value > 0);
                };

                setActivityData(generateActivityData());
                setDistributionData(generateDistributionData());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };

        if (user?.email) fetchStats();
    }, [user?.email]);

    const statCards = [
        { title: 'My Listings', value: stats.myListings, icon: '📝', color: 'bg-blue-500', link: '/dashboard/my-listings' },
        { title: 'My Orders', value: stats.myOrders, icon: '🛒', color: 'bg-green-500', link: '/dashboard/my-orders' },
        { title: 'Total Views', value: stats.totalViews, icon: '👁️', color: 'bg-purple-500', link: '#' },
        { title: 'Profile', value: '100%', icon: '✅', color: 'bg-orange-500', link: '/dashboard/profile' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-12">
            {/* Welcome Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                    Welcome back, {user?.displayName || 'User'}! 👋
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Here's what's happening with your PawMart account today.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
                {statCards.map((stat, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                        <Link to={stat.link}>
                            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-neutral-200 dark:border-neutral-700 hover:scale-105">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                                        {stat.icon}
                                    </div>
                                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{stat.value}</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.title}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 mb-12">
                {/* Activity Trend Chart */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                        <span>📈</span> Activity Trends
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend />
                            <Line type="monotone" dataKey="listings" stroke="#713600" strokeWidth={3} name="Listings" dot={{ fill: '#713600', r: 5 }} />
                            <Line type="monotone" dataKey="orders" stroke="#ea580c" strokeWidth={3} name="Orders" dot={{ fill: '#ea580c', r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Orders vs Listings Bar Chart */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                        <span>📊</span> Performance Overview
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend />
                            <Bar dataKey="listings" fill="#713600" name="Listings" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="orders" fill="#ea580c" name="Orders" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Quick Actions + Recent Listings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 mb-12">
                {/* Quick Actions */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>⚡</span> Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <Link to="/dashboard/add-listing" className="flex items-center gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                            <span className="text-2xl">➕</span>
                            <div>
                                <p className="font-semibold text-neutral-900 dark:text-white">Add New Listing</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Create a new pet listing</p>
                            </div>
                        </Link>
                        <Link to="/services" className="flex items-center gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                            <span className="text-2xl">🔍</span>
                            <div>
                                <p className="font-semibold text-neutral-900 dark:text-white">Browse Pets</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Explore available pets</p>
                            </div>
                        </Link>
                        <Link to="/dashboard/profile" className="flex items-center gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                            <span className="text-2xl">⚙️</span>
                            <div>
                                <p className="font-semibold text-neutral-900 dark:text-white">Edit Profile</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Update your information</p>
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Recent Listings */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <span>📋</span> Recent Listings
                        </h2>
                        <Link to="/dashboard/my-listings" className="text-sm text-primary hover:underline">View All</Link>
                    </div>
                    {recentListings.length > 0 ? (
                        <div className="space-y-3">
                            {recentListings.map(listing => (
                                <div key={listing._id} className="flex items-center gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                                    <img src={listing.image} alt={listing.name} className="w-12 h-12 rounded-lg object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-neutral-900 dark:text-white truncate">{listing.name}</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{listing.price} tk</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-neutral-600 dark:text-neutral-400 text-center py-4">No listings yet. Create your first listing!</p>
                    )}
                </motion.div>
            </div>

            {/* Account Summary + Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
                {/* Distribution Pie Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 border border-neutral-200 dark:border-neutral-700 lg:col-span-1">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>🎯</span> Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={distributionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {distributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Account Summary Stats */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 border border-neutral-200 dark:border-neutral-700 lg:col-span-2">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                        <span>📊</span> Account Summary
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                        <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-orange-500/10 dark:bg-neutral-700 rounded-xl border-2 border-primary/20">
                            <p className="text-4xl mb-3">🎯</p>
                            <p className="text-3xl font-bold text-primary mb-1">{stats.myListings}</p>
                            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Listings</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:bg-neutral-700 rounded-xl border-2 border-green-500/20">
                            <p className="text-4xl mb-3">✅</p>
                            <p className="text-3xl font-bold text-green-600 mb-1">{stats.myOrders}</p>
                            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Orders</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:bg-neutral-700 rounded-xl border-2 border-orange-500/20">
                            <p className="text-4xl mb-3">⭐</p>
                            <p className="text-3xl font-bold text-orange-600 mb-1">100%</p>
                            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Profile Complete</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardOverview;
