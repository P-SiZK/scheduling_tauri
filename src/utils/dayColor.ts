import { getDay } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const dayColor = (date: Date) => {
  switch (getDay(date)) {
    case 0:
      return 'text-red-700';
    case 6:
      return 'text-blue-600';
    default:
      return '';
  }
};
