import { useState } from 'react';
import { useFinanceStore } from './store/financeStore';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import BalanceChart from './components/BalanceChart';
import SpendingPieChart from './components/SpendingPieChart';
import TransactionsTable from './components/TransactionsTable';
import AddTransactionForm from './components/AddTransactionForm';
import Insights from './components/Insights';
import { exportToCSV } from './utils/exportCSV';
import { Plus, Download } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const {
    transactions,
    userRole,
    darkMode,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setUserRole,
    toggleDarkMode,
    getFilteredTransactions,
    getTotalBalance,
    getTotalIncome,
    getTotalExpenses,
    getSpendingByCategory,
    getBalanceTrends,
    getInsights,
  } = useFinanceStore();

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  const filteredTransactions = getFilteredTransactions(filters);
  const totalBalance = getTotalBalance();
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const spendingByCategory = getSpendingByCategory();
  const balanceTrends = getBalanceTrends();
  const insights = getInsights();

  const handleAddTransaction = (transaction) => {
    if (editTransaction) {
      updateTransaction(editTransaction.id, transaction);
      setEditTransaction(null);
    } else {
      addTransaction(transaction);
    }
  };

  const handleEdit = (transaction) => {
    setEditTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header
        userRole={userRole}
        setUserRole={setUserRole}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
        {/* Dashboard Overview Section */}
        <section aria-label="Financial Summary" className="mb-8">
          <SummaryCards
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </section>

        {/* Visualizations Section */}
        <section aria-label="Financial Visualizations" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BalanceChart data={balanceTrends} />
          <SpendingPieChart data={spendingByCategory} />
        </section>

        {/* Main Content: Transactions + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions Section */}
          <section aria-label="Transactions" className="lg:col-span-2">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Transactions
              </h2>
              <div className="flex gap-3">
                {userRole === 'admin' && (
                  <motion.button
                    onClick={() => setIsFormOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Transaction
                  </motion.button>
                )}
                <motion.button
                  onClick={() => exportToCSV(filteredTransactions)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-300 font-medium"
                >
                  <Download className="w-4 h-4" />
                  Export
                </motion.button>
              </div>
            </div>
            <TransactionsTable
              transactions={filteredTransactions}
              filters={filters}
              setFilters={setFilters}
              userRole={userRole}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>

          {/* Insights Section */}
          <aside aria-label="Financial Insights" className="lg:col-span-1">
            <Insights insights={insights} />
          </aside>
        </div>
      </main>

      {/* Add/Edit Transaction Modal */}
      {userRole === 'admin' && (
        <AddTransactionForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleAddTransaction}
          editTransaction={editTransaction}
        />
      )}
    </div>
  );
}

export default App;
