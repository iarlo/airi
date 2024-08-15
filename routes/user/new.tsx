import NewUserForm from '@src/pages/newUser';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/new')({
  component: NewUserForm,
});
