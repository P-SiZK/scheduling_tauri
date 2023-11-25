import { useRSPCContext, useRSPCMutation } from '@/lib/rspc';

export default function useUpdateUser() {
  const context = useRSPCContext();

  return useRSPCMutation('user.update', {
    onSuccess() {
      context.queryClient.invalidateQueries(['user.all']);
    },
  });
}
