import React from 'react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Anggota', value: '150', color: 'bg-blue-500' },
    { label: 'Paket Terjual', value: '320', color: 'bg-green-500' },
    { label: 'Total Pendapatan', value: 'Rp 64.000.000', color: 'bg-yellow-500' },
    { label: 'Nabung Aktif', value: '45', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
            <span>Pembayaran paket oleh Ahmad</span>
            <span className="text-gray-500">10 menit lalu</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Anggota baru: Siti Rahayu</span>
            <span className="text-gray-500">1 jam lalu</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Nabung baru dari Budi</span>
            <span className="text-gray-500">2 jam lalu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;