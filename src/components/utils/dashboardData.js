// --- server/utils/dashboardData.js ---
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';

export async function getDashboardData() {
  const transactions = await Transaction.find();
  const budgets = await Budget.find();

  // Group by month (e.g., 'Jul 2025')
  const monthlyExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      const date = new Date(tx.date);
      const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[key] = (acc[key] || 0) + tx.amount;
      return acc;
    }, {});

  const monthlyExpensesArr = Object.entries(monthlyExpenses).map(([month, total]) => ({
    month,
    total,
  }));

  // Sum per category
  const categoryExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const categoryExpensesArr = Object.entries(categoryExpenses).map(([category, amount]) => ({
    category,
    amount,
  }));

  // Budget vs Actual
  const budgetVsActualArr = budgets.map(b => ({
    category: b.category,
    budget: b.limit,
    actual: categoryExpenses[b.category] || 0,
  }));

  return {
    monthlyExpenses: monthlyExpensesArr,
    categoryExpenses: categoryExpensesArr,
    budgetVsActual: budgetVsActualArr,
  };
}
