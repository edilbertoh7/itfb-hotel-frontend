import axios from 'axios';

const api = axios.create({
    baseURL: 'http://itbf-hoteles.test:8081/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },  
});

// consulto todos los hoteles
export const getHotels = async () => {
    try {
        const response = await api.get('/hotels');
        return response.data;
    } catch (error) {
        // console.log(error.response.dat);
        
        console.error(error);
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

// crear un hotel
export const createHotel = async (hotel) => {
    try {
        const response = await api.post('/hotels', hotel);
        return response.data;
    } catch (error) {
        // console.log(error.response.data);
        
        // console.error(error);
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

// actualizar un hotel
export const updateHotel = async (id, hotelData) => {
    try {
        const response = await api.put(`hotels/${id}`, hotelData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

// eliminar un hotel
export const deleteHotel = async (id) => {
    try {
      
         await api.delete(`hotels/${id}`);
        
        return { message: 'Hotel eliminado correctamente' };
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

// obtener u hotel por su id
export const getHotelById = async (id) => {
    try {
        const response = await api.get(`hotels/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

//obtengo todos los departamentos 
export const getDepartments = async () => {
    try {
        const response = await api.get('/departments'); 
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};

// Obtengo municipios segunei id del departamento seleccionado
export const getMunicipalitiesByDepartment = async (departmentId) => {
    try {
        const response = await api.get(`/departments/${departmentId}/municipalities`); 
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor.');
    }
};