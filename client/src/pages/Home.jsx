import React, { useEffect, useState } from 'react';
import { getUser } from '../api';

const Home = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      getUser().then(setUser).catch(console.error);
    }
  }, [token]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Fullstack App</h1>
      {user ? (
        <p className="text-xl">Hello, {user.name}!</p>
      ) : (
        <p className="text-lg">Please login to see your profile.</p>
      )}
    </div>
  );
};

export default Home;