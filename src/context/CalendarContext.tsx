import React, { createContext, useContext, useState } from 'react';
import {addMonths, addWeeks, subMonths, subWeeks} from 'date-fns';

interface CalendarContextType {
  currentDate: Date;
  nextMonth: () => void;
  previousMonth: () => void;
  nextWeek: () => void;
  previousWeek: () => void;
  today: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(current => addMonths(current, 1));
  };

  const previousMonth = () => {
    setCurrentDate(current => subMonths(current, 1));
  };

  const nextWeek = () => {
    setCurrentDate(current => addWeeks(current, 1));
  }

  const previousWeek = () => {
    setCurrentDate(current => subWeeks(current, 1));
  }

  const today = () => {
    setCurrentDate(new Date());
  }

  return (
    <CalendarContext.Provider value={{ currentDate, nextMonth, previousMonth, nextWeek, previousWeek, today}}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}