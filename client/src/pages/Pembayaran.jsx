import React, { useState } from 'react';

const Pembayaran = () => {
  const [pembayaran] = useState([
    { id: 1, anggota: 'Ahmad Faisal', paket: 'Paket Emas', jumlah: 500000, status: 'Lunas', tanggal: '2024-03-15' },
    { id: 2, anggota: 'Siti Rahayu', paket: 'Paket Silver', jumlah: 300000, status: 'Lunas', tanggal: '2024-03-14' },
    { id: 3, anggota: 'Budi Santoso', paket: 'Paket Bronze', jumlah: 150000, status: 'Belum Lunas', tanggal: '2024-03-10' },
    { id: 4, anggota: 'Dewi Lestari', paket: 'Paket Emas', jumlah: 500000, status: 'Lunas', tanggal: '2024-03-12' },
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Data Pembayaran</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Catat Pembayaran
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Anggota</th>
              <th className="p-4 text-left">Paket</th>
              <th className="p-4 text-left">Jumlah</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pembayaran.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.anggota}</td>
                <td className="p-4">{item.paket}</td>
                <td className="p-4">Rp {item.jumlah.toLocaleString('id-ID')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${item.status === 'Lunas' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4">{item.tanggal}</td>
                <td className="p-4">
                  <button className="text-blue-500 hover:underline">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pembayaran;