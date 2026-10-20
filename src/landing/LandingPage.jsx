import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Hero from './sections/Hero';
import Waitlist from './sections/Waitlist';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import HowItWorks from './sections/HowItWorks';
import Features from './sections/Features';
import Screens from './sections/Screens';
import Benefits from './sections/Benefits';
import ForWho from './sections/ForWho';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) {
      const id = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      return () => clearTimeout(id);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-motivo-onyx text-white font-sans antialiased overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Waitlist />
        <ForWho />
        <Problem />
        <Solution />
        <HowItWorks />
        <Features />
        <Screens />
        <Benefits />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
