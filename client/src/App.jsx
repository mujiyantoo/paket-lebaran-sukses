import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Anggota from './pages/Anggota';
import Paket from './pages/Paket';
import Pembayaran from './pages/Pembayaran';
import NabungBebas from './pages/NabungBebas';
import Laporan from './pages/Laporan';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  // Check for demo mode - just show main app without auth check for now
  const showSidebar = !isAuthPage;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {showSidebar && <Sidebar />}
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
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;