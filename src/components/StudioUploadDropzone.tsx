'use client';

import React, { useState, useRef } from 'react';
import { Upload, CloudLightning, FileImage, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface UploadProps {
  bookingId: string;
  onUploadSuccess?: () => void;
}

export default function StudioUploadDropzone({ bookingId, onUploadSuccess }: UploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = async (files: FileList) => {
    setUploading(true);
    setStatus(null);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Processing asset ${i + 1} of ${files.length}: ${file.name}`);

        // Define path strategies matching our Storage RLS guidelines:
        // Previews -> vaulted/prefix, High-Res Originals -> originals/prefix
        const isHighRes = !file.name.toLowerCase().includes('preview') && !file.name.toLowerCase().includes('watermark');
        const pathPrefix = isHighRes ? 'originals' : 'vaulted';
        
        // Generate a clean deterministic file structural path inside the bucket
        const fileExtension = file.name.split('.').pop();
        const cleanFileName = `${bookingId}_${Math.random().toString(36).substring(2, 10)}.${fileExtension}`;
        const storagePath = `${pathPrefix}/${cleanFileName}`;

        const { error } = await supabase.storage
          .from('nexus-media')
          .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;
      }

      setStatus({ type: 'success', message: `Successfully pushed ${files.length} production assets to the remote Nexus vault.` });
      if (onUploadSuccess) onUploadSuccess();
    } catch (err: any) {
      console.error('Storage bucket handoff failure:', err);
      setStatus({ type: 'error', message: err.message || 'Handoff processing failure.' });
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <CloudLightning className="w-4 h-4 text-[#0F5B3E]" /> Production Asset Dropzone
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Files containing &apos;preview&apos; or &apos;watermark&apos; route automatically to open client viewing. Standard high-res assets route to the locked vault layer.
        </p>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[180px] ${
          dragActive 
            ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
            : 'border-slate-200 bg-slate-50/50 hover:border-[#0F5B3E]/40 hover:bg-[#0F5B3E]/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleChange}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-2 text-center">
            <Loader2 className="w-8 h-8 text-[#0F5B3E] animate-spin mx-auto" />
            <p className="text-xs font-black text-[#0F5B3E] uppercase tracking-wide">Syncing Storage...</p>
            <p className="text-[10px] text-slate-400 font-medium max-w-xs truncate">{uploadProgress}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm w-fit mx-auto text-slate-400 group-hover:text-[#0F5B3E] transition-colors">
              <Upload className="w-5 h-5 text-[#0F5B3E]" />
            </div>
            <p className="text-xs font-bold text-slate-700">
              Drag & drop files here, or <span className="text-[#0F5B3E] underline">browse local drive</span>
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Supports RAW, JPG, PNG, MP4 up to 500MB per chunk</p>
          </div>
        )}
      </div>

      {status && (
        <div className={`p-3 rounded-xl border text-xs font-medium flex items-start gap-2 animate-fadeIn ${
          status.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
            : 'bg-rose-50 border-rose-100 text-rose-800'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}
