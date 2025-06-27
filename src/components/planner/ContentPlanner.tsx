import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WeeklyCalendar from './WeeklyCalendar';
import MonthlyCalendar from './MonthlyCalendar';
import Header from '../layout/Header';
import { useCalendar } from '../../context/CalendarContext';
import { format, getISOWeek } from 'date-fns';
import { de } from 'date-fns/locale';

type ViewMode = 'week' | 'month';

export default function ContentPlanner() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const { currentDate, nextMonth, previousMonth, nextWeek, previousWeek, today} = useCalendar();

  return (
      <div className="absolute w-full pl-[100px] flex-1 h-full flex flex-col overflow-hidden">
        <Header />
        <div className="sticky top-0 z-10 px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                  onClick={today}
                  className="px-4 py-2 text-sm font-medium bg-vektrus-button text-gray-600 rounded-md hover:bg-vektrus-blue-light/80 transition-colors"
              >
                Heute
              </button>
              <div className="flex items-center space-x-3">
                <button
                    onClick={viewMode === 'week' ? previousWeek : previousMonth}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold text-vektrus-gray-dark">
                  {viewMode === 'week'
                      ? `KW ${getISOWeek(currentDate)}`
                      : format(currentDate, 'MMMM yyyy', { locale: de })}
                </h2>
                <button
                    onClick={viewMode === 'week' ? nextWeek : nextMonth}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                <button
                    onClick={() => setViewMode('week')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        viewMode === 'week'
                            ? 'bg-vektrus-button text-gray-600'
                            : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Woche
                </button>
                <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        viewMode === 'month'
                            ? 'bg-vektrus-button text-gray-600'
                            : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Monat
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {viewMode === 'week' ? (
              <WeeklyCalendar currentDate={currentDate} />
          ) : (
              <MonthlyCalendar currentDate={currentDate} />
          )}
        </div>
      </div>
  );
}
