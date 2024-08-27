import EditUserForm from '@src/pages/editUser';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/user/edit/$id')({
  component: EditUserForm,
});
