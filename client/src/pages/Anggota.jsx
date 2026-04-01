import React, { useEffect, useState } from 'react';
import { getAnggota, createAnggota, deleteAnggota, updateAnggota } from '../api';

const Anggota = () => {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nama: '', alamat: '', telepon: '', status: 'aktif' });

  useEffect(() => { loadAnggota(); }, []);

  const loadAnggota = async () => {
    try {
      const data = await getAnggota();
      setAnggota(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAnggota(editingId, formData);
      } else {
        await createAnggota(formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ nama: '', alamat: '', telepon: '', status: 'aktif' });
      loadAnggota();
    } catch (err) { alert(err.message); }
  };

  const handleEdit = (item) => {
    setFormData({ nama: item.nama, alamat: item.alamat || '', telepon: item.telepon || '', status: item.status });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus anggota ini?')) {
      try { await deleteAnggota(id); loadAnggota(); }
      catch (err) { alert(err.message); }
    }
  };

  const activeCount = anggota.filter(a => a.status === 'aktif').length;
  const inactiveCount = anggota.filter(a => a.status === 'nonaktif').length;

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Data Anggota</h1>
          <p className="text-slate-500 mt-1">Kelola semua anggota dengan mudah</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ nama: '', alamat: '', telepon: '', status: 'aktif' }); }} className="mt-4 md:mt-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Anggota
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Anggota</p>
              <p className="text-2xl font-bold text-slate-800">{anggota.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Aktif</p>
              <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Nonaktif</p>
              <p className="text-2xl font-bold text-red-600">{inactiveCount}</p>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-card mb-8 border-t-4 border-amber-500">
          <h2 className="text-xl font-bold text-slate-800 mb-6">{editingId ? 'Edit Anggota' : 'Tambah Anggota Baru'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input type="text" placeholder="Nama Lengkap" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none transition-colors" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required />
            </div>
            <div className="relative">
              <input type="text" placeholder="Alamat" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none transition-colors" value={formData.alamat} onChange={e => setFormData({...formData, alamat: e.target.value})} />
            </div>
            <div className="relative">
              <input type="text" placeholder="Nomor Telepon" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none transition-colors" value={formData.telepon} onChange={e => setFormData({...formData, telepon: e.target.value})} />
            </div>
            <div className="relative">
              <select className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none transition-colors" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-4 flex gap-3">
              <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all">{editingId ? 'Simpan Perubahan' : 'Tambah Anggota'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ nama: '', alamat: '', telepon: '', status: 'aktif' }); }} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-all">Batal</button>
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
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Nama</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Alamat</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Telepon</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Bergabung</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {anggota.map((item, index) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600">{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.nama.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-800">{item.nama}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{item.alamat || '-'}</td>
                  <td className="p-4 text-slate-600">{item.telepon || '-'}</td>
                  <td className="p-4 text-slate-600">{item.bergabung ? new Date(item.bergabung).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
              {anggota.length === 0 && (
                <tr><td colSpan="7" className="p-8 text-center text-slate-400">Belum ada anggota</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Anggota;