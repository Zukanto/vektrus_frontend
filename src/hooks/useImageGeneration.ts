import { useState } from 'react';
import { startImageGeneration, checkGenerationStatus } from '../services/imageGeneration';

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (prompt: string): Promise<string | null> => {
    try {
      setIsGenerating(true);
      setError(null);

      // Start generation
      const requestId = await startImageGeneration(prompt);

      // Poll for result
      const pollInterval = 1000; // 1 second
      const maxAttempts = 60; // 1 minute timeout
      let attempts = 0;

      return new Promise((resolve, reject) => {
        const poll = async () => {
          try {
            const result = await checkGenerationStatus(requestId);

            if (result.status === 'Ready' && result.result?.sample) {
              resolve(result.result.sample);
              setIsGenerating(false);
              return;
            }

            attempts++;
            if (attempts >= maxAttempts) {
              throw new Error('Generation timeout');
            }

            setTimeout(poll, pollInterval);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate image');
            setIsGenerating(false);
            reject(err);
          }
        };

        poll();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start image generation');
      setIsGenerating(false);
      return null;
    }
  };

  return {
    generateImage,
    isGenerating,
    error
  };
}