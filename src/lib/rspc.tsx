import { Procedures } from '@/types/generated/bindings';
import { createReactQueryHooks } from '@rspc/react';

const rspc = createReactQueryHooks<Procedures>();

export const {
  useQuery: useRSPCQuery,
  useMutation: useRSPCMutation,
  useContext: useRSPCContext,
  Provider,
} = rspc;
