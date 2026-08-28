import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProfitAtRisk from '../components/dashboard/ProfitAtRisk';
import ThreatBreakdown from '../components/dashboard/ThreatBreakdown';
import InvestigationFeed from '../components/dashboard/InvestigationFeed';
import StrategyComparison from '../components/dashboard/StrategyComparison';
import RevenueImpact from '../components/dashboard/RevenueImpact';
import ActionLog from '../components/dashboard/ActionLog';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <ProfitAtRisk />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <ThreatBreakdown />
        </div>
        <div className="lg:col-span-8">
          <InvestigationFeed />
        </div>
      </div>

      <StrategyComparison />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        <div className="lg:col-span-8">
          <RevenueImpact />
        </div>
        <div className="lg:col-span-4">
          <ActionLog />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
