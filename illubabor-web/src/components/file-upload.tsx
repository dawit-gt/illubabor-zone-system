'use client';

import { useRef, useState } from 'react';
import { api } from '@/lib/api';

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string; // e.g. "image/*" or ".pdf,.doc,.docx"
  label?: string;
}

export function FileUpload({ value, onChange, accept = 'image/*', label }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/uploads', formData);
      onChange(data.url);
    } catch {
      setError('Upload failed — try a smaller file or check your connection.');
    } finally {
      setUploading(false);
    }
  };

  const isImage = accept.includes('image');

  return (
    <div>
      {label && <label className="block text-sm font-medium text-ink-950">{label}</label>}
      <div className="mt-1 flex items-center gap-3">
        {value && isImage && (
          <img src={value} alt="" className="h-16 w-16 rounded-md border border-coffee-950/10 object-cover" />
        )}
        {value && !isImage && (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-clay-600 underline">
            Current file
          </a>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-md border border-coffee-950/20 px-3 py-2 text-sm hover:bg-coffee-950/5 disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload'}
        </button>
        {value && (
          <button type="button" onClick={() => onChange('')} className="text-xs text-red-600 hover:underline">
            Remove
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}