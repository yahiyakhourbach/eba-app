import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { useLogin } from '@/api/auth';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Login() {
  const [errorMsg, setErrors] = useState<string>('');
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { mutate, isPending } = useLogin();
  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        signIn(response);
        if (response.is_moderator) {
          router.push('/(moderator)/');
        } else {
          router.push('/(app)/');
        }
      },
      onError: (errors) => {
        if (errors.response?.data) setErrors('invalid credentials');
      },
    });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm
        onSubmit={onSubmit}
        isPending={isPending}
        errorMsg={errorMsg}
      />
    </>
  );
}
