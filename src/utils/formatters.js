/**
 * Currency and number formatters for Indian Rupee (₹)
 */

export function formatCurrency(amount, options = {}) {
  const { compact = false, showSign = false } = options;

  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  }

  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  if (showSign && amount > 0) {
    return `+${formatted}`;
  }

  return formatted;
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatPercent(value, decimals = 1) {
  return `${value.toFixed(decimals)}%`;
}

export function formatCompactNumber(num) {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr+`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L+`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
  return num.toString();
}
