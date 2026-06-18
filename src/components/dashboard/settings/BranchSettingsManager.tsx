'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2, Building, Users, Home, Check, Plus } from 'lucide-react';
import type { Database } from '@/types/supabase';

type BranchRow = Database['public']['Tables']['branches']['Row'];
type RoomRow = Database['public']['Tables']['rooms']['Row'];
type BranchUserJoined = Database['public']['Tables']['branch_users']['Row'] & {
  users?: { email: string; full_name: string | null } | null;
  roles?: { name: string } | null;
};

export function BranchSettingsManager() {
  const { branchId, organizationId } = useDashboard();
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'profile' | 'halls' | 'team'>('profile');

  // Data States
  const [branchProfile, setBranchProfile] = useState<BranchRow | null>(null);
  const [halls, setHalls] = useState<RoomRow[]>([]);
  const [teamMembers, setTeamMembers] = useState<BranchUserJoined[]>([]);

  // Form states for Branch Profile
  const [profileForm, setProfileForm] = useState({ name: '', address: '', slug: '' });
  const [savedField, setSavedField] = useState<string | null>(null);

  // Form states for New Hall
  const [isAddingHall, setIsAddingHall] = useState(false);
  const [newHallForm, setNewHallForm] = useState({ name: '', capacity: '' });

  const supabase = createClient();

  // Load Data
  useEffect(() => {
    async function loadSettingsData() {
      if (!branchId || !organizationId) return;
      setIsLoading(true);

      const [branchRes, roomsRes, teamRes] = await Promise.all([
        supabase.from('branches').select('*').eq('id', branchId).eq('organization_id', organizationId).single(),
        supabase.from('rooms').select('*').eq('branch_id', branchId).order('created_at', { ascending: true }),
        supabase.from('branch_users').select('*, users(email, full_name), roles(name)').eq('branch_id', branchId)
      ]);

      if (branchRes.data) {
        setBranchProfile(branchRes.data);
        setProfileForm({
          name: branchRes.data.name,
          address: branchRes.data.address || '',
          slug: branchRes.data.slug
        });
      }
      
      if (roomsRes.data) setHalls(roomsRes.data);
      if (teamRes.data) setTeamMembers(teamRes.data as unknown as BranchUserJoined[]);

      setIsLoading(false);
    }
    loadSettingsData();
  }, [branchId, organizationId, supabase]);

  // Save handler for inline field updates
  const handleProfileUpdate = async (field: keyof typeof profileForm, value: string) => {
    if (!branchId || !branchProfile) return;
    if (value === branchProfile[field]) return; // no change

    const { error } = await supabase
      .from('branches')
      .update({ [field]: value })
      .eq('id', branchId);

    if (!error) {
      setBranchProfile(prev => prev ? { ...prev, [field]: value } : prev);
      setSavedField(field);
      setTimeout(() => setSavedField(null), 2000);
    } else {
      console.error('Update failed:', error);
      // Revert field
      setProfileForm(prev => ({ ...prev, [field]: branchProfile[field] || '' }));
    }
  };

  const handleHallUpdate = async (hallId: string, field: keyof RoomRow, value: any) => {
    const originalHall = halls.find(h => h.id === hallId);
    if (!originalHall || originalHall[field] === value) return;

    const { error } = await supabase
      .from('rooms')
      .update({ [field]: value })
      .eq('id', hallId);

    if (!error) {
      setHalls(prev => prev.map(h => h.id === hallId ? { ...h, [field]: value } : h));
      setSavedField(`hall-${hallId}-${field}`);
      setTimeout(() => setSavedField(null), 2000);
    } else {
      console.error('Update failed:', error);
    }
  };

  const handleAddHall = async () => {
    if (!branchId || !newHallForm.name || !newHallForm.capacity) return;
    
    const cap = parseInt(newHallForm.capacity);
    if (isNaN(cap)) return;

    const { data, error } = await supabase
      .from('rooms')
      .insert({
        branch_id: branchId,
        name: newHallForm.name,
        type: 'Marquee',
        capacity: cap
      })
      .select()
      .single();

    if (data) {
      setHalls(prev => [...prev, data]);
      setNewHallForm({ name: '', capacity: '' });
      setIsAddingHall(false);
    } else if (error) {
      console.error('Failed to add hall:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="animate-spin text-[#0F5B3E] w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1D1C17] uppercase tracking-wider mb-2">Branch Settings</h1>
        <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">Manage Configuration & Access</p>
      </div>

      {/* Horizontal Structural Navigation Tabs */}
      <div className="flex border-b border-[#E6E2DA] mb-8 shrink-0">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'profile' ? 'border-b-2 border-[#0F5B3E] text-[#0F5B3E]' : 'text-[#5E6460] hover:text-[#1D1C17]'
          }`}
        >
          <Building size={16} /> Branch Profile
        </button>
        <button 
          onClick={() => setActiveTab('halls')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'halls' ? 'border-b-2 border-[#0F5B3E] text-[#0F5B3E]' : 'text-[#5E6460] hover:text-[#1D1C17]'
          }`}
        >
          <Home size={16} /> Hall Management
        </button>
        <button 
          onClick={() => setActiveTab('team')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'team' ? 'border-b-2 border-[#0F5B3E] text-[#0F5B3E]' : 'text-[#5E6460] hover:text-[#1D1C17]'
          }`}
        >
          <Users size={16} /> Team Access
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-12">
        {activeTab === 'profile' && (
          <div className="bg-[#FFFFFF] border border-[#E6E2DA] p-8 max-w-2xl space-y-8">
            <div>
              <label className="block text-[10px] font-black text-[#5E6460] mb-2 uppercase tracking-wider">Branch Name</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                  onBlur={e => handleProfileUpdate('name', e.target.value)}
                  className="flex-1 border border-[#E6E2DA] p-3 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none transition-colors"
                />
                {savedField === 'name' && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider animate-in fade-in slide-in-from-left-2">
                    <Check size={12} /> Saved
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#5E6460] mb-2 uppercase tracking-wider">Branch Slug (URL Identifier)</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={profileForm.slug}
                  onChange={e => setProfileForm({ ...profileForm, slug: e.target.value })}
                  onBlur={e => handleProfileUpdate('slug', e.target.value)}
                  className="flex-1 border border-[#E6E2DA] p-3 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none transition-colors"
                />
                {savedField === 'slug' && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider animate-in fade-in slide-in-from-left-2">
                    <Check size={12} /> Saved
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#5E6460] mb-2 uppercase tracking-wider">Physical Address</label>
              <div className="flex items-start gap-3">
                <textarea 
                  value={profileForm.address}
                  onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                  onBlur={e => handleProfileUpdate('address', e.target.value)}
                  className="flex-1 border border-[#E6E2DA] p-3 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none resize-none h-24 transition-colors"
                />
                {savedField === 'address' && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider animate-in fade-in slide-in-from-left-2 mt-3">
                    <Check size={12} /> Saved
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'halls' && (
          <div className="bg-[#FFFFFF] border border-[#E6E2DA] w-full">
            <div className="p-5 border-b border-[#E6E2DA] bg-[#FAF7F2] flex justify-between items-center">
              <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider">Registered Marquees / Halls</h2>
              <button 
                onClick={() => setIsAddingHall(!isAddingHall)}
                className="bg-[#0F5B3E] text-white text-[10px] font-black uppercase tracking-wider px-4 py-2 hover:bg-[#0c4931] transition-colors flex items-center gap-2"
              >
                <Plus size={14} /> Add New Hall
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FFFFFF] border-b border-[#E6E2DA]">
                <tr>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[50%]">Hall Name</th>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[30%]">Max Capacity</th>
                  <th className="p-4 w-[20%]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E2DA]">
                {halls.map(hall => (
                  <tr key={hall.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-4">
                      <input 
                        type="text" 
                        defaultValue={hall.name}
                        onBlur={e => handleHallUpdate(hall.id, 'name', e.target.value)}
                        className="w-full bg-transparent border border-transparent hover:border-[#E6E2DA] focus:border-[#0F5B3E] focus:bg-[#FFFFFF] p-2 text-sm font-bold text-[#1D1C17] outline-none transition-colors"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <input 
                          type="number" 
                          defaultValue={hall.capacity || ''}
                          onBlur={e => handleHallUpdate(hall.id, 'capacity', parseInt(e.target.value))}
                          className="w-24 bg-transparent border border-transparent hover:border-[#E6E2DA] focus:border-[#0F5B3E] focus:bg-[#FFFFFF] p-2 text-sm font-bold text-[#1D1C17] outline-none transition-colors"
                        />
                        {savedField === `hall-${hall.id}-capacity` && (
                          <span className="text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider animate-in fade-in slide-in-from-left-2 flex items-center gap-1">
                            <Check size={10} /> Saved
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                       {savedField === `hall-${hall.id}-name` && (
                          <span className="text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider animate-in fade-in slide-in-from-left-2 flex items-center justify-end gap-1">
                            <Check size={10} /> Saved Changes
                          </span>
                        )}
                    </td>
                  </tr>
                ))}

                {/* Inline Add Hall Form */}
                {isAddingHall && (
                  <tr className="bg-[#FAF7F2]">
                    <td className="p-4">
                      <input 
                        type="text" 
                        placeholder="New Hall Name"
                        value={newHallForm.name}
                        onChange={e => setNewHallForm({ ...newHallForm, name: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF]"
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="number" 
                        placeholder="Capacity"
                        value={newHallForm.capacity}
                        onChange={e => setNewHallForm({ ...newHallForm, capacity: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF]"
                      />
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={handleAddHall}
                        disabled={!newHallForm.name || !newHallForm.capacity}
                        className="bg-[#0F5B3E] text-white text-[10px] font-black uppercase tracking-wider px-4 py-2 hover:bg-[#0c4931] disabled:opacity-50 transition-colors"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                )}
                
                {halls.length === 0 && !isAddingHall && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-xs font-bold text-[#5E6460]">No halls configured for this branch.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-[#FFFFFF] border border-[#E6E2DA] w-full">
            <div className="p-5 border-b border-[#E6E2DA] bg-[#FAF7F2]">
              <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider">Authorized Personnel</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FFFFFF] border-b border-[#E6E2DA]">
                <tr>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[40%]">Staff Member</th>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[40%]">Email Address</th>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[20%]">Access Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E2DA]">
                {teamMembers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-xs font-bold text-[#5E6460]">No team members found.</td>
                  </tr>
                ) : (
                  teamMembers.map(member => (
                    <tr key={member.id} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="p-4 text-sm font-black text-[#1D1C17]">
                        {member.users?.full_name || 'Unnamed User'}
                      </td>
                      <td className="p-4 text-xs font-bold text-[#5E6460]">
                        {member.users?.email}
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#E6F0EC] text-[#0F5B3E] px-2 py-1 border border-[#0F5B3E]/20">
                          {member.roles?.name || 'Standard'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
