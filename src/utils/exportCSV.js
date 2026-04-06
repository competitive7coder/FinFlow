/**
 * Convert transactions array to CSV and trigger download
 */
export function exportToCSV(transactions, filename = 'transactions.csv') {
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount', 'Status'];
  
  const rows = transactions.map(t => [
    t.id,
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount,
    t.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Convert transactions array to JSON and trigger download
 */
export function exportToJSON(transactions, filename = 'transactions.json') {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
