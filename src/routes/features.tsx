import { createFileRoute } from '@tanstack/react-router';
import { FeaturesPage, pageHead } from '@/components/product-pages';

export const Route = createFileRoute('/features')({
  head: () => pageHead('Billing software features', 'Explore billing, inventory visibility, and sales insights for your business.'),
  component: FeaturesPage,
});
