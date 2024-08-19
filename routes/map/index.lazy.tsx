import MapComponent from '@components/CityMap';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/map/')({
  component: MapComponent,
});
