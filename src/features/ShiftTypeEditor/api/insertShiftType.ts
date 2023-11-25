import { useRSPCContext, useRSPCMutation } from '@/lib/rspc';

export default function useInsertShiftType() {
  const context = useRSPCContext();

  return useRSPCMutation('shift_type.create', {
    onSuccess() {
      context.queryClient.invalidateQueries(['shift_type.all']);
    },
  });
}
