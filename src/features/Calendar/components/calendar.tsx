import { MonthPicker } from '@/components/ui/MonthPicker';
import { TitledModal } from '@/components/ui/TitledModal';
import { isSameDay } from 'date-fns';
import { useState } from 'react';
import { ShiftDate, ShiftDates, ShiftTypes } from '../types';
import { CalendarTable } from './calendarTable';
import { RegisterShiftDate } from './registerShiftDate';

export type CalendarProps = {
  shiftDates: ShiftDates;
  shiftTypes: ShiftTypes;
  handleUpsertShiftDate: (
    date: Date,
    shiftTypeId: ShiftDate['shiftTypeId']
  ) => void;
  handleDeleteShiftDate: (date: Date) => void;
};

export function Calendar({
  shiftDates,
  shiftTypes,
  handleUpsertShiftDate,
  handleDeleteShiftDate,
}: CalendarProps) {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [editDate, setEditDate] = useState(new Date());

  const handleClickShiftDate = (d: Date) => {
    setEditDate(d);
    setOpenModal(true);
  };

  const handleRegister = (shiftTypeId: ShiftDate['shiftTypeId']) => {
    handleUpsertShiftDate(editDate, shiftTypeId);
    setOpenModal(false);
  };

  return (
    <div>
      <MonthPicker date={date} handleDate={setDate} />
      <CalendarTable
        date={date}
        shiftDates={shiftDates}
        shiftTypes={shiftTypes}
        handleClickShiftDate={handleClickShiftDate}
        handleDeleteShiftDate={handleDeleteShiftDate}
      />
      <TitledModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title={editDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short',
        })}
      >
        <RegisterShiftDate
          shiftTypes={shiftTypes}
          handleRegister={handleRegister}
          editValues={shiftDates.find(({ date: d }) =>
            isSameDay(editDate, d)
          )}
        />
      </TitledModal>
    </div>
  );
}
