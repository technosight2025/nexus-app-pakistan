"use client";

import React, { useState } from 'react';
import { Upload, X, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GuestUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // 1. In a real scenario we upload the file to Supabase Storage or an S3 bucket
      // For this MVP, we simulate file upload and use a mock URL or base64
      // Let's pretend we uploaded it and got a URL back:
      const mockImageUrl = previewUrl || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc";

      // 2. Save the memory to the database
      const response = await fetch('/api/memories/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: mockImageUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload memory");
      }

      setUploadSuccess(true);
      setFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-100">
        <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#1E1B4B] mb-2">Thank you!</h3>
        <p className="text-sm text-slate-600 mb-6">Your memory has been uploaded and is waiting for approval.</p>
        <Button onClick={() => setUploadSuccess(false)} variant="outline">
          Upload Another
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 max-w-md mx-auto w-full">
      <h2 className="text-xl font-bold text-[#1E1B4B] mb-1">Share a Memory</h2>
      <p className="text-sm text-slate-500 mb-6">Upload photos from the event to our shared gallery.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      {!previewUrl ? (
        <label className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors group">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 text-slate-400" />
          </div>
          <span className="text-sm font-semibold text-[#1E1B4B]">Tap to select a photo</span>
          <span className="text-xs text-slate-400 mt-1">JPG, PNG (max 5MB)</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative rounded-xl overflow-hidden mb-6 border border-slate-200 bg-slate-100 aspect-[4/3]">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
          <button
            onClick={() => { setFile(null); setPreviewUrl(null); }}
            className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 backdrop-blur-md"
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {previewUrl && (
        <Button 
          className="w-full bg-[#047857] hover:bg-[#035f44] text-white" 
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
          ) : (
            'Upload to Gallery'
          )}
        </Button>
      )}
    </div>
  );
}
