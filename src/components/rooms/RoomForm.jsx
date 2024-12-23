import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createRoom, getAllAccommodations, getRoomById } from "../../services/roomServices";
import { getHotels } from "../../services/HotelService";


const RoomForm = () => {
    const { id } = useParams(); // ID de la habitación (si está en modo edición)
    const navigate = useNavigate();

    const [room, setRoom] = useState({
        hotel_id: "",
        accommodation_id: "",
        quantity: "",
    });
    const [hotels, setHotels] = useState([]);

    const [accommodations, setAccommodations] = useState([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState('');

    const [errors, setErrors] = useState({});
    const [errorDB, setErrorDB] = useState(null);
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await getHotels();
                // console.log(data);

                setHotels(data);
            } catch (err) {
                setErrors(err.message || 'Error al cargar los hoteles');
            }
        };

        const fetchAccommodations = async () => {
            try {
                const data = await getAllAccommodations();
                // if (Array.isArray(data)) {
                // console.log(data);

                setAccommodations(data);
                // } else {
                //     console.error("La respuesta no es un array:", data);
                //     setAccommodations([]); // Inicializa como un array vacío si no es un array
                // }
            } catch (error) {
                console.error("Error al cargar las acomodaciones:", error);
            }
        };

        fetchHotels();
        fetchAccommodations();
    }, []);

    useEffect(() => {
        if (id) {
            // Si hay ID, cargar los datos de la habitación
            const fetchRoom = async () => {
                try {
                    const data = await getRoomById(id);
                    console.log(data);
                    
                    setRoom({
                        hotel_id: data.hotel.id,
                        accommodation_id: data.hotel.accommodation_id,
                        quantity: data.quantity,
                    });
                } catch (error) {
                    console.error("Error al cargar la habitación:", error);
                }
            };

            fetchRoom();
        }
    }, [id]);
console.log(room);

    const handleAccommodationChange = (event) => {
        setSelectedAccommodation(event.target.value);
    };

    const handleChange = (e) => {
        setRoom({ ...room, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        // console.log(room.accommodation_id);
        // console.log(room.hotel_id);
        if ((!room.accommodation_id) || (!room.hotel_id)) {
            setErrors({accommodation_id: 'Seleccione una acomodación', hotel_id: 'Seleccione un hotel'});
            
        } else {
            
        }
        
        try {
            if (id) {
                await updateRoom(id, room);
                alert("Habitación actualizada con éxito.");
            } else {
                await createRoom(room);
                alert("Habitación creada con éxito.");
            }
            navigate("/rooms");
        } catch (error) {
            

            if (error.response && error.response.data.errors) {
                
                
                setErrors(error.response.data.errors);
            } else {
                console.error("Error al guardar la habitación:", error);
                
                setErrors(error)
                setErrorDB(error.message)
            }
        }
        
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">{id ? "Editar Habitación" : "Crear Habitación"}</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="form-group mb-3">
                    <label htmlFor="hotel_id">Nombre Hotel</label>

                    <select
                        id="hotel_id"
                        name="hotel_id"
                        value={room.hotel_id}
                        onChange={handleChange}
                        className={`form-control `}
                    >
                        <option value="">Seleccione un hotel</option>
                        {hotels.map((hotel) => (
                            <option key={hotel.id} value={hotel.id}>
                                {hotel.name}
                            </option>
                        ))}
                        required
                    </select>
                    {errors.hotel_id && (<p style={{ color: 'red' }}>{errors.hotel_id}</p>)}
                   
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="accommodation_id">ID de la Acomodación</label>

                    <select
                        id="accommodation_id"
                        name="accommodation_id"
                        value={room.accommodation_id}
                        onChange={handleChange}
                        className={`form-control`}
                    >
                        <option value="">Seleccione una acomodación</option>
                        {accommodations.map((accommodation) => (
                            <option key={accommodation.id} value={accommodation.id}>
                                {accommodation.room_type.name} - {accommodation.assignment.name}
                            </option>
                        ))}
                        required
                    </select>
                    {errors.accommodation_id && (<p style={{ color: 'red' }}>{errors.accommodation_id}</p>)}
                    
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="quantity">Cantidad</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={room.quantity}
                        onChange={handleChange}
                        className={`form-control `}
                        required
                    />
                  
                    {errorDB && (<p style={{ color: 'red' }}>{errorDB}</p>)}
                    {errors.errors && (
                        <div style={{ color: 'red' }}>{errors.errors.accommodation_id[0]} jajajaj</div>
                    )}
                    
                </div>
                <div className="">
                    
                <Link to="/rooms" className="btn btn-primary mb-3 mt-5">
                        Volver
                      </Link>
                </div>
                <button type="submit" className="btn btn-primary mb-3 mt-5">
                    {id ? "Guardar Cambios" : "Crear"}
                </button>
            </form>
        </div>
    );
};

export default RoomForm;
