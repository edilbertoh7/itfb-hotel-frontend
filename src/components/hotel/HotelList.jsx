import React, { useEffect, useState } from 'react'
import { getHotels } from '../../services/HotelService';
import { Link, useNavigate } from 'react-router-dom';

const HotelList = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        console.log(data);

        setHotels(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los hoteles');
      }
    };
    fetchHotels();
  }, []);
  if (error) return <p>{error}</p>;
  if (!hotels.length) return <p>No hay hoteles para mostrar.</p>
  const handleRowClick = (hotelId) => {
    navigate(`/hoteldetails/${hotelId}`);
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Hoteles</h2>
      <div className="table-responsive">
      <Link to="/" className="btn btn-primary mb-3 mt-5">
        Volver
      </Link>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>Capacidad Máxima</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel, index) => (
              <tr key={hotel.id} onClick={() => handleRowClick(hotel.id)} style={{ cursor: "pointer" }}>
                <td>{index + 1}</td>
                <td className="text-primary">{hotel.name}</td>
                <td>{hotel.address}</td>
                <td>{hotel.municipality?.name || "Sin ciudad"}</td>
                <td>{hotel.max_rooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/" className="btn btn-primary mb-3 mt-5">
        Volver
      </Link>
    </div>
  )
}

export default HotelList