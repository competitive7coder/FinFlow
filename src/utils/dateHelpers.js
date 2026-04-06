/**
 * Format a date string to readable format
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Get month label (e.g. "Jan")
 */
export function getMonthLabel(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short' });
}

/**
 * Get YYYY-MM string from date
 */
export function getYearMonth(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Get last N months array as "YYYY-MM" strings
 */
export function getLastNMonths(n) {
  const months = [];
  const now = new Date('2026-04-06');
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return months;
}

/**
 * Format month label from "YYYY-MM"
 */
export function formatMonthLabel(ym) {
  const [year, month] = ym.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
}

/**
 * Today as YYYY-MM-DD
 */
export function todayStr() {
  return '2026-04-06';
}

/**
 * Get current month as YYYY-MM
 */
export function currentMonth() {
  return '2026-04';
}

/**
 * Get previous month as YYYY-MM
 */
export function previousMonth() {
  return '2026-03';
}
