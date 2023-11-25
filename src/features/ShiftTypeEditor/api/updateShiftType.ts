import { useRSPCContext, useRSPCMutation } from '@/lib/rspc';

export default function useUpdateShiftType() {
  const context = useRSPCContext();

  return useRSPCMutation('shift_type.update', {
    onSuccess() {
      context.queryClient.invalidateQueries(['shift_type.all']);
    },
  });
}
