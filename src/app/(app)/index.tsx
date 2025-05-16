import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { Pressable } from 'react-native-gesture-handler';

import { useEvents } from '@/api/event';
import { type EventType } from '@/api/event';
import SearchField from '@/components/search-field';
import { ActivityIndicator, Text, View } from '@/components/ui';
import { useSearchEventStor } from '@/lib/event';

type EventCardProp = {
  item: EventType;
};

const EventCard = ({ item }: EventCardProp) => {
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
};

const EventsContainer = () => {
  const search = useSearchEventStor((state) => state.search);
  const { data, isPending, isError, refetch, isRefetching } = useEvents({
    variables: { search },
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
        <Text> couldn't find event with this title {':('}</Text>
      </View>
    );
  }
  return (
    <FlashList
      ListEmptyComponent={() => (
        <Text className="my-12 flex-1 justify-center self-center">
          There is no Events for now
        </Text>
      )}
      data={data}
      ListHeaderComponent={() => (
        <Text className="mx-3.5 text-xl font-bold">Events</Text>
      )}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={refetch}
      refreshing={isRefetching}
      estimatedItemSize={10}
      renderItem={({ item }) => <EventCard item={item} />}
    />
  );
};

export default function Events() {
  return (
    <View className="flex-1">
      <SearchField />
      <EventsContainer />
    </View>
  );
}
