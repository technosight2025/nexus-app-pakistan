"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { ShoppingBag, Calculator, Camera, CalendarHeart, Lock } from 'lucide-react';

const FEATURES = [
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Browse and book top-rated event professionals, venues, and services.",
    icon: ShoppingBag,
    route: "/marketplace",
    disabled: false,
    color: "from-blue-500 to-indigo-600 shadow-blue-500/20 text-blue-100"
  },
  {
    id: "budget",
    title: "Budget Tool",
    description: "Track expenses, manage budgets, and stay on top of your event finances.",
    icon: Calculator,
    route: "/dashboard/budget",
    disabled: false,
    color: "from-emerald-500 to-teal-600 shadow-emerald-500/20 text-emerald-100"
  },
  {
    id: "memories",
    title: "Memories Hub",
    description: "Collect and share event photos in a beautiful, organized gallery.",
    icon: Camera,
    route: "/memories",
    disabled: false,
    color: "from-purple-500 to-fuchsia-600 shadow-purple-500/20 text-purple-100"
  },
  {
    id: "planner",
    title: "Planner",
    description: "Plan your event timeline, manage tasks, and coordinate with vendors.",
    icon: CalendarHeart,
    route: "/dashboard/planning",
    disabled: false,
    color: "from-rose-500 to-orange-600 shadow-rose-500/20 text-rose-100"
  }
];

export default function FeatureGrid() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: string, disabled: boolean) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (isLoaded && !isSignedIn) {
      e.preventDefault();
      document.cookie = `intended_destination=${route}; path=/; max-age=3600; SameSite=Lax`;
      router.push('/signup');
    }
  };

  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] mb-6 font-heading">
            Everything you need for your perfect event
          </h2>
          <p className="text-lg text-slate-600">
            From finding the perfect venue to capturing memories, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={(e) => handleLinkClick(e as any, feature.route, feature.disabled)}
                className={`bg-gradient-to-br ${feature.color.split(' shadow-')[0]} text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group ${feature.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors pointer-events-none" />
                
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 relative z-10 shadow-inner">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 relative z-10 pointer-events-none">
                  {feature.title}
                </h3>
                
                <p className="text-sm mb-8 relative z-10 opacity-90 leading-relaxed min-h-[60px] pointer-events-none">
                  {feature.description}
                </p>
                
                <div className="relative z-10 mt-auto">
                  {feature.disabled ? (
                    <div className="relative group/tooltip inline-block w-full">
                      <button disabled className="w-full py-3 px-4 bg-white/10 text-white/50 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed border border-white/10">
                        <Lock className="w-4 h-4" /> Coming Soon
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Feature in development
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="w-full py-3 px-4 bg-white/20 group-hover:bg-white text-white group-hover:text-slate-900 rounded-xl font-bold transition-all flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:border-transparent pointer-events-none"
                    >
                      Learn More
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
