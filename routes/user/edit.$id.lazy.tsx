import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/user/edit/$id')({
  component: () => <div>Hello /user/edit/$id!</div>,
});
