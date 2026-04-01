import React, { useState } from 'react';

const NabungBebas = () => {
  const [nabung] = useState([
    { id: 1, anggota: 'Budi Santoso', target: 1000000, terkumpul: 650000, tenor: '10 bulan' },
    { id: 2, anggota: 'Dewi Lestari', target: 500000, terkumpul: 350000, tenor: '5 bulan' },
    { id: 3, anggota: 'Hendra Wijaya', target: 750000, terkumpul: 200000, tenor: '8 bulan' },
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Nabung Bebas</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Ajukan Nabung
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Nabung Aktif</div>
          <div className="text-3xl font-bold">45</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Nominal</div>
          <div className="text-3xl font-bold">Rp 25.000.000</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Tercapai</div>
          <div className="text-3xl font-bold text-green-500">Rp 18.500.000</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Anggota</th>
              <th className="p-4 text-left">Target</th>
              <th className="p-4 text-left">Tercapai</th>
              <th className="p-4 text-left">Progress</th>
              <th className="p-4 text-left">Tenor</th>
            </tr>
          </thead>
          <tbody>
            {nabung.map((item, index) => {
              const progress = (item.terkumpul / item.target) * 100;
              return (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{item.anggota}</td>
                  <td className="p-4">Rp {item.target.toLocaleString('id-ID')}</td>
                  <td className="p-4">Rp {item.terkumpul.toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-500">{progress.toFixed(0)}%</span>
                  </td>
                  <td className="p-4">{item.tenor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NabungBebas;