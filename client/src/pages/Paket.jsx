import React, { useEffect, useState } from 'react';
import { getPaket, createPaket, deletePaket, updatePaket } from '../api';

const Paket = () => {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nama: '', harga: '', deskripsi: '', items: '', stok: '' });

  useEffect(() => { loadPaket(); }, []);

  const loadPaket = async () => {
    try { const data = await getPaket(); setPaket(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, harga: Number(formData.harga), stok: Number(formData.stok || 0), items: formData.items ? formData.items.split(',').map(i => i.trim()) : [] };
      if (editingId) { await updatePaket(editingId, data); }
      else { await createPaket(data); }
      setShowForm(false); setEditingId(null); setFormData({ nama: '', harga: '', deskripsi: '', items: '', stok: '' });
      loadPaket();
    } catch (err) { alert(err.message); }
  };

  const handleEdit = (item) => {
    setFormData({ nama: item.nama, harga: item.harga?.toString() || '', deskripsi: item.deskripsi || '', items: item.items?.join(', ') || '', stok: item.stok?.toString() || '' });
    setEditingId(item._id); setShowForm(true);
  };

  const handleDelete = async (id) => { if (confirm('Yakin hapus paket ini?')) { try { await deletePaket(id); loadPaket(); } catch (err) { alert(err.message); } } };

  const totalStok = paket.reduce((sum, p) => sum + (p.stok || 0), 0);
  const totalNilai = paket.reduce((sum, p) => sum + ((p.harga || 0) * (p.stok || 0)), 0);

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Kelola Paket</h1>
          <p className="text-slate-500 mt-1">Kelola paket lebaran dengan berbagai pilihan</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ nama: '', harga: '', deskripsi: '', items: '', stok: '' }); }} className="mt-4 md:mt-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Paket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Paket</p>
              <p className="text-2xl font-bold text-slate-800">{paket.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Stok</p>
              <p className="text-2xl font-bold text-emerald-600">{totalStok}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Nilai Stok</p>
              <p className="text-2xl font-bold text-purple-600">Rp {totalNilai.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-card mb-8 border-t-4 border-amber-500">
          <h2 className="text-xl font-bold text-slate-800 mb-6">{editingId ? 'Edit Paket' : 'Tambah Paket Baru'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="text" placeholder="Nama Paket" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required />
            <input type="number" placeholder="Harga (Rp)" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.harga} onChange={e => setFormData({...formData, harga: e.target.value})} required />
            <input type="number" placeholder="Stok" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none" value={formData.stok} onChange={e => setFormData({...formData, stok: e.target.value})} />
            <input type="text" placeholder="Deskripsi" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none md:col-span-2" value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} />
            <input type="text" placeholder="Items (pisahkan dengan koma)" className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-amber-500 focus:outline-none lg:col-span-3" value={formData.items} onChange={e => setFormData({...formData, items: e.target.value})} />
            <div className="lg:col-span-3 flex gap-3">
              <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all">{editingId ? 'Simpan' : 'Tambah Paket'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ nama: '', harga: '', deskripsi: '', items: '', stok: '' }); }} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200">Batal</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paket.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden group">
            <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors">{item.nama}</h3>
                  <p className="text-sm text-slate-500 mt-1">{item.deskripsi || 'Tidak ada deskripsi'}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(item)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-t border-slate-100">
                <div>
                  <p className="text-sm text-slate-500">Harga</p>
                  <p className="text-2xl font-bold text-amber-600">Rp {(item.harga || 0).toLocaleString('id-ID')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Stok</p>
                  <p className={`text-xl font-bold ${item.stok > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{item.stok || 0}</p>
                </div>
              </div>
              {item.items && item.items.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.items.slice(0, 3).map((it, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">{it}</span>
                  ))}
                  {item.items.length > 3 && <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">+{item.items.length - 3} more</span>}
                </div>
              )}
            </div>
          </div>
        ))}
        {paket.length === 0 && <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl">Belum ada paket</div>}
      </div>
    </div>
  );
};

export default Paket;