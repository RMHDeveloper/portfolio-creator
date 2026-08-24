
import React from 'react';

interface ChequeLayoutProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
}

const ChequeLayout: React.FC<ChequeLayoutProps> = ({ children, step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-200 guilloche-pattern">
      <div className="w-full max-w-4xl bg-[#fdfaf1] border-8 border-double border-[#8b7355] shadow-2xl relative overflow-hidden rounded-lg">
        {/* Bank Seal / Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
          <div className="text-9xl font-bold text-[#8b7355] rotate-12 border-4 border-[#8b7355] rounded-full p-20 uppercase">
            PROFILE
          </div>
        </div>

        {/* Header Section */}
        <div className="p-6 border-b border-[#8b7355] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#f4ece1]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-700 rounded flex items-center justify-center text-white font-bold text-2xl shadow-inner">
              PRO
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#4a3728] uppercase tracking-tighter font-serif">Professional Referrals</h1>
              <p className="text-sm text-[#8b7355] font-serif uppercase tracking-widest italic">Contacts + Referrals = Profit</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#4a3728] font-mono border-2 border-[#8b7355] px-3 py-1 rounded bg-white">
              NO: {String(step).padStart(6, '0')}
            </div>
            <div className="text-sm mt-2 font-serif text-[#8b7355]">
              DATED: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 relative min-h-[400px]">
          {children}
        </div>

        {/* Footer Area */}
        <div className="p-6 bg-[#f4ece1] border-t border-[#8b7355] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="micr-font text-lg text-[#4a3728] tracking-[0.2em] select-none opacity-60">
            ⑆ 0123456789 ⑆ 9876543210 ⑈ 0000
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="text-xs text-[#8b7355] mb-1 font-serif uppercase text-center">Progress to Dividends</div>
            <div className="h-4 w-full bg-[#d9cdba] rounded-full overflow-hidden border border-[#8b7355]">
              <div 
                className="h-full bg-red-800 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <div className="w-48 border-b-2 border-[#4a3728] pb-1">
              <span className="font-serif italic text-sm text-[#8b7355]">Authorized Signatory</span>
            </div>
            <p className="text-[10px] text-[#8b7355] uppercase mt-1 tracking-widest">Gains Certificate of Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChequeLayout;