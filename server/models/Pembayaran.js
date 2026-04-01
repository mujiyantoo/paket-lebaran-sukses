const mongoose = require('mongoose');

const pembayaranSchema = new mongoose.Schema({
  anggota: { type: mongoose.Schema.Types.ObjectId, ref: 'Anggota', required: true },
  paket: { type: mongoose.Schema.Types.ObjectId, ref: 'Paket', required: true },
  jumlah: { type: Number, required: true },
  tanggal: { type: Date, default: Date.now },
  metode: { type: String, enum: ['tunai', 'transfer', 'qris'], default: 'tunai' },
  keterangan: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Pembayaran', pembayaranSchema);