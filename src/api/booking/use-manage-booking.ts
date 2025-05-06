import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { useAuth } from '@/lib';

import { client } from '../common';

type Response = void;

type Variables = {
  method: 'POST' | 'DELETE';
  data?: { event: number };
  url: string;
};

export const useManageBooking = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: async (variables) => {
      const token = useAuth.getState().token;
      const response = await client({
        method: variables.method,
        url: variables.url,
        data: variables.data,
        headers: {
          Authorization: `JWT ${token?.access}`,
        },
      });
      return response.data;
    },
  }
);
