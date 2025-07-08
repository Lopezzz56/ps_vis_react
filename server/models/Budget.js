// server/models/Budget.js
import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      'Food', 'Shopping', 'Transportation', 'Utilities', 'Entertainment',
      'Health', 'Savings', 'Loans', 'Other'
    ],
  },
  limit: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default mongoose.model('Budget', budgetSchema);
