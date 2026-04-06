import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, Edit, Trash2, Table } from 'lucide-react';

const TransactionsTable = ({
  transactions,
  filters,
  setFilters,
  userRole,
  onEdit,
  onDelete,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'all',
    ...new Set(transactions.map((t) => t.category)),
  ];

  const handleSort = (sortBy) => {
    if (filters.sortBy === sortBy) {
      setFilters({
        ...filters,
        sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setFilters({
        ...filters,
        sortBy,
        sortOrder: 'desc',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
              <Table className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Transactions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search || ''}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 transition-all w-full md:w-64"
              />
            </div>
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 border rounded-xl transition-all ${
                showFilters 
                  ? 'bg-indigo-100 border-indigo-300 dark:bg-indigo-900/30 dark:border-indigo-700' 
                  : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className={`w-4 h-4 ${
                showFilters 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`} />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-indigo-100 dark:border-slate-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Filter by Category
                  </label>
                  <select
                    value={filters.category || 'all'}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-100 transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy || 'date'}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-100 transition-all"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-full mb-4"
          >
            <Table className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </motion.div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No transactions found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filters.search || filters.category
              ? 'Try adjusting your filters'
              : 'Add your first transaction to get started'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 border-b-2 border-gray-200 dark:border-slate-600">
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Category
                </th>
                <th
                  className="text-left py-4 px-6 text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-2">
                    Amount
                    <ArrowUpDown className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Type
                </th>
                {userRole === 'admin' && (
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ 
                    scale: 1.01,
                    backgroundColor: 'rgba(99, 102, 241, 0.05)'
                  }}
                  className="hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 transition-all duration-200"
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-6 text-sm font-bold ${
                      transaction.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {transaction.type === 'income' ? '+' : '-'}$
                      {transaction.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                        transaction.type === 'income'
                          ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-gradient-to-r from-rose-100 to-red-100 text-rose-800 dark:from-rose-900/30 dark:to-red-900/30 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                      }`}
                    >
                      {transaction.type === 'income' ? (
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          ↑
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ y: [0, 2, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          ↓
                        </motion.div>
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  {userRole === 'admin' && (
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => onEdit(transaction)}
                          whileHover={{ scale: 1.15, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2.5 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-xl transition-all shadow-sm hover:shadow-md"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => onDelete(transaction.id)}
                          whileHover={{ scale: 1.15, rotate: -15 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2.5 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-xl transition-all shadow-sm hover:shadow-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionsTable;
