import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

type PlatformType = 'facebook' | 'instagram' | 'linkedin' | 'twitter';

interface PlatformIconProps {
  platform: PlatformType;
  className?: string;
}

export default function PlatformIcon({ platform, className = "w-5 h-5" }: PlatformIconProps) {
  const icons = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter
  };

  const Icon = icons[platform];
  return <Icon className={className} />;
}