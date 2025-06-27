import React from 'react';
import PostCard from './PostCard';
import PostModal from '../modal/PostModal';
import { usePostModal } from '../../hooks/usePostModal';
import { usePostContext } from '../../context/PostContext';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  isSameDay
} from 'date-fns';
import { de } from 'date-fns/locale';
import type { PostUpdate } from '../../types/post';

interface MonthlyCalendarProps {
  currentDate: Date;
}

export default function MonthlyCalendar({ currentDate }: MonthlyCalendarProps) {
  const { posts, updatePost } = usePostContext();
  const { isOpen, selectedPost, openModal, closeModal } = usePostModal();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 })
  }).map(date => format(date, 'EEE', { locale: de }));

  const getPostsForDay = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), post.day);
      return isSameDay(postDate, date);
    });
  };

  const today = new Date();

  const handleUpdatePost = (id: number, updates: PostUpdate) => {
    updatePost(id, updates);
    closeModal();
  };

  return (
      <>
        <div className="grid grid-cols-7 flex-1">
          {daysOfWeek.map((day) => (
              <div key={day} className="border-b border-r border-gray-200 p-2 text-center">
                <span className="text-sm font-medium text-gray-600">{day}</span>
              </div>
          ))}

          {calendarDays.map((date) => {
            const dayPosts = getPostsForDay(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isToday = isSameDay(date, today);

            return (
                <div
                    key={date.toISOString()}
                    className={`border-b border-r border-gray-200 min-h-[120px] p-2 ${
                        !isCurrentMonth ? 'bg-gray-50' : ''
                    }`}
                >
                  {/* Datum oben links, bei heute in einem Kreis */}
                  <div className="mb-2">
                    {isToday ? (
                        <div className="w-6 h-6 rounded-full bg-vektrus-button text-sm flex items-center justify-center text-gray-900">
                          {format(date, 'd', { locale: de })}
                        </div>
                    ) : (
                        <span className={`text-sm ${
                            isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                        {format(date, 'd', { locale: de })}
                      </span>
                    )}
                  </div>

                  {/* Tagesposts */}
                  <div className="space-y-1">
                    {dayPosts.map((post) => (
                        <button
                            key={post.id}
                            onClick={() => openModal(post)}
                            className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                                post.status === 'approved' ? 'bg-green-500' : 'bg-orange-500'
                            }`} />
                            <span className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-vektrus-blue transition-colors">
                              {post.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 ml-4">
                            {post.time}
                          </span>
                        </button>
                    ))}
                  </div>
                </div>
            );
          })}
        </div>

        {selectedPost && (
            <PostModal
                post={selectedPost}
                isOpen={isOpen}
                onClose={closeModal}
                onSave={handleUpdatePost}
            />
        )}
      </>
  );
}
