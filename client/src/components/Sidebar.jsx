import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Anggota', path: '/anggota' },
    { name: 'Paket', path: '/paket' },
    { name: 'Pembayaran', path: '/pembayaran' },
    { name: 'Nabung Bebas', path: '/nabung-bebas' },
    { name: 'Laporan', path: '/laporan' },
  ];

  if (!token) return null;

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
        Paket Lebaran
      </div>
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block py-3 px-6 hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-gray-700 border-l-4 border-blue-500' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;