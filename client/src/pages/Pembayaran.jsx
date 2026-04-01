import React, { useEffect, useState } from 'react';
import { getPembayaran, createPembayaran, getPaket, getAnggota } from '../api';

const Pembayaran = () => {
  const [pembayaran, setPembayaran] = useState([]);
  const [anggota, setAnggota] = useState([]);
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ anggota: '', paket: '', jumlah: '', metode: 'tunai', tanggal: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pembayaranData, anggotaData, paketData] = await Promise.all([getPembayaran(), getAnggota(), getPaket()]);
      setPembayaran(pembayaranData);
      setAnggota(anggotaData);
      setPaket(paketData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPembayaran(formData);
      setShowForm(false);
      setFormData({ anggota: '', paket: '', jumlah: '', metode: 'tunai', tanggal: '' });
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Data Pembayaran</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Tutup' : '+ Catat Pembayaran'}
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="border p-2 rounded" value={formData.anggota} onChange={e => setFormData({...formData, anggota: e.target.value})} required>
              <option value="">Pilih Anggota</option>
              {anggota.map(a => <option key={a._id} value={a._id}>{a.nama}</option>)}
            </select>
            <select className="border p-2 rounded" value={formData.paket} onChange={e => { setFormData({...formData, paket: e.target.value}); const p = paket.find(pkt => pkt._id === e.target.value); if(p) setFormData(f => ({...f, paket: e.target.value, jumlah: p.harga})) }} required>
              <option value="">Pilih Paket</option>
              {paket.map(p => <option key={p._id} value={p._id}>{p.nama} - Rp {p.harga}</option>)}
            </select>
            <input type="number" placeholder="Jumlah" className="border p-2 rounded" value={formData.jumlah} onChange={e => setFormData({...formData, jumlah: e.target.value})} required />
            <input type="date" className="border p-2 rounded" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} />
            <select className="border p-2 rounded" value={formData.metode} onChange={e => setFormData({...formData, metode: e.target.value})}>
              <option value="tunai">Tunai</option>
              <option value="transfer">Transfer</option>
              <option value="qris">QRIS</option>
            </select>
            <input type="text" placeholder="Keterangan" className="border p-2 rounded" value={formData.keterangan} onChange={e => setFormData({...formData, keterangan: e.target.value})} />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded md:col-span-2">Simpan</button>
          </form>
        </div>
      )}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Anggota</th>
              <th className="p-4 text-left">Paket</th>
              <th className="p-4 text-left">Jumlah</th>
              <th className="p-4 text-left">Metode</th>
              <th className="p-4 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {pembayaran.map((item, index) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.anggota?.nama || '-'}</td>
                <td className="p-4">{item.paket?.nama || '-'}</td>
                <td className="p-4">Rp {item.jumlah?.toLocaleString('id-ID') || 0}</td>
                <td className="p-4 capitalize">{item.metode}</td>
                <td className="p-4">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</td>
              </tr>
            ))}
            {pembayaran.length === 0 && (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">Data kosong</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pembayaran;