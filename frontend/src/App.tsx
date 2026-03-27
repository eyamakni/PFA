import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LandingPage from './pages/LandingPage';
import HotelsPage from './pages/Hotels';
import Contact from './pages/contact';
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;