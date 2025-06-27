import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  onClose: () => void;
}

export default function ImagePreview({ src, onClose }: ImagePreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
      <div className="relative max-w-4xl w-full animate-fade-in">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={src}
          alt="Preview"
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}