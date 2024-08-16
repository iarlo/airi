import NewAppointmentForm from '@src/pages/newAppointment';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/appointment/new')({
  component: NewAppointmentForm,
});
