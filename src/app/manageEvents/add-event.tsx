import AntDesign from '@expo/vector-icons/AntDesign';
import { Stack, useRouter } from 'expo-router';
import { useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { useManageAddEvent } from '@/api/manage-event';
import { getCoordinate } from '@/api/manage-event/utils';
import { type handleRef } from '@/components/add-event-from';
import { type AddEventFormProp } from '@/components/add-event-from';
import { AddEventForm, type FormType } from '@/components/add-event-from';
import {
  FocusAwareStatusBar,
  Pressable,
  ScrollView,
  Text,
} from '@/components/ui';

type ExtendFormData = FormType & {
  location: {
    lat: number;
    lng: number;
  };
};

export default function AddEvent() {
  const router = useRouter();
  const funcRef = useRef<handleRef>(null);
  const { isPending, mutate } = useManageAddEvent();

  const onSubmit: AddEventFormProp['onSubmit'] = async (data) => {
    const fullLocation = {
      city: data.city,
      country: data.country,
      street: data.street,
      zipcode: data.zipcode,
    };
    const location = await getCoordinate(fullLocation);
    let extraData: ExtendFormData | null = null;
    if (location) {
      extraData = { ...data, location };
      mutate(extraData, {
        onSuccess: () => {
          router.push('/(moderator)/');
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } else {
      funcRef.current?.setError('country', {
        type: 'manual',
        message: 'invalid location',
      });
      funcRef.current?.setError('city', {
        type: 'manual',
        message: 'invalid location',
      });
      funcRef.current?.setError('street', {
        type: 'manual',
        message: 'invalid location',
      });
      funcRef.current?.setError('zipcode', {
        type: 'manual',
        message: 'invalid location',
      });
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <FocusAwareStatusBar />
      <ScrollView className="mx-2 flex-1">
        <Stack.Screen options={{ headerShown: false }} />
        <Pressable
          className="my-2 flex flex-row items-center gap-2"
          onPress={() => router.push('/(moderator)/')}
        >
          <AntDesign name="leftcircleo" size={24} color="black" />
          <Text> Dashboard </Text>
        </Pressable>
        <Text className="my-2.5 text-xl font-bold"> Add Event</Text>
        <AddEventForm onSubmit={onSubmit} isPending={isPending} ref={funcRef} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
