import { useQuery } from '@tanstack/react-query';
import { cn } from '@utils/cn';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './Command';

type ComboBoxItemType = {
  label: string;
  value: string;
};

interface SearchProps {
  onSearchChange: (e: string) => Promise<ComboBoxItemType[]>;
  onSelectResult: (value: ComboBoxItemType | undefined) => void;
  selectedResult: ComboBoxItemType | undefined;
}

function SearchResults({ onSearchChange, onSelectResult, selectedResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 200);

  const enabled = !!debouncedSearchQuery;

  const {
    data,
    isError,
    isLoading: isLoadingOrig,
  } = useQuery<ComboBoxItemType[]>({
    enabled,
    queryFn: () => onSearchChange(debouncedSearchQuery),
    queryKey: ['search', debouncedSearchQuery],
  });

  const isLoading = enabled && isLoadingOrig;
  return (
    <Command shouldFilter={false}>
      <CommandInput onValueChange={setSearchQuery} placeholder="Pesquisar paciente..." value={searchQuery} />
      <CommandList>
        {isLoading && <div className="p-4 text-sm">Pesquisando...</div>}

        <CommandEmpty>{isError ? 'Algo deu errado' : 'Nenhum paciente encontrado'}</CommandEmpty>
        <CommandGroup>
          {data &&
            data?.map(({ label, value }) => {
              return (
                <CommandItem
                  className="capitalize"
                  key={value}
                  onSelect={() => onSelectResult({ label, value })}
                  value={value}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', selectedResult?.value === value ? 'opacity-100' : 'opacity-0')}
                  />
                  {label}
                </CommandItem>
              );
            })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default SearchResults;
