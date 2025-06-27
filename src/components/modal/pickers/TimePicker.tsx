import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useModalContext } from '../../../context/ModalContext';
import { useClickOutside } from '../../../hooks/useClickOutside';

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
  const [isOpen, setIsOpen] = useState(false);
  const { setPickerActive } = useModalContext();
  const pickerRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
    setPickerActive(false);
  });

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
    setPickerActive(true);
  };

  const handleSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
    setPickerActive(false);
  };

  return (
    <div ref={pickerRef} className="relative">
      <button
        type="button"
        onClick={handleOpen}
        className="w-full flex items-center px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-blue focus:border-transparent bg-white"
      >
        <Clock className="w-5 h-5 text-gray-400 mr-2" />
        <span className="flex-1 text-left">
          {value || 'Zeit'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl z-50 w-48 max-h-64 overflow-y-auto">
          <div className="p-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleSelect(time)}
                className={`w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                  value === time
                    ? 'bg-vektrus-blue text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}