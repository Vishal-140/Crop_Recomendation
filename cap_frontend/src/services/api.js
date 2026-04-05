import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export const predictCrop = async (data) => {
    const response = await axios.post(`${API_BASE}/predict`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

export const getCrops = async () => {
    const response = await axios.get(`${API_BASE}/crops`);
    return response.data;
};

export const healthCheck = async () => {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
};
