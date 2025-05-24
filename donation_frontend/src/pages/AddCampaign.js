import React, { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
const AddCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    start_date: '',
    ends_date: '',
  });
  const [image, setImage] = useState(null); 
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.ends_date) <= new Date(formData.start_date)) {
      setMessage('End date must be after the start date.');
      return;
    }
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('goal', formData.goal);
      data.append('start_date', formData.start_date);
      data.append('ends_date', formData.ends_date);
      if (image) {
        data.append('image', image);
      }
      const response = await api.post('campaigns/create/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Campaign created successfully!');
      console.log('Response:', response.data);
      setFormData({
        title: '',
        description: '',
        goal: '',
        start_date: '',
        ends_date: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error creating campaign:', error.response?.data || error.message);
      setMessage(error.response?.data?.detail || 'Failed to create campaign.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="shadow-md"
    >
      <h1 className="text-2xl font-bold mb-4">Create a New Campaign</h1>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter campaign title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter campaign description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
            Goal (in DH)
          </label>
          <input
            type="number"
            name="goal"
            id="goal"
            value={formData.goal}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter fundraising goal"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_date">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ends_date">
            End Date
          </label>
          <input
            type="date"
            name="ends_date"
            id="ends_date"
            value={formData.ends_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Campaign Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Campaign
        </button>
      </form>
      </motion.header>
    </div>
  );
};
export default AddCampaign;