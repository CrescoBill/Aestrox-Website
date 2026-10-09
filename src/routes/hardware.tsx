import { createFileRoute } from '@tanstack/react-router';
import { HardwarePage, pageHead } from '@/components/product-pages';

export const Route = createFileRoute('/hardware')({
  head: () => pageHead('Billing hardware', 'Explore counter terminals, handheld devices, and receipt printers for Aestrox.'),
  component: HardwarePage,
});
