const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Paket = require('../models/Paket');

router.get('/', async (req, res) => {
  try {
    const paket = await Paket.find().sort({ createdAt: -1 });
    res.json(paket);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const paket = new Paket(req.body);
    await paket.save();
    res.json(paket);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const paket = await Paket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(paket);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Paket.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Paket deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;