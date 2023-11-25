import { useRSPCQuery } from '@/lib/rspc';

export default function useGetShiftTypes() {
  return useRSPCQuery(['shift_type.all']);
}
