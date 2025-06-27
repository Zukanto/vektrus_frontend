import { api } from './api';

const BASE_URL = 'https://api.bfl.ml/v1';

interface GenerationResponse {
  id: string;
  status: string;
}

interface ResultResponse {
  status: string;
  result?: {
    sample: string;
  };
}

export async function startImageGeneration(prompt: string): Promise<string> {
  const response = await api.post<GenerationResponse>(
    `${BASE_URL}/flux-pro-1.1`,
    {
      prompt,
      width: 1024,
      height: 768
    }
  );
  
  return response.data.id;
}

export async function checkGenerationStatus(id: string): Promise<ResultResponse> {
  const response = await api.get<ResultResponse>(
    `${BASE_URL}/get_result?id=${id}`
  );
  
  return response.data;
}