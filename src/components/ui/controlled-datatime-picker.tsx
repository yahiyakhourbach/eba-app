import React, { useState } from 'react';
import { type Control, Controller } from 'react-hook-form';
import { Button, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  control: Control<any>;
  name: string;
  label?: string;
};

const ControlledDatePicker: React.FC<Props> = ({ control, name, label }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginVertical: 10 }}>
          {label && <Text>{label}</Text>}

          <Button
            title={value ? value.toLocaleString() : 'Select date and time'}
            onPress={showDatePicker}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            date={value || new Date()}
            onConfirm={(date) => {
              onChange(date);
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
          />

          {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default ControlledDatePicker;
