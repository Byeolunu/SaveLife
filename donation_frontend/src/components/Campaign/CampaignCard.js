import React from 'react';
import ProgressBar from '../UI/ProgressBar';
import api from '../../services/api';
import { formatDate } from '../../utils/helpers';

const CampaignCard = ({ campaign, onSelect, isOwner, onUpdate, userType }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await api.delete(`campaigns/${campaign.id}/`);
        onUpdate();
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {campaign.image && (
        <img
          src={campaign.image.startsWith('http') ? campaign.image : `http://localhost:8000${campaign.image}`}
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>

        <div className="mb-4">
          <ProgressBar progress={(campaign.current_amount / campaign.goal) * 100} />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>${campaign.current_amount} raised</span>
            <span>${campaign.goal} goal</span>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <p>Starts on: {formatDate(campaign.start_date)}</p>
          <p>Ends on: {formatDate(campaign.ends_date)}</p>
          <p>Created by: {campaign.created_by_name}</p>
        </div>

        <div className="flex space-x-2 mt-auto">
          {onSelect && userType !== 'org' && (
            <button
              onClick={() => onSelect(campaign)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
            >
              Donate
            </button>
          )}

          {isOwner && (
            <>
              <button
                onClick={() => onSelect(campaign)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex-1"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default CampaignCard;
