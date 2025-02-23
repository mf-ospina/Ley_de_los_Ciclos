import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ChicaMagicaList from './pages/ChicaMagicaList';
import ChicaMagicaProfile from './pages/ChicaMagicaProfile';
import ChicaMagicaForm from './pages/ChicaMagicaForm';
import Historial from './pages/Historial';
import Footer from './components/Footer';
import Logout from './pages/Logout';

function App() {
  // Inicializa el estado leyendo localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/chicas" element={<ChicaMagicaList />} />
        <Route path="/chicas/nueva" element={<ChicaMagicaForm />} />
        <Route path="/chicas/editar/:id" element={<ChicaMagicaForm />} />
        <Route path="/chicas/:id" element={<ChicaMagicaProfile />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
