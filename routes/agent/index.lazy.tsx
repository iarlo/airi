import AgentList from '@src/pages/agentList';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/agent/')({
  component: AgentList,
});
