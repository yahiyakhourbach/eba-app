import AntDesign from '@expo/vector-icons/AntDesign';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { useManageUpdateEvent } from '@/api/manage-event/use-manage-update-event';
import { getCoordinate } from '@/api/manage-event/utils';
import { type handleRef } from '@/components/add-event-from';
import {
  FocusAwareStatusBar,
  Pressable,
  ScrollView,
  Text,
} from '@/components/ui';
import { type updateEventFormProp } from '@/components/update-event-form';
import {
  UpdateEventForm,
  type updateFormType,
} from '@/components/update-event-form';

type ExtendFormData = updateFormType & {
  location: {
    lat: number;
    lng: number;
  };
};

// eslint-disable-next-line max-lines-per-function
export default function UpdateEvent() {
  const router = useRouter();
  const funcRef = useRef<handleRef>(null);
  const { id } = useLocalSearchParams();
  const { isPending, mutate } = useManageUpdateEvent();

  const onSubmit: updateEventFormProp['onSubmit'] = async (data) => {
    const fullLocation = {
      city: data.city,
      country: data.country,
      street: data.street,
      zipcode: data.zipcode,
    };
    const location = await getCoordinate(fullLocation);
    let extraData: ExtendFormData;
    if (location) {
      extraData = { ...data, location };
      mutate(
        { id: id as string, data: extraData },
        {
          onSuccess: () => {
            router.push('/(moderator)/');
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
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
        <Text className="my-2.5 text-xl font-bold"> Update Event</Text>
        <UpdateEventForm
          onSubmit={onSubmit}
          id={id as string}
          isPen={isPending}
          ref={funcRef}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
