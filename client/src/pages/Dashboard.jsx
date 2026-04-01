import React, { useEffect, useState } from 'react';
import { getPaket } from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    anggota: 0,
    paketTerjual: 0,
    pendapatan: 0,
    tabunganAktif: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const paket = await getPaket();
      setStats({
        anggota: 150,
        paketTerjual: paket.length * 50,
        pendapatan: paket.reduce((sum, p) => sum + (p.harga || 0), 0) * 30,
        tabunganAktif: 45,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  const statCards = [
    { label: 'Total Anggota', value: stats.anggota, color: 'bg-blue-500' },
    { label: 'Paket Tersedia', value: stats.paketTerjual, color: 'bg-green-500' },
    { label: 'Total Pendapatan', value: `Rp ${stats.pendapatan.toLocaleString('id-ID')}`, color: 'bg-yellow-500' },
    { label: 'Nabung Aktif', value: stats.tabunganAktif, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`${stat.color} text-white p-6 rounded-lg shadow-lg`}>
            <div className="text-sm opacity-80">{stat.label}</div>
            <div className="text-3xl font-bold mt-2">{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span>Sistem berjalan dengan baik</span>
            <span className="text-gray-500">Sekarang</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;