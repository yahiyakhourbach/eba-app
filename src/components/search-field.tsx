import Feather from '@expo/vector-icons/Feather';
import { useDeferredValue, useEffect, useState } from 'react';
import { TextInput } from 'react-native';

import { View } from '@/components/ui';
import { useSearchEventStor } from '@/lib/event';

export default function SearchField() {
  const [value, setValue] = useState<string>('');
  const deferredValue = useDeferredValue(value);
  const setSearch = useSearchEventStor((state) => state.setSearch);

  useEffect(() => {
    if (value === '') {
      setSearch('');
    } else if (deferredValue) {
      setSearch(deferredValue);
    }
  }, [value, deferredValue, setSearch]);

  return (
    <View className="m-3 flex h-12 flex-row items-center gap-2 rounded-xl border border-zinc-500 p-2">
      <TextInput
        className="h-full flex-1 overflow-hidden"
        placeholder="look for an event"
        value={value}
        onChangeText={(text) => setValue(text)}
        multiline={false}
      />
      <Feather name="search" size={18} color="black" />
    </View>
  );
}
