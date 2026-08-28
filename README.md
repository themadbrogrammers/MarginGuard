# MarginGuard — The AI Margin Guardian

MarginGuard is a high-performance React application designed for D2C (Direct-to-Consumer) and eCommerce businesses to identify, visualize, and recover lost revenue (margin leakage) caused by issues like high RTO (Return-to-Origin), payment failures, refund issues, and coupon abuse.

The platform provides a beautifully designed landing page and an interactive dashboard to monitor "Profit At Risk," investigate threats, and simulate structural profit protection strategies.

## Features

- **Interactive Landing Page**: Scroll-driven storytelling animations highlighting the illusion of gross revenue versus the reality of margin leakage.
- **Revenue Protection Dashboard**: Comprehensive dashboard visualizing gross vs. actual kept revenue, with actionable insights.
- **Threat Breakdown**: Analyzes sources of margin leakage (e.g., RTO losses, excessive discounts, coupon abuse).
- **Investigation Terminal**: A sleek, animated terminal UI showing real-time mock analysis of payment anomalies and RTO hotspots.
- **Strategy Simulation**: Tools to compare the impact of different revenue protection strategies (like disabling COD for high-risk segments or offering prepaid discounts).
- **Smooth Animations**: Powered by Framer Motion, GSAP, and Lenis for a premium, editorial feel.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion, GSAP, Lenis (smooth scrolling)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Deployment**: Firebase Hosting (configured via `firebase.json`)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd revrec
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Build for Production

To build the app for production, run:

```bash
npm run build
```

This will generate a `dist` folder containing the optimized build.

### Linting

Run Oxlint to check for code issues:

```bash
npm run lint
```
