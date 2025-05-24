import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        user_type: '', 
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const pageVariants = {
        initial: { opacity: 0, x: '-100vw' },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '100vw' },
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }
        if (!formData.user_type) {
            setError('Veuillez sélectionner un type d’utilisateur.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                user_type: formData.user_type,
            });

            if (response.status === 201) {
                setSuccess(true);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    user_type: '',
                });

                
                setTimeout(() => {
                    window.location.href = `/?user=${encodeURIComponent(formData.email)}`;
                }, 2000);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Une erreur est survenue lors de l’inscription.');
            }
            console.error(err);
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-gray-100"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Inscription</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && (
                    <p className="text-green-500 text-center mb-4">
                        Inscription réussie ! Redirection vers la page d’accueil...
                    </p>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre nom d'utilisateur"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirmez votre mot de passe"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="user_type" className="block text-gray-700 font-medium mb-1">
                            Type d'utilisateur
                        </label>
                        <select
                            id="user_type"
                            name="user_type"
                            value={formData.user_type}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">-- Sélectionnez un type --</option>
                            <option value="user">Utilisateur</option>
                            <option value="org">Organisation</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        S'inscrire
                    </button>
                </form>
                {/* </motion.div> */}
                <p className="text-center text-gray-600 mt-4">
                    Déjà un compte ?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Register;