import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { useAuth } from '@/lib';

import { client } from '../common';
import { type EventManageType, type EventManageTypeVariables } from './types';

type Variables = EventManageTypeVariables;

type Response = EventManageType;

export const useManageAddEvent = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const access = useAuth.getState().token?.access;
    const response = await client({
      method: 'POST',
      url: '/api/events/manage/',
      headers: {
        Authorization: 'JWT ' + access,
      },
      data: variables,
    });
    return response.data;
  },
});
