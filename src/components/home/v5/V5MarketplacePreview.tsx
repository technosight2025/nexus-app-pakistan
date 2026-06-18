import React from 'react';
import { Container } from '@/components/ui/Container';
import { Search, MapPin, Star, Sparkles } from 'lucide-react';

export function V5MarketplacePreview() {
  const categories = ['Venues', 'Photographers', 'Decorators', 'Makeup Artists', 'Caterers', 'Rentals'];

  const featuredItems = [
    {
      title: "The Royal Palm Ballroom",
      location: "Gulberg, Lahore",
      rating: "4.9",
      reviews: "128 reviews",
      badge: "Verified Partner",
      badgeColor: "bg-[#0F5B3E]/10 text-[#0F5B3E] border-[#0F5B3E]/20",
      img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Monal Heritage Marquee",
      location: "Margalla Hills, Islamabad",
      rating: "4.8",
      reviews: "94 reviews",
      badge: "Top Rated",
      badgeColor: "bg-amber-50 text-[#C9A227] border-amber-100",
      img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Indigo Gardens & Banquets",
      location: "Clifton, Karachi",
      rating: "4.9",
      reviews: "152 reviews",
      badge: "Trending",
      badgeColor: "bg-pink-50 text-[#D9467A] border-pink-100",
      img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600"
    }
  ];
  
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Ecosystem Directory
            </div>
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#1F2937] tracking-tight">
              Premium Discovery Experience
            </h2>
            <p className="text-lg text-[#6B7280] font-light mt-4">
              Directly connect with top-tier wedding venues, catering teams, and photographers. Curated for reliability.
            </p>
          </div>
          <button className="text-[#0F5B3E] font-bold uppercase tracking-widest text-xs hover:underline shrink-0 group flex items-center gap-1.5 transition-all">
            Explore Full Marketplace 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat, i) => (
            <span 
              key={cat} 
              className={`px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-all border ${
                i === 0 
                  ? 'bg-[#0F5B3E] text-white border-[#0F5B3E] shadow-sm shadow-[#0F5B3E]/15' 
                  : 'bg-[#FAF7F2] text-[#1F2937] border-gray-200/60 hover:bg-gray-100'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Premium Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="w-full h-80 rounded-[24px] mb-5 overflow-hidden relative border border-gray-100 shadow-sm">
                
                {/* Visual Unsplash Image with smooth scaling */}
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Floating Rating Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm text-gray-800">
                  <Star className="w-3 h-3 text-[#C9A227] fill-[#C9A227]" /> 
                  <span>{item.rating}</span>
                  <span className="text-gray-400 font-medium font-sans">({item.reviews.split(' ')[0]})</span>
                </div>

                {/* Left Floating Category/Status badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-sm ${item.badgeColor}`}>
                  {item.badge}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#1F2937] mb-1.5 group-hover:text-[#0F5B3E] transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-[#6B7280] flex items-center gap-1.5 text-xs font-medium">
                <MapPin className="w-4 h-4 text-gray-400" /> 
                {item.location}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
