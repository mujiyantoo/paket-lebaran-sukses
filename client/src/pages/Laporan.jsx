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
    try {
      const [pembayaranData, tabunganData, paketData, anggotaData] = await Promise.all([
        getPembayaran(), getTabunganBebas(), getPaket(), getAnggota()
      ]);
      setPembayaran(pembayaranData);
      setTabungan(tabunganData);
      setPaket(paketData);
      setAnggota(anggotaData);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const totalPendapatan = pembayaran.reduce((sum, p) => sum + (p.jumlah || 0), 0);
  const totalTabungan = tabungan.reduce((sum, t) => sum + (t.jumlah || 0), 0);
  const totalKeseluruhan = totalPendapatan + totalTabungan;

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
          <h1 className="text-3xl font-bold text-slate-800">Laporan</h1>
          <p className="text-slate-500 mt-1">Ringkasan keuangan dan aktivitas</p>
        </div>
        <button className="mt-4 md:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-emerald-200 text-sm">+12.5%</span>
          </div>
          <p className="text-emerald-200 text-sm">Total Pembayaran</p>
          <p className="text-2xl font-bold">{formatCurrency(totalPendapatan)}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <span className="text-amber-200 text-sm">+8.3%</span>
          </div>
          <p className="text-amber-200 text-sm">Total Tabungan</p>
          <p className="text-2xl font-bold">{formatCurrency(totalTabungan)}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
          </div>
          <p className="text-slate-500 text-sm">Total Anggota</p>
          <p className="text-2xl font-bold text-slate-800">{anggota.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
          </div>
          <p className="text-purple-200 text-sm">Total Keseluruhan</p>
          <p className="text-2xl font-bold">{formatCurrency(totalKeseluruhan)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Pembayaran Terbaru</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {pembayaran.slice(0, 5).map((item) => (
              <div key={item._id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {(item.anggota?.nama || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.anggota?.nama || '-'}</p>
                    <p className="text-sm text-slate-500">{item.paket?.nama || '-'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{formatCurrency(item.jumlah)}</p>
                  <p className="text-sm text-slate-400">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</p>
                </div>
              </div>
            ))}
            {pembayaran.length === 0 && <div className="p-8 text-center text-slate-400">Belum ada pembayaran</div>}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Tabungan Terbaru</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {tabungan.slice(0, 5).map((item) => (
              <div key={item._id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {(item.anggota?.nama || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.anggota?.nama || '-'}</p>
                    <p className="text-sm text-slate-500">{item.keterangan || 'Tabungan'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-600">{formatCurrency(item.jumlah)}</p>
                  <p className="text-sm text-slate-400">{item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</p>
                </div>
              </div>
            ))}
            {tabungan.length === 0 && <div className="p-8 text-center text-slate-400">Belum ada tabungan</div>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Ringkasan Paket</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Nama Paket</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Harga</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Stok</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Total Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paket.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">{item.nama}</td>
                  <td className="p-4 text-slate-600">{formatCurrency(item.harga)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.stok > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {item.stok || 0}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{formatCurrency((item.harga || 0) * (item.stok || 0))}</td>
                </tr>
              ))}
              {paket.length === 0 && (
                <tr><td colSpan="4" className="p-8 text-center text-slate-400">Belum ada paket</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Laporan;