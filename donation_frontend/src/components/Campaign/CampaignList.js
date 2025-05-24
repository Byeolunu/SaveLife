import CampaignCard from './CampaignCard';

const CampaignList = ({ campaigns, onSelectCampaign, isOwner, onUpdate, userType }) => {
  if (campaigns.length === 0) {
    return <div className="text-gray-500">No campaigns found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campaigns.map(campaign => (
        <CampaignCard 
          key={campaign.id}
          campaign={campaign}
          onSelect={onSelectCampaign}
          isOwner={typeof isOwner === 'function' ? isOwner(campaign) : isOwner}
          onUpdate={onUpdate}
          userType={userType}
        />
      ))}
    </div>
  );
};

export default CampaignList;