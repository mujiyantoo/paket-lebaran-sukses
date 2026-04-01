import React, { useEffect, useState } from 'react';
import { getPaket, createPaket, deletePaket } from '../api';

const Paket = () => {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nama: '', harga: '', deskripsi: '', items: '', stok: '' });

  useEffect(() => {
    loadPaket();
  }, []);

  const loadPaket = async () => {
    try {
      const data = await getPaket();
      setPaket(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPaket({ ...formData, harga: Number(formData.harga), stok: Number(formData.stok), items: formData.items.split(',').map(i => i.trim()) });
      setShowForm(false);
      setFormData({ nama: '', harga: '', deskripsi: '', items: '', stok: '' });
      loadPaket();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus paket?')) {
      try {
        await deletePaket(id);
        loadPaket();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Paket</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Tutup' : '+ Tambah Paket'}
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nama Paket" className="border p-2 rounded" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required />
            <input type="number" placeholder="Harga" className="border p-2 rounded" value={formData.harga} onChange={e => setFormData({...formData, harga: e.target.value})} required />
            <input type="number" placeholder="Stok" className="border p-2 rounded" value={formData.stok} onChange={e => setFormData({...formData, stok: e.target.value})} />
            <input type="text" placeholder="Deskripsi" className="border p-2 rounded" value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} />
            <input type="text" placeholder="Items (pisahkan dengan koma)" className="border p-2 rounded md:col-span-2" value={formData.items} onChange={e => setFormData({...formData, items: e.target.value})} />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded md:col-span-2">Simpan</button>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paket.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">{item.nama}</h3>
            <div className="text-3xl font-bold text-blue-600 mb-4">
              Rp {item.harga?.toLocaleString('id-ID') || 0}
            </div>
            <p className="text-gray-600 mb-4">{item.deskripsi || '-'}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Stok: {item.stok}</span>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">Hapus</button>
            </div>
          </div>
        ))}
        {paket.length === 0 && <p className="text-gray-500 col-span-3 text-center">Data kosong</p>}
      </div>
    </div>
  );
};

export default Paket;