import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import PredictionForm from './components/PredictionForm';
import ResultsSection from './components/ResultsSection';
import DatasetInsights from './components/DatasetInsights';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import { usePrediction } from './hooks/usePrediction';

function App() {
  const resultsRef = useRef(null);
  const { predict, loading, error, results, setResults } = usePrediction();

  const handlePrediction = async (formData) => {
    try {
      await predict(formData);
      // Scroll to results after a short delay to ensure DOM has updated
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  return (
    <div className="bg-[#0A0F1E] text-[#F1F5F9] min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="grid-background"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Features />
        <PredictionForm onSubmit={handlePrediction} loading={loading} error={error} />
        {results && <ResultsSection results={results} ref={resultsRef} />}
        <DatasetInsights />
        <TeamSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
