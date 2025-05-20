import React, { useState } from 'react';
import axios from 'axios';
import HomePage from '../../pages/HomePage';
import { redirect } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: email, 
        password,
      });

      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        setSuccess(true);
        console.log('Login successful:', response.data);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Une erreur est survenue lors de la connexion.');
      console.error('Login error:', err.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Login successful!</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <Link to="/forgot-password"><p className="text-sm text-gray-600">Forgot Password?</p></Link>
            <Link to="/register">
              <button className="bg-blue-400 px-4 py-2 rounded text-white hover:text-blue-500 hover:bg-white">
                Sign Up
              </button>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {success && (
          <div>
            <p className="text-center mt-4">Redirecting to homepage...</p>
            {setTimeout(() => {
              window.location.href = `/?user=${encodeURIComponent(email)}`;
            }, 2000)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;