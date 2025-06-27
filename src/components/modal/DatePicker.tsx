import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import * as Popover from '@radix-ui/react-popover';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(value ? new Date(value) : new Date());
  
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'));
      setOpen(false);
    }
  };

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Date
      </label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className="w-full flex items-center px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-blue focus:border-transparent bg-white"
            onClick={handleClick}
          >
            <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
            <span className="flex-1 text-left">
              {value ? format(new Date(value), 'MMMM d, yyyy') : 'Select date'}
            </span>
          </button>
        </Popover.Trigger>
        
        <Popover.Portal>
          <Popover.Content
            className="bg-white rounded-lg shadow-xl p-2 animate-fade-in z-50"
            align="start"
            sideOffset={4}
            onClick={handleClick}
          >
            <DayPicker
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={handleSelect}
              month={month}
              onMonthChange={handleMonthChange}
              className="border-none"
              classNames={{
                day_selected: "bg-vektrus-blue text-white hover:bg-vektrus-blue-dark",
                day_today: "font-bold",
                button_reset: "hover:bg-gray-100 rounded-lg",
                nav_button: "hover:bg-gray-100 rounded-lg",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                caption: "flex justify-center items-center relative h-10",
                caption_label: "text-sm font-medium",
                head_cell: "text-xs font-medium text-gray-500",
              }}
              components={{
                IconLeft: () => <ChevronLeft className="w-4 h-4" />,
                IconRight: () => <ChevronRight className="w-4 h-4" />,
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}