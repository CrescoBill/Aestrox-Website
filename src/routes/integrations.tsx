import { createFileRoute } from '@tanstack/react-router';
import { IntegrationsPage, pageHead } from '@/components/product-pages';

export const Route = createFileRoute('/integrations')({
  head: () => pageHead('Integrations', 'Explore your accounting, payment, and device connection requirements with Aestrox.'),
  component: IntegrationsPage,
});
