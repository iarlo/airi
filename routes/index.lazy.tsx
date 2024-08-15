import HomePage from '@src/pages/home';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: HomePage,
});
