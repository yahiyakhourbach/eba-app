import { type AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { useAuth } from '@/lib';

import { client } from '../common';
import { type EventManageType } from './types';

type Variables = { id: string };
type Response = EventManageType;

export const useManageEvent = createQuery<Response, Variables, AxiosError>({
  queryKey: ['manageEvents'],
  fetcher: (variables) => {
    const access = useAuth.getState().token?.access;
    return client({
      method: 'GET',
      url: `/api/events/manage/${variables.id}/`,
      headers: {
        Authorization: `JWT ${access}`,
      },
    }).then((res) => res.data);
  },
});
