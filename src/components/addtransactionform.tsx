import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export type TransactionType = {
  _id?: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date?: string;
};

interface Props {
  type: 'add' | 'edit';
  defaultValues?: TransactionType;
  onSubmitSuccess: () => void;
}

export const CATEGORIES = ['Food', 'Shopping', 'Transportation', 'Utilities', 'Entertainment', 'Health', 'Savings', 'Loans', 'Other'];

export default function TransactionForm({ type, defaultValues, onSubmitSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionType>({
    defaultValues: defaultValues || {
      amount: 0,
      category: '',
      description: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = async (data: TransactionType) => {
    try {
      const endpoint =
        type === 'add'
          ? 'http://localhost:5000/api/transactions'
          : `http://localhost:5000/api/transactions/${defaultValues?._id}`;

      const method = type === 'add' ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save transaction');
      }

      toast.success(`Transaction ${type === 'add' ? 'added' : 'updated'} successfully`);
      onSubmitSuccess();
      if (type === 'add') reset();
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-3xl border border-blue-900/10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-[#093FB4] text-center">
          {type === 'add' ? 'Add Transaction' : 'Edit Transaction'}
        </h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Amount (₹)</label>
          <input
            type="number"
            step="0.01"
            {...register('amount', { required: 'Amount is required', min: 0.01 })}
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#093FB4]"
          />
          {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#093FB4] text-sm"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <input
            type="text"
            {...register('description', {
              maxLength: { value: 100, message: 'Max 100 characters allowed' },
            })}
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#093FB4]"
          />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Type</label>
          <select
            {...register('type', { required: 'Type is required' })}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#093FB4] text-sm"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#093FB4]"
          />
          {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#093FB4] hover:bg-[#072d88] text-white font-semibold py-2 px-4 rounded-full transition-colors"
        >
          {isSubmitting ? 'Saving...' : type === 'add' ? 'Add Transaction' : 'Update Transaction'}
        </button>
      </form>
    </div>
  );
}
