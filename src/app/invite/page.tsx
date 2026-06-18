"use client"

import React from 'react';
import { InviteHero } from '@/components/invite/InviteHero';
import { InvitationTypes } from '@/components/invite/InvitationTypes';
import { TemplateGallery } from '@/components/invite/TemplateGallery';
import { InvitationBuilder } from '@/components/invite/InvitationBuilder';
import { PublicLayout } from '@/components/layout/PublicLayout';

export default function InvitePage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#FAF7F2]">
        <InviteHero />
        <InvitationTypes />
        <TemplateGallery />
        <InvitationBuilder />
      </main>
    </PublicLayout>
  );
}
