
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import AddTransactionPage from './pages/addtransactions'
import TransactionsPage from './pages/transactions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import DashboardPage from './pages/Dashboard'
import AddBudgetPage from './pages/addBudget'

function App() {

  return (
    <>
        <BrowserRouter>
              <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} /> 
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="add-transaction" element={<AddTransactionPage />} />
          <Route path="add-budget" element={<AddBudgetPage />} />

        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
