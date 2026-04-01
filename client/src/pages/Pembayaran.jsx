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
    try { await createPembayaran(formData); setShowForm(false); setFormData({ anggota: '', paket: '', jumlah: '', metode: 'tunai', tanggal: '', keterangan: '' }); loadData(); }
    catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => { if (confirm('Yakin hapus?')) { try { await deletePembayaran(id); loadData(); } catch (err) { alert(err.message); } } };

  const handlePaketChange = (e) => { const selectedPaket = paket.find(p => p._id === e.target.value); setFormData({ ...formData, paket: e.target.value, jumlah: selectedPaket ? selectedPaket.harga : '' }); };

  const totalPendapatan = pembayaran.reduce((sum, p) => sum + (p.jumlah || 0), 0);
  const formatCurrency = (num) => `Rp ${(num || 0).toLocaleString('id-ID')}`;

  if (loading) return (
    <div className="flex items-center justify-center h-96 pt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="p-4 lg:p-8 bg-slate-50 min-h-screen pt-20 lg:pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Pembayaran</h1><p className="text-slate-500 text-sm mt-1">Kelola transaksi</p></div>
        <button onClick={() => setShowForm(!showForm)} className="mt-4 sm:mt-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Bayar
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 -mx-4 px-4">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 text-white min-w-[140px]">
          <p className="text-emerald-100 text-xs">Total Pendapatan</p>
          <p className="text-xl font-bold">{formatCurrency(totalPendapatan)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card min-w-[100px]">
          <p className="text-slate-500 text-xs">Transaksi</p>
          <p className="text-xl font-bold">{pembayaran.length}</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-card mb-4 border-t-4 border-amber-500">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Catat Pembayaran</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <select className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.anggota} onChange={e => setFormData({...formData, anggota: e.target.value})} required>
              <option value="">Pilih Anggota</option>
              {anggota.map(a => <option key={a._id} value={a._id}>{a.nama}</option>)}
            </select>
            <select className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.paket} onChange={handlePaketChange} required>
              <option value="">Pilih Paket</option>
              {paket.map(p => <option key={p._id} value={p._id}>{p.nama} - {formatCurrency(p.harga)}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Jumlah" className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.jumlah} onChange={e => setFormData({...formData, jumlah: e.target.value})} required />
              <input type="date" className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.metode} onChange={e => setFormData({...formData, metode: e.target.value})}>
                <option value="tunai">Tunai</option>
                <option value="transfer">Transfer</option>
                <option value="qris">QRIS</option>
              </select>
              <select className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500" value={formData.keterangan} onChange={e => setFormData({...formData, keterangan: e.target.value})}>
                <option value="">Status</option>
                <option value="lunas">Lunas</option>
                <option value="cicilan">Cicilan</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-medium text-sm">Simpan</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-slate-100 rounded-xl text-sm">Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {pembayaran.map((item, index) => (
          <div key={item._id} className="bg-white rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">{(item.anggota?.nama || 'A').charAt(0).toUpperCase()}</div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">{item.anggota?.nama || '-'}</p>
                  <p className="text-xs text-slate-400">{item.paket?.nama || '-'}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.keterangan === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{item.keterangan === 'lunas' ? 'Lunas' : 'Cicilan'}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs capitalize">{item.metode}</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</span>
              </div>
              <p className="font-bold text-emerald-600">{formatCurrency(item.jumlah)}</p>
            </div>
            <button onClick={() => handleDelete(item._id)} className="w-full mt-3 py-2 text-center text-red-600 bg-red-50 rounded-lg text-sm">Hapus</button>
          </div>
        ))}
        {pembayaran.length === 0 && <div className="text-center py-8 text-slate-400">Belum ada pembayaran</div>}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr><th className="p-4 text-left text-sm font-semibold text-slate-600">No</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Anggota</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Paket</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Jumlah</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Metode</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Status</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Tanggal</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Aksi</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pembayaran.map((item, index) => (
              <tr key={item._id} className="hover:bg-slate-50">
                <td className="p-4 text-slate-600">{index + 1}</td>
                <td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">{(item.anggota?.nama || 'A').charAt(0).toUpperCase()}</div><span className="font-medium text-slate-800">{item.anggota?.nama || '-'}</span></div></td>
                <td className="p-4 text-slate-600">{item.paket?.nama || '-'}</td>
                <td className="p-4 font-semibold text-emerald-600">{formatCurrency(item.jumlah)}</td>
                <td className="p-4"><span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs capitalize">{item.metode}</span></td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${item.keterangan === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{item.keterangan === 'lunas' ? 'Lunas' : 'Cicilan'}</span></td>
                <td className="p-4 text-slate-600">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</td>
                <td className="p-4"><button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pembayaran;