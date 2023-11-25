import { ShiftDate } from '@/types/shiftDate';
import { ShiftType } from '@/types/shiftType';
import { User } from '@/types/user';

export type { ShiftDate, ShiftType };

export type UserID = User['id'];
export type ShiftTypes = ShiftType[];
export type ShiftDates = ShiftDate[];
