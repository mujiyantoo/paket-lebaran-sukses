import React from 'react';

const Laporan = () => {
  const laporan = [
    { bulan: 'Januari 2024', pendapatan: 15000000, pengeluaran: 5000000, profit: 10000000 },
    { bulan: 'Februari 2024', pendapatan: 18000000, pengeluaran: 6000000, profit: 12000000 },
    { bulan: 'Maret 2024', pendapatan: 22000000, pengeluaran: 8000000, profit: 14000000 },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Laporan Keuangan</h1>
        <div className="flex gap-2">
          <select className="border p-2 rounded">
            <option>2024</option>
            <option>2023</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Export PDF
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Pendapatan</div>
          <div className="text-3xl font-bold text-green-600">Rp 55.000.000</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Pengeluaran</div>
          <div className="text-3xl font-bold text-red-600">Rp 19.000.000</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Profit</div>
          <div className="text-3xl font-bold text-blue-600">Rp 36.000.000</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Bulan</th>
              <th className="p-4 text-left">Pendapatan</th>
              <th className="p-4 text-left">Pengeluaran</th>
              <th className="p-4 text-left">Profit</th>
            </tr>
          </thead>
          <tbody>
            {laporan.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{item.bulan}</td>
                <td className="p-4 text-green-600">Rp {item.pendapatan.toLocaleString('id-ID')}</td>
                <td className="p-4 text-red-600">Rp {item.pengeluaran.toLocaleString('id-ID')}</td>
                <td className="p-4 text-blue-600 font-bold">Rp {item.profit.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Laporan;