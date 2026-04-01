import React, { useEffect, useState } from 'react';
import { getAnggota, createAnggota, deleteAnggota } from '../api';

const Anggota = () => {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nama: '', alamat: '', telepon: '', status: 'aktif' });

  useEffect(() => {
    loadAnggota();
  }, []);

  const loadAnggota = async () => {
    try {
      const data = await getAnggota();
      setAnggota(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnggota(formData);
      setShowForm(false);
      setFormData({ nama: '', alamat: '', telepon: '', status: 'aktif' });
      loadAnggota();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus anggota?')) {
      try {
        await deleteAnggota(id);
        loadAnggota();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Data Anggota</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Tutup' : '+ Tambah Anggota'}
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nama" className="border p-2 rounded" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required />
            <input type="text" placeholder="Alamat" className="border p-2 rounded" value={formData.alamat} onChange={e => setFormData({...formData, alamat: e.target.value})} />
            <input type="text" placeholder="Telepon" className="border p-2 rounded" value={formData.telepon} onChange={e => setFormData({...formData, telepon: e.target.value})} />
            <select className="border p-2 rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded md:col-span-2">Simpan</button>
          </form>
        </div>
      )}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-left">Alamat</th>
              <th className="p-4 text-left">Telepon</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {anggota.map((item, index) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.nama}</td>
                <td className="p-4">{item.alamat || '-'}</td>
                <td className="p-4">{item.telepon || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${item.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
            {anggota.length === 0 && (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">Data kosong</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Anggota;