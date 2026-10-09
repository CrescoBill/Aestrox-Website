import { createFileRoute } from '@tanstack/react-router';
import { AboutPage, pageHead } from '@/components/product-pages';

export const Route = createFileRoute('/about')({
  head: () => pageHead('About', 'Meet Aestrox, billing software focused on clarity and better business workflows.'),
  component: AboutPage,
});
