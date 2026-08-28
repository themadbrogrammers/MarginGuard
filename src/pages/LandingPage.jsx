import React from 'react';
import HeroSection from '../components/landing/HeroSection.jsx';
import MoneyRiver from '../components/landing/MoneyRiver.jsx';
import PipelineSection from '../components/landing/PipelineSection.jsx';
import InvestigationDemo from '../components/landing/InvestigationDemo.jsx';
import StrategySimulation from '../components/landing/StrategySimulation.jsx';
import DashboardPreview from '../components/landing/DashboardPreview.jsx';
import SocialProof from '../components/landing/SocialProof.jsx';
import CTASection from '../components/landing/CTASection.jsx';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black">
      <HeroSection />
      <MoneyRiver />
      <PipelineSection />
      <InvestigationDemo />
      <StrategySimulation />
      <DashboardPreview />
      <SocialProof />
      <CTASection />
    </div>
  );
};

export default LandingPage;
