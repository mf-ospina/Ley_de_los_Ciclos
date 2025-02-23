import api from './api';

export const getMagicalGirls = async (estado = '') => {
    const response = await api.get('magicalGirlsController', { params: { estado } });
    return response.data;
};

export const getMagicalGirlById = async (id) => {
    const response = await api.get(`magicalGirlsController/${id}`);
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
