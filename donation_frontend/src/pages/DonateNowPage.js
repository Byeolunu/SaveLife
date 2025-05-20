import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import api from '../services/api';
import CampaignList from '../components/Campaign/CampaignList';
import DonationForm from '../components/Donation/DonationForm';
import {motion} from 'framer-motion';
const DonateNowPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get('campaigns/');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCampaigns();
  }, []);

  const handleDonate = async (donationData) => {
    try {
      console.log('Sending Donation Payload:', {
        campaign: selectedCampaign.id,
        amount: donationData.amount,
        is_anonymous: donationData.isAnonymous,
        message: donationData.message,
      });
  
      const response = await api.post('donations/', {
        campaign: selectedCampaign.id,
        amount: donationData.amount,
        is_anonymous: donationData.isAnonymous,
        message: donationData.message,
      });
  
      console.log('Donation successful:', response.data);
      alert('Donation successful!');
      setSelectedCampaign(null);
  
      // Refresh campaigns to update progress
      const campaignsResponse = await api.get('campaigns/');
      setCampaigns(campaignsResponse.data);
    } catch (error) {
      console.error('Error making donation:', error.response?.data || error.message);
      alert(`Donation failed: ${error.response?.data?.detail || 'Please try again.'}`);
    }
  };

  return (
    <div className='bg-gray-50'>
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="shadow-md"
    >
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-7xl p-6 font-bold text-center text-blue-700">Donate Now</h1>
      <p className="text-lg mb-10 text-center">Your contribution can make a difference!</p>
      
      {selectedCampaign ? (
        <div className="rounded-lg shadow-md p-6 mb-8 bg-white">
          <h2 className="text-xl font-semibold mb-4">Donate to {selectedCampaign.title}</h2>
          <DonationForm 
            campaign={selectedCampaign} 
            onSubmit={handleDonate} 
            onCancel={() => setSelectedCampaign(null)}
          />
        </div>
      ) : (
        <CampaignList 
          campaigns={campaigns} 
          onSelectCampaign={setSelectedCampaign} 
          userType={user?.user_type}
        />
      )}
    </div>
    </motion.header>
    </div>
  );
};

export default DonateNowPage;