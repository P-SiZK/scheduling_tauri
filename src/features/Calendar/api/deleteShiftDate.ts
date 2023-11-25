import { useRSPCContext, useRSPCMutation } from '@/lib/rspc';

export default function useDeleteShiftDate() {
  const context = useRSPCContext();

  return useRSPCMutation('shift_date.delete', {
    onSuccess() {
      context.queryClient.invalidateQueries([
        'shift_date.get_by_user_id',
      ]);
    },
  });
}
