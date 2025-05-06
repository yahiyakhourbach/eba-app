import Feather from '@expo/vector-icons/Feather';
import { TextInput } from 'react-native';

import { View } from '@/components/ui';

export default function SearchField() {
  return (
    <View className="m-3 flex h-12 flex-row items-center gap-2 rounded-xl border border-zinc-500 p-2">
      <TextInput
        className="h-full flex-1 overflow-hidden"
        placeholder="look for an event"
        multiline={false}
      />
      <Feather name="search" size={18} color="black" />
    </View>
  );
}
