// --- server/routes/transactions.js ---
import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to create transaction' });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const allTx = await Transaction.find().sort({ date: -1 });
    res.json(allTx);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transaction' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedTx = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTx);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update transaction' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
});

export default router;