import ProgressBar from '../UI/ProgressBar';
import api from '../../services/api';
import { formatDate } from '../../utils/helpers';

const CampaignCard = ({ campaign, onSelect, isOwner,  userType }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await api.delete(`campaigns/${campaign.id}/delete/`);
        alert('Campaign deleted successfully! Refresh the page to see changes.');
      } catch (error) {
        console.error('Error deleting campaign:', error);
        alert('ERROR');
      }
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      title: prompt('Enter new title:', campaign.title),
      description: prompt('Enter new description:', campaign.description),
      goal: parseInt(prompt('Enter new goal:', campaign.goal), 10),
      start_date: campaign.start_date,
      ends_date: campaign.ends_date,
    };

    try {
      await api.put(`campaigns/${campaign.id}/`, updatedData);
      alert('Campaign updated successfully! Refresh the page to see changes.');
    } catch (error) {
      console.error('Error updating campaign:', error.response?.data || error.message);
      alert('Failed to update the campaign. Please try again.');
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

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-500">{campaign.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
          <div className="mb-4">
            <ProgressBar progress={Math.min((campaign.current_amount / campaign.goal) * 100, 100)} />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{campaign.current_amount} DH raised</span>
              <span>{campaign.goal} DH goal</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            <p>Starts on: {formatDate(campaign.start_date)}</p>
            <p>Ends on: {formatDate(campaign.ends_date)}</p>
            <p>Created by: {campaign.created_by_name}</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-auto">
          {onSelect && userType !== 'org' && (
            <button
              onClick={() => onSelect(campaign)}
              className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-700 flex-1"
            >
              Donate
            </button>
          )}
          {isOwner && (
            <>
              <button
                onClick={handleUpdate}
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
