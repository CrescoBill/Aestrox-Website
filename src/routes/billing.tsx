import { createFileRoute } from '@tanstack/react-router';
import { BillingPage, pageHead } from '@/components/product-pages';

export const Route = createFileRoute('/billing')({
  head: () => pageHead('Billing & payments', 'Discover Aestrox billing software and explore an interactive sample checkout.'),
  component: BillingPage,
});
