import React, { useEffect, useState } from 'react';
import { getPembayaran, getTabunganBebas } from '../api';

const Laporan = () => {
  const [pembayaran, setPembayaran] = useState([]);
  const [tabungan, setTabungan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pembayaranData, tabunganData] = await Promise.all([getPembayaran(), getTabunganBebas()]);
      setPembayaran(pembayaranData);
      setTabungan(tabunganData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPendapatan = pembayaran.reduce((sum, p) => sum + (p.jumlah || 0), 0);
  const totalTabungan = tabungan.reduce((sum, t) => sum + (t.jumlah || 0), 0);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Laporan</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Export PDF
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Pembayaran</div>
          <div className="text-2xl font-bold text-green-600">Rp {totalPendapatan.toLocaleString('id-ID')}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Tabungan</div>
          <div className="text-2xl font-bold text-blue-600">Rp {totalTabungan.toLocaleString('id-ID')}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Transaksi</div>
          <div className="text-2xl font-bold">{pembayaran.length + tabungan.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Pendapatan</div>
          <div className="text-2xl font-bold text-purple-600">Rp {(totalPendapatan + totalTabungan).toLocaleString('id-ID')}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pembayaran Terbaru</h2>
          <div className="space-y-3">
            {pembayaran.slice(0, 5).map((item) => (
              <div key={item._id} className="flex justify-between border-b pb-2">
                <span>{item.anggota?.nama || '-'}</span>
                <span className="font-medium text-green-600">Rp {item.jumlah?.toLocaleString('id-ID')}</span>
              </div>
            ))}
            {pembayaran.length === 0 && <p className="text-gray-500">Data kosong</p>}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tabungan Terbaru</h2>
          <div className="space-y-3">
            {tabungan.slice(0, 5).map((item) => (
              <div key={item._id} className="flex justify-between border-b pb-2">
                <span>{item.anggota?.nama || '-'}</span>
                <span className="font-medium text-blue-600">Rp {item.jumlah?.toLocaleString('id-ID')}</span>
              </div>
            ))}
            {tabungan.length === 0 && <p className="text-gray-500">Data kosong</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;