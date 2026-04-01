const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Pembayaran = require('../models/Pembayaran');

router.get('/', auth, async (req, res) => {
  try {
    const pembayaran = await Pembayaran.find()
      .populate('anggota', 'nama')
      .populate('paket', 'nama')
      .sort({ createdAt: -1 });
    res.json(pembayaran);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const pembayaran = new Pembayaran(req.body);
    await pembayaran.save();
    res.json(pembayaran);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Pembayaran.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Pembayaran deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;