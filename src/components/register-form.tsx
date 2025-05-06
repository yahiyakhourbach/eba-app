import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'moti';
import { useForm } from 'react-hook-form';
import { type SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput } from './ui';
import { Text } from './ui';
import { ControlledSwitch } from './ui/controlled-switch';
const password = z
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
  );

const schema = z.object({
  firstname: z.string({
    required_error: 'firstname is required',
  }),
  lastname: z.string({
    required_error: 'lastname is required',
  }),
  username: z
    .string({
      required_error: 'username is required',
    })
    .min(5, 'username too short it should be at least 5 characters')
    .regex(/^\S+$/, 'username should not contain the spaces'),
  email: z
    .string({
      required_error: 'email is required.',
    })
    .email('invalid email format'),
  isModerator: z.boolean().default(false),
  password: password,
  password2: password,
});

export type RegisterFormType = z.infer<typeof schema>;

export type RegisterFormProps = {
  onSubmit: SubmitHandler<RegisterFormType>;
  isPending: boolean;
  errorMsg: string;
}

export const RegisterForm = ({
  onSubmit = () => {},
  isPending,
  errorMsg,
}: RegisterFormProps) => {
  const { handleSubmit, control } = useForm<RegisterFormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="mx-2 mb-6">
      <ControlledInput control={control} name="firstname" label="Firstname" />
      <ControlledInput control={control} name="lastname" label="Lastname" />
      <ControlledInput control={control} name="username" label="Username" />
      <ControlledInput control={control} name="email" label="Email" />
      <ControlledInput
        control={control}
        name="password"
        label="Password"
        secureTextEntry
        placeholder="****"
      />
      <ControlledInput
        control={control}
        name="password2"
        label="Confirm Password"
        secureTextEntry
        placeholder="****"
      />
      <ControlledSwitch
        name="isModerator"
        onActiveColor="#fff"
        onDisableColor="#6B7280"
        containerOnActive="#4CAF50"
        containerOnDisabled="#D1D5DB"
        control={control}
        label={`yes i'm a moderator`}
      />
      {errorMsg && (
        <Text className="my-2 text-xl font-medium text-red-500">
          {errorMsg}
        </Text>
      )}
      <Button
        disabled={isPending}
        className="mt-4"
        label="Register"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}
