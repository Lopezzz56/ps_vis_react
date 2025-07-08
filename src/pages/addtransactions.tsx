// src/pages/AddTransactionPage.tsx
import TransactionForm from '../components/addtransactionform';
import { useNavigate } from 'react-router-dom';

export default function AddTransactionPage() {
  const navigate = useNavigate();

  return (
    <TransactionForm
      type="add"
      onSubmitSuccess={() => navigate('/transactions')}
    />
  );
}
