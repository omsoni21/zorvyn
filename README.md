# Finance Dashboard

A clean, modern financial dashboard built with React that helps users track income, expenses, and understand spending patterns through intuitive visualizations.

![Finance Dashboard](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📊 Financial Overview

- **Summary Cards**: Real-time display of Total Balance, Income, and Expenses
- **Balance Trend Chart**: Interactive line chart showing balance changes over time
- **Spending Breakdown**: Pie chart visualization of expenses by category

### 💰 Transaction Management

- View all transactions with date, amount, category, and type
- Search transactions by category or type
- Filter by specific categories
- Sort by date or amount (ascending/descending)
- Add new transactions (Admin only)
- Edit existing transactions (Admin only)
- Delete transactions with confirmation (Admin only)
- Export transactions to CSV

### 👥 Role-Based Access

- **Admin Role**: Full CRUD operations on transactions
- **Viewer Role**: Read-only access to all data
- Easy role switching via dropdown in header

### 📈 Smart Insights

- Highest spending category identification
- Current month's total expenses
- Month-over-month comparison with percentage change
- Visual indicators for spending trends

### 🎨 User Experience

- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: Subtle transitions powered by Framer Motion
- **Empty States**: Graceful handling when no data is available
- **Data Persistence**: All data saved to localStorage

## 🚀 Tech Stack

- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Recharts** - Composable charting library
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm/yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/finance-dashboard.git

# Navigate to project directory
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173` (or next available port).

### Build for Production

```bash
npm run build
```

Production files will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Header.jsx          # App header with role switcher & dark mode
│   ├── SummaryCards.jsx    # Financial summary cards
│   ├── BalanceChart.jsx    # Line chart for balance trends
│   ├── SpendingPieChart.jsx # Pie chart for spending breakdown
│   ├── TransactionsTable.jsx # Transaction list with filters
│   ├── AddTransactionForm.jsx # Modal form for adding/editing
│   └── Insights.jsx        # Financial insights panel
├── store/
│   └── financeStore.js     # Zustand state management
├── utils/
│   └── exportCSV.js        # CSV export utility
├── App.jsx                 # Main application component
├── main.jsx                # Application entry point
└── index.css               # Global styles with Tailwind
```

## 🎯 How It Works

### State Management

The application uses **Zustand** for centralized state management:

- All transactions stored in a single source of truth
- Computed values (balance, income, expenses) derived automatically
- Filters and user role managed centrally
- Automatic persistence to localStorage

### Role-Based UI

Simple frontend simulation:

- **Admin**: Sees add, edit, and delete buttons
- **Viewer**: Only sees data, no modification options
- Switch roles using the dropdown in the header

### Data Flow

1. User interacts with UI (add transaction, filter, etc.)
2. Action dispatched to Zustand store
3. Store updates state
4. Components re-render with new data
5. Changes persisted to localStorage

## 📱 Responsive Design

The dashboard adapts to different screen sizes:

- **Mobile (< 640px)**: Single column layout, stacked components
- **Tablet (640px - 1024px)**: Two-column grid for charts
- **Desktop (> 1024px)**: Three-column layout with insights sidebar

## 🎨 Customization

### Change Color Scheme

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary: #6366f1;
  --success: #10b981;
  --danger: #ef4444;
}
```

### Modify Sample Data

Update initial transactions in `src/store/financeStore.js`:

```javascript
const initialTransactions = [
  // Add your transactions here
];
```

### Adjust Chart Colors

Modify color arrays in chart components:

- `src/components/BalanceChart.jsx` - Line color
- `src/components/SpendingPieChart.jsx` - COLORS array

## 🔧 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🌟 Key Features Explained

### Search & Filter

- Real-time search across category and type fields
- Category dropdown for precise filtering
- Combine multiple filters for refined results
- Instant updates without page reload

### Sorting

- Click "Amount" column header to sort
- Toggle between ascending and descending
- Date sorting always available
- Maintains sort order during filtering

### Export to CSV

- Exports currently filtered transactions
- Includes all transaction details
- Downloads as `transactions.csv`
- Handles empty data gracefully

### Dark Mode

- Persists user preference
- Smooth theme transitions
- Proper contrast ratios maintained
- All components support both themes

## 🐛 Edge Cases Handled

✅ Empty transaction list  
✅ No data for charts  
✅ No spending categories  
✅ Zero transactions for insights  
✅ Form validation errors  
✅ Deletion confirmation  
✅ LocalStorage unavailable  
✅ Invalid input values

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📸 Screenshots

### Light Mode

_Dashboard overview with summary cards and charts_

### Dark Mode

_Same interface in dark theme_

### Mobile View

_Responsive layout on mobile devices_

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Recharts](https://recharts.org/) - Charting library
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide](https://lucide.dev/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool

## 📧 Contact

Have questions or suggestions? Feel free to:

- Open an issue on GitHub
- Submit a pull request
- Reach out via email

---

**Built with ❤️ using React and modern web technologies**

Made this dashboard to demonstrate clean, production-ready frontend development practices. Perfect for learning React patterns, state management, and building responsive dashboards.
