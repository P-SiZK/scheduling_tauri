import { useRSPCQuery } from '@/lib/rspc';

export default function useGetUsers() {
  return useRSPCQuery(['user.all_with_shift_date']);
}
