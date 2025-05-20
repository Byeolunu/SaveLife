import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
const UserPage = () => {
    const [user, setUser] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('/api/user/profile/');
                const campaignsResponse = await axios.get('/api/campaigns/my-campaigns/');
                const donationsResponse = await axios.get('/api/donations/my-donations/');
                setUser(userResponse.data);
                setCampaigns(campaignsResponse.data);
                setDonations(donationsResponse.data);
            } catch (err) {
                setError('Impossible de charger les données utilisateur.');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!user) {
        return <p>Chargement des informations utilisateur...</p>;
    }

    return (
        <div className="user-page">
            <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="shadow-md"
    >
            <h1>Profil de {user.username}</h1>
            <section className="user-info">
                <h2>Informations personnelles</h2>
                <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Type d'utilisateur :</strong> {user.user_type === 'org' ? 'Organisation' : 'Donateur'}</p>
            </section>
            {user.user_type === 'org' && (
                <section className="user-organization-info">
                    <h2>Informations sur l'organisation</h2>
                    <p><strong>Nom de l'organisation :</strong> {user.organization_name}</p>
                    <p><strong>Description :</strong> {user.organization_description}</p>
                
                <h2>Mes campagnes</h2>
                {campaigns.length > 0 ? (
                    <ul>
                        {campaigns.map((campaign) => (
                            <li key={campaign.id}>
                                <strong>{campaign.title}</strong> - {campaign.amount_raised} / {campaign.goal_amount}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Vous n'avez aucune campagne active.</p>
                )}
            </section>
            )}
            
            <section className="user-donations">
                <h2>Mes dons</h2>
                {donations.length > 0 ? (
                    <ul>
                        {donations.map((donation) => (
                            <li key={donation.id}>
                                <strong>{donation.campaign.title}</strong> - {donation.amount} €
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Vous n'avez effectué aucun don.</p>
                )}
            </section>
            </motion.header>
        </div>
    );
};

export default UserPage;