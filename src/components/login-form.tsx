import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import {
  Button,
  ControlledInput,
  Pressable,
  Text,
  View,
} from '@/components/ui';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, ' it should contain at least uppercase letter')
    .regex(/[a-z]/, 'it should contain at least lowercase letter')
    .regex(/\d/, 'it should contain at least one number')
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>/?]+/,
      'it should contain at least one special character'
    ),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isPending: boolean;
  errorMsg: string;
};

export const LoginForm = ({
  onSubmit = () => {},
  isPending,
  errorMsg,
}: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            Sign In
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            Welcome to EBA app where you can book events of your favorite
            celebrities.
          </Text>
        </View>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="***"
          secureTextEntry={true}
        />
        {errorMsg && (
          <Text className="my-2 text-xl font-semibold text-red-500">
            {errorMsg}
          </Text>
        )}
        <Button
          disabled={isPending}
          testID="login-button"
          label="Login"
          onPress={handleSubmit(onSubmit)}
        />
        <Pressable onPress={() => router.replace('/register')}>
          <Text className="my-2 rounded-lg bg-gray-300 py-2 text-center text-lg font-semibold text-neutral-700">
            Register{' '}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};
