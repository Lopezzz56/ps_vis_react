import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const CATEGORIES = [
  'Food', 'Shopping', 'Transportation', 'Utilities', 'Entertainment',
  'Health', 'Savings', 'Loans', 'Other',
];

type BudgetType = {
  [category: string]: number;
};

interface Props {
  onSubmitSuccess: () => void;
}

export default function AddBudgetForm({ onSubmitSuccess }: Props) {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BudgetType>({ defaultValues: {} });

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/budgets');
        const data = await res.json();

        // Pre-fill existing values
        data.forEach((item: { category: string; limit: number }) => {
          setValue(item.category, item.limit);
        });
      } catch (err) {
        toast.error('Failed to load existing budgets');
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [setValue]);

  const onSubmit = async (data: BudgetType) => {
    try {
      // Send multiple updates
      const entries = Object.entries(data);
      const responses = await Promise.all(entries.map(([category, limit]) =>
        fetch('http://localhost:5000/api/budgets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, limit }),
        })
      ));

      if (responses.some(res => !res.ok)) {
        throw new Error('Failed to update some budgets');
      }

      toast.success('Budgets updated');
      onSubmitSuccess();
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-3xl border border-blue-900/10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-[#093FB4] text-center mb-4">Set Monthly Budgets</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading budgets...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <div key={cat}>
                <label className="block mb-1 font-medium text-gray-700">{cat}</label>
                <input
                  type="number"
                  step="0.01"
                  {...register(cat, { required: false, min: 0 })}
                  placeholder="₹0.00"
                  className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#093FB4]"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full bg-[#093FB4] hover:bg-[#072d88] text-white font-semibold py-2 px-4 rounded-full transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save Budgets'}
        </button>
      </form>
    </div>
  );
}
