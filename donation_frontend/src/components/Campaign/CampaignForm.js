import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = ({ onSubmitSuccess, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        goal_amount: initialData?.goal_amount || '',
        start_date: initialData?.start_date || '',
        end_date: initialData?.end_date || '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            if (initialData) {
                // Update existing campaign
                await axios.put(`/api/campaigns/${initialData.id}/`, formData);
            } else {
                // Create new campaign
                await axios.post('/api/campaigns/', formData);
            }
            setSuccess(true);
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            setError('Une erreur est survenue lors de l’enregistrement de la campagne.');
        }
    };

    return (
        <div className="campaign-form-container">
            <h2>{initialData ? 'Modifier la campagne' : 'Créer une campagne'}</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Campagne enregistrée avec succès !</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="goal_amount">Objectif (montant)</label>
                    <input
                        type="number"
                        id="goal_amount"
                        name="goal_amount"
                        value={formData.goal_amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="start_date">Date de début</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="end_date">Date de fin</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{initialData ? 'Mettre à jour' : 'Créer'}</button>
            </form>
        </div>
    );
};

export default CampaignForm;