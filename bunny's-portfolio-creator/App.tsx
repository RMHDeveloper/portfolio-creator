
import React, { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_STEPS } from './constants';
import { PortfolioData, QuestionType } from './types';
import PortfolioPreview from './components/PortfolioPreview';
import QuestionRenderer from './components/QuestionRenderer';

// Define an empty portfolio data object
const EMPTY_PORTFOLIO_DATA: PortfolioData = {
  fullName: '',
  designation: '',
  profilePhoto: '',
  companyName: '',
  officeLocation: '',
  industry: '',
  yearsInBusiness: '',
  previousExperience: '',
  spouseName: '',
  children: '',
  pets: '',
  residence: '',
  yearsInCity: '',
  hobbies: '',
  activities: '',
  burningDesire: '',
  secret: '',
  successKey: '',
  goals: '',
  accomplishments: '',
  currentInterests: '',
  network: '',
  referralPartners: '',
  clientServices: '',
  mobile: '',
  email: '',
  website: ''
};

// Loading Screen Component
const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-4 z-[999] animate-in fade-in duration-500">
    <img 
      src="https://rabbitmarketinghouse.in/webinar/assets/WhatsApp_Image_2026-01-14_at_4.25.15_PM-removebg-preview.png" 
      className="h-[10rem] object-contain mb-6 animate-pulse-slow" 
      alt="Bunny's Studio Logo" 
    />
    <p className="text-xl text-white font-bold tracking-wide animate-in fade-in delay-300 duration-500">
      Preparing your profile...
    </p>
    <style>{`
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 2s infinite ease-in-out;
      }
    `}</style>
  </div>
);


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // New state for loading screen
  const [isIntro, setIsIntro] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const savedData = localStorage.getItem('portfolioData');
      return savedData ? JSON.parse(savedData) : EMPTY_PORTFOLIO_DATA;
    } catch (error) {
      console.error("Failed to parse portfolio data from localStorage", error);
      return EMPTY_PORTFOLIO_DATA;
    }
  });

  useEffect(() => {
    // Simulate loading time for the initial app startup
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Display loading screen for 2.5 seconds

    return () => clearTimeout(timer);
  }, []); // Run only once on mount

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updateField = useCallback((id: keyof PortfolioData, val: string) => {
    setData(prev => ({ ...prev, [id]: val }));
  }, []);

  const currentQuestion = PORTFOLIO_STEPS[currentQuestionIndex];
  const currentValue = data[currentQuestion.id] as string;

  const isCurrentQuestionValid = () => {
    if (currentQuestion.type === QuestionType.IMAGE) {
      return true; // Image is optional, so it's always valid to proceed
    }
    return currentValue && currentValue.trim() !== '';
  };

  const handleNext = () => {
    if (!isCurrentQuestionValid()) {
      alert("Please fill in the current field before proceeding.");
      return;
    }
    if (currentQuestionIndex < PORTFOLIO_STEPS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < PORTFOLIO_STEPS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // If on the last question, skipping should lead to the preview
      setIsPreview(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleStartNew = () => {
    setData(EMPTY_PORTFOLIO_DATA); // Reset all data
    setCurrentQuestionIndex(0); // Go back to the first question
    setIsPreview(false); // Close the preview modal
    alert("New profile started! All previous data cleared.");
  };

  const saveAsImage = async () => {
    const element = document.getElementById('portfolio-capture-source');
    if (!element) return;
    
    setIsSaving(true);
    try {
      await (document as any).fonts.ready;
      
      const images = element.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
      }));

      await new Promise(r => setTimeout(r, 300));

      const canvas = await (window as any).html2canvas(element, {
        useCORS: true,
        scale: 2,
        width: 1000,
        height: 1000,
        backgroundColor: '#FFFFFF',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `Executive_Profile_${data.fullName.replace(/\s+/g, '_') || 'Member'}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error("Capture failure:", err);
      alert("Failed to capture image. Please check your browser console.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isIntro) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center p-4 font-['Inter']">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           {/* Removed BNI Logo */}
        </div>
        <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="bg-[#CF202E] p-8 text-center text-white shrink-0">
            {/* New: Bunny's Studio Logo on Intro Screen */}
            <img 
              src="https://rabbitmarketinghouse.in/webinar/assets/WhatsApp_Image_2026-01-14_at_4.25.15_PM-removebg-preview.png" 
              className="h-20 object-contain mx-auto mb-6" 
              alt="Bunny's Studio Logo" 
            />
            <h1 className="text-3xl font-black uppercase tracking-tight font-['Poppins'] leading-none">Bunny's Portfolio Creator</h1>
            <p className="text-red-100 text-[9px] font-bold uppercase tracking-[0.4em] mt-2 opacity-80 leading-none">High-Performance Profile</p>
          </div>
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2 font-['Poppins'] leading-tight">Networking Profile</h2>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 max-w-[240px] mx-auto">
              Ready to maximize your One-to-Ones? Complete this form to generate your professional executive profile.
            </p>
            <button 
              onClick={() => setIsIntro(false)}
              className="w-full py-4 bg-[#CF202E] text-white font-bold rounded-xl shadow-lg hover:bg-red-800 active:scale-95 transition-all text-base uppercase tracking-[0.1em] mb-4"
            >
              Start Building
            </button>
            <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest leading-none">
              Developed by Rabbit Marketing House
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 font-['Inter']">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
          <header className="bg-[#CF202E] p-4 flex justify-between items-center rounded-t-[2.5rem] border-b border-red-700">
            {/* Group Logo and App Name */}
            <div className="flex items-center gap-4">
              <img src="https://rabbitmarketinghouse.in/webinar/assets/WhatsApp_Image_2026-01-14_at_4.25.15_PM-removebg-preview.png" className="h-[5.5rem] object-contain" alt="Bunny's Studio Logo" />
              <h1 className="text-xl font-black uppercase tracking-tight text-white font-['Poppins'] leading-none">
                Bunny's Portfolio Creator
              </h1>
            </div>
            
            {/* Back button on Top Right (conditional) */}
            {currentQuestionIndex > 0 ? (
                <button
                  onClick={handlePrevious}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-700 transition-colors active:scale-95"
                  aria-label="Go back to previous question"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
            ) : (
                <div className="w-10 h-10" /> // Placeholder to maintain `justify-between` alignment
            )}
          </header>

          <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
            <div key={currentQuestion.id} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-6">
                <p className="text-xs uppercase font-black tracking-widest text-slate-400 mb-1">
                  Question {currentQuestionIndex + 1} of {PORTFOLIO_STEPS.length}
                </p>
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 font-['Poppins']">
                  {currentQuestion.title}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-sm text-slate-500 mt-1">{currentQuestion.subtitle}</p>
                )}
              </div>
              
              <div className="max-w-xl mx-auto"> {/* Centering the question renderer */}
                <QuestionRenderer 
                  question={currentQuestion} 
                  value={currentValue}
                  onChange={(val) => updateField(currentQuestion.id, val)}
                />
              </div>
            </div>

            <div className="mt-10 pt-4 border-t border-slate-100">
              {/* Top Row: Previous and Skip buttons */}
              <div className="flex justify-between items-center mb-4">
                {currentQuestionIndex > 0 ? (
                  <button
                    onClick={handlePrevious}
                    className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-200 transition-all text-sm uppercase tracking-wider active:scale-95"
                  >
                    Previous
                  </button>
                ) : (
                  <div className="w-[120px] h-[40px]"/> {/* Placeholder for Previous button */}
                )}

                <button
                  onClick={handleSkip}
                  className="px-6 py-3 text-slate-500 font-bold hover:text-slate-700 transition-all text-sm uppercase tracking-wider active:scale-95"
                >
                  Skip
                </button>
              </div>

              {/* Bottom Row: Next / Generate button (Centered) */}
              <div className="flex justify-center">
                {currentQuestionIndex < PORTFOLIO_STEPS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isCurrentQuestionValid()}
                    className="px-12 py-5 bg-rose-600 text-white font-black rounded-2xl shadow-xl hover:bg-rose-700 transition-all text-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsPreview(true)}
                    disabled={!isCurrentQuestionValid()}
                    className="px-12 py-5 bg-rose-600 text-white font-black rounded-2xl shadow-xl hover:bg-rose-700 transition-all text-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate Portfolio
                  </button>
                )}
              </div>
            </div>
          </div>

          <footer className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
            {/* This footer can be used for global actions, or removed if not needed */}
          </footer>
        </div>
      </div>

      {/* Hidden Source for Capture */}
      <div className="fixed top-[-5000px] left-[-5000px] origin-top-left" style={{ width: '1000px', height: '1000px' }}>
         <PortfolioPreview data={data} id="portfolio-capture-source" />
      </div>

      {/* Preview Modal */}
      {isPreview && (
        <div className="fixed inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 z-[100] backdrop-blur-md">
          <div className="w-full max-w-sm flex flex-col items-center gap-6 py-6 animate-in fade-in zoom-in duration-300">
            <div className="text-center text-white">
              <h2 className="text-3xl font-black uppercase mb-1 font-['Poppins'] tracking-tight">Executive Preview</h2>
              <p className="text-slate-400 text-xs font-medium">Your professional profile is ready.</p>
            </div>
            
            <div className="relative shadow-2xl rounded-[32px] overflow-hidden bg-white border-4 border-white w-[320px] h-[320px]">
              <div 
                className="origin-top-left" 
                style={{ 
                  width: '1000px', 
                  height: '1000px', 
                  transform: 'scale(0.32)',
                }}
              >
                <PortfolioPreview data={data} />
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button 
                disabled={isSaving}
                onClick={saveAsImage}
                className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl shadow-xl hover:bg-slate-50 active:scale-95 transition-all text-base uppercase tracking-widest flex items-center justify-center gap-2 font-['Poppins']"
              >
                {isSaving ? 'Capturing...' : 'Download HD Profile'}
              </button>
              <button 
                onClick={() => setIsPreview(false)}
                className="w-full py-4 bg-slate-700 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 active:scale-95 transition-all text-base uppercase tracking-[0.1em]"
              >
                Edit Details
              </button>
              <button 
                onClick={handleStartNew}
                className="w-full py-4 bg-red-800 text-white font-bold rounded-2xl shadow-lg hover:bg-red-900 active:scale-95 transition-all text-base uppercase tracking-[0.1em] mb-4"
              >
                Start New Profile
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;