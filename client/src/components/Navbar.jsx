import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyApp</Link>
        <div>
          {token ? (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;