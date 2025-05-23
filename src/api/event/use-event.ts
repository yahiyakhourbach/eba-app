import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { useAuth } from '@/lib';

import { client } from '../common';
import { type EventType } from './types';

type Response = EventType;
type Variables = {
  id: string;
};

export const useEvent = createQuery<Response, Variables, AxiosError>({
  queryKey: ['events'],
  fetcher: (variables) => {
    const token = useAuth.getState().token;
    return client
      .get(`/api/events/${variables.id}/`, {
        headers: {
          Authorization: 'JWT ' + token?.access,
        },
      })
      .then((res) => res.data);
  },
});
