import AppointmentDetails from '@src/pages/appointmentDetails';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/appointment/details/$id')({
  component: AppointmentDetails,
});
