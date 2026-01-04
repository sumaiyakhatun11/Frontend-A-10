import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => showToast('Logged out', 'success'))
            .catch((error) => showToast(String(error), 'error'));
    };

    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const handleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <nav className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md px-6 py-4 flex items-center justify-between md:justify-between transition-colors duration-300">

            {/* Logo */}
            <div className="flex items-center gap-2 text-2xl font-bold text-neutral-800 dark:text-white tracking-wide">
                <img className="h-15 rounded-4xl" src={logo} alt="Logo" />
                <Link to="/">
                    <span className="text-[#af6723]">Paw</span>Mart
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-neutral-900 dark:text-neutral-100 font-medium">
                <Link to="/" className="hover:text-primary dark:hover:text-primary transition-colors">Home</Link>
                <Link to="/services" className="hover:text-primary dark:hover:text-primary transition-colors">Pets & Supplies</Link>
                <Link to="/about" className="hover:text-primary dark:hover:text-primary transition-colors">About</Link>

                {user && (
                    <>
                        <Link to="/dashboard/add-listing" className="hover:text-primary dark:hover:text-primary transition-colors">Add Listing</Link>
                        <Link to="/dashboard" className="hover:text-primary dark:hover:text-primary transition-colors">Dashboard</Link>
                    </>
                )}

                {/* Theme Toggle */}
                <button
                    onClick={handleTheme}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Toggle theme"
                >
                    {isDark ? '☀️' : '🌙'}
                </button>

                {/* Login/Logout Desktop */}
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 focus:outline-none"
                                aria-label="Profile menu"
                            >
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                                    referrerPolicy="no-referrer"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-primary hover:scale-105 transition"
                                />
                                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                                    <Link
                                        to="/dashboard/profile"
                                        onClick={() => setProfileOpen(false)}
                                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                    >
                                        View Profile
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setProfileOpen(false)}
                                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                    >
                                        Dashboard
                                    </Link>
                                    <div className="border-t border-neutral-200 dark:border-neutral-700 my-1"></div>
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            handleLogout();
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="btn-primary"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="btn-primary"
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center gap-2">
                <button
                    onClick={handleTheme}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                    {isDark ? '☀️' : '🌙'}
                </button>
                <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white dark:bg-neutral-800 shadow-lg rounded-b-xl flex flex-col gap-2 px-4 py-4 border-t border-neutral-200 dark:border-neutral-700">
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-neutral-900 dark:text-neutral-100 hover:text-primary dark:hover:text-primary transition-colors py-2">Home</Link>
                    <Link to="/services" onClick={() => setMenuOpen(false)} className="text-neutral-900 dark:text-neutral-100 hover:text-primary dark:hover:text-primary transition-colors py-2">Pets & Supplies</Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)} className="text-neutral-900 dark:text-neutral-100 hover:text-primary dark:hover:text-primary transition-colors py-2">About</Link>

                    {user && (
                        <>
                            <Link to="/dashboard/add-listing" onClick={() => setMenuOpen(false)} className="text-neutral-900 dark:text-neutral-100 hover:text-primary dark:hover:text-primary transition-colors py-2">Add Listing</Link>
                            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-neutral-900 dark:text-neutral-100 hover:text-primary dark:hover:text-primary transition-colors py-2">Dashboard</Link>
                            <Link to="/dashboard/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 hover:text-primary dark:hover:text-primary transition-colors py-2">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                                    referrerPolicy="no-referrer"
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border-2 border-primary"
                                />
                                Profile
                            </Link>
                        </>
                    )}

                    {/* Login/Logout Mobile */}
                    {user ? (
                        <button
                            onClick={() => {
                                handleLogout(); 
                                setMenuOpen(false);
                            }}
                            className="btn-primary w-full mt-2"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="btn-primary w-full mt-2"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}

        </nav>
    );
};

export default Navbar;
