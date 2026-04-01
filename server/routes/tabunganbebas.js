const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TabunganBebas = require('../models/TabunganBebas');

router.get('/', auth, async (req, res) => {
  try {
    const tabungan = await TabunganBebas.find()
      .populate('anggota', 'nama')
      .sort({ createdAt: -1 });
    res.json(tabungan);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const tabungan = new TabunganBebas(req.body);
    await tabungan.save();
    res.json(tabungan);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await TabunganBebas.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Tabungan deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;