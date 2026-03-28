import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LandingPage from './pages/LandingPage';
import HotelsPage from './pages/Hotels';
import Contact from './pages/contact';

// ADMIN
import UpdateHotel from './pages/admin/hotel/UpdateHotel';
import CreateHotel from './pages/admin/hotel/CreateHotel';
import AdminHotels from './pages/admin/hotel/AdminHotels';

import AdminRooms from './pages/admin/room/AdminRooms';
import CreateRoom from './pages/admin/room/CreateRoom';
import UpdateRoom from './pages/admin/room/UpdateRoom';

// PUBLIC
import HotelDetails from './pages/HotelsDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />

        <Route path="/contact" element={<Contact />} />

        {/* ADMIN HOTEL */}
        <Route path="/admin/hotels" element={<AdminHotels />} />
        <Route path="/admin/create-hotel" element={<CreateHotel />} />
        <Route path="/admin/update-hotel/:id" element={<UpdateHotel />} />

        {/* ADMIN ROOMS */}
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/create-room" element={<CreateRoom />} />
        <Route path="/admin/update-room/:id" element={<UpdateRoom />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;