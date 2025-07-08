// --- src/pages/AddBudgetPage.tsx ---
import BudgetForm from '../../src/components/addBudgetForm';

export default function AddBudgetPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-3xl border border-blue-900/10">
      <h1 className="text-2xl font-bold text-center text-[#093FB4] mb-6">Assign Budgets</h1>
      <BudgetForm onSubmitSuccess={() => alert('Budget saved successfully')} />
    </div>
  );
}