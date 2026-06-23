// Nexus Platform Clean-Slate Active Modules Core Configuration
export interface NexusModule {
  id: string;
  name: string;
  path: string;
  category: 'B2C' | 'B2B';
  isActive: boolean;
}

export const activeNexusModules: NexusModule[] = [
  {
    id: 'client-portal',
    name: 'Secure Client Experience Console',
    path: '/portal',
    category: 'B2C',
    isActive: true
  },
  {
    id: 'studio-workspace',
    name: 'B2B Studio Control Hub',
    path: '/business/studio',
    category: 'B2B',
    isActive: true
  },
  {
    id: 'venue-matrix',
    name: 'Khyber City Management Suite',
    path: '/business/venues',
    category: 'B2B',
    isActive: true
  }
];
