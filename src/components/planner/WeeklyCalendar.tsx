import React, {useEffect} from 'react';
import PostCard from './PostCard';
import PostModal from '../modal/PostModal';
import { usePostModal } from '../../hooks/usePostModal';
import { usePostContext } from '../../context/PostContext';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import type { PostUpdate } from '../../types/post';

interface WeeklyCalendarProps {
  currentDate: Date;
}

export default function WeeklyCalendar({ currentDate }: WeeklyCalendarProps) {
  const { posts, updatePost } = usePostContext();

  useEffect(() => {
    console.log('Posts im Kalender:', posts);
  }, [posts]);

  const { isOpen, selectedPost, openModal, closeModal } = usePostModal();

  const today = new Date();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => {
    const dateObj = addDays(weekStart, i);
    return {
      dateObj,
      formattedDate: format(dateObj, 'dd.MM.'),
      day: format(dateObj, 'EEE', { locale: de }),
    };
  });

  const handleUpdatePost = (id: number, updates: PostUpdate) => {
    updatePost(id, updates);
    closeModal();
  };

  return (
      <>
        <div className="grid grid-cols-7 flex-1 divide-x divide-gray-200">
          {days.map(({ dateObj, formattedDate, day }) => {
            const isToday = isSameDay(dateObj, today);

            return (
                <div key={formattedDate} className="min-h-[600px]">
                  <div className="px-4 py-3 text-center border-b border-gray-200">
                    <div
                        className={`mx-auto p-2 ${
                            isToday
                                ? 'bg-vektrus-button rounded-full w-16 h-16 flex flex-col items-center justify-center'
                                : ''
                        }`}
                    >
                      <div className="font-medium text-gray-900">{day}</div>
                      <div className="text-sm text-gray-500 mt-1">{formattedDate}</div>
                    </div>
                  </div>
                  <div className="p-2">
                    {posts
                        .filter((post) =>
                            isSameDay(new Date(post.date), dateObj)
                        )
                        .map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onClick={openModal}
                            />
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
