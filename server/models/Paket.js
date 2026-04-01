const mongoose = require('mongoose');

const paketSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  deskripsi: { type: String },
  items: [{ type: String }],
  stok: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Paket', paketSchema);