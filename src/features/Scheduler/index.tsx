import { useState } from 'react';
import { Scheduler as SchedulerComponent } from './components/scheduler';
import useScheduler from './hooks/useScheduler';

export default function Scheduler() {
  const [date, setDate] = useState(new Date());
  const { users, shiftTypes } = useScheduler();

  const handleDate = (d: Date) => {
    setDate(d);
  };

  return (
    <SchedulerComponent
      date={date}
      handleDate={handleDate}
      users={users}
      shiftTypes={shiftTypes}
    />
  );
}
