/**
 * Demo data for UrbanFit — a fictional D2C shoe brand
 * Used throughout the MarginGuard demo experience
 */

export const merchant = {
  name: 'UrbanFit',
  category: 'D2C Footwear',
  monthlyOrders: 10000,
  averageOrderValue: 2000,
  grossRevenue: 2000000, // ₹20,00,000
  actualKept: 1700000,   // ₹17,00,000
  totalLeakage: 300000,  // ₹3,00,000
};

export const leakageBreakdown = [
  {
    id: 'rto',
    label: 'RTO Losses',
    amount: 110000,
    color: '#ff3366',
    icon: 'PackageX',
    percentage: 36.7,
    severity: 'critical',
    description: 'High return-to-origin on COD orders',
  },
  {
    id: 'discounts',
    label: 'Excessive Discounts',
    amount: 75000,
    color: '#ffaa00',
    icon: 'BadgePercent',
    percentage: 25,
    severity: 'high',
    description: 'Over-discounting eroding margins',
  },
  {
    id: 'refunds',
    label: 'Refund Losses',
    amount: 55000,
    color: '#ffd000',
    icon: 'RotateCcw',
    percentage: 18.3,
    severity: 'medium',
    description: 'Avoidable product returns and refunds',
  },
  {
    id: 'payments',
    label: 'Payment Failures',
    amount: 35000,
    color: '#00b4d8',
    icon: 'CreditCard',
    percentage: 11.7,
    severity: 'medium',
    description: 'Failed transactions causing revenue drop',
  },
  {
    id: 'coupon',
    label: 'Coupon Abuse',
    amount: 25000,
    color: '#a855f7',
    icon: 'Ticket',
    percentage: 8.3,
    severity: 'low',
    description: 'Repeat misuse of new-customer coupons',
  },
];

export const rtoInvestigation = {
  product: 'Premium Running Shoes',
  paymentMethod: 'COD',
  normalRTO: 9,
  currentRTO: 24,
  affectedPincodes: [
    { code: '302017', rtoRate: 29 },
    { code: '302018', rtoRate: 27 },
    { code: '302019', rtoRate: 31 },
  ],
  ordersAnalyzed: 12430,
  affectedOrders: 1000,
  aov: 2000,
  gmv: 2000000,
  rtoOrders: 300,
  costPerRTO: 300,
  monthlyLoss: 90000,
};

export const strategies = [
  {
    id: 'A',
    name: 'Disable COD',
    description: 'Remove cash-on-delivery option for high-risk segments',
    conversion: 65,
    rto: 10,
    orders: 900,
    protectedMargin: 82000,
    recommended: true,
    confidence: 89,
  },
  {
    id: 'B',
    name: '₹100 Prepaid Discount',
    description: 'Incentivize prepaid payments with a small discount',
    conversion: 70,
    rto: 14,
    orders: 960,
    protectedMargin: 68000,
    recommended: false,
    confidence: 78,
  },
  {
    id: 'C',
    name: 'COD Verification',
    description: 'Require OTP/call verification before confirming COD',
    conversion: 71,
    rto: 17,
    orders: 980,
    protectedMargin: 57000,
    recommended: false,
    confidence: 72,
  },
];

export const currentMetrics = {
  conversion: 72,
  rto: 30,
  orders: 1000,
};

export const terminalLines = [
  { type: 'command', text: 'Scanning 12,430 orders...' },
  { type: 'info', text: 'Analyzing payment methods, products, pincodes...' },
  { type: 'gap' },
  { type: 'alert', text: 'Anomaly detected: Premium Running Shoes' },
  { type: 'data', text: 'Payment method: COD' },
  { type: 'data', text: 'Normal RTO: 9%  |  This product: 24%  ⚠️' },
  { type: 'gap' },
  { type: 'command', text: 'Investigating pincode distribution...' },
  { type: 'danger', text: '302017 → 29% RTO  ⚠️' },
  { type: 'danger', text: '302018 → 27% RTO  ⚠️' },
  { type: 'danger', text: '302019 → 31% RTO  🔴' },
  { type: 'gap' },
  { type: 'command', text: 'Calculating financial impact...' },
  { type: 'data', text: '1,000 orders × ₹2,000 = ₹20,00,000 GMV' },
  { type: 'data', text: '300 RTO orders × ₹300 logistics cost' },
  { type: 'result', text: '= ₹90,000/month avoidable loss' },
  { type: 'gap' },
  { type: 'success', text: '✓ Root cause identified.' },
  { type: 'success', text: '✓ 3 intervention strategies generated.' },
  { type: 'success', text: '✓ Awaiting merchant approval.' },
];

export const couponAbuse = {
  couponCode: 'WELCOME20',
  totalUses: 8421,
  abusiveUsers: 3104,
  estimatedLoss: 75000,
  recommendation: 'Restrict WELCOME20 to customers with zero previous successful orders.',
};

export const paymentFailure = {
  yesterday: 94.2,
  today: 87.1,
  failureSource: 'UPI App C',
  timeRange: '7 PM – 10 PM',
  device: 'Android',
  revenueAtRisk: 180000,
};

export const refundProblem = {
  product: 'Product A',
  normalRefundRate: 5,
  currentRefundRate: 17,
  cause: 'Size mismatch',
  monthlyLoss: 55000,
  expectedReduction: { from: 17, to: 10 },
  expectedProtectedMargin: 41000,
};

export const socialProofStats = [
  { value: 4200000000, label: 'Revenue Protected', prefix: '₹', format: 'compact' },
  { value: 3200, label: 'Merchants Trust Us', suffix: '+' },
  { value: 89, label: 'Avg Accuracy', suffix: '%' },
  { value: 4, label: 'Investigation Time', suffix: ' min', prefix: '<' },
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    company: 'UrbanFit',
    role: 'Founder & CEO',
    quote: 'MarginGuard found ₹3.2L in monthly leakage we didn\'t even know existed. The RTO fix alone saved us ₹82K.',
    avatar: 'PS',
    saved: '₹3.2L/month',
  },
  {
    name: 'Rahul Mehta',
    company: 'SpiceBox',
    role: 'Head of Operations',
    quote: 'We thought we had a sales problem. Turns out we had a margin problem. MarginGuard showed us exactly where.',
    avatar: 'RM',
    saved: '₹1.8L/month',
  },
  {
    name: 'Ananya Reddy',
    company: 'GlowCraft',
    role: 'D2C Brand Owner',
    quote: 'The coupon abuse detection alone paid for the entire subscription in week one.',
    avatar: 'AR',
    saved: '₹95K/month',
  },
];

// Timeline data for the dashboard action log
export const actionLog = [
  {
    id: 1,
    timestamp: '2 hours ago',
    action: 'COD disabled for Premium Running Shoes in 302017, 302018, 302019',
    status: 'executed',
    impact: '+₹82K/month projected',
    confidence: 89,
  },
  {
    id: 2,
    timestamp: '1 day ago',
    action: 'WELCOME20 coupon restricted to new customers only',
    status: 'executed',
    impact: '+₹75K/month projected',
    confidence: 92,
  },
  {
    id: 3,
    timestamp: '2 days ago',
    action: 'Enhanced size guide added for Product A',
    status: 'monitoring',
    impact: '+₹41K/month projected',
    confidence: 74,
  },
  {
    id: 4,
    timestamp: '3 days ago',
    action: 'UPI App C deprioritized during 7-10 PM window',
    status: 'pending_approval',
    impact: '+₹1.8L/month projected',
    confidence: 81,
  },
];

// Revenue chart data
export const revenueChartData = [
  { month: 'Jan', revenue: 1800000, protected: 0, leakage: 280000 },
  { month: 'Feb', revenue: 1950000, protected: 0, leakage: 310000 },
  { month: 'Mar', revenue: 2000000, protected: 0, leakage: 300000 },
  { month: 'Apr', revenue: 2100000, protected: 45000, leakage: 255000 },
  { month: 'May', revenue: 2050000, protected: 120000, leakage: 180000 },
  { month: 'Jun', revenue: 2200000, protected: 198000, leakage: 102000 },
  { month: 'Jul', revenue: 2350000, protected: 245000, leakage: 55000 },
];
