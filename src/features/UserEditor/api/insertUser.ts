import { useRSPCContext, useRSPCMutation } from '@/lib/rspc';

export default function useInsertUser() {
  const context = useRSPCContext();

  return useRSPCMutation('user.create', {
    onSuccess() {
      context.queryClient.invalidateQueries(['user.all']);
    },
  });
}
