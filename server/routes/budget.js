import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

// Create or Update budget (one per category)
router.post('/', async (req, res) => {
  try {
    const { category, limit } = req.body;
    if (!category || limit === undefined || limit === null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Budget.findOne({ category });
    if (existing) {
      existing.limit = limit;
      await existing.save();
      return res.status(200).json(existing);
    }

    const budget = new Budget({ category, limit });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
});


// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch budgets' });
  }
});

export default router;
