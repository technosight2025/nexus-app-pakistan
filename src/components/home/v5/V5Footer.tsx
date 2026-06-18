import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function V5Footer() {
  const columns = [
    { title: "Platform", links: ["Features", "Pricing", "Security", "Integrations"] },
    { title: "Marketplace", links: ["Venues", "Photographers", "Caterers", "Decorators"] },
    { title: "Business OS", links: ["Venue OS", "Studio OS", "Restaurant OS", "CRM OS"] },
    { title: "Experiences", links: ["Invitations", "Memories", "Displays", "Guest Portals"] },
    { title: "Company", links: ["About Us", "Careers", "Contact", "Partners"] },
  ];

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-16">
          <div className="max-w-sm">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-[#1F2937]">
                NEXUS
              </span>
            </Link>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Pakistan's Event & Business Operating System. Replacing manual chaos with a single intelligent platform.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {columns.map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-widest mb-6">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-[#6B7280] hover:text-[#0F5B3E] transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6B7280]">
          <p>© 2026 Nexus Tech Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#1F2937]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#1F2937]">Terms of Service</Link>
            <Link href="#" className="hover:text-[#1F2937]">Cookie Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
