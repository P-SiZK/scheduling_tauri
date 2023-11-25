import { useRSPCContext, useRSPCMutation } from '@/lib/rspc';

export default function useDeleteShiftType() {
  const context = useRSPCContext();

  return useRSPCMutation('shift_type.delete', {
    onSuccess() {
      context.queryClient.invalidateQueries(['shift_type.all']);
    },
  });
}
