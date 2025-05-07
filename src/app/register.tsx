import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { useRegister } from '@/api/auth/use-register';
import {
  RegisterForm,
  type RegisterFormProps,
} from '@/components/register-form';
import {
  FocusAwareStatusBar,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@/components/ui';

export default function Register() {
  const { isPending, mutate } = useRegister();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const router = useRouter();
  const handleSubmit: RegisterFormProps['onSubmit'] = (data) => {
    mutate(data, {
      onSuccess: () => {
        router.replace('/registration-success');
      },
      onError: (errors) => {
        if (errors.response?.data)
          setErrorMsg(() => 'Error failed to Register');
      },
    });
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <FocusAwareStatusBar />
      <ScrollView className="flex-1">
        <Pressable className="ml-2 flex flex-row items-center gap-2">
          <AntDesign name="leftcircleo" size={24} color="black" />
          <Text className="text-base font-medium ">Login</Text>
        </Pressable>
        <View className="my-6">
          <Text className="mb-3 text-center text-xl font-bold">Register</Text>
          <Text className="mx-2 text-center">
            you can register as a regular user or as a moderator creating your
            events for your clients.
          </Text>
        </View>
        <RegisterForm
          onSubmit={handleSubmit}
          isPending={isPending}
          errorMsg={errorMsg}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
