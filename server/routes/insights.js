// routes/insights.js
import express from 'express';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const startThisMonth = startOfMonth(now);
    const endThisMonth = endOfMonth(now);
    const startLastMonth = startOfMonth(subMonths(now, 1));
    const endLastMonth = endOfMonth(subMonths(now, 1));

    const [allTransactions, budgets] = await Promise.all([
      Transaction.find({ type: 'expense' }),
      Budget.find(),
    ]);

    // Monthly totals
    const thisMonthTotal = allTransactions
      .filter(tx => tx.date >= startThisMonth && tx.date <= endThisMonth)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const lastMonthTotal = allTransactions
      .filter(tx => tx.date >= startLastMonth && tx.date <= endLastMonth)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const percentChange = lastMonthTotal > 0
      ? (((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1)
      : null;

    // Top category this month
    const categoryTotals = {};
    allTransactions.forEach((tx) => {
      const isThisMonth = tx.date >= startThisMonth && tx.date <= endThisMonth;
      if (isThisMonth) {
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
      }
    });

    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

    // Budget Status
    const budgetInsights = budgets.map(b => {
      const actual = categoryTotals[b.category] || 0;
      const diff = actual - b.limit;
      return {
        category: b.category,
        limit: b.limit,
        actual,
        over: diff > 0,
        difference: Math.abs(diff),
        percentageUsed: ((actual / b.limit) * 100).toFixed(0),
      };
    });

    const mostExceeded = budgetInsights.find(b => b.over);
    const mostApproaching = budgetInsights.find(b => b.percentageUsed >= 85 && !b.over);

    res.json({
      percentChange,
      topCategory,
      mostExceeded,
      mostApproaching,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to compute insights' });
  }
});

export default router;
