import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  type SubmitHandler,
  useForm,
  type UseFormSetError,
} from 'react-hook-form';
import * as z from 'zod';

import { useManageEvent } from '@/api/manage-event';
import {
  ActivityIndicator,
  Button,
  ControlledInput,
  Text,
  View,
} from '@/components/ui';
import ControlledDatePicker from '@/components/ui/controlled-datatime-picker';

const scheme = z.object({
  title: z.string({
    required_error: 'title is required',
  }),
  description: z.string({
    required_error: 'description is required',
  }),
  date: z
    .date({
      required_error: 'date is required',
    })
    .min(new Date(), { message: 'Date must be in the future' }),
  city: z.string({
    required_error: 'city is required',
  }),
  street: z.string({
    required_error: 'street is required',
  }),
  country: z.string({
    required_error: 'country is required',
  }),
  zipcode: z.coerce.number({
    required_error: 'zipCode is required',
  }),
  capacity: z
    .string({
      required_error: 'capacity is required',
    })
    .regex(/\d/, 'it should be a number'),
});

export type updateFormType = z.infer<typeof scheme>;

export type updateEventFormProp = {
  onSubmit: SubmitHandler<updateFormType>;
  isPen: boolean;
  id: string;
};

export interface handleRef {
  setError: UseFormSetError<updateFormType>;
}

export const UpdateEventForm = forwardRef<handleRef, updateEventFormProp>(
  // eslint-disable-next-line max-lines-per-function
  ({ onSubmit = () => {}, isPen, id }, ref) => {
    console.log(id);
    const { isPending, data } = useManageEvent({ variables: { id: id } });
    const { control, handleSubmit, setError, reset } = useForm<updateFormType>({
      resolver: zodResolver(scheme),
    });
    useImperativeHandle(ref, () => ({ setError }));
    useEffect(() => {
      console.log(data);
      if (!data) return;
      reset({
        title: data.title,
        description: data.description,
        country: data.country,
        city: data.city,
        street: data.street,
        zipcode: data.zipcode,
        capacity: data.capacity.toString(), // Ensure it's a number here
        date: new Date(data.date),
      });
    }, [data, reset]);
    if (isPending) {
      return (
        <View className="flex items-center justify-center">
          <ActivityIndicator size={24} />
          <Text>Getting Data...</Text>
        </View>
      );
    }
    return (
      <View>
        <ControlledInput
          multiline={false}
          control={control}
          name="title"
          label="Title"
        />
        <ControlledInput
          control={control}
          name="description"
          label="Description"
          numberOfLines={4}
          multiline
        />
        <ControlledDatePicker control={control} name="date" label="DATE" />
        <ControlledInput
          multiline={false}
          control={control}
          name="country"
          label="Country"
        />
        <ControlledInput
          multiline={false}
          control={control}
          name="city"
          label="City"
        />
        <ControlledInput
          multiline={false}
          control={control}
          name="street"
          label="Street"
        />
        <ControlledInput
          multiline={false}
          control={control}
          name="zipcode"
          label="ZipCode"
        />
        <ControlledInput
          multiline={false}
          control={control}
          name="capacity"
          label="Capacity"
        />
        <Button
          disabled={isPen}
          label="update event"
          className="bg-blue-500 text-xl font-semibold"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    );
  }
);
