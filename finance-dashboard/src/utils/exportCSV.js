export const exportToCSV = (transactions, filename = 'transactions') => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  const headers = ['Date', 'Amount', 'Category', 'Type'];
  
  const csvContent = [
    headers.join(','),
    ...transactions.map((t) =>
      [
        t.date,
        t.amount,
        `"${t.category}"`,
        t.type,
      ].join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
