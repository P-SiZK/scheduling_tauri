'use client';

import { Procedures } from '@/types/generated/bindings';
import { Client, createClient } from '@rspc/client';
import { Loading } from '@/components/ui/Loading';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Provider } from './rspc';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function RSPCProvider({
  children,
}: React.PropsWithChildren) {
  const [client, setClient] = useState<Client<Procedures>>();

  useEffect(() => {
    (async () => {
      const { TauriTransport } = await import('@rspc/tauri');
      const c = createClient<Procedures>({
        transport: new TauriTransport(),
      });
      setClient(c);
    })();
  }, []);

  if (typeof client === 'undefined') return <Loading />;

  return (
    <Provider client={client} queryClient={queryClient}>
      {/* see this issue: https://github.com/oscartbeaumont/rspc/issues/107 */}
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <>{children}</>
    </Provider>
  );
}
