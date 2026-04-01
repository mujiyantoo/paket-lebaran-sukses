import React, { useState } from 'react';

const Anggota = () => {
  const [anggota] = useState([
    { id: 1, nama: 'Ahmad Faisal', email: 'ahmad@mail.com', paket: 'Paket Emas', status: 'Aktif' },
    { id: 2, nama: 'Siti Rahayu', email: 'siti@mail.com', paket: 'Paket Silver', status: 'Aktif' },
    { id: 3, nama: 'Budi Santoso', email: 'budi@mail.com', paket: 'Paket Bronze', status: 'Nonaktif' },
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Data Anggota</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Tambah Anggota
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Paket</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {anggota.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.nama}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.paket}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-500 hover:underline mr-3">Edit</button>
                  <button className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Anggota;