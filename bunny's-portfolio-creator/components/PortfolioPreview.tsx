
import React from 'react';
import { PortfolioData } from '../types';

interface PortfolioPreviewProps {
  data: PortfolioData;
  id?: string;
}

const isValuePresent = (value: string | undefined | null) => value && value.trim() !== '';

const Label = ({ children, color = 'text-black' }: { children?: React.ReactNode; color?: string }) => (
  <div className={`text-[11px] font-black uppercase tracking-[0.2em] ${color} mb-1.5 opacity-40`}>
    {children}
  </div>
);

const Value = ({ children, size = 'text-[18px]', color = 'text-black' }: { children?: React.ReactNode; size?: string; color?: string }) => (
  <div className={`${size} font-black ${color} leading-tight mb-3`}> {/* Changed mb-2 to mb-3 for better spacing */}
    {children}
  </div>
);

const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-5">
    <h3 className="text-[15px] font-black uppercase tracking-[0.3em] text-rose-600 whitespace-nowrap">
      {children}
    </h3>
    <div className="h-[1px] w-full bg-slate-100"></div>
  </div>
);

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ data, id }) => {
  const hasContactInfo = isValuePresent(data.mobile) || isValuePresent(data.email) || isValuePresent(data.website);

  const SideItem = ({ label, value }: { label: string; value: string | undefined }) => {
    if (!isValuePresent(value)) return null;
    return (
      <div className="">
        <Label>{label}</Label>
        <Value>{value}</Value>
      </div>
    );
  };

  const InfoBlock = ({ label, value }: { label: string; value: string | undefined }) => {
    if (!isValuePresent(value)) return null;
    return (
      <div>
        <Label>{label}</Label>
        <Value size="text-[17px]">{value}</Value> {/* Now uses the Value component for consistent styling */}
      </div>
    );
  };

  // Determine if Strategic Gains section has any content
  const hasStrategicGains = isValuePresent(data.goals) || isValuePresent(data.accomplishments) || isValuePresent(data.currentInterests) || isValuePresent(data.network);
  
  // Determine if Personal Identity section has any content
  const hasPersonalIdentity = isValuePresent(data.spouseName) || isValuePresent(data.burningDesire) || isValuePresent(data.secret) || isValuePresent(data.activities) || isValuePresent(data.hobbies) || isValuePresent(data.children) || isValuePresent(data.residence) || isValuePresent(data.yearsInCity) || isValuePresent(data.pets);

  // Determine if Identity Header has any content
  const hasIdentityHeader = isValuePresent(data.fullName) || isValuePresent(data.designation) || isValuePresent(data.industry) || isValuePresent(data.companyName);

  // Filter lists for rendering
  const referralPartnersList = (data.referralPartners || "").split('\n').filter(p => p.trim());
  const clientServicesList = (data.clientServices || "").split('\n').filter(s => s.trim());

  return (
    <div 
      id={id}
      className="bg-white flex font-['Inter'] relative overflow-hidden"
      style={{ width: '1000px', height: '1000px', minWidth: '1000px', minHeight: '1000px' }}
    >
      {/* LEFT SIDEBAR */}
      <div className="w-[335px] bg-[#f8fafc] border-r border-slate-100 flex flex-col p-10 pt-16">
        {/* Sidebar Name Branding - Only "Executive Profile" remains */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1.5px] w-14 bg-rose-600"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-rose-600">Executive Profile</span>
          </div>
        </div>

        {/* Profile Image */}
        {isValuePresent(data.profilePhoto) && (
          <div className="mb-14">
            <div className="w-full aspect-square bg-white rounded-[3rem] flex items-center justify-center p-0">
              <div className="w-full h-full rounded-full overflow-hidden border-[12px] border-white shadow-xl bg-white">
                <img src={data.profilePhoto} className="w-full h-full object-cover" crossOrigin="anonymous" alt="Profile" />
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Vertical Info */}
        {(isValuePresent(data.yearsInBusiness) || isValuePresent(data.officeLocation) || isValuePresent(data.residence) || isValuePresent(data.children)) ? (
          <div className="space-y-3">
            <SideItem label="In Business" value={data.yearsInBusiness} />
            <SideItem label="Location" value={data.officeLocation} />
            <SideItem label="Residence" value={data.residence} />
            <SideItem label="Family" value={data.children} />
          </div>
        ) : (
          <div className="mb-4"></div> /* Preserve some space if info block is empty, or remove if truly empty */
        )}

        {/* Sidebar Contact Footer */}
        {hasContactInfo ? (
          <div className="mt-auto pt-10 border-t border-slate-200/50">
            <Label color="text-black">Connect Direct</Label>
            {isValuePresent(data.mobile) && <div className="text-[26px] font-black text-black tracking-tight">{data.mobile}</div>}
            {isValuePresent(data.email) && <div className="text-[13px] font-bold text-rose-600 uppercase tracking-widest mt-1 mb-1">{data.email}</div>}
            {isValuePresent(data.website) && <div className="text-[11px] font-black text-black uppercase tracking-[0.2em] opacity-30">{data.website}</div>}
          </div>
        ) : (
          <div className="mt-auto pt-10"></div> /* Preserve some footer space if contact info is empty */
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col p-12 pt-20">
        {/* Top Header Identity */}
        {hasIdentityHeader && (
          <div className="flex justify-end mb-8">
            <div className="text-right flex flex-col items-end">
              {isValuePresent(data.fullName) && (
                <h2 className="text-[48px] font-[900] leading-[0.8] tracking-tighter text-black uppercase font-['Poppins']">
                  {data.fullName}
                </h2>
              )}
              {isValuePresent(data.designation) && (
                <p className="text-[18px] font-black text-rose-600 uppercase tracking-[0.25em] mt-2">
                  {data.designation}
                </p>
              )}
              {(isValuePresent(data.industry) || isValuePresent(data.companyName)) && (
                <>
                  {isValuePresent(data.industry) && (
                    <p className="text-[14px] font-bold text-black uppercase tracking-[0.3em] mt-1 opacity-50">
                      {data.industry}
                    </p>
                  )}
                  {isValuePresent(data.companyName) && (
                    <p className="text-[12px] font-black text-black uppercase tracking-[0.1em] mt-1 bg-slate-100 px-3 py-1 rounded">
                      {data.companyName}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Gains & Identity Grid */}
        {(hasStrategicGains || hasPersonalIdentity) && (
          <div className="grid grid-cols-2 gap-x-16 mb-8">
            {/* Column 1: Strategic */}
            {hasStrategicGains && (
              <div>
                <SectionTitle>Strategic Gains</SectionTitle>
                <div className="space-y-4">
                  <InfoBlock label="Core Ambitions" value={data.goals} />
                  <InfoBlock label="Proven Success" value={data.accomplishments} />
                  <InfoBlock label="Present Focus" value={data.currentInterests} />
                  <InfoBlock label="Sphere of Influence" value={data.network} />
                </div>
              </div>
            )}

            {/* Column 2: Personal */}
            {hasPersonalIdentity && (
              <div>
                <SectionTitle>Personal Identity</SectionTitle>
                <div className="space-y-4">
                  <InfoBlock label="Partner" value={data.spouseName} />
                  <InfoBlock label="Burn" value={data.burningDesire} />
                  <InfoBlock label="Secret Strength" value={data.secret} />
                  <InfoBlock label="Outside Office" value={data.activities || data.hobbies} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lower Grid: Numbered Lists for Both Referrals and Expertise */}
        {(referralPartnersList.length > 0 || clientServicesList.length > 0) && (
          <div className="mt-6 grid grid-cols-2 gap-x-16 pt-4 border-t border-slate-100">
            {/* Left: Referral Partners */}
            {referralPartnersList.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black opacity-30">Ideal Referral Partners</h4>
                </div>
                <div className="space-y-3">
                  {referralPartnersList.map((partner, i) => (
                    <div key={i} className="flex gap-5 items-center">
                      <span className="text-[20px] font-black text-black leading-none">{i + 1}</span>
                      <span className="text-[16px] font-black text-black uppercase whitespace-normal">{partner}</span> {/* Added whitespace-normal */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right: Expertise & Solutions (NOW A NUMBERED LIST) */}
            {clientServicesList.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-black opacity-20"></div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black opacity-30">Expertise & Solutions</h4>
                </div>
                <div className="space-y-3">
                  {clientServicesList.map((service, i) => (
                    <div key={i} className="flex gap-5 items-center">
                      <span className="text-[20px] font-black text-black leading-none">{i + 1}</span>
                      <span className="text-[16px] font-black text-black uppercase whitespace-normal">{service}</span> {/* Added whitespace-normal */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FINAL BRANDING BAR */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex items-center justify-between px-16">
         <div className="flex items-center gap-4 opacity-20">
            {/* Removed BNI Logo */}
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black">Professional Profile</span>
         </div>
         <div className="text-[9px] font-black uppercase tracking-[0.3em] text-black opacity-20">
           Developed by Rabbit Marketing House
         </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;