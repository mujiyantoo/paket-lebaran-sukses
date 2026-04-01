const mongoose = require('mongoose');

const anggotaSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  alamat: { type: String },
  telepon: { type: String },
  bergabung: { type: Date, default: Date.now },
  status: { type: String, enum: ['aktif', 'nonaktif'], default: 'aktif' },
}, { timestamps: true });

module.exports = mongoose.model('Anggota', anggotaSchema);