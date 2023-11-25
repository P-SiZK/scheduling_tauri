import { useRSPCQuery } from '@/lib/rspc';

type UseGetShiftDatesOptions = {
  userId: string;
};

export default function useGetShiftDates({
  userId,
}: UseGetShiftDatesOptions) {
  return useRSPCQuery([
    'shift_date.get_by_user_id',
    { user_id: userId },
  ]);
}
