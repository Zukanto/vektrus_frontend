import type { PlatformType } from './platform';

export interface Post {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  contentplan: number;
  date: string;
  time: string;
  platforms: PlatformType[];
  image?: string;
  text?: string;
  status: 'geplant' | 'ausstehend';
  platform: PlatformType;
}

export interface PostUpdate {
  title?: string;
  description?: string;
  status?: 'geplant' | 'ausstehend';
  image?: string;
}