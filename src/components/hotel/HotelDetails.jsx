import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteHotel, getHotelById } from "../../services/HotelService";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) {
    return <p className="text-center">Cargando...</p>;
  }

  if (!hotel) {
    return <p className="text-center">No se encontró el hotel.</p>;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este hotel?");
    if (confirmDelete) {
      try {
        await deleteHotel(id);
        alert("Hotel eliminado con éxito.");
        // history.push("/nuevohotel"); 
        navigate("/hoteles");
      } catch (error) {
        console.error("Error al eliminar el hotel:", error);
        alert("Error al eliminar el hotel.");
      }
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{hotel.name}</h2>
      <div className="card">
        <div className="card-body">
          <p><strong>Nombre:</strong> {hotel.name}</p>
          <p><strong>Dirección:</strong> {hotel.address}</p>
          <p><strong>Ciudad:</strong> {hotel.municipality?.name || "Sin ciudad"}</p>
          <p><strong>NIT:</strong> {hotel.tax_id}</p>
          <p><strong>Capacidad Máxima:</strong> {hotel.max_rooms} Habitaciones</p>
        </div>
      </div>
      <Link to="/hoteles" className="btn btn-primary mb-3 mt-5">
        Volver
      </Link>
      <Link to={`/hotelupdate/${id}`} className="btn btn-warning mb-3 mt-5 ms-2">
        Modificar este hotel
      </Link>

      <button onClick={handleDelete} className="btn btn-danger mb-3 mt-5 ms-2">
        Eliminar este hotel
      </button>
    </div>
  );
};

export default HotelDetails;
