import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartItem } from '../components/common/CartItem';

describe('CartItem Component', () => {
  it('renders cart item with all details', () => {
    render(
      <CartItem
        name="Test Product"
        price={1000}
        quantity={2}
        imageUrl="/test.jpg"
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
  });

  it('displays correct product image', () => {
    render(
      <CartItem
        name="Test Product"
        price={1000}
        quantity={2}
        imageUrl="/test.jpg"
      />
    );

    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', '/test.jpg');
  });

  it('calculates and displays correct total price', () => {
    render(
      <CartItem
        name="Test Product"
        price={500}
        quantity={3}
        imageUrl="/test.jpg"
      />
    );

    expect(screen.getByText('1500')).toBeInTheDocument();
  });

  it('displays correct labels for cart information', () => {
    render(
      <CartItem
        name="Test Product"
        price={1000}
        quantity={2}
        imageUrl="/test.jpg"
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
  });

  it('renders with zero quantity', () => {
    const { container } = render(
      <CartItem
        name="Test Product"
        price={1000}
        quantity={0}
        imageUrl="/test.jpg"
      />
    );

    const quantityValues = container.querySelectorAll('.cart-item-value');
    expect(quantityValues[1]).toHaveTextContent('0'); // quantity
    expect(quantityValues[2]).toHaveTextContent('0'); // price
  });

  it('renders with high quantity value', () => {
    render(
      <CartItem
        name="Test Product"
        price={1000}
        quantity={100}
        imageUrl="/test.jpg"
      />
    );

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('100000')).toBeInTheDocument();
  });
});
