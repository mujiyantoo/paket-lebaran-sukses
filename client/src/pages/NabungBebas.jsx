import React, { useEffect, useState } from 'react';
import { getTabunganBebas, createTabunganBebas, deleteTabunganBebas, getAnggota } from '../api';

const NabungBebas = () => {
  const [tabungan, setTabungan] = useState([]);
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ anggota: '', jumlah: '', tanggal: '', keterangan: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [tabunganData, anggotaData] = await Promise.all([getTabunganBebas(), getAnggota()]);
      setTabungan(tabunganData);
      setAnggota(anggotaData.filter(a => a.status === 'aktif'));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTabunganBebas(formData);
      setShowForm(false);
      setFormData({ anggota: '', jumlah: '', tanggal: '', keterangan: '' });
      loadData();
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus transaksi ini?')) {
      try { await deleteTabunganBebas(id); loadData(); }
      catch (err) { alert(err.message); }
    }
  };

  const totalNominal = tabungan.reduce((sum, t) => sum + (t.jumlah || 0), 0);
  const uniqueAnggota = new Set(tabungan.map(t => t.anggota?._id)).size;

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
          <h1 className="text-3xl font-bold text-slate-800">Nabung Bebas</h1>
          <p className="text-slate-500 mt-1">Kelola tabungan bebas anggota</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="mt-4 md:mt-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Tabungan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-white/80 text-sm">Total Tabungan</p>
              <p className="text-2xl font-bold">{formatCurrency(totalNominal)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Transaksi</p>
              <p className="text-2xl font-bold text-slate-800">{tabungan.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Anggota Aktif</p>
              <p className="text-2xl font-bold text-purple-600">{uniqueAnggota}</p>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-card mb-8 border-t-4 border-amber-500">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Tambah Tabungan Baru</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.anggota} onChange={e => setFormData({...formData, anggota: e.target.value})} required>
              <option value="">Pilih Anggota</option>
              {anggota.map(a => <option key={a._id} value={a._id}>{a.nama}</option>)}
            </select>
            <input type="number" placeholder="Jumlah (Rp)" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.jumlah} onChange={e => setFormData({...formData, jumlah: e.target.value})} required />
            <input type="date" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} />
            <input type="text" placeholder="Keterangan" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.keterangan} onChange={e => setFormData({...formData, keterangan: e.target.value})} />
            <div className="lg:col-span-4 flex gap-3">
              <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all">Simpan Tabungan</button>
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
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Jumlah</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Keterangan</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Tanggal</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tabungan.map((item, index) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600">{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {(item.anggota?.nama || 'A').charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-800">{item.anggota?.nama || '-'}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-amber-600">{formatCurrency(item.jumlah)}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs capitalize">{item.keterangan || '-'}</span>
                  </td>
                  <td className="p-4 text-slate-600">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {tabungan.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-slate-400">Belum ada tabungan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NabungBebas;