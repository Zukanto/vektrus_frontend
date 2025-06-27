import React, { useState } from 'react';
import { Sparkles, RefreshCw, Wand2 } from 'lucide-react';
import { useImageGeneration } from '../../hooks/useImageGeneration';

interface ImageGeneratorProps {
  onGenerate: (imageUrl: string) => void;
  isGenerating: boolean;
}

export default function ImageGenerator({ onGenerate }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [showPromptInput, setShowPromptInput] = useState(false);
  const { generateImage, isGenerating, error } = useImageGeneration();

  const handleGenerateClick = () => {
    setShowPromptInput(true);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || isGenerating) return;

    const imageUrl = await generateImage(prompt);
    if (imageUrl) {
      onGenerate(imageUrl);
      setPrompt('');
      setShowPromptInput(false);
    }
  };

  return (
    <div className="space-y-4">
      {!showPromptInput ? (
        <button
          type="button"
          onClick={handleGenerateClick}
          className="w-full group relative px-6 py-3 rounded-full bg-gradient-to-r from-vektrus-blue to-vektrus-blue-light text-white font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-vektrus-blue-light to-vektrus-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="relative flex items-center justify-center space-x-2">
            <Wand2 className="w-5 h-5" />
            <span>Generate with AI</span>
          </div>
        </button>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full px-4 py-2 pr-24 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-blue focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-vektrus-blue text-white rounded-full hover:bg-vektrus-blue-dark transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>Generate</span>
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}