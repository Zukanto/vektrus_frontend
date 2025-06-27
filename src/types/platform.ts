export type PlatformType = 'facebook' | 'instagram' | 'linkedin' | 'twitter';

export interface Platform {
  id: PlatformType;
  name: string;
  color: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    color: 'bg-blue-500'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: 'bg-pink-500'
  }
];