import React, { useState } from 'react';
import ProgressBar from '../UI/ProgressBar';

const DonationForm = ({ campaign, onSubmit, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }
    const payload = {
      amount: parseFloat(amount),
      isAnonymous,
      message,
    };
    console.log('Form Data:', payload); // Debugging
    onSubmit(payload);
  };

  const progress = campaign.goal > 0 
    ? Math.min((campaign.current_amount / campaign.goal) * 100, 100) 
    : 0;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">{campaign.title}</h3>
        <ProgressBar progress={progress} />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>${campaign.current_amount} raised</span>
          <span>${campaign.goal} goal</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="amount">
          Amount ($)
        </label>
        <input
          type="number"
          id="amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="mr-2"
          />
          <span>Donate anonymously</span>
        </label>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="message">
          Message (Optional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows="3"
        />
      </div>
      
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
        >
          Donate Now
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DonationForm;