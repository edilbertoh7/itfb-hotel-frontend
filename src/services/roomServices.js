import axios from "axios";

const api = axios.create({
    baseURL: 'http://itbf-hoteles.test:8081/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getAllRooms = async () => {
    try {
        const response = await api.get('rooms');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

export const getRoomById = async (id) => {
    try {
        const response = await api.get(`rooms/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

export const createRoom = async (roomData) => {
    try {
        const response = await api.post('/rooms', roomData);
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    };
};

export const updateRoom = async (id, roomData) => {
    try {
        const response = await api.put(`rooms/${id}`, roomData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

export const deleteRoom = async (id) => {
    try {
        await api.delete(`rooms/${id}`);
        return { message: 'Hotel eliminado correctamente' };
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

export const getAllAccommodations = async () => {
    try {
        const response = await api.get('accommodationsassignments');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};


