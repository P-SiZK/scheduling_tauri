import { useRSPCContext, useRSPCMutation } from '@/lib/rspc';

export default function useDeleteUser() {
  const context = useRSPCContext();

  return useRSPCMutation('user.delete', {
    onSuccess() {
      context.queryClient.invalidateQueries(['user.all']);
    },
  });
}
