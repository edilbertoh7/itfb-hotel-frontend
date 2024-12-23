import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getDepartments, getHotelById, getMunicipalitiesByDepartment, updateHotel } from "../../services/HotelService";

const HotelUpdate = () => {
    const { id } = useParams(); // Obtiene el ID del hotel desde la URL
    const navigate = useNavigate();

    const [hotel, setHotel] = useState({
        name: "",
        address: "",
        departmentId: '',
        city: "",
        tax_id: "",
        max_rooms: "",
    });
    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

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
        setHotel({ ...hotel, departmentId: selectedDepartmentId, city: '' });

        if (selectedDepartmentId) {
            try {
                const response = await getMunicipalitiesByDepartment(selectedDepartmentId);
                setMunicipalities(response);
            } catch (err) {
                setErrors('Error al cargar los municipios');
            }
        } else {
            setMunicipalities([]);
        }
    };

    useEffect(() => {
        // consulto los datos del hotel para llenar el formulario
        const fetchHotel = async () => {
            try {
                const response = await getHotelById(id);
                console.log(response);

                setHotel(response);
            } catch (error) {
                console.error("Error al cargar el hotel:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    const handleChange = (e) => {
        setHotel({ ...hotel, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await updateHotel(id, hotel);
            alert("Hotel actualizado con éxito");
            navigate("/hoteles"); 
        } catch (err) {
            // console.log(err.errors);
            setErrors(err.errors);

            console.log(errors);
        }
    };

    if (loading) {
        return <p className="text-center">Cargando información del hotel...</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Modificar Hotel</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="form-group mb-3">
                    <label htmlFor="name">Nombre del Hotel</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={hotel.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={hotel.address}
                        onChange={handleChange}
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address[0]}</div>}
                </div>
                <div className="form-group mb-3">
                    <select
                        className="form-select"
                        name="departmentId"
                        value={hotel.departmentId}
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

                <div className="form-group mb-3">
                    <label htmlFor="city">Ciudad</label>
                    <select
                        className="form-select"
                        name="city"
                        value={hotel.city}
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
                    {errors.city && <div className="invalid-feedback">{errors.city[0]}</div>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="tax_id">NIT</label>
                    <input
                        type="text"
                        id="tax_id"
                        name="tax_id"
                        value={hotel.tax_id}
                        onChange={handleChange}
                        className={`form-control ${errors.tax_id ? "is-invalid" : ""}`}
                    />
                    {errors.tax_id && <div className="invalid-feedback">{errors.tax_id[0]}</div>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="max_rooms">Capacidad Máxima</label>
                    <input
                        type="number"
                        id="max_rooms"
                        name="max_rooms"
                        value={hotel.max_rooms}
                        onChange={handleChange}
                        className={`form-control ${errors.max_rooms ? "is-invalid" : ""}`}
                    />
                    {errors.max_rooms && <div className="invalid-feedback">{errors.max_rooms[0]}</div>}
                </div>

                <div className="d-flex justify-content-between">
                    <Link to="/hoteles" className="btn btn-primary  ">
                        Volver
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Guardar Cambios
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HotelUpdate;
