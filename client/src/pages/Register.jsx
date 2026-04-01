import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await register(formData.name, formData.email, formData.password);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-4"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;