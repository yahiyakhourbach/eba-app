import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { useAuth } from '@/lib';

import { client } from '../common';
import { type EventType } from './types';

type Response = EventType[];
type Variables = { search: string };

export const useEvents = createQuery<Response, Variables, AxiosError>({
  queryKey: ['events'],
  fetcher: ({ search }) => {
    const token = useAuth.getState().token;
    return client
      .get('/api/events/', {
        headers: {
          Authorization: 'JWT ' + token?.access,
        },
        params: { search: search },
      })
      .then((res) => res.data);
  },
});
