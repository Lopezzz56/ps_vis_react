import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import type { TransactionType } from '../components/addtransactionform';
import TransactionForm from '../components/addtransactionform';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [editingTx, setEditingTx] = useState<TransactionType | null>(null);

  const fetchTransactions = async () => {
    const res = await fetch('http://localhost:5000/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  const deleteTransaction = async (id: string) => {
    await fetch(`http://localhost:5000/api/transactions/${id}`, { method: 'DELETE' });
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-10">
      {editingTx && (
        <TransactionForm
          type="edit"
          defaultValues={editingTx}
          onSubmitSuccess={() => {
            fetchTransactions();
            setEditingTx(null);
          }}
        />
      )}

      <div className="bg-white shadow-xl border border-gray-100 rounded-xl overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3">Type</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">No transactions found.</td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{format(new Date(tx.date!), 'MMM d, yyyy')}</td>
                  <td className="p-3">{tx.description}</td>
                  <td className="p-3">{tx.category}</td>
                  <td className="p-3">{tx.type}</td>
                  <td className="p-3 text-right">₹{tx.amount.toFixed(2)}</td>
                    <td className="p-3">
                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <button
                        onClick={() => setEditingTx(tx)}
                        className="bg-[#093FB4] hover:bg-[#072d88] text-white px-3 py-1 rounded text-sm"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => deleteTransaction(tx._id!)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                        Delete
                        </button>
                    </div>
                    </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
