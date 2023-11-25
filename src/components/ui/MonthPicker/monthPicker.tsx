import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/solid';
import {
  addMonths,
  addYears,
  endOfYear,
  format,
  isSameMonth,
  subMonths,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker-custom.css';

const today = new Date();
const minDate = new Date('2001-01-01');
const maxDate = endOfYear(addYears(today, 9));

export type MonthPickerProps = {
  date: Date;
  handleDate: (date: Date) => void;
};

export function MonthPicker({ date, handleDate }: MonthPickerProps) {
  return (
    <div className="my-1 flex items-center gap-2">
      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={() => handleDate(today)}
      >
        今月
      </button>
      <button
        type="button"
        className="btn btn-square btn-ghost btn-sm"
        disabled={isSameMonth(minDate, date)}
        onClick={() => {
          handleDate(subMonths(date, 1));
        }}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        className="btn btn-square btn-ghost btn-sm"
        disabled={isSameMonth(maxDate, date)}
        onClick={() => {
          handleDate(addMonths(date, 1));
        }}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
      <DatePicker
        className="flex h-8 w-32 items-center gap-1 bg-transparent p-1"
        popperClassName="z-10"
        selected={date}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(d) => {
          if (d) handleDate(d);
        }}
        showMonthYearPicker
        locale={ja}
        customInput={
          <button type="button" className="flex">
            <span>{format(date, 'yyyy年 MM月')}</span>
            <span className="ml-auto">
              <ChevronUpDownIcon className="h-4 w-4" />
            </span>
          </button>
        }
      />
    </div>
  );
}
