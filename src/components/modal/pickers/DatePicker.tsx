import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {DayPicker, getDefaultClassNames} from 'react-day-picker';
import { useModalContext } from '../../../context/ModalContext';
import { useClickOutside } from '../../../hooks/useClickOutside';
import 'react-day-picker/dist/style.css';
import { de } from "date-fns/locale";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const defaultClassNames = getDefaultClassNames()
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

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'));
      setIsOpen(false);
      setPickerActive(false);
    }
  };

  return (
      <div ref={pickerRef} className="relative">
        <button
            type="button"
            onClick={handleOpen}
            className="w-full flex items-center px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-blue focus:border-transparent bg-white"
        >
          <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
          <span className="flex-1 text-left">
          {value ? format(new Date(value), 'd. MMMM yyyy', { locale: de }) : 'Datum'}
        </span>
        </button>

        {isOpen && (
            <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl z-50">
              <DayPicker
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={handleSelect}
                  className="p-2"
                  locale={de}
                  classNames={{
                    today: `rounded-full border-vektrus-button`, // Add a border to today's date
                    selected: `bg-vektrus-button border-vektrus-button rounded-full`, // Highlight the selected day
                    root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
                    chevron: `bg-vektrus-button rounded-md` // Change the color of the chevron
                  }}
              />
            </div>
        )}
      </div>
  );
}
