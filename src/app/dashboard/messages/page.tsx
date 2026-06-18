import React from 'react';
import { VerifiedCommunicationsTerminal } from '@/components/dashboard/communications/VerifiedCommunicationsTerminal';

export const metadata = {
  title: 'Messages | NEXUS Event OS',
  description: 'Certified WhatsApp communications ledger',
};

export default function MessagesPage() {
  return (
    <div className="h-full flex flex-col">
      <VerifiedCommunicationsTerminal />
    </div>
  );
}
