import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/hotel/Home'
import HotelList from './components/hotel/HotelList'
import CreateHotel from './components/hotel/CreateHotel'
import HotelDetails from './components/hotel/HotelDetails'
import HotelUpdate from './components/hotel/HotelUpdate'
import RoomList from './components/rooms/RoomList'
import RoomForm from './components/rooms/RoomForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route>
          {/* hoteles */}
        <Route path="/" element={<Home />} />
        <Route path="/hoteles" element={<HotelList />} />
        <Route path="/nuevohotel" element={<CreateHotel />} />
        <Route path="/hoteldetails/:id" element={<HotelDetails />} />
        <Route path="/hotelupdate/:id" element={<HotelUpdate />} />
        {/* habitaciones */}
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/rooms/new" element={<RoomForm />} />
        <Route path="/rooms/:id/edit" element={<RoomForm />} />

        

      
        </Route>
      </Routes>
  )
}

export default App
