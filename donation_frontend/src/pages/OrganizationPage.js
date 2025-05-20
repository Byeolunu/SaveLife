import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import api from '../services/api';
import CampaignForm from '../components/Campaign/CampaignForm';
import CampaignList from '../components/Campaign/CampaignList';
import DonationHistory from '../components/Donation/DonationHistory';
import { motion } from 'framer-motion';
const OrganizationPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignsRes, donationsRes] = await Promise.all([
          api.get('my-campaigns/'),
          api.get('donations/')
        ]);
        setCampaigns(campaignsRes.data);
        setDonations(donationsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateCampaign = async (campaignData) => {
    try {
      const formData = new FormData();
      Object.entries(campaignData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      const response = await api.post('campaigns/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCampaigns([...campaigns, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="shadow-md"
    >
      <h1 className="text-3xl font-bold mb-8">Organization Dashboard</h1>
      
      <div className="mb-8">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Create New Campaign'}
        </button>
        
        {showForm && (
          <div className="mt-4 bg-white rounded-lg shadow-md p-6">
            <CampaignForm onSubmit={handleCreateCampaign} />
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Campaigns</h2>
        <CampaignList 
          campaigns={campaigns} 
          isOwner={true} 
          onUpdate={() => {
            // Refresh campaigns
            api.get('my-campaigns/').then(res => setCampaigns(res.data));
          }}
        />
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Donation History</h2>
        <DonationHistory donations={donations} />
      </div>
    </motion.header>
    </div>
  );
};

export default OrganizationPage;