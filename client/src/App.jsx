import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Anggota from './pages/Anggota';
import Paket from './pages/Paket';
import Pembayaran from './pages/Pembayaran';
import NabungBebas from './pages/NabungBebas';
import Laporan from './pages/Laporan';

function App() {
  const token = localStorage.getItem('token');
  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {token && !isAuthPage && <Sidebar />}
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/anggota" element={<Anggota />} />
            <Route path="/paket" element={<Paket />} />
            <Route path="/pembayaran" element={<Pembayaran />} />
            <Route path="/nabung-bebas" element={<NabungBebas />} />
            <Route path="/laporan" element={<Laporan />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;