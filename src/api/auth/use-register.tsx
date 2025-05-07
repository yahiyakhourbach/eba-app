import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { type RegisterFormType } from '@/components/register-form';

import { client } from '../common';
import { type RegisterResponse } from './types';

export const useRegister = createMutation<
  RegisterResponse,
  RegisterFormType,
  AxiosError
>({
  mutationFn: async (variables) =>
    client({
      method: 'POST',
      url: '/api/auth/register/',
      data: variables,
    }).then((res) => res.data),
});
