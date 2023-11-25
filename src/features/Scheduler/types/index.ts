import { ShiftDate } from '@/types/shiftDate';
import { ShiftType } from '@/types/shiftType';
import { User as UserWithoutShiftDates } from '@/types/user';

export type { ShiftDate, ShiftType };

export type ShiftTypes = ShiftType[];
export type ShiftDates = ShiftDate[];
export type User = UserWithoutShiftDates & { shiftDates: ShiftDates };
export type Users = User[];
