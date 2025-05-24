import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CampaignDetail = () => {
    const { id } = useParams(); 
    const [campaign, setCampaign] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await axios.get(`/api/campaigns/${id}/`);
                setCampaign(response.data);
            } catch (err) {
                setError('Impossible de charger les détails de la campagne.');
            }
        };

        fetchCampaign();
    }, [id]);

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!campaign) {
        return <p>Chargement des détails de la campagne...</p>;
    }

    return (
        <div className="campaign-detail-container">
            <h2>{campaign.title}</h2>
            <p><strong>Description:</strong> {campaign.description}</p>
            <p><strong>Créé par:</strong> {campaign.created_by.username}</p>
            <p><strong>Date de début:</strong> {new Date(campaign.start_date).toLocaleDateString()}</p>
            <p><strong>Date de fin:</strong> {new Date(campaign.end_date).toLocaleDateString()}</p>
            <p><strong>Montant collecté:</strong> {campaign.amount_raised} / {campaign.goal_amount}</p>
            <p><strong>Status:</strong> {campaign.is_active ? 'Active' : 'Inactive'}</p>
        </div>
    );
};

export default CampaignDetail;