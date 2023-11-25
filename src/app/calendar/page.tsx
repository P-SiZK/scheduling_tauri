'use client';

import { Calendar } from '@/features/Calendar';
import { useRSPCQuery } from '@/lib/rspc';
import { useState } from 'react';

export default function Home() {
  const { data: users = [] } = useRSPCQuery(['user.all']);
  const [userId, setUserId] = useState('');

  return (
    <main>
      <select
        className="select select-sm h-8 w-60"
        required
        value={userId}
        onChange={(e) => {
          setUserId(e.currentTarget.value);
        }}
      >
        <option disabled hidden value="">
          ユーザーを選択してください
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {userId && <Calendar userId={userId} />}
    </main>
  );
}
