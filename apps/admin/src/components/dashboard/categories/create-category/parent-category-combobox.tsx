import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@repo/ui/components/base/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/base/popover';
import { Button } from '@repo/ui/components/base/button';
import { useState } from 'react';

interface ParentCategoryComboboxProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function ParentCategoryCombobox({
  options,
  value: initialValue,
  onChange,
}: ParentCategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {value
            ? options.find((option) => option.value === value)?.label
            : 'Velg overordnet kategori'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Søk etter kategori..." />
          <CommandEmpty>Ingen resultater funnet.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  setValue(option.value);
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
