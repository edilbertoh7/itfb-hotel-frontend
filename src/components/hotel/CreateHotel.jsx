import React, { useEffect, useState } from 'react';
import { createHotel, getDepartments, getMunicipalitiesByDepartment } from '../../services/HotelService';

const CreateHotel = () => {
    const [hotelData, setHotelData] = useState({
        name: '',
        address: '',
        departmentId: '',
        city: '',
        tax_id: '',
        max_rooms: 0,
    });
    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([])
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments();
                // console.log(response);
                setDepartments(response);
            } catch (err) {
                setError('Error al cargar los departamentos');
            }
        };
        fetchDepartments();
    }, []);

    const handleDepartmentChange = async (e) => {
        const selectedDepartmentId = e.target.value;
        setHotelData({ ...hotelData, departmentId: selectedDepartmentId, city: '' });

        if (selectedDepartmentId) {
            try {
                const response = await getMunicipalitiesByDepartment(selectedDepartmentId);
                setMunicipalities(response);
            } catch (err) {
                setError('Error al cargar los municipios');
            }
        } else {
            setMunicipalities([]);
        }
    };

    const handleChange = (e) => {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setError(null);
        e.preventDefault();

        try {
            // console.log(hotelData);
            const response = await createHotel(hotelData);
            setMessage(response.message);
            // borro los datos de setHotelData
            setHotelData({ name: '', address: '', departmentId: '', city: '', tax_id: '', max_rooms: 0 });
            // borro el contenido de setMessage despues de 2 segundos
            setTimeout(() => {
                setMessage('');
            }, 2000);
            setError(null);
        } catch (err) {
            // console.log(err.errors);
            setError(err);
            setMessage('');
            console.log(error);

        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Nuevo Hotel</h1>
            <form className="mt-4" onSubmit={handleSubmit}>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Nombre del hotel"
                            value={hotelData.name}
                            onChange={handleChange}
                            required
                        />
                        {error && (error.errors.name && (
                            <p className="text-danger">{error.errors.name[0]}</p>
                        ))}

                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            className="form-control"
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            value={hotelData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-6 mb-3">
                        <select
                            className="form-select"
                            name="departmentId"
                            value={hotelData.departmentId}
                            onChange={handleDepartmentChange}
                            required
                        >
                            <option value="">Seleccione un departamento</option>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <select
                            className="form-select"
                            name="city"
                            value={hotelData.city}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un municipio</option>
                            {municipalities.map(municipality => (
                                <option key={municipality.id} value={municipality.id}>
                                    {municipality.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input
                            className="form-control"
                            type="text"
                            name="tax_id"
                            placeholder="NIT del hotel"
                            value={hotelData.tax_id}
                            onChange={handleChange}
                            required
                        />
                        {error && (error.errors.tax_id && (
                            <p style={{ color: 'red' }}>{error.errors.tax_id[0]}</p>
                        ))}
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            className="form-control"
                            type="number"
                            name="max_rooms"
                            placeholder="Máximo de habitaciones"
                            value={hotelData.max_rooms}
                            onChange={handleChange}
                            required
                        />
                        {error && (error.errors.max_rooms && (
                            <p style={{ color: 'red' }}>{error.errors.max_rooms[0]}</p>
                        ))}
                    </div>
                </div>
                <div className="mt-5 text-center">

                    <button className="btn btn-primary" type="submit">Crear Hotel</button>
                </div>
            </form>
            {message && <h3 className="mt-3 text-success">{message}</h3>}
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </div>
    );
};

export default CreateHotel;
