import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form';

import { Pressable, Text, View } from '@/components/ui';

type SwitchControlProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  onActiveColor: string;
  onDisableColor: string;
  containerOnActive: string;
  containerOnDisabled: string;
  label?: string;
};

export const ControlledSwitch = <T extends FieldValues>(
  props: SwitchControlProps<T>
) => {
  const {
    name,
    control,
    onActiveColor,
    onDisableColor,
    containerOnDisabled,
    containerOnActive,
    label,
  } = props;
  const { field } = useController({ name, control });

  return (
    <Pressable
      className="my-2 flex flex-row gap-2"
      onPress={() => field.onChange(!field.value)}
    >
      <View
        style={{
          backgroundColor: field.value
            ? containerOnActive
            : containerOnDisabled,
        }}
        className="flex h-6  w-12 justify-center rounded-xl  "
      >
        <View
          style={{
            backgroundColor: field.value ? onActiveColor : onDisableColor,
          }}
          className={`size-4 ${field.value ? 'translate-x-7' : 'translate-x-1'} rounded-full transition-all duration-300`}
        ></View>
      </View>
      {label && <Text>{label}</Text>}
    </Pressable>
  );
};
