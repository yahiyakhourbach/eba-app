import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { useAuth } from '@/lib';

import { client } from '../common';

type Variables = {
  id: string;
};

type Response = void;

export const useManageDeleteEvent = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const access = useAuth.getState().token?.access;
    const response = await client({
      method: 'DELETE',
      url: `/api/events/manage/${variables.id}/`,
      headers: {
        Authorization: 'JWT ' + access,
      },
    });
    return response.data;
  },
});
