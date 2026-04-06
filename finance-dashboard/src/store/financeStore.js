import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialTransactions = [
  { id: 1, date: '2026-04-01', amount: 3500, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-04-02', amount: 120, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2026-04-03', amount: 45, category: 'Transport', type: 'expense' },
  { id: 4, date: '2026-04-03', amount: 80, category: 'Entertainment', type: 'expense' },
  { id: 5, date: '2026-04-04', amount: 500, category: 'Freelance', type: 'income' },
  { id: 6, date: '2026-04-04', amount: 200, category: 'Rent', type: 'expense' },
  { id: 7, date: '2026-04-05', amount: 60, category: 'Utilities', type: 'expense' },
  { id: 8, date: '2026-03-15', amount: 3500, category: 'Salary', type: 'income' },
  { id: 9, date: '2026-03-20', amount: 150, category: 'Groceries', type: 'expense' },
  { id: 10, date: '2026-03-25', amount: 300, category: 'Rent', type: 'expense' },
];

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: initialTransactions,
      userRole: 'admin',
      darkMode: false,
      
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: Date.now() },
          ],
        })),
      
      updateTransaction: (id, updatedData) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedData } : t
          ),
        })),
      
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      
      setUserRole: (role) => set({ userRole: role }),
      
      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.darkMode;
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { darkMode: newDarkMode };
        }),
      
      getFilteredTransactions: (filters) => {
        const { transactions } = get();
        let filtered = [...transactions];
        
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.category.toLowerCase().includes(searchLower) ||
              t.type.toLowerCase().includes(searchLower)
          );
        }
        
        if (filters.category && filters.category !== 'all') {
          filtered = filtered.filter((t) => t.category === filters.category);
        }
        
        if (filters.sortBy) {
          filtered.sort((a, b) => {
            if (filters.sortBy === 'date') {
              return filters.sortOrder === 'asc'
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
            }
            if (filters.sortBy === 'amount') {
              return filters.sortOrder === 'asc'
                ? a.amount - b.amount
                : b.amount - a.amount;
            }
            return 0;
          });
        }
        
        return filtered;
      },
      
      getTotalBalance: () => {
        const { transactions } = get();
        return transactions.reduce((acc, t) => {
          return t.type === 'income' ? acc + t.amount : acc - t.amount;
        }, 0);
      },
      
      getTotalIncome: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'income')
          .reduce((acc, t) => acc + t.amount, 0);
      },
      
      getTotalExpenses: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'expense')
          .reduce((acc, t) => acc + t.amount, 0);
      },
      
      getSpendingByCategory: () => {
        const { transactions } = get();
        const expenses = transactions.filter((t) => t.type === 'expense');
        const categoryMap = {};
        
        expenses.forEach((t) => {
          categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });
        
        return Object.entries(categoryMap).map(([name, value]) => ({
          name,
          value,
        }));
      },
      
      getBalanceTrends: () => {
        const { transactions } = get();
        const sorted = [...transactions].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        
        let balance = 0;
        return sorted.map((t) => {
          balance += t.type === 'income' ? t.amount : -t.amount;
          return {
            date: t.date,
            balance,
          };
        });
      },
      
      getInsights: () => {
        const { transactions } = get();
        const expenses = transactions.filter((t) => t.type === 'expense');
        
        // Highest spending category
        const categoryMap = {};
        expenses.forEach((t) => {
          categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });
        const highestCategory = Object.entries(categoryMap).sort(
          (a, b) => b[1] - a[1]
        )[0];
        
        // Current month expenses
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const currentMonthExpenses = expenses.filter((t) => {
          const date = new Date(t.date);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          );
        });
        
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        
        const previousMonthExpenses = expenses.filter((t) => {
          const date = new Date(t.date);
          return (
            date.getMonth() === previousMonth &&
            date.getFullYear() === previousYear
          );
        });
        
        const currentTotal = currentMonthExpenses.reduce(
          (acc, t) => acc + t.amount,
          0
        );
        const previousTotal = previousMonthExpenses.reduce(
          (acc, t) => acc + t.amount,
          0
        );
        
        const percentageChange =
          previousTotal > 0
            ? ((currentTotal - previousTotal) / previousTotal) * 100
            : 0;
        
        return {
          highestSpendingCategory: highestCategory
            ? { name: highestCategory[0], amount: highestCategory[1] }
            : null,
          monthlyExpenseTotal: currentTotal,
          previousMonthTotal: previousTotal,
          percentageChange,
        };
      },
    }),
    {
      name: 'finance-dashboard-storage',
    }
  )
);
