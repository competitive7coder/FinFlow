const statuses = ['Completed', 'Pending', 'Failed'];

function randomId() {
  return Math.random().toString(36).substring(2, 10);
}

function dateStr(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export const mockTransactions = [
  // January 2026
  { id: 'txn001', date: '2026-01-02', description: 'Monthly Salary', category: 'Salary', type: 'Income', amount: 85000, status: 'Completed' },
  { id: 'txn002', date: '2026-01-03', description: 'Grocery Shopping - D-Mart', category: 'Food', type: 'Expense', amount: 3200, status: 'Completed' },
  { id: 'txn003', date: '2026-01-05', description: 'Uber Ride to Office', category: 'Transport', type: 'Expense', amount: 480, status: 'Completed' },
  { id: 'txn004', date: '2026-01-07', description: 'Netflix Subscription', category: 'Entertainment', type: 'Expense', amount: 649, status: 'Completed' },
  { id: 'txn005', date: '2026-01-09', description: 'Freelance Design Project', category: 'Freelance', type: 'Income', amount: 22000, status: 'Completed' },
  { id: 'txn006', date: '2026-01-12', description: 'Electricity Bill', category: 'Utilities', type: 'Expense', amount: 1850, status: 'Completed' },
  { id: 'txn007', date: '2026-01-14', description: 'Amazon Shopping', category: 'Shopping', type: 'Expense', amount: 4500, status: 'Completed' },
  { id: 'txn008', date: '2026-01-16', description: 'Doctor Visit', category: 'Health', type: 'Expense', amount: 1200, status: 'Completed' },
  { id: 'txn009', date: '2026-01-18', description: 'SIP Investment - Mutual Fund', category: 'Investment', type: 'Expense', amount: 10000, status: 'Completed' },
  { id: 'txn010', date: '2026-01-22', description: 'Restaurant Dinner', category: 'Food', type: 'Expense', amount: 2100, status: 'Completed' },
  { id: 'txn011', date: '2026-01-25', description: 'Mobile Recharge', category: 'Utilities', type: 'Expense', amount: 599, status: 'Completed' },
  { id: 'txn012', date: '2026-01-28', description: 'Bus Pass Monthly', category: 'Transport', type: 'Expense', amount: 800, status: 'Completed' },

  // February 2026
  { id: 'txn013', date: '2026-02-01', description: 'Monthly Salary', category: 'Salary', type: 'Income', amount: 85000, status: 'Completed' },
  { id: 'txn014', date: '2026-02-03', description: 'Swiggy Orders', category: 'Food', type: 'Expense', amount: 1800, status: 'Completed' },
  { id: 'txn015', date: '2026-02-06', description: 'Petrol Refill', category: 'Transport', type: 'Expense', amount: 2400, status: 'Completed' },
  { id: 'txn016', date: '2026-02-10', description: 'Freelance Writing Project', category: 'Freelance', type: 'Income', amount: 15000, status: 'Completed' },
  { id: 'txn017', date: '2026-02-12', description: 'Gym Membership', category: 'Health', type: 'Expense', amount: 2500, status: 'Completed' },
  { id: 'txn018', date: '2026-02-14', description: 'Valentine Gift - Jewellery', category: 'Shopping', type: 'Expense', amount: 8500, status: 'Completed' },
  { id: 'txn019', date: '2026-02-16', description: 'Internet Bill', category: 'Utilities', type: 'Expense', amount: 999, status: 'Completed' },
  { id: 'txn020', date: '2026-02-20', description: 'Movie Tickets', category: 'Entertainment', type: 'Expense', amount: 850, status: 'Completed' },
  { id: 'txn021', date: '2026-02-24', description: 'SIP Investment - Mutual Fund', category: 'Investment', type: 'Expense', amount: 10000, status: 'Completed' },
  { id: 'txn022', date: '2026-02-27', description: 'Zepto Groceries', category: 'Food', type: 'Expense', amount: 2300, status: 'Pending' },

  // March 2026
  { id: 'txn023', date: '2026-03-01', description: 'Monthly Salary', category: 'Salary', type: 'Income', amount: 85000, status: 'Completed' },
  { id: 'txn024', date: '2026-03-04', description: 'Holi Shopping', category: 'Shopping', type: 'Expense', amount: 3200, status: 'Completed' },
  { id: 'txn025', date: '2026-03-07', description: 'Ola Cab Rides', category: 'Transport', type: 'Expense', amount: 1100, status: 'Completed' },
  { id: 'txn026', date: '2026-03-10', description: 'Pharmacy - Medicines', category: 'Health', type: 'Expense', amount: 650, status: 'Completed' },
  { id: 'txn027', date: '2026-03-13', description: 'Freelance App Dev', category: 'Freelance', type: 'Income', amount: 35000, status: 'Completed' },
  { id: 'txn028', date: '2026-03-15', description: 'Restaurant Birthday Dinner', category: 'Food', type: 'Expense', amount: 4500, status: 'Completed' },
  { id: 'txn029', date: '2026-03-18', description: 'Electricity Bill', category: 'Utilities', type: 'Expense', amount: 2100, status: 'Completed' },
  { id: 'txn030', date: '2026-03-22', description: 'Spotify Premium', category: 'Entertainment', type: 'Expense', amount: 119, status: 'Failed' },
  { id: 'txn031', date: '2026-03-25', description: 'SIP Investment - Mutual Fund', category: 'Investment', type: 'Expense', amount: 10000, status: 'Completed' },
  { id: 'txn032', date: '2026-03-28', description: 'Flipkart Electronics', category: 'Shopping', type: 'Expense', amount: 12000, status: 'Completed' },

  // April 2026 (current month)
  { id: 'txn033', date: '2026-04-01', description: 'Monthly Salary', category: 'Salary', type: 'Income', amount: 85000, status: 'Completed' },
  { id: 'txn034', date: '2026-04-02', description: 'D-Mart Groceries', category: 'Food', type: 'Expense', amount: 2800, status: 'Completed' },
  { id: 'txn035', date: '2026-04-03', description: 'Petrol Refill', category: 'Transport', type: 'Expense', amount: 2200, status: 'Completed' },
  { id: 'txn036', date: '2026-04-04', description: 'Amazon Prime Annual', category: 'Entertainment', type: 'Expense', amount: 1499, status: 'Completed' },
  { id: 'txn037', date: '2026-04-04', description: 'Freelance Logo Design', category: 'Freelance', type: 'Income', amount: 8000, status: 'Pending' },
  { id: 'txn038', date: '2026-04-05', description: 'Water Bill', category: 'Utilities', type: 'Expense', amount: 450, status: 'Completed' },
  { id: 'txn039', date: '2026-04-05', description: 'Gym - Protein Supplement', category: 'Health', type: 'Expense', amount: 3200, status: 'Completed' },
  { id: 'txn040', date: '2026-04-06', description: 'Myntra Sale Shopping', category: 'Shopping', type: 'Expense', amount: 5500, status: 'Pending' },
  { id: 'txn041', date: '2026-04-06', description: 'SIP Investment - Gold Fund', category: 'Investment', type: 'Expense', amount: 5000, status: 'Completed' },

  // Some older data (Nov-Dec 2025 for trend)
  { id: 'txn042', date: '2025-11-01', description: 'Monthly Salary', category: 'Salary', type: 'Income', amount: 82000, status: 'Completed' },
  { id: 'txn043', date: '2025-11-15', description: 'Freelance Project', category: 'Freelance', type: 'Income', amount: 18000, status: 'Completed' },
  { id: 'txn044', date: '2025-11-20', description: 'Monthly Expenses Nov', category: 'Shopping', type: 'Expense', amount: 28000, status: 'Completed' },
  { id: 'txn045', date: '2025-12-01', description: 'Monthly Salary', category: 'Salary', type: 'Income', amount: 82000, status: 'Completed' },
  { id: 'txn046', date: '2025-12-10', description: 'Year End Freelance Bonus', category: 'Freelance', type: 'Income', amount: 30000, status: 'Completed' },
  { id: 'txn047', date: '2025-12-20', description: 'Christmas Shopping', category: 'Shopping', type: 'Expense', amount: 15000, status: 'Completed' },
  { id: 'txn048', date: '2025-12-31', description: 'Investment Portfolio', category: 'Investment', type: 'Expense', amount: 20000, status: 'Completed' },
];

export const categoryColors = {
  Food: '#10b981',
  Transport: '#3b82f6',
  Shopping: '#f59e0b',
  Entertainment: '#8b5cf6',
  Health: '#ec4899',
  Utilities: '#6366f1',
  Salary: '#06b6d4',
  Freelance: '#14b8a6',
  Investment: '#f97316',
};

export const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Salary', 'Freelance', 'Investment'];
export const transactionTypes = ['Income', 'Expense'];
export const statusOptions = ['Completed', 'Pending', 'Failed'];
