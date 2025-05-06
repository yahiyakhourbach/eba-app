import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { Pressable } from 'react-native-gesture-handler';

import { useEvents } from '@/api/event';
import { type EventType } from '@/api/event';
import SearchField from '@/components/search-field';
import { ActivityIndicator, Text, View } from '@/components/ui';

type EventCardProp = {
  item: EventType;
};

function EventCard({ item }: EventCardProp) {
  return (
    <Link href={`/event/${item.id}`} asChild>
      <Pressable>
        <View className="mx-4 my-3 rounded-lg border border-zinc-400 p-2">
          <Text className="mb-1.5  text-xl font-bold">{item.title}</Text>
          <Text className="mb-1.5 max-h-12 w-full font-semibold">
            {item.description}
          </Text>
          <View className="flex flex-row flex-wrap justify-between">
            <Text>date</Text>
            <Text>total reserved{`(${item.nbr_reserved})`}</Text>
            <Text>capacity {`(${item.capacity})`}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const EventsContainer = () => {
  const { data, isPending, isError, refetch, isRefetching } = useEvents();

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
      keyExtractor={(item) => item.id.toString()}
      onRefresh={refetch}
      refreshing={isRefetching}
      estimatedItemSize={10}
      renderItem={({ item }) => <EventCard item={item} />}
    />
  );
};

export default function Event() {
  return (
    <View className="flex-1">
      <SearchField />
      <EventsContainer />
    </View>
  );
};