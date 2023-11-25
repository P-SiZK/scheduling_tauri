import { useRSPCQuery } from '@/lib/rspc';

export default function useGetUsers() {
  return useRSPCQuery(['user.all']);
}
