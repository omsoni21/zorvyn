import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Award, BarChart3 } from 'lucide-react';

const Insights = ({ insights }) => {
  if (!insights) {
    return (
      <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-xl p-8 border border-white/50 dark:border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Financial Insights
          </h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400">No insights available yet</p>
      </div>
    );
  }

  const {
    highestSpendingCategory,
    monthlyExpenseTotal,
    previousMonthTotal,
    percentageChange,
  } = insights;

  const isIncrease = percentageChange > 0;
  const changeColor = isIncrease
    ? 'text-rose-600 dark:text-rose-400'
    : 'text-emerald-600 dark:text-emerald-400';
  const ChangeIcon = isIncrease ? TrendingUp : TrendingDown;
  const gradientFrom = isIncrease ? 'from-rose-500' : 'from-emerald-500';
  const gradientTo = isIncrease ? 'to-red-500' : 'to-green-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-xl p-6 border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-md">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Financial Insights
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Smart analytics for better decisions
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Highest Spending Category */}
        {highestSpendingCategory && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="flex items-start gap-4 p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <motion.div 
              className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1 uppercase tracking-wide">
                Highest Spending
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                {highestSpendingCategory.name}
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                ${highestSpendingCategory.amount.toLocaleString()}
              </p>
            </div>
          </motion.div>
        )}

        {/* Monthly Expense Total */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 shadow-md hover:shadow-xl transition-all duration-300"
        >
          <motion.div 
            className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <DollarSign className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wide">
              This Month's Expenses
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              ${monthlyExpenseTotal.toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Month-over-Month Comparison */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className={`flex items-start gap-4 p-5 bg-gradient-to-br ${
            isIncrease 
              ? 'from-rose-50 via-orange-50 to-yellow-50 dark:from-rose-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 border-rose-100 dark:border-rose-800/50'
              : 'from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-teal-900/20 border-emerald-100 dark:border-emerald-800/50'
          } rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300`}
        >
          <motion.div 
            className={`p-3 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <ChangeIcon className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
              vs Last Month
            </p>
            <p className={`text-3xl font-bold ${changeColor}`}>
              {isIncrease ? '+' : ''}{percentageChange.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
              Previous: <span className="font-bold">${previousMonthTotal.toLocaleString()}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Insights;
