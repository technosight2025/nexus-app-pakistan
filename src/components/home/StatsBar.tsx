import React from 'react';
import { Users, Building, Mail, Image as ImageIcon } from 'lucide-react';

export default function StatsBar() {
  return (
    <div className="w-full flex justify-center mt-[72px] mb-8 px-6">
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E7EB] w-full max-w-[1100px] py-7 px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-4 w-full md:w-1/4 pt-4 md:pt-0 pl-0 md:pl-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#0F5B3E]" />
            </div>
            <div>
              <div className="text-[20px] leading-tight font-bold text-[#1F2937]">10,000+</div>
              <div className="text-[12px] font-medium text-[#6B7280] mt-0.5">Event Guests Managed</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 w-full md:w-1/4 pt-4 md:pt-0 pl-0 md:pl-8 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0">
              <Building className="w-5 h-5 text-[#0F5B3E]" />
            </div>
            <div>
              <div className="text-[20px] leading-tight font-bold text-[#1F2937]">500+</div>
              <div className="text-[12px] font-medium text-[#6B7280] mt-0.5">Businesses Onboarded</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 w-full md:w-1/4 pt-4 md:pt-0 pl-0 md:pl-8 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#0F5B3E]" />
            </div>
            <div>
              <div className="text-[20px] leading-tight font-bold text-[#1F2937]">50,000+</div>
              <div className="text-[12px] font-medium text-[#6B7280] mt-0.5">Invitations Delivered</div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-4 w-full md:w-1/4 pt-4 md:pt-0 pl-0 md:pl-8 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5 text-[#0F5B3E]" />
            </div>
            <div>
              <div className="text-[20px] leading-tight font-bold text-[#1F2937]">1M+</div>
              <div className="text-[12px] font-medium text-[#6B7280] mt-0.5">Memories Captured</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
