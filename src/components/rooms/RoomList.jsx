import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRoom, getAllRooms } from "../../services/roomServices";


const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        console.log(data);
        
        setRooms(data);
      } catch (error) {
        console.error("Error al cargar las habitaciones:", error);
      }
    };

    fetchRooms();
  }, []);


  const handleDelete = async (id) => {
    
    
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta habitación??");
    if (confirmDelete) {
      try {
        console.log(id);
        
        await deleteRoom(id);
        alert("Habitación eliminada con éxito.");
    
        navigate("/hoteles");
      } catch (error) {
        console.error("Error al eliminar la habitación :", error);
        alert("Error al eliminar la habitación ");
      }
    }
  };
  if (!rooms.length) return <p>No hay habitaciones para mostrar.</p>
  return (
    <div className="container mt-5">
      <h2 className="text-center">Lista de Habitaciones</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/rooms/new")}
      >
        Crear Nueva Habitación
      </button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel</th>
            <th>Tipo de Habitación</th>
            <th>Asignación</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.hotel.name}</td>
              <td>{room.room_type || "N/A"}</td>
              <td>{room.assignment || "N/A"}</td>
              <td>{room.quantity}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/rooms/${room.id}/edit`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(room.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
