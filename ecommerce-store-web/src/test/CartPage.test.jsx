import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CartPage } from '../components/CartPage';
import * as storeApi from '../api/storeApi';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../api/storeApi');
vi.mock('../components/common/CartItem', () => ({
  CartItem: ({ name, price, quantity }) => (
    <div data-testid={`cart-item-${name}`}>
      {name} - ₹{price} x {quantity}
    </div>
  ),
}));
vi.mock('../components/CouponCode', () => ({
  CouponCode: () => <div data-testid="coupon-code">Coupon Code Component</div>,
}));
vi.mock('../components/TotalSummary', () => ({
  default: ({ subTotal, discount }) => (
    <div data-testid="total-summary">
      Total: ₹{subTotal - discount}
    </div>
  ),
}));

describe('CartPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storeApi.getCartItems.mockResolvedValue({ data: [] });
  });

  it('renders cart page with empty state', async () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cart is empty.')).toBeInTheDocument();
    });
  });

  it('renders coupon code component', async () => {
    storeApi.getCartItems.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('coupon-code')).toBeInTheDocument();
    });
  });

  it('does not render total summary when cart is empty', async () => {
    storeApi.getCartItems.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('total-summary')).not.toBeInTheDocument();
    });
  });

  it('renders cart items when items exist', async () => {
    const mockCartItems = [
      { productId: 'p1', name: 'Product 1', price: 1000, quantity: 2, imageUrl: '/p1.jpg' },
      { productId: 'p2', name: 'Product 2', price: 500, quantity: 1, imageUrl: '/p2.jpg' },
    ];

    storeApi.getCartItems.mockResolvedValue({ data: mockCartItems });

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('cart-item-Product 1')).toBeInTheDocument();
      expect(screen.getByTestId('cart-item-Product 2')).toBeInTheDocument();
    });
  });

  it('calculates correct subtotal for multiple items', async () => {
    const mockCartItems = [
      { productId: 'p1', name: 'Product 1', price: 1000, quantity: 2, imageUrl: '/p1.jpg' },
      { productId: 'p2', name: 'Product 2', price: 500, quantity: 1, imageUrl: '/p2.jpg' },
    ];

    storeApi.getCartItems.mockResolvedValue({ data: mockCartItems });

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      // 1000 * 2 + 500 * 1 = 2500
      expect(screen.getByText(/Total: ₹2480/)).toBeInTheDocument();
    });
  });

  it('renders total summary when cart has items', async () => {
    const mockCartItems = [
      { productId: 'p1', name: 'Product 1', price: 1000, quantity: 2, imageUrl: '/p1.jpg' },
    ];

    storeApi.getCartItems.mockResolvedValue({ data: mockCartItems });

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('total-summary')).toBeInTheDocument();
    });
  });

  it('calls getCartItems on component mount', async () => {
    storeApi.getCartItems.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(storeApi.getCartItems).toHaveBeenCalled();
    });
  });

  it('renders cart wrapper with correct structure', async () => {
    const { container } = render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      const cartWrapper = container.querySelector('.cart-wrapper');
      expect(cartWrapper).toBeInTheDocument();

      const cartItems = container.querySelector('.cart-items');
      expect(cartItems).toBeInTheDocument();
    });
  });

  it('handles single cart item correctly', async () => {
    const mockCartItems = [
      { productId: 'p1', name: 'Laptop', price: 50000, quantity: 1, imageUrl: '/laptop.jpg' },
    ];

    storeApi.getCartItems.mockResolvedValue({ data: mockCartItems });

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('cart-item-Laptop')).toBeInTheDocument();
      expect(screen.getByText(/Total: ₹49980/)).toBeInTheDocument();
    });
  });
});
