import React from 'react';

// Custom SVG Star matching the clean rating aesthetic
const StarIcon = () => (
  <svg className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ayesha & Hamza',
      role: 'Event Hosts',
      quote: 'NEXUS made our entire wedding journey stress-free and beautiful.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=150&h=150&fit=crop',
    },
    {
      name: 'Royal Palm Hotel',
      role: 'Venue Owner',
      quote: 'Our bookings increased 40% after using NEXUS.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=150&h=150&fit=crop',
    },
    {
      name: 'Creative Studio',
      role: 'Studio Owner',
      quote: 'Project management and delivery have never been easier.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&h=150&fit=crop',
    },
    {
      name: 'Spice Route Restaurant',
      role: 'Restaurant Owner',
      quote: 'Reservations, events and customers — all in one place.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=150&h=150&fit=crop',
    },
    {
      name: 'Event Essence',
      role: 'Event Manager',
      quote: 'NEXUS is the only platform we trust for our events.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&h=150&fit=crop',
    },
  ];

  return (
    <section className="w-full bg-white px-4 py-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto text-center mb-8">
        <h2 className="text-[28px] font-bold text-[#0F5B3E] font-serif leading-tight">
          Success Stories
        </h2>
      </div>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {testimonials.map((test, i) => (
          <div 
            key={i} 
            className="bg-[#FAF7F2] border border-[#ECE7DF] rounded-[20px] p-3 flex items-start gap-3 hover:shadow-xs transition-all min-w-0"
          >
            {/* Square Image with Rounded Corners */}
            <div className="w-[68px] h-[68px] xl:w-[76px] xl:h-[76px] shrink-0 rounded-[14px] overflow-hidden">
              <img 
                src={test.image} 
                alt={test.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Testimonial Information */}
            <div className="flex flex-col min-w-0 pt-0.5">
              <h4 className="text-[13px] font-[700] text-[#1F2937] leading-tight">
                {test.name}
              </h4>
              <p className="text-[11px] text-[#6B7280] font-[500] leading-none mt-0.5">
                {test.role}
              </p>
              
              {/* Stars */}
              <div className="flex gap-0.5 my-1">
                {[...Array(5)].map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>

              {/* Quote Description */}
              <p className="text-[11px] text-[#4B5563] leading-snug font-[500] mt-0.5">
                {test.quote}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
