'use client';

import i18n from '@config/i18n/main';
import { cn } from '@utils/cn';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import SearchResults from './Search';

export type ComboBoxItemType = {
  label: string;
  value: string;
};

type ComboboxProps = {
  className?: string;
  onSearchChange: (e: string) => Promise<ComboBoxItemType[]>;
  onSelect: (value: string | undefined) => void;
};

const popOverStyles = {
  width: 'var(--radix-popover-trigger-width)',
};

export function Combobox({ className, onSearchChange, onSelect }: ComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<ComboBoxItemType | null>(null);

  return (
    <Popover modal={true} onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className={cn('justify-between', className, selected?.label && 'capitalize')}
          role="combobox"
          variant="outline"
        >
          {selected?.label ?? i18n.t('pages.form.user.placeholder')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 popover-content-width-same-as-its-trigger" style={popOverStyles}>
        <SearchResults
          onSearchChange={onSearchChange}
          onSelectResult={(value) => {
            setSelected(value ?? null);
            onSelect(value?.value);
            setOpen(false);
          }}
          selectedResult={selected ?? undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
