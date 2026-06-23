"use client";

import React, { useEffect, useState } from 'react';
import { Check, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Memory = {
  id: string;
  image_url: string;
  status: string;
  timestamp: string;
};

export default function HostModerationDashboard() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingMemories();
  }, []);

  const fetchPendingMemories = async () => {
    try {
      const res = await fetch('/api/memories/pending');
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          throw new Error("You do not have permission to view pending memories.");
        }
        throw new Error("Failed to load pending memories.");
      }
      const data = await res.json();
      setMemories(data.memories || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    // Optimistic update
    setMemories(prev => prev.filter(m => m.id !== id));
    
    try {
      const res = await fetch(`/api/memories/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
    } catch (err: any) {
      console.error(err);
      // Revert on error could go here
      fetchPendingMemories();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#047857]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1E1B4B]">Pending Approvals</h2>
          <p className="text-sm text-slate-500">Review photos uploaded by your guests.</p>
        </div>
        <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
          {memories.length} Pending
        </div>
      </div>

      {memories.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-slate-500 font-medium">No pending photos to review</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {memories.map(memory => (
            <div key={memory.id} className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square">
              <img src={memory.image_url} alt="Pending Memory" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                <Button 
                  size="icon" 
                  className="bg-emerald-500 hover:bg-emerald-600 rounded-full w-10 h-10 shadow-lg"
                  onClick={() => handleAction(memory.id, 'approved')}
                >
                  <Check className="w-5 h-5 text-white" />
                </Button>
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="rounded-full w-10 h-10 shadow-lg"
                  onClick={() => handleAction(memory.id, 'rejected')}
                >
                  <X className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
