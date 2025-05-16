import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import {
  type SubmitHandler,
  useForm,
  type UseFormSetError,
} from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, View } from '@/components/ui';
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
  capacity: z.coerce.number({
    required_error: 'capacity is required',
  }),
});

export type FormType = z.infer<typeof scheme>;

export type AddEventFormProp = {
  onSubmit: SubmitHandler<FormType>;
  isPending: boolean;
};

export interface handleRef {
  setError: UseFormSetError<FormType>;
}

export const AddEventForm = forwardRef<handleRef, AddEventFormProp>(
  ({ onSubmit = () => {}, isPending }, ref) => {
    const { control, handleSubmit, setError } = useForm<FormType>({
      resolver: zodResolver(scheme),
    });

    useImperativeHandle(ref, () => ({ setError }));
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
          disabled={isPending}
          label="add event"
          className="bg-green-500 text-xl font-semibold"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    );
  }
);
