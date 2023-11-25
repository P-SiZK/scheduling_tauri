import { useRSPCContext, useRSPCMutation } from '@/lib/rspc';

export default function useUpsertShiftDate() {
  const context = useRSPCContext();

  return useRSPCMutation('shift_date.upsert', {
    onSuccess() {
      context.queryClient.invalidateQueries([
        'shift_date.get_by_user_id',
      ]);
    },
  });
}
