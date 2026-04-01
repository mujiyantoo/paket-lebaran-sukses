import React, { useState } from 'react';

const Paket = () => {
  const [paket] = useState([
    { id: 1, nama: 'Paket Emas', harga: 500000, fasilitas: 'THR + Haji/Umroh', anggota: 50 },
    { id: 2, nama: 'Paket Silver', harga: 300000, fasilitas: 'THR + Zakat', anggota: 80 },
    { id: 3, nama: 'Paket Bronze', harga: 150000, fasilitas: 'THR Sederhana', anggota: 120 },
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Paket</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Tambah Paket
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paket.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">{item.nama}</h3>
            <div className="text-3xl font-bold text-blue-600 mb-4">
              Rp {item.harga.toLocaleString('id-ID')}
            </div>
            <p className="text-gray-600 mb-4">{item.fasilitas}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{item.anggota} anggota</span>
              <div>
                <button className="text-blue-500 hover:underline mr-3">Edit</button>
                <button className="text-red-500 hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paket;