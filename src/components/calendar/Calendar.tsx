import { selectAppointmentsByDate } from '@src/database/queries/select';
import { queryOptions, useQuery } from '@tanstack/react-query';
import {
  add,
  addHours,
  endOfMonth,
  format,
  getDay,
  getHours,
  parse,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useCallback, useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, EventPropGetter } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import CalendarEventWrapper from './EventWrapper';
import CalendarToolbar from './Toolbar';
import CalendarWeekView from './WeekView';

const localizer = dateFnsLocalizer({
  endOfMonth,
  format,
  getDay,
  locales: { 'pt-BR': ptBR },
  parse,
  startOfWeek,
});

export const appointmentQuery = (dateStart: Date, dateEnd: Date) =>
  queryOptions({
    queryFn: async () => {
      const query = await selectAppointmentsByDate(dateStart, dateEnd);
      console.log(query);
      return query;
    },
    queryKey: ['appointment', 'many', dateStart, dateEnd],
  });

function CalendarComponent() {
  const [date, setDate] = useState(new Date());

  const { data, refetch } = useQuery(appointmentQuery(startOfMonth(date), endOfMonth(date)));

  const { views, ...components } = useMemo(
    () => ({
      eventWrapper: CalendarEventWrapper,
      toolbar: CalendarToolbar,
      views: {
        day: true,
        month: true,
        week: CalendarWeekView,
      },
    }),
    []
  );

  const eventPropGetter = useCallback<EventPropGetter<Event>>(
    (_event, start, _end, isSelected) => ({
      ...(isSelected && {
        style: {
          backgroundColor: '#000',
        },
      }),
      ...(getHours(start) < 15 && {
        className: 'bg-primary-foreground text-primary',
      }),
    }),
    []
  );

  return (
    <>
      <Calendar
        components={components}
        culture="pt-BR"
        date={date}
        endAccessor="end"
        eventPropGetter={eventPropGetter}
        events={data?.map(({ agent_id, date, id, user_name, user_id }) => ({
          end: addHours(date ?? '', 1),
          resource: {
            agent_id,
            id,
            user_id,
          },
          start: new Date(fromZonedTime(date ?? '', 'America/Sao_Paulo').toUTCString()),
          title: user_name,
        }))}
        localizer={localizer}
        max={add(startOfDay(new Date()), { hours: 15 })}
        messages={{
          showMore: (count: number) => `+${count} consulta${count > 1 && 's'}`,
        }}
        min={add(startOfDay(new Date()), { hours: 8 })}
        onNavigate={async (value) => {
          setDate(value);
          await refetch();
        }}
        startAccessor="start"
        style={{ height: 'calc(100vh - 80px)', maxHeight: 1000 }}
        views={views}
      />
    </>
  );
}

export default CalendarComponent;
