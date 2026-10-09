import { createFileRoute } from '@tanstack/react-router';
import { ContactPage, pageHead } from '@/components/product-pages';

export const Route = createFileRoute('/contact')({
  head: () => pageHead('Contact & demos', 'Talk about your business and explore your next billing setup with Aestrox.'),
  component: ContactPage,
});
