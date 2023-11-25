'use client';

import { UnlistenFn, listen } from '@tauri-apps/api/event';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useWindowMenuListen() {
  const router = useRouter();

  useEffect(() => {
    const unlistenFunctions: UnlistenFn[] = [];

    (async () => {
      unlistenFunctions.push(
        await listen('schedule', async () => {
          await router.push('/');
        }),
        await listen('calendar', async () => {
          await router.push('/calendar');
        }),
        await listen('user', async () => {
          await router.push('/users');
        }),
        await listen('shift_type', async () => {
          await router.push('/shifttypes');
        })
      );
    })();

    return () => {
      unlistenFunctions.forEach((unlistenFunction) => {
        unlistenFunction();
      });
    };
  }, [router]);
}
