import React, { useEffect, useState } from 'react';
import { getPembayaran, createPembayaran, deletePembayaran, getPaket, getAnggota } from '../api';

const Pembayaran = () => {
  const [pembayaran, setPembayaran] = useState([]);
  const [anggota, setAnggota] = useState([]);
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ anggota: '', paket: '', jumlah: '', metode: 'tunai', tanggal: '', keterangan: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [pembayaranData, anggotaData, paketData] = await Promise.all([getPembayaran(), getAnggota(), getPaket()]);
      setPembayaran(pembayaranData);
      setAnggota(anggotaData.filter(a => a.status === 'aktif'));
      setPaket(paketData);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPembayaran(formData);
      setShowForm(false);
      setFormData({ anggota: '', paket: '', jumlah: '', metode: 'tunai', tanggal: '', keterangan: '' });
      loadData();
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus pembayaran ini?')) {
      try { await deletePembayaran(id); loadData(); }
      catch (err) { alert(err.message); }
    }
  };

  const handlePaketChange = (e) => {
    const selectedPaket = paket.find(p => p._id === e.target.value);
    setFormData({ ...formData, paket: e.target.value, jumlah: selectedPaket ? selectedPaket.harga : '' });
  };

  const totalPendapatan = pembayaran.reduce((sum, p) => sum + (p.jumlah || 0), 0);
  const lunasCount = pembayaran.filter(p => p.keterangan === 'lunas').length;
  const cicilCount = pembayaran.length - lunasCount;

  const formatCurrency = (num) => `Rp ${(num || 0).toLocaleString('id-ID')}`;

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Data Pembayaran</h1>
          <p className="text-slate-500 mt-1">Kelola semua transaksi pembayaran</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="mt-4 md:mt-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Catat Pembayaran
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Pendapatan</p>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(totalPendapatan)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Transaksi</p>
              <p className="text-xl font-bold text-slate-800">{pembayaran.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Lunas</p>
              <p className="text-xl font-bold text-amber-600">{lunasCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Cicilan</p>
              <p className="text-xl font-bold text-purple-600">{cicilCount}</p>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-card mb-8 border-t-4 border-amber-500">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Catat Pembayaran Baru</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <select className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.anggota} onChange={e => setFormData({...formData, anggota: e.target.value})} required>
              <option value="">Pilih Anggota</option>
              {anggota.map(a => <option key={a._id} value={a._id}>{a.nama}</option>)}
            </select>
            <select className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.paket} onChange={handlePaketChange} required>
              <option value="">Pilih Paket</option>
              {paket.map(p => <option key={p._id} value={p._id}>{p.nama} - {formatCurrency(p.harga)}</option>)}
            </select>
            <input type="number" placeholder="Jumlah (Rp)" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.jumlah} onChange={e => setFormData({...formData, jumlah: e.target.value})} required />
            <input type="date" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} />
            <select className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.metode} onChange={e => setFormData({...formData, metode: e.target.value})}>
              <option value="tunai">Tunai</option>
              <option value="transfer">Transfer Bank</option>
              <option value="qris">QRIS</option>
            </select>
            <select className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.keterangan} onChange={e => setFormData({...formData, keterangan: e.target.value})}>
              <option value="">Pilih Status</option>
              <option value="lunas">Lunas</option>
              <option value="cicilan">Cicilan</option>
            </select>
            <div className="lg:col-span-3 flex gap-3">
              <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all">Simpan Pembayaran</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200">Batal</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">No</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Anggota</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Paket</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Jumlah</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Metode</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Tanggal</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pembayaran.map((item, index) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600">{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {(item.anggota?.nama || 'A').charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-800">{item.anggota?.nama || '-'}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{item.paket?.nama || '-'}</td>
                  <td className="p-4 font-semibold text-emerald-600">{formatCurrency(item.jumlah)}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs capitalize">{item.metode}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.keterangan === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.keterangan === 'lunas' ? 'Lunas' : 'Cicilan'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {pembayaran.length === 0 && (
                <tr><td colSpan="8" className="p-8 text-center text-slate-400">Belum ada pembayaran</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;