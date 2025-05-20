// import React, { useEffect, useState } from 'react';
// import api from '../../services/api'; // Adjust the relative path

// const CampaignProgress = () => {
//   const [campaigns, setCampaigns] = useState([]);

//   useEffect(() => {
//     const loadCampaignProgress = async () => {
//       const data = await api.fetchCampaignProgress();
//       setCampaigns(data);
//     };

//     loadCampaignProgress();
//   }, []);

//   return (
//     <div className="space-y-6">
//       {campaigns.map((campaign, index) => (
//         <div key={index} className="border-b pb-4">
//           <h3 className="text-xl font-bold">{campaign.title}</h3>
//           <p>Goal: ${campaign.goal}</p>
//           <p>Raised: ${campaign.current_amount}</p>
//           <p>Contributors: {campaign.contributors}</p>
//           <p>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</p>
//           <p>Status: {campaign.status}</p>
//           <div className="relative w-full bg-gray-200 rounded h-4 mt-2">
//             <div
//               className="absolute top-0 left-0 h-4 bg-blue-600 rounded"
//               style={{ width: `${campaign.progress_percentage}%` }}
//             ></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CampaignProgress;


import React, { useEffect, useState } from 'react';
import { fetchCampaignProgress } from '../../services/api'; // Use named import

const CampaignProgress = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const loadCampaignProgress = async () => {
      const data = await fetchCampaignProgress(); // Call the named function
      setCampaigns(data);
    };

    loadCampaignProgress();
  }, []);

  return (
    <div>
      {campaigns.map((campaign, index) => (
        <div key={index}>
          <h3>{campaign.title}</h3>
          <p>Goal: ${campaign.goal}</p>
          <p>Raised: ${campaign.current_amount}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignProgress;