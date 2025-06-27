import React from 'react';
import PlatformIcon from '../platform/PlatformIcon';
import { PLATFORMS } from '../../types/platform';
import type { PlatformType } from '../../types/platform';

interface PlatformSelectorProps {
    selected: PlatformType[];
    onChange: (platforms: PlatformType[]) => void;
}

export default function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
    const togglePlatform = (platform: PlatformType) => {
        const newSelected = selected.includes(platform)
            ? selected.filter(p => p !== platform)
            : [...selected, platform];
        onChange(newSelected);
    };

    return (
        <div className={"mb-8"}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Plattformen
            </label>
            <div className="flex space-x-2">
                {PLATFORMS.map(platform => (
                    <button
                        key={platform.id}
                        type="button"
                        onClick={() => togglePlatform(platform.id)}
                        className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                            selected.includes(platform.id)
                                ? `${platform.color} border-transparent text-white shadow-md`
                                : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <PlatformIcon platform={platform.id} />
                    </button>
                ))}
            </div>
        </div>
    );
}
