import { format, parse, isValid } from 'date-fns';

export function formatPostDate(date: string, time: string): Date {
  const dateTimeString = `${date} ${time}`;
  const parsedDate = parse(dateTimeString, 'yyyy-MM-dd HH:mm', new Date());
  
  if (!isValid(parsedDate)) {
    throw new Error('Invalid date or time format');
  }
  
  return parsedDate;
}

export function getPostDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}