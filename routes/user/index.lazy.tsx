import UserList from '@src/pages/userList';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/user/')({
  component: UserList,
});
