import api from './api';

export const getMagicalGirls = async () => {
    const response = await api.get('magicalGirls');
    return response.data;
};
export const getMagicalGirlById = async (id) => {
    const response = await api.get(`magicalGirls/${id}`);
    return response.data;
};

export const createMagicalGirl = async (magicalGirl) => {
    const response = await api.post('magicalGirls', magicalGirl);
    return response.data;
};

export const updateMagicalGirl = async (id, magicalGirl) => {
    const response = await api.put(`magicalGirls/${id}`, magicalGirl);
    return response.data;
};

export const deleteMagicalGirl = async (id) => {
    const response = await api.delete(`magicalGirls/${id}`);
    return response.data;
};