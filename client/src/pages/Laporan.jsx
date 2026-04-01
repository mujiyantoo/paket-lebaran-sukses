import React, { useEffect, useState } from 'react';
import { getPembayaran, getTabunganBebas, getPaket, getAnggota } from '../api';

const Laporan = () => {
  const [pembayaran, setPembayaran] = useState([]);
  const [tabungan, setTabungan] = useState([]);
  const [paket, setPaket] = useState([]);
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try { const [pembayaranData, tabunganData, paketData, anggotaData] = await Promise.all([getPembayaran(), getTabunganBebas(), getPaket(), getAnggota()]); setPembayaran(pembayaranData); setTabungan(tabunganData); setPaket(paketData); setAnggota(anggotaData); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const totalPendapatan = pembayaran.reduce((sum, p) => sum + (p.jumlah || 0), 0);
  const totalTabungan = tabungan.reduce((sum, t) => sum + (t.jumlah || 0), 0);
  const totalKeseluruhan = totalPendapatan + totalTabungan;
  const formatCurrency = (num) => `Rp ${(num || 0).toLocaleString('id-ID')}`;

  if (loading) return (
    <div className="flex items-center justify-center h-96 pt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="p-4 lg:p-8 bg-slate-50 min-h-screen pt-20 lg:pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Laporan</h1><p className="text-slate-500 text-sm mt-1">Ringkasan keuangan</p></div>
        <button className="mt-4 sm:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Export
        </button>
      </div>

      {/* Stats - Mobile Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 -mx-4 px-4">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 text-white min-w-[140px]">
          <p className="text-emerald-100 text-xs">Pembayaran</p>
          <p className="text-lg font-bold">{formatCurrency(totalPendapatan)}</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white min-w-[140px]">
          <p className="text-amber-100 text-xs">Tabungan</p>
          <p className="text-lg font-bold">{formatCurrency(totalTabungan)}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white min-w-[140px]">
          <p className="text-purple-100 text-xs">Total</p>
          <p className="text-lg font-bold">{formatCurrency(totalKeseluruhan)}</p>
        </div>
      </div>

      {/* Mobile Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4 lg:hidden">
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-slate-500 text-xs">Anggota</p>
          <p className="text-2xl font-bold text-slate-800">{anggota.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card">
          <p className="text-slate-500 text-xs">Paket</p>
          <p className="text-2xl font-bold text-slate-800">{paket.length}</p>
        </div>
      </div>

      {/* Pembayaran Mobile */}
      <div className="lg:hidden mb-4">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Pembayaran</h2>
        <div className="space-y-3">
          {pembayaran.slice(0, 5).map((item) => (
            <div key={item._id} className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">{(item.anggota?.nama || 'A').charAt(0).toUpperCase()}</div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{item.anggota?.nama || '-'}</p>
                    <p className="text-xs text-slate-400">{item.paket?.nama || '-'}</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-600">{formatCurrency(item.jumlah)}</p>
              </div>
            </div>
          ))}
          {pembayaran.length === 0 && <div className="text-center py-4 text-slate-400 text-sm">Belum ada pembayaran</div>}
        </div>
      </div>

      {/* Tabungan Mobile */}
      <div className="lg:hidden mb-4">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Tabungan</h2>
        <div className="space-y-3">
          {tabungan.slice(0, 5).map((item) => (
            <div key={item._id} className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">{(item.anggota?.nama || 'A').charAt(0).toUpperCase()}</div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{item.anggota?.nama || '-'}</p>
                    <p className="text-xs text-slate-400">{item.keterangan || 'Tabungan'}</p>
                  </div>
                </div>
                <p className="font-bold text-amber-600">{formatCurrency(item.jumlah)}</p>
              </div>
            </div>
          ))}
          {tabungan.length === 0 && <div className="text-center py-4 text-slate-400 text-sm">Belum ada tabungan</div>}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-xl font-bold text-slate-800">Pembayaran Terbaru</h2></div>
          <div className="divide-y divide-slate-100">
            {pembayaran.slice(0, 5).map((item) => (
              <div key={item._id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-4"><div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">{(item.anggota?.nama || 'A').charAt(0).toUpperCase()}</div><div><p className="font-medium text-slate-800">{item.anggota?.nama || '-'}</p><p className="text-sm text-slate-500">{item.paket?.nama || '-'}</p></div></div>
                <div className="text-right"><p className="font-bold text-emerald-600">{formatCurrency(item.jumlah)}</p><p className="text-sm text-slate-400">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-xl font-bold text-slate-800">Tabungan Terbaru</h2></div>
          <div className="divide-y divide-slate-100">
            {tabungan.slice(0, 5).map((item) => (
              <div key={item._id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-4"><div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">{(item.anggota?.nama || 'A').charAt(0).toUpperCase()}</div><div><p className="font-medium text-slate-800">{item.anggota?.nama || '-'}</p><p className="text-sm text-slate-500">{item.keterangan || 'Tabungan'}</p></div></div>
                <div className="text-right"><p className="font-bold text-amber-600">{formatCurrency(item.jumlah)}</p><p className="text-sm text-slate-400">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ringkasan Paket - Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-slate-100"><h2 className="text-xl font-bold text-slate-800">Ringkasan Paket</h2></div>
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr><th className="p-4 text-left text-sm font-semibold text-slate-600">Nama Paket</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Harga</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Stok</th><th className="p-4 text-left text-sm font-semibold text-slate-600">Total Nilai</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paket.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{item.nama}</td>
                <td className="p-4 text-slate-600">{formatCurrency(item.harga)}</td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${item.stok > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{item.stok || 0}</span></td>
                <td className="p-4 font-semibold text-slate-800">{formatCurrency((item.harga || 0) * (item.stok || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Paket Summary */}
      <div className="lg:hidden">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Ringkasan Paket</h2>
        <div className="space-y-3">
          {paket.map((item) => (
            <div key={item._id} className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex justify-between items-center">
                <div><p className="font-medium text-slate-800">{item.nama}</p><p className="text-sm text-slate-500">{formatCurrency(item.harga)}</p></div>
                <div className="text-right"><p className={`text-lg font-bold ${item.stok > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{item.stok || 0}</p><p className="text-xs text-slate-400">stok</p></div>
              </div>
            </div>
          ))}
          {paket.length === 0 && <div className="text-center py-4 text-slate-400 text-sm">Belum ada paket</div>}
        </div>
      </div>
    </div>
  );
};

export default Laporan;