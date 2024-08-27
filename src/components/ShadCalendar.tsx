/* eslint-disable react/prop-types */
'use client';

import { SelectValue } from '@radix-ui/react-select';
import { cn } from '@utils/cn';
import { ptBR } from 'date-fns/locale/pt-BR';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { DayPicker, DayPickerProps } from 'react-day-picker';

import { buttonVariants } from './Button';
import { Select, SelectContent, SelectItem, SelectTrigger } from './Select';

export type CalendarProps = DayPickerProps;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const handleCalendarChange = (_value: string | number, _e: ChangeEventHandler<HTMLSelectElement>) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      locale={ptBR}
      classNames={{
        months: 'relative',
        month: 'space-y-4',
        month_caption: 'flex justify-center items-center h-7',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center justify-between absolute w-full z-10 px-1 pointer-events-none',
        button_previous: cn(
          buttonVariants({
            variant: 'outline',
            className: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          })
        ),
        button_next: cn(
          buttonVariants({
            variant: 'outline',
            className: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          })
        ),
        month_grid: 'border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground w-9 font-normal text-xs',
        row: 'flex w-full mt-2',
        day: cn(
          buttonVariants({
            variant: 'ghost',
            className: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 relative overflow-hidden',
          })
        ),
        day_button: 'w-full h-full absolute',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        range_end: 'day-range-end',
        range_start: 'bg-accent rounded-s-md',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        week: 'flex mt-2',
        today: 'bg-accent text-accent-foreground',
        outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron({ orientation, disabled, className }) {
          const Component =
            orientation === 'left'
              ? ChevronLeft
              : orientation === 'right'
                ? ChevronRight
                : orientation === 'up'
                  ? ChevronUp
                  : ChevronDown;

          return <Component className={cn('size-4', className)} aria-disabled={disabled} />;
        },
        Dropdown({ className, ...props }) {
          const isMonth = props['aria-label'] === 'Choose the Month';
          return (
            <Select
              onValueChange={(v) => {
                if (props.onChange) handleCalendarChange(v, props.onChange);
              }}
            >
              <SelectTrigger
                className={cn(
                  className,
                  buttonVariants({ variant: 'ghost' }),
                  'h-7 w-fit py-2 pl-2 pr-1 font-medium [.is-between_&]:hidden [.is-end_&]:hidden [.is-start.is-end_&]:flex'
                )}
              >
                <SelectValue
                  placeholder={isMonth ? props?.options![props?.value as never]?.label : props.value}
                ></SelectValue>
              </SelectTrigger>
              <SelectContent className="scrolling-auto max-h-[var(--radix-popper-available-height);] min-w-[var(--radix-popper-anchor-width);] overflow-y-auto">
                {props.options &&
                  props.options.map((year) => (
                    <SelectItem
                      key={year.label}
                      value={year.value as unknown as string}
                      disabled={year.disabled}
                      className="min-w-[var(--radix-popper-anchor-width);]"
                    >
                      {year.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
