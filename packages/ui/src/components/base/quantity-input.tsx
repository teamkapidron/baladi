'use client';

import React from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Minus, Plus } from 'lucide-react';

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const QuantityInput = React.forwardRef<HTMLDivElement, QuantityInputProps>(
  (
    {
      value,
      onChange,
      min = 1,
      max = 99,
      disabled = false,
      className,
      size = 'default',
    },
    ref,
  ) => {
    const handleDecrement = () => {
      if (value > min && !disabled) {
        onChange(value - 1);
      }
    };

    const handleIncrement = () => {
      if (value < max && !disabled) {
        onChange(value + 1);
      }
    };

    const sizeClasses = {
      sm: {
        container: 'h-8',
        button: 'w-8',
        value: 'w-10',
      },
      default: {
        container: 'h-9',
        button: 'w-9',
        value: 'w-12',
      },
      lg: {
        container: 'h-10',
        button: 'w-10',
        value: 'w-14',
      },
    };

    const { container, button, value: valueWidth } = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center border border-gray-200',
          container,
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min || disabled}
          className={cn(
            'flex h-full items-center justify-center border-r border-gray-200',
            'transition-colors hover:bg-gray-50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            button,
          )}
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <div
          className={cn(
            'flex h-full items-center justify-center text-center',
            valueWidth,
          )}
        >
          {value}
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max || disabled}
          className={cn(
            'flex h-full items-center justify-center border-l border-gray-200',
            'transition-colors hover:bg-gray-50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            button,
          )}
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
    );
  },
);

export { QuantityInput };
