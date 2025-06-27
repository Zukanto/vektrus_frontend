import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const timeSlots = Array.from({ length: 96 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

export default function TimePicker({ value, onChange }: TimePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (time: string) => {
    onChange(time);
    setOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Time
      </label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className="w-full flex items-center px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-blue focus:border-transparent bg-white"
            onClick={handleClick}
          >
            <Clock className="w-5 h-5 text-gray-400 mr-2" />
            <span className="flex-1 text-left">
              {value || 'Select time'}
            </span>
          </button>
        </Popover.Trigger>
        
        <Popover.Portal>
          <Popover.Content
            className="bg-white rounded-lg shadow-xl p-2 w-48 max-h-64 overflow-y-auto animate-fade-in z-50"
            align="start"
            sideOffset={4}
            onClick={handleClick}
          >
            <div className="grid grid-cols-1 gap-1">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(time);
                  }}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    value === time
                      ? 'bg-vektrus-blue text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}