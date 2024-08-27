import { Button } from '@components/Button';
import { FormControl, FormDescription, FormItem, FormLabel } from '@components/Form';
import { MaskedInput } from '@components/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@components/Popover';
import { Calendar } from '@components/ShadCalendar';
import i18n from '@config/i18n/main';
import { cn } from '@utils/cn';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ComponentType, forwardRef, LegacyRef, PropsWithChildren } from 'react';
import { HTMLInputTypeAttribute as InputType } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FieldValues, Path, get, useFormContext } from 'react-hook-form';
import { IMaskInputProps } from 'react-imask';

interface Props<T extends FieldValues, K extends InputType> {
  label: string;
  type?: K;
  id: Path<T>;
}

const FormFieldDemo = <T extends FieldValues, K extends InputType = InputType>({
  label,
  id,
  children,
}: PropsWithChildren<Props<T, K>>) => {
  const {
    formState: { errors },
  } = useFormContext<T>();

  const error = get(errors, id)?.message;

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormDescription className="text-red-500">{error}</FormDescription>
    </FormItem>
  );
};

interface MaskedMiddlewareProps {
  name: string;
  control: Control;
}

// eslint-disable-next-line react/prop-types
const PhoneField = forwardRef<HTMLInputElement, MaskedMiddlewareProps>(({ name, control }, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field } }) => (
        <FormFieldDemo label={i18n.t('form.phone.label')} id={name}>
          <MaskedInput
            {...field}
            onAccept={onChange}
            mask="(00) 0 0000-0000"
            autoComplete="new-password"
            id="phone"
            placeholder={i18n.t('form.phone.placeholder')}
            type="tel"
            unmask={true}
            ref={ref as LegacyRef<ComponentType<IMaskInputProps<HTMLInputElement>>>}
          />
        </FormFieldDemo>
      )}
    />
  );
});

PhoneField.displayName = 'PhoneField';

// eslint-disable-next-line react/prop-types
const BirthDateField = forwardRef<HTMLInputElement, MaskedMiddlewareProps>(({ name, control }, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <FormFieldDemo label={i18n.t('table.columns.birth')} id={name}>
          <Popover>
            <PopoverTrigger {...field} asChild>
              <Button
                variant={'outline'}
                className={cn('flex w-full justify-between px-4 py-3.5 text-left font-normal', !value && '')}
              >
                {value && format(new Date(value), 'dd/MM/yyyy')}
                <CalendarIcon className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-auto p-0" ref={ref}>
              <Calendar
                mode="single"
                captionLayout="dropdown"
                startMonth={new Date(1900, 0)}
                endMonth={new Date()}
                selected={value}
                today={new Date(value)}
                onSelect={(selectedDate) => {
                  if (!selectedDate) return;
                  onChange(selectedDate);
                }}
                defaultMonth={value}
              />
            </PopoverContent>
          </Popover>
        </FormFieldDemo>
      )}
    />
  );
});

BirthDateField.displayName = 'BirthDateField';

export { PhoneField, BirthDateField };
