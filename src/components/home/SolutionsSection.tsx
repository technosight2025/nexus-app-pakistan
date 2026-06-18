import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Mail, 
  Image, 
  Users, 
  FileText, 
  Monitor, 
  BarChart, 
  Folder, 
  Truck, 
  BookOpen, 
  Clock, 
  User, 
  Wallet, 
  Store 
} from 'lucide-react';

export default function SolutionsSection() {
  const solutions = [
    {
      title: 'For Customers',
      desc: 'Plan your perfect event with ease.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=200&fit=crop',
      href: '/for-customers',
      features: [
        { label: 'Events', icon: Calendar },
        { label: 'Invitations', icon: Mail },
        { label: 'Memories', icon: Image },
      ],
    },
    {
      title: 'For Businesses',
      desc: 'Run your operations smarter.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=200&fit=crop',
      href: '/business',
      features: [
        { label: 'CRM', icon: Users },
        { label: 'Quotations', icon: FileText },
        { label: 'Workforce', icon: Users },
      ],
    },
    {
      title: 'For Venues',
      desc: 'Manage bookings & maximize revenue.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&h=200&fit=crop',
      href: '/for-venues',
      features: [
        { label: 'Bookings', icon: Calendar },
        { label: 'Displays', icon: Monitor },
        { label: 'Analytics', icon: BarChart },
      ],
    },
    {
      title: 'For Studios',
      desc: 'Streamline projects & deliver excellence.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=200&fit=crop',
      href: '/for-studios',
      features: [
        { label: 'Projects', icon: Folder },
        { label: 'Photo Selection', icon: Image },
        { label: 'Deliveries', icon: Truck },
      ],
    },
    {
      title: 'For Restaurants',
      desc: 'Delight guests & grow your business.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=200&fit=crop',
      href: '/for-restaurants',
      features: [
        { label: 'Menus', icon: BookOpen },
        { label: 'Reservations', icon: Clock },
        { label: 'Events', icon: Calendar },
      ],
    },
    {
      title: 'For Event Managers',
      desc: 'Manage clients, budgets & vendors.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=200&fit=crop',
      href: '/for-event-managers',
      features: [
        { label: 'Clients', icon: User },
        { label: 'Budgets', icon: Wallet },
        { label: 'Vendors', icon: Store },
      ],
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-[#ECE7DF]">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] font-bold text-[#1F2937] mb-6 font-serif">Solutions For Every Role</h2>
          <div className="w-16 h-[2px] bg-[#0F5B3E] mx-auto rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {solutions.map((sol, i) => (
            <Link key={i} href={sol.href} className="bg-white rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#E5E7EB] flex flex-col hover:shadow-lg transition-all group cursor-pointer hover:-translate-y-1">
              {/* Image */}
              <div className="h-[120px] w-full overflow-hidden shrink-0">
                <img src={sol.image} alt={sol.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-[16px] font-bold text-[#1F2937] mb-1 leading-tight group-hover:text-[#0F5B3E] transition-colors">{sol.title}</h3>
                <p className="text-[#6B7280] text-[12px] mb-4 leading-snug min-h-[36px]">{sol.desc}</p>
                
                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  {sol.features.map((feat, j) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div key={j} className="flex items-center gap-2">
                        <FeatIcon className="w-3.5 h-3.5 text-[#0F5B3E] shrink-0" />
                        <span className="text-[12px] font-[500] text-[#4B5563]">{feat.label}</span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Button */}
                <div className="mt-auto pt-2">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-[#4B5563] bg-white border border-[#E5E7EB] rounded-[6px] group-hover:bg-[#0F5B3E] group-hover:text-white group-hover:border-[#0F5B3E] transition-colors shadow-sm w-full text-center">
                    Explore
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
