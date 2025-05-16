import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { useAuth } from '@/lib';

import { client } from '../common';
import {
  type EventManageType,
  type UpdateEventManageTypeVariables,
} from './types';

type Variables = {
  id: string;
  data: UpdateEventManageTypeVariables;
};

type Response = EventManageType;

export const useManageUpdateEvent = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const access = useAuth.getState().token?.access;
    const response = await client({
      method: 'PATCH',
      url: `/api/events/manage/${variables.id}/`,
      headers: {
        Authorization: 'JWT ' + access,
      },
      data: variables.data,
    });
    return response.data;
  },
});
