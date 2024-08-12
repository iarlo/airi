import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/new')({
  component: () => <div>Hello /user/new!</div>,
});
