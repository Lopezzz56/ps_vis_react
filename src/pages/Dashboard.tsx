

// --- src/pages/DashboardPage.tsx ---
import { useEffect, useState } from 'react';
import type { TransactionType } from '../components/addtransactionform';
import { format } from 'date-fns';
import MonthlyExpensesChart from '../components/charts/MonthlyExpensesChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import BudgetVsActualChart from '../components/charts/BudgetVsActualChart';
import { InsightCard } from '../components/ui/Card';

type InsightData = {
  percentChange: string | null;
  topCategory: [string, number] | null;
  mostExceeded?: {
    category: string;
    difference: number;
  };
  mostApproaching?: {
    category: string;
    percentageUsed: string;
  };
};

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
const [budgets, setBudgets] = useState<{ category: string; limit: number }[]>([]);
  const [insights, setInsights] = useState<InsightData | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/insights') // adjust for Vercel API route if needed
      .then((res) => res.json())
      .then(setInsights)
      .catch(() => console.error('Failed to fetch insights'));
  }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [txRes, budgetRes] = await Promise.all([
        fetch('http://localhost:5000/api/transactions'),
        fetch('http://localhost:5000/api/budgets'),
      ]);

      const [txData, budgetData] = await Promise.all([txRes.json(), budgetRes.json()]);
      setTransactions(txData);
      setBudgets(budgetData);
    } catch (err) {
      console.error('Failed to fetch dashboard data');
    }
  };

  fetchData();
}, []);


  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

    const categoryBreakdown: Record<string, number> = {};
transactions.forEach((tx) => {
  if (tx.type === 'expense') {
    categoryBreakdown[tx.category] = (categoryBreakdown[tx.category] || 0) + tx.amount;
  }
});

  const recentTransactions = transactions.slice(0, 6);

  // --- Monthly Expenses ---
const monthlyExpenses = transactions
  .filter((tx) => tx.type === 'expense')
  .reduce((acc: Record<string, number>, tx) => {
    if (!tx.date) return acc;

    const date = new Date(tx.date);
    const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[key] = (acc[key] || 0) + tx.amount;
    return acc;
  }, {});

const monthlyExpensesArr = Object.entries(monthlyExpenses).map(([month, total]) => ({ month, total }));

// --- Category Expenses ---
const categoryExpenses = transactions
  .filter((tx) => tx.type === 'expense')
  .reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});
const categoryExpensesArr = Object.entries(categoryExpenses).map(([category, amount]) => ({ category, amount }));

// --- Budget vs Actual ---
const budgetVsActualArr = budgets.map((b) => ({
  category: b.category,
  budget: b.limit,
  actual: categoryExpenses[b.category] || 0,
}));

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-10">
<h1 className="text-3xl px-4 py-3 sm:px-8 sm:py-6 md:px-8 md:py-6 font-bold text-[#093FB4]">
  Dashboard
</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
  <div className="w-full max-w-xs bg-white shadow-xl p-5 rounded-xl border border-blue-900/10">
          <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</p>
        </div>

<div className="w-full max-w-xs bg-white shadow-xl p-5 rounded-xl border border-blue-900/10">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Category Breakdown</h3>
  <ul className="space-y-1 text-sm text-gray-800">
    {Object.entries(categoryBreakdown).map(([cat, amt]) => (
      <li key={cat} className="flex justify-between">
        <span>{cat}</span>
        <span>₹{amt.toFixed(2)}</span>
      </li>
    ))}
  </ul>
</div>


        <div className="w-full max-w-xs bg-white shadow-xl p-5 rounded-xl border border-blue-900/10">
          <h3 className="text-lg font-semibold text-gray-700">Total Transactions</h3>
          <p className="text-xl font-bold text-gray-900">{transactions.length}</p>
        </div>
      </div>

      <div className="bg-white shadow-xl border border-gray-100 rounded-xl overflow-x-auto">
        <h2 className="text-xl font-semibold p-4">Recent Transactions</h2>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3">Type</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx) => (
              <tr key={tx._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{format(new Date(tx.date!), 'MMM d, yyyy')}</td>
                <td className="p-3">{tx.description}</td>
                <td className="p-3">{tx.category}</td>
                <td className="p-3">{tx.type}</td>
                <td className="p-3 text-right">₹{tx.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          <div className="max-w-6xl mx-auto mt-10 grid gap-6 grid-cols-1 md:grid-cols-2">
      <MonthlyExpensesChart data={monthlyExpensesArr} />
      <CategoryPieChart data={categoryExpensesArr} />
      <div className="md:col-span-2">
        <BudgetVsActualChart data={budgetVsActualArr} />
      </div>
    </div>
     <h2 className="text-xl font-bold text-[#093FB4]">Insights</h2>

      {insights && (
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pb-8">
          <InsightCard
            title="Monthly Spending"
            message="Your spending"
            highlight={
              insights.percentChange
                ? `${insights.percentChange}% ${parseFloat(insights.percentChange) >= 0 ? '↑' : '↓'} compared to last month`
                : 'No data for previous month'
            }
            color="blue"
          />
          <InsightCard
            title="Top Category"
            message="Most spent on"
            highlight={
              insights.topCategory
                ? `${insights.topCategory[0]} (${insights.topCategory[1]} ₹)`
                : 'No data'
            }
            color="green"
          />
          <InsightCard
            title="Budget Status"
            message={
              insights.mostExceeded
                ? `Exceeded your ${insights.mostExceeded.category} budget by`
                : 'No overspending'
            }
            highlight={
              insights.mostExceeded
                ? `₹${insights.mostExceeded.difference}`
                : ''
            }
            color="red"
          />
          <InsightCard
            title="Overspending Alert"
            message={
              insights.mostApproaching
                ? `${insights.mostApproaching.category} is`
                : 'No alert'
            }
            highlight={
              insights.mostApproaching
                ? `${insights.mostApproaching.percentageUsed}% used`
                : ''
            }
            color="orange"
          />
        </div>
      )}
    </div>
  );
}
