import React, { useEffect, useState } from 'react';
import { getTabunganBebas, createTabunganBebas, getAnggota } from '../api';

const NabungBebas = () => {
  const [tabungan, setTabungan] = useState([]);
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ anggota: '', jumlah: '', tanggal: '', keterangan: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tabunganData, anggotaData] = await Promise.all([getTabunganBebas(), getAnggota()]);
      setTabungan(tabunganData);
      setAnggota(anggotaData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTabunganBebas(formData);
      setShowForm(false);
      setFormData({ anggota: '', jumlah: '', tanggal: '', keterangan: '' });
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const totalNominal = tabungan.reduce((sum, t) => sum + (t.jumlah || 0), 0);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Nabung Bebas</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Tutup' : '+ Tambah Tabungan'}
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="border p-2 rounded" value={formData.anggota} onChange={e => setFormData({...formData, anggota: e.target.value})} required>
              <option value="">Pilih Anggota</option>
              {anggota.map(a => <option key={a._id} value={a._id}>{a.nama}</option>)}
            </select>
            <input type="number" placeholder="Jumlah" className="border p-2 rounded" value={formData.jumlah} onChange={e => setFormData({...formData, jumlah: e.target.value})} required />
            <input type="date" className="border p-2 rounded" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} />
            <input type="text" placeholder="Keterangan" className="border p-2 rounded" value={formData.keterangan} onChange={e => setFormData({...formData, keterangan: e.target.value})} />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded md:col-span-2">Simpan</button>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Transaksi</div>
          <div className="text-3xl font-bold">{tabungan.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Nominal</div>
          <div className="text-3xl font-bold">Rp {totalNominal.toLocaleString('id-ID')}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Anggota Aktif</div>
          <div className="text-3xl font-bold">{new Set(tabungan.map(t => t.anggota?._id)).size}</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Anggota</th>
              <th className="p-4 text-left">Jumlah</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-left">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {tabungan.map((item, index) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.anggota?.nama || '-'}</td>
                <td className="p-4">Rp {item.jumlah?.toLocaleString('id-ID') || 0}</td>
                <td className="p-4">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</td>
                <td className="p-4">{item.keterangan || '-'}</td>
              </tr>
            ))}
            {tabungan.length === 0 && (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Data kosong</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NabungBebas;