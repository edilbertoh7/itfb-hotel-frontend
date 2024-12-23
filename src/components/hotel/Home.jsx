import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <img 
                src="https://www.decameron.com/images/thumbnail/colombia/baru-05.jpg" // Reemplaza con una URL real de la imagen alusiva
                alt="Hoteles Decameron"
                style={{ width: '80%', borderRadius: '10px' }}
            />
            <h1 style={{ marginTop: '20px' }}>Hoteles Decameron los mejores del mundo </h1>
            <p>Hoteles Decameron siempre una experiencia inolvidable.</p>
            
            <div style={{ marginTop: '20px' }}>
                <Link to="/hoteles">
                    <button style={buttonStyle}>Ver Hoteles</button>
                </Link>
                <Link to="/nuevohotel">
                    <button style={{ ...buttonStyle, marginLeft: '10px' }}>Crear Hotel</button>
                </Link>
                <Link to="/rooms">
                    <button style={{ ...buttonStyle, marginLeft: '10px' }}>Ver Habitaciones</button>
                </Link>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default Home;
