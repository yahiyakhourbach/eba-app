import Feather from '@expo/vector-icons/Feather';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { useManageBooking } from '@/api/booking';
import { useEvent } from '@/api/event';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  showErrorMessage,
  Text,
  View,
} from '@/components/ui';
import { formatDate, useAuth } from '@/lib';

type BookingPressableProps = {
  event: number;
  isBooking: boolean;
};

function BookingPressable({ event, isBooking }: BookingPressableProps) {
  const [booked, setBooked] = useState<boolean>(isBooking);
  const { isPending, mutate } = useManageBooking();
  useEffect(() => setBooked(isBooking), [isBooking]);

  const handlePress = () => {
    if (!booked) {
      mutate(
        {
          data: { event: event },
          method: 'POST',
          url: '/api/bookings/',
        },
        {
          onSuccess: () => {
            setBooked(() => true);
            showMessage({
              message: 'event booked successfully',
              type: 'success',
            });
          },
          onError: (error) => {
            console.log('why its not ', error.response);
            const errordata =
              (error.response?.data as { error?: string })?.error ||
              'failed to book';
            showErrorMessage(errordata);
          },
        }
      );
    } else {
      mutate(
        {
          method: 'DELETE',
          url: `/api/bookings/${event}/`,
        },
        {
          onSuccess: () => {
            setBooked(() => false);
            showMessage({
              message: 'booking canceled successfully',
              type: 'success',
            });
          },
          onError: (error) => {
            const errordata = (error.response?.data as { error?: string })
              ?.error;
            showErrorMessage(errordata);
          },
        }
      );
    }
  };
  return (
    <Pressable disabled={isPending} onPress={handlePress}>
      <Text
        className={`my-2.5 w-fit rounded ${booked ? 'bg-red-400' : 'bg-green-500'} px-1 py-2 text-center text-lg font-medium text-white`}
      >
        {isPending && <ActivityIndicator />}
        {booked ? 'Cancel' : 'Book Now'}
      </Text>
    </Pressable>
  );
}

type MiniTypeProps = {
  location: { lat: number; lng: number };
};

const MiniMap = ({ location }: MiniTypeProps) => {
  return (
    <View style={{ height: 208, width: '100%', overflow: 'hidden' }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        className=""
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
        />
      </MapView>
    </View>
  );
};

export default function EventScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isModerator = useAuth.getState().token?.is_moderator;
  const { isPending, data, isError } = useEvent({
    variables: { id: id as string },
  });

  if (isPending) {
    return (
      <View className="flex items-center justify-center">
        <ActivityIndicator size={24} />
        <Text>Getting Data...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex items-center justify-center">
        <Text>Oops Something Went Wrong {':('}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="mx-2 flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <Pressable
        className="flex flex-row items-center gap-2"
        onPress={() => router.push('/')}
      >
        <Feather name="arrow-left-circle" size={18} color="black" />
        <Text className="font-semibold">Events</Text>
      </Pressable>
      <Text className="mb-2.5 mt-4 ">Event Details</Text>
      <Text className=" text-xl font-bold text-zinc-700">{data.title}</Text>
      <Text className="my-1.5 text-xl font-semibold text-zinc-700">
        {data.description}
      </Text>
      <View className="my-1.5 flex  flex-row justify-between">
        <Text className="text-lg font-semibold">
          reserved {`(${data.nbr_reserved})`}
        </Text>
        <Text className="text-lg font-semibold">
          capacity{`(${data.capacity})`}
        </Text>
      </View>
      <Text className="text-lg font-semibold">
        starts on: {formatDate(data.date)}
      </Text>
      <View className="flex flex-row flex-wrap items-center">
        <Text className="text-lg font-semibold">location : </Text>
        <Text className="text-lg font-semibold">{`${data.city} ${data.street} ${data.zipcode}`}</Text>
      </View>
      <MiniMap location={data.location} />
      {!isModerator && (
        <BookingPressable
          event={data.id}
          isBooking={data.isBooking as boolean}
        />
      )}
    </ScrollView>
  );
}
