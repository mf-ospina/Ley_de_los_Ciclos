import api from './api';

export const getMagicalGirls = async () => {
    const response = await api.get('MagicalGirls');
    return response.data;
};

export const getMagicalGirlById = async (id) => {
    const response = await api.get(`MagicalGirls/${id}`);
    return response.data;
};

export const createMagicalGirl = async (magicalGirl) => {
    const response = await api.post('magicalGirlsController', magicalGirl);
    return response.data;
};

export const updateMagicalGirl = async (id, magicalGirl) => {
    const response = await api.put(`magicalGirlsController/${id}`, magicalGirl);
    return response.data;
};

export const deleteMagicalGirl = async (id) => {
    const response = await api.delete(`magicalGirlsController/${id}`);
    return response.data;
};
