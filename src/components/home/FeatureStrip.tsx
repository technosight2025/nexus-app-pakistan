import React from 'react';

const InvitationsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <rect width="40" height="40" rx="10" fill="url(#invGrad)" />
    <path d="M12 15h16v11H12V15z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15l8 5.5 8-5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="21" r="4" fill="#10B981" stroke="white" strokeWidth="1.5" />
    <path d="M18.5 21l1 1 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="invGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0F5B3E" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

const MemoriesIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <rect width="40" height="40" rx="10" fill="url(#memGrad)" />
    <rect x="12" y="12" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" />
    <circle cx="17" cy="16" r="2" fill="white" />
    <path d="M14 22l3-3 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="memGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
  </svg>
);

const DisplaysIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <rect width="40" height="40" rx="10" fill="url(#dispGrad)" />
    <rect x="11" y="12" width="18" height="11" rx="1" stroke="white" strokeWidth="1.5" />
    <path d="M16 23v3h8v-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 26h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="dispGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
  </svg>
);

const BusinessOSIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <rect width="40" height="40" rx="10" fill="url(#busGrad)" />
    <path d="M20 10l8 3.5v5c0 5-4.5 7.5-8 8.5-3.5-1-8-3.5-8-5v-5l8-3.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="17" r="2.5" stroke="white" strokeWidth="1.5" />
    <defs>
      <linearGradient id="busGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
  </svg>
);

const MobileAppsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <rect width="40" height="40" rx="10" fill="url(#mobGrad)" />
    <rect x="14" y="11" width="12" height="18" rx="2" stroke="white" strokeWidth="1.5" />
    <circle cx="20" cy="26" r="1" fill="white" />
    <defs>
      <linearGradient id="mobGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
    </defs>
  </svg>
);

const SecureIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <rect width="40" height="40" rx="10" fill="url(#secGrad)" />
    <path d="M20 10l8 3.5v5c0 5-4.5 7.5-8 8.5-3.5-1-8-3.5-8-5v-5l8-3.5z" fill="#047857" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 18l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="secGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#047857" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>
    </defs>
  </svg>
);

export default function FeatureStrip() {
  const features = [
    {
      icon: InvitationsIcon,
      title: 'Digital Invitations',
      desc: ['Music, RSVP, Guest Portal', '& more.'],
    },
    {
      icon: MemoriesIcon,
      title: 'Memories Platform',
      desc: ['Albums, Videos, Messages', '& Voice Notes.'],
    },
    {
      icon: DisplaysIcon,
      title: 'Digital Displays',
      desc: ['Welcome Screens, Menus,', 'Wayfinding & more.'],
    },
    {
      icon: BusinessOSIcon,
      title: 'Business OS',
      desc: ['All tools to run your entire', 'business.'],
    },
    {
      icon: MobileAppsIcon,
      title: 'Mobile Apps',
      desc: ['Customer & Business apps', 'for Android.'],
    },
    {
      icon: SecureIcon,
      title: 'Secure & Reliable',
      desc: ['Your data is safe', 'with us.'],
    },
  ];

  return (
    <section className="w-full bg-white px-4 py-12 overflow-hidden">
      <div className="ecosystem-card w-full h-auto bg-[#FAF7F2] border border-[#ECE7DF] rounded-[24px] px-[16px] xl:px-[24px] py-[16px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 lg:gap-y-0 items-center max-w-[1280px] mx-auto">
        {features.map((feat, i) => {
          const IconComponent = feat.icon;
          return (
            <div key={i} className="flex items-center gap-2 xl:gap-3 lg:border-r border-[#ECE7DF] last:border-r-0 lg:pr-2 xl:pr-4 lg:pl-2 first:lg:pl-0">
              <IconComponent />
              <div className="flex flex-col">
                <h4 className="text-[13px] font-[700] text-[#1F2937] leading-tight mb-0.5 whitespace-nowrap">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-[#6B7280] leading-[1.3] font-[500]">
                  {feat.desc.map((line, idx) => (
                    <span key={idx} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
