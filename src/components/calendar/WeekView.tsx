import { startOfWeek } from 'date-fns';
import { useMemo } from 'react';
import { DateFormat, DateLocalizer, Navigate, NavigateAction, ViewProps } from 'react-big-calendar';
// @ts-expect-error idk why but this fucking module has no types
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

interface View {
  navigate: (date: Date, action: 'DATE' | 'NEXT' | 'PREV') => Date;
  range?: (date: Date, { localizer, ...props }: { localizer: DateLocalizer }) => never[];
  title: (date: Date, { culture, formats, ...props }: { culture?: string; formats: DateFormat[] }) => string;
}

function CalendarWeekView({ date, localizer, max, min, scrollToTime, ...props }: Readonly<ViewProps>) {
  const currRange = useMemo(() => CalendarWeekView.range(new Date(date), { localizer }), [date, localizer]);

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
}

CalendarWeekView.range = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = localizer.add(start, 4, 'day');

  let current = start;
  const range = [];

  while (localizer.lte(current, end, 'day')) {
    range.push(current);
    current = localizer.add(current, 1, 'day');
  }

  return range;
};

CalendarWeekView.navigate = (date: Date, action: NavigateAction, { localizer }: { localizer: DateLocalizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -7, 'day');

    case Navigate.NEXT:
      return localizer.add(date, 7, 'day');

    default:
      return date;
  }
};

CalendarWeekView.title = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  const [start, ...rest] = CalendarWeekView.range(date, { localizer });
  return localizer.format({ end: rest.pop()!, start } as unknown as Date, 'dayRangeHeaderFormat');
};

export default CalendarWeekView as typeof CalendarWeekView & View;
