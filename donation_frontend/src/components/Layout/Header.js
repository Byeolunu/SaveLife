import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import logo from '../../assets/images/logo.png'; 
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() =>
    {
        const checkAuthStatus = async () => {
            try {
                const response = await api.get('http://localhost:8000/api/profile/');
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }

            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                console.error('No refresh token found.');
                return;
            }
            await api.post('http://localhost:8000/api/logout/', { refresh: refreshToken });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-md"
        >
            <header className="bg-white shadow-md p-5">
                <div className="container mx-auto flex items-center p-4">
                    <div className="logo text-2xl font-bold text-blue-600 mr-8 flex flex-cols items-center">
                        <Link to="/">
                        <img src={logo} alt="SaveLife" style={{ width: "60px", height: "auto" }} />
                        </Link> <span className='text-blue-600'>SaveLife</span>
                    </div>
                    <nav className="hidden md:flex flex-1 justify-center space-x-6 items-center text-lg">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link to="/inspiring-stories/1" className="text-gray-700 hover:text-blue-600">Stories</Link>
                        <Link to="/donate" className="text-gray-700 hover:text-blue-600">Donate</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link>
                        <Link to="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link>
                    </nav>
                    <div className="hidden md:flex items-center ml-auto">
                        {isLoggedIn ? (
                            <>
                                <Link to="/settings" className="text-gray-700 hover:text-blue-600 mr-4">
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="text-white bg-pink-500 hover:bg-pink-600 hover:text-white rounded-2xl p-4 border border-gray-300 transition"
                            >
                                Login / Sign Up
                            </Link>
                        )}
                    </div>
                    <button
                        className="md:hidden text-gray-700 ml-4"
                        onClick={toggleMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-md border-t px-4 py-2">
                        <ul className="flex flex-col space-y-2">
                            <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
                            <li><Link to="/inspiring-stories/1" className="text-gray-700 hover:text-blue-600">Stories</Link></li>
                            <li><Link to="/donate" className="text-gray-700 hover:text-blue-600">Donate</Link></li>
                            <li><Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link></li>
                            <li><Link to="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link></li>
                            {isLoggedIn ? (
                                <>
                                    <li><Link to="/settings" className="text-gray-700 hover:text-blue-600">Settings</Link></li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-gray-700 hover:text-blue-600"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600">Login / Sign Up</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </header>
        </motion.header>
    );
};

export default Header;