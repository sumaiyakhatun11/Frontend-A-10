import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut().then(() => {
            showToast('Logged out', 'success')
        }).catch((error) => {
            showToast(String(error), 'error')
        });
    }

    const [isDark, setIsDark] = useState(false);

    // Load theme on mount
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
        <nav className="w-full bg-[#e6e4e4] text-black shadow-lg px-6 py-4  md:flex  items-center justify-between">

            <div className="text-2xl font-bold text-blue-400 tracking-wide flex items-center gap-2">
                <img className='h-15 rounded-4xl' src={logo} alt="" />
                <Link to="/">Gamehub</Link> {/* FIXED */}
            </div>

            <div className="flex items-center gap-8 text-black-300 font-medium">
                <Link to="/" className="hover:text-blue-400">Home</Link>


                <Link
                    to="/services"
                    className="hover:text-blue-400"
                >
                    Services
                </Link>

                {
                    user && (
                        <>
                            <Link
                                to="/addServices"
                                className="hover:text-blue-400"
                            >
                                Add Services
                            </Link>



                            <Link
                                to="/myServices"
                                className="hover:text-blue-400"
                            >
                                My Services
                            </Link>
                            <Link
                                to="/myOrders"
                                className="hover:text-blue-400"
                            >
                                My Orders
                            </Link>
                            <Link to={user ? "/profile" : "/login"}>
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-blue-400 hover:scale-105 transition"
                                />
                            </Link>


                        </>)
                }

                <label className="flex cursor-pointer gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path
                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <input
                        type="checkbox"
                        checked={isDark}
                        onChange={handleTheme}
                        className="toggle theme-controller"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>




                {user ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Login
                    </Link>
                )}
            </div>

        </nav >
    );
};

export default Navbar;