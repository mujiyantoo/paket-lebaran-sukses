import React, { useEffect, useState } from 'react';
import { getPaket, getAnggota, getPembayaran, getTabunganBebas } from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({ anggota: 0, paketTerjual: 0, pendapatan: 0, tabunganAktif: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    try {
      const [paket, anggota, pembayaran, tabungan] = await Promise.all([
        getPaket(), getAnggota(), getPembayaran(), getTabunganBebas()
      ]);
      
      setStats({
        anggota: anggota.length,
        paketTerjual: paket.length,
        pendapatan: pembayaran.reduce((sum, p) => sum + (p.jumlah || 0), 0),
        tabunganAktif: tabungan.length,
      });

      const activities = [
        ...pembayaran.map(p => ({ type: 'pembayaran', nama: p.anggota?.nama, jumlah: p.jumlah, waktu: p.createdAt })),
        ...tabungan.map(t => ({ type: 'tabungan', nama: t.anggota?.nama, jumlah: t.jumlah, waktu: t.createdAt }))
      ].sort((a, b) => new Date(b.waktu) - new Date(a.waktu)).slice(0, 5);

      setRecentActivity(activities);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const formatCurrency = (num) => `Rp ${(num || 0).toLocaleString('id-ID')}`;

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Selamat datang di Paket Lebaran Sukses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Anggota', value: stats.anggota, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a4 4 0 11-8 0 4 4 0 018 0zM17 20a4 4 0 100-8 4 4 0 000 8z', color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10' },
          { label: 'Paket Tersedia', value: stats.paketTerjual, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-500/10' },
          { label: 'Total Pendapatan', value: formatCurrency(stats.pendapatan), icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-amber-500 to-orange-400', bg: 'bg-amber-500/10' },
          { label: 'Tabungan Aktif', value: stats.tabunganAktif, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', color: 'from-purple-500 to-pink-400', bg: 'bg-purple-500/10' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}>
              <svg className={`w-7 h-7 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
              </svg>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Aktivitas Terbaru</h2>
            <span className="text-sm text-slate-400">Terakhir diperbarui</span>
          </div>
          <div className="space-y-4">
            {recentActivity.length > 0 ? recentActivity.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'pembayaran' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.type === 'pembayaran' ? "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"} />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{item.nama || 'Unknown'}</p>
                  <p className="text-sm text-slate-400">{item.type === 'pembayaran' ? 'Pembayaran' : 'Tabungan'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-600">{formatCurrency(item.jumlah)}</p>
                  <p className="text-xs text-slate-400">{new Date(item.waktu).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-400">Belum ada aktivitas</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Ringkasan Bulan Ini</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-800">Pemasukan</p>
                  <p className="text-sm text-slate-500">Dari pembayaran</p>
                </div>
              </div>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(stats.pendapatan)}</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-800">Tabungan</p>
                  <p className="text-sm text-slate-500">Nabung bebas</p>
                </div>
              </div>
              <p className="text-xl font-bold text-amber-600">{stats.tabunganAktif} transaksi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;