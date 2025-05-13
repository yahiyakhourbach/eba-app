import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { type TokenType } from '@/lib/auth/utils';

import { client } from '../common';
import { type Variables } from './types';

export const useLogin = createMutation<TokenType, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const response = await client({
      method: 'POST',
      url: '/api/auth/login/',
      data: variables,
    }).then((res) => res.data);
    return response;
  },
});
