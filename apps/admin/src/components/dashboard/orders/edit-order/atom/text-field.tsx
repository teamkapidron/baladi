'use client';

import React, { memo } from 'react';
import { Control, FieldValues, Path } from '@repo/ui/lib/form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: string;
}

function TextField<T extends FieldValues>(props: TextFieldProps<T>) {
  const {
    control,
    name,
    label,
    placeholder,
    icon,
    disabled = false,
    type = 'text',
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              iconLeft={icon}
              disabled={disabled}
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default memo(TextField) as typeof TextField;
