import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { BillingWorkspace } from '@/components/product-pages';

afterEach(cleanup);
describe('Sample billing workspace', () => {
  it('adds and removes products from the bill total', () => {
    const { container } = render(<BillingWorkspace />);
    expect(container.querySelector('.invoice-total strong')?.textContent).toBe('₹400.00');
    fireEvent.click(screen.getByRole('button', { name: 'House blend coffee ₹180' }));
    expect(container.querySelector('.invoice-total strong')?.textContent).toBe('₹580.00');
    fireEvent.click(screen.getByRole('button', { name: 'Remove House blend coffee' }));
    expect(container.querySelector('.invoice-total strong')?.textContent).toBe('₹400.00');
  });
  it('prevents an empty bill from being issued', () => {
    render(<BillingWorkspace />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear bill' }));
    expect(screen.getByRole('button', { name: 'Create sample bill' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Fresh orange juice ₹160' }));
    expect(screen.getByRole('button', { name: 'Create sample bill' })).toBeEnabled();
  });
});