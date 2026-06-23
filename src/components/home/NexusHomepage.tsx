"use client";

import React from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import WhatIsNexus from './sections/WhatIsNexus';
import ExploreProfessionals from './sections/ExploreProfessionals';
import CouplesAttraction from './sections/CouplesAttraction';
import HowItWorks from './sections/HowItWorks';
import EventMemories from './sections/EventMemories';
import BuiltForCreatives from './sections/BuiltForCreatives';
import DashboardPreview from './sections/DashboardPreview';
import SuccessStories from './sections/SuccessStories';
import WhyNexus from './sections/WhyNexus';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import FeatureGrid from './FeatureGrid';

export default function NexusHomepage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E1B4B] font-sans antialiased relative overflow-hidden">
      {/* Universal Soft Ambient Background Lights */}
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-emerald-500/5 via-indigo-500/3 to-transparent pointer-events-none z-0" />
      
      {/* 1. Header */}
      <Header />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. What Is Nexus */}
      <WhatIsNexus />

      {/* 4. Explore Professionals */}
      <ExploreProfessionals />

      {/* Couples Attraction Portal */}
      <CouplesAttraction />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Event Memories */}
      <EventMemories />

      {/* 7. Built For Every Creative Professional */}
      <BuiltForCreatives />

      {/* 8. Platform Dashboard Preview */}
      <DashboardPreview />

      {/* 9. Success Stories */}
      <SuccessStories />

      {/* 10. Why Nexus */}
      <WhyNexus />

      {/* 11. CTA Conversion Segment */}
      <CTA />

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
