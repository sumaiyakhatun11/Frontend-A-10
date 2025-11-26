import React, { useContext } from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut().then(() => {
            alert('logged out')
        }).catch((error) => {
            alert(error)
        });
    }
    return (
        <nav className="w-full bg-[#e6e4e4] text-black shadow-lg px-6 py-4  md:flex  items-center justify-between">

            <div className="text-2xl font-bold text-blue-400 tracking-wide flex items-center gap-2">
                <img className='h-15 rounded-4xl' src={logo} alt="" />
                <Link to="/">Gamehub</Link> {/* FIXED */}
            </div>

            <div className="flex items-center gap-8 text-black-300 font-medium">
                <Link to="/" className="hover:text-blue-400">Home</Link>
                <Link to="/aboutUs" className="hover:text-blue-400">About Us</Link>
                {user && (
                    <Link to="/profile">
                        <img
                            src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-blue-400 hover:scale-105 transition"
                        />
                    </Link>
                )}


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

        </nav>
    );
};

export default Navbar;