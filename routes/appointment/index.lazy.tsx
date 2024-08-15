import CalendarComponent from '@components/calendar/Calendar';
import '@styles/calendar.css';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/appointment/')({
  component: CalendarComponent,
});
