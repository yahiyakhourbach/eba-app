import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import {
  type EventManageType,
  useManageDeleteEvent,
  useManageEvents,
} from '@/api/manage-event';
import { ActivityIndicator, Pressable, Text, View } from '@/components/ui';
import { useAuth } from '@/lib';

function formatNumbers(number: number): string {
  if (number >= 1_000_000_000)
    return number.toFixed(1).replace('/.0/', '') + 'B';
  if (number >= 1_000_000) return number.toFixed(1).replace('/.0/', '') + 'M';
  if (number >= 1_000) return number.toFixed(1).replace('/.0/', '') + 'K';
  return number.toString();
}

type eventActionsProp = {
  item: EventManageType;
  refetch: any;
};

// eslint-disable-next-line max-lines-per-function
function EventActions({ item, refetch }: eventActionsProp) {
  const router = useRouter();
  const { isPending, mutate } = useManageDeleteEvent();
  const handleSee = () => {
    router.push(`/event/${item.id}`);
  };
  const handlePopUp = () => {
    Alert.alert(
      'Delete Event', // Title
      'Are you sure you want to delete this event?', // Message
      [
        {
          text: 'Cancel', // Cancel button
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            mutate(
              { id: item.id.toString() },
              {
                onSuccess: () => {
                  refetch();
                },
              }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View className="my-2 flex flex-row  items-center justify-between">
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="max-w-[70%] overflow-hidden text-lg font-bold"
      >
        {item.title}
      </Text>
      <View className="flex flex-row gap-2">
        <Pressable
          className="rounded-md bg-blue-500 px-1 py-0.5"
          onPress={() => {
            router.navigate({
              pathname: '/manageEvents/update-event',
              params: { id: item.id }, // This goes in query, not in path
            });
          }}
        >
          <Text className="text-white">update</Text>
        </Pressable>
        <Pressable
          className="rounded-md bg-indigo-500 px-1 py-0.5"
          onPress={handleSee}
        >
          <Text className="text-white">see</Text>
        </Pressable>
        <Pressable
          className="rounded-md bg-red-500 px-1 py-0.5"
          onPress={() => handlePopUp()}
        >
          <Text className="text-white">
            {isPending ? <ActivityIndicator size={15} /> : 'delete'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function Events() {
  const { isPending, data, isError, refetch } = useManageEvents();
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
    <FlashList
      data={data}
      estimatedItemSize={100}
      ListHeaderComponent={() => (
        <Text className="mx-3.5 my-2.5 font-bold">All Events</Text>
      )}
      ListEmptyComponent={() => (
        <Text className="text-center font-bold">No Event Created So Far</Text>
      )}
      renderItem={({ item }) => <EventActions refetch={refetch} item={item} />}
    />
  );
}

export default function Dashboard() {
  const username = useAuth.use.token()?.username;
  const router = useRouter();
  return (
    <View className="mx-2 flex-1">
      <Text className="mb-2.5 text-3xl font-bold">Dashboard</Text>
      <View className="mx-3 mb-3 flex flex-row items-center">
        <Text className="text-lg font-bold">Welcome </Text>
        <Text className="text-lg font-semibold">{username}</Text>
      </View>
      <View className="mx-3  flex flex-row gap-2 ">
        <View className="w-[48%] rounded-md bg-zinc-200 p-2 ">
          <Text className="font-bold">all time users</Text>
          <Text className=" self-end px-2 text-lg font-semibold">
            {formatNumbers(12)}
          </Text>
        </View>
        <View className="flex w-[48%] rounded-md bg-zinc-200 p-2">
          <Text className="font-bold">all events</Text>
          <Text className=" self-end px-2 text-lg font-semibold">
            {formatNumbers(12)}
          </Text>
        </View>
      </View>
      <View className="mx-3.5 mt-3.5 flex flex-row flex-wrap justify-center gap-2 ">
        <View className="w-[38%] rounded-md bg-green-500 py-2">
          <Pressable onPress={() => router.push('/manageEvents/add-event')}>
            <Text className="text-center text-lg font-bold text-white ">
              Add Event
            </Text>
          </Pressable>
        </View>
      </View>
      <Events />
    </View>
  );
}
