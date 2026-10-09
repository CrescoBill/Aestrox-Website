import { createFileRoute } from '@tanstack/react-router';
import { PricingPage, pageHead } from '@/components/product-pages';

export const Route = createFileRoute('/pricing')({
  head: () => pageHead('Plans & pricing', 'Discuss the right Aestrox billing setup and pricing for your business.'),
  component: PricingPage,
});
