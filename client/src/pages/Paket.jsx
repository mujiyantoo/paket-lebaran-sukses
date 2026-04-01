import React, { useEffect, useState } from 'react';
import { getPaket, createPaket, deletePaket, updatePaket } from '../api';

const Paket = () => {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nama: '', harga: '', deskripsi: '', items: '', stok: '' });

  useEffect(() => { loadPaket(); }, []);

  const loadPaket = async () => { try { const data = await getPaket(); setPaket(data); } catch (err) { console.error(err); } finally { setLoading(false); } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, harga: Number(formData.harga), stok: Number(formData.stok || 0), items: formData.items ? formData.items.split(',').map(i => i.trim()) : [] };
      if (editingId) { await updatePaket(editingId, data); } else { await createPaket(data); }
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

  if (loading) return (
    <div className="flex items-center justify-center h-96 pt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="p-4 lg:p-8 bg-slate-50 min-h-screen pt-20 lg:pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Kelola Paket</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola paket lebaran</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ nama: '', harga: '', deskripsi: '', items: '', stok: '' }); }} className="mt-4 sm:mt-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm">
          <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Tambah</span>
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 -mx-4 px-4">
        <div className="bg-white rounded-xl p-4 shadow-card min-w-[100px]">
          <p className="text-slate-500 text-xs">Paket</p>
          <p className="text-xl font-bold">{paket.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card min-w-[100px]">
          <p className="text-slate-500 text-xs">Stok</p>
          <p className="text-xl font-bold text-emerald-600">{totalStok}</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-card mb-4 border-t-4 border-amber-500">
          <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? 'Edit Paket' : 'Tambah Paket'}</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Nama Paket" className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required />
              <input type="number" placeholder="Harga" className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.harga} onChange={e => setFormData({...formData, harga: e.target.value})} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Stok" className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.stok} onChange={e => setFormData({...formData, stok: e.target.value})} />
              <input type="text" placeholder="Deskripsi" className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} />
            </div>
            <input type="text" placeholder="Items (pisahkan koma)" className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.items} onChange={e => setFormData({...formData, items: e.target.value})} />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-medium text-sm">{editingId ? 'Simpan' : 'Tambah'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ nama: '', harga: '', deskripsi: '', items: '', stok: '' }); }} className="px-4 py-2.5 bg-slate-100 rounded-xl text-sm">Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {paket.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-800">{item.nama}</h3>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(item)} className="p-1.5 text-slate-400 hover:text-blue-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                  <button onClick={() => handleDelete(item._id)} className="p-1.5 text-slate-400 hover:text-red-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-3">{item.deskripsi || '-'}</p>
              <div className="flex justify-between items-center">
                <div><p className="text-xs text-slate-400">Harga</p><p className="text-xl font-bold text-amber-600">Rp {(item.harga || 0).toLocaleString('id-ID')}</p></div>
                <div className="text-right"><p className="text-xs text-slate-400">Stok</p><p className={`text-lg font-bold ${item.stok > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{item.stok || 0}</p></div>
              </div>
              {item.items && item.items.length > 0 && <div className="mt-3 flex flex-wrap gap-1">{item.items.slice(0, 2).map((it, idx) => (<span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">{it}</span>))}</div>}
            </div>
          </div>
        ))}
        {paket.length === 0 && <div className="col-span-full text-center py-8 text-slate-400">Belum ada paket</div>}
      </div>
    </div>
  );
};

export default Paket;