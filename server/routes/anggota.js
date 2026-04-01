const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Anggota = require('../models/Anggota');

router.get('/', auth, async (req, res) => {
  try {
    const anggota = await Anggota.find().sort({ createdAt: -1 });
    res.json(anggota);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const anggota = new Anggota(req.body);
    await anggota.save();
    res.json(anggota);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const anggota = await Anggota.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(anggota);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Anggota.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Anggota deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;