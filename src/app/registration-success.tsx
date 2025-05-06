import { useRouter } from 'expo-router';
import { Pressable } from 'react-native-gesture-handler';

import { Text, View } from '@/components/ui';

export default function RegistrationSuccess() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-2.5 text-3xl font-bold">Welcome To Eba</Text>
      <Text className="mb-2.5 text-center text-lg">
        your account has been created successfully.
      </Text>
      <Pressable onPress={() => router.replace('/login')}>
        <Text className="text-lg font-semibold text-indigo-400">
          {' '}
          Go To SignIn
        </Text>
      </Pressable>
    </View>
  );
}
