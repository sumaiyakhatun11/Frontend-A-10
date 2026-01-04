import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { showToast } from '../Shared/toast';
import logo from '../assets/logo.png';

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

    const handleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                showToast('Logged out successfully', 'success');
                navigate('/login');
            })
            .catch((error) => showToast(String(error), 'error'));
    };

    const isAdmin = user?.email === 'admin@pawmart.com';

    const menuItems = [
        { label: 'Dashboard Overview', path: '/dashboard', icon: '📊', role: 'user' },
        { label: 'Add Listing', path: '/dashboard/add-listing', icon: '➕', role: 'user' },
        { label: 'My Listings', path: '/dashboard/my-listings', icon: '📝', role: 'user' },
        { label: 'My Orders', path: '/dashboard/my-orders', icon: '🛒', role: 'user' },
        { label: 'My Profile', path: '/dashboard/profile', icon: '👤', role: 'user' },
        { label: 'All Users', path: '/dashboard/all-users', icon: '👥', role: 'admin' },
        { label: 'All Listings', path: '/dashboard/all-listings', icon: '📋', role: 'admin' },
    ];

    const filteredMenuItems = menuItems.filter(
        item => item.role === 'user' || (item.role === 'admin' && isAdmin)
    );

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col gap-y-4">
            {/* Top Navbar */}
            <nav className="sticky top-0 z-40 lg:z-50 w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md px-6 py-4 transition-colors duration-300 flex justify-between items-center gap-x-6">
                {/* Left */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors lg:hidden"
                    >
                        <svg
                            className="w-6 h-6 text-neutral-900 dark:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2 text-2xl font-bold text-neutral-800 dark:text-white tracking-wide">
                        <img className="h-12 w-12 rounded-2xl object-cover" src={logo} alt="Logo" />
                        <Link to="/">
                            <span className="text-[#af6723]">Paw</span>Mart
                        </Link>
                    </div>

                    <span className="hidden md:inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full ml-3">
                        {isAdmin ? '👑 Admin' : '👤 User'} Dashboard
                    </span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Site
                    </Link>

                    <button
                        onClick={handleTheme}
                        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    <img
                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                        referrerPolicy="no-referrer"
                        alt="Profile"
                        className="hidden md:block w-10 h-10 rounded-full border-2 border-primary object-cover"
                    />

                    <button
                        onClick={handleLogout}
                        className="btn-primary"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Content area */}
            <div className="flex gap-x-6">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:sticky top-16 lg:top-0 left-0 z-[999] lg:z-auto h-[calc(100vh-64px)] lg:h-screen w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-transform ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
                >
                    <div className="h-full px-4 py-6 overflow-y-auto">
                        <ul className="space-y-2">
                            {filteredMenuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-neutral-700 dark:text-neutral-200 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary rounded-lg transition-all duration-300"
                                    >
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

                {/* Main content */}
                <main className="flex-1 min-h-screen p-6 lg:ml-64">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
