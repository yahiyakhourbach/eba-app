import { type AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { useAuth } from '@/lib';

import { client } from '../common';
import { type EventManageType } from './types';

type Variables = void;
type Response = EventManageType[];

export const useManageEvents = createQuery<Response, Variables, AxiosError>({
  queryKey: ['manageEvents'],
  fetcher: () => {
    const access = useAuth.getState().token?.access;
    return client({
      url: '/api/events/manage/',
      headers: {
        Authorization: `JWT ${access}`,
      },
    }).then((res) => res.data);
  },
});
