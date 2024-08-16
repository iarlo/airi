import NewAgentForm from '@src/pages/newAgent';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/agent/new')({
  component: NewAgentForm,
});
