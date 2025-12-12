import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCard from '../components/common/ProductCard';
import * as storeApi from '../api/storeApi';

vi.mock('../api/storeApi');

describe('ProductCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storeApi.addItemToCart.mockResolvedValue({ data: { success: true } });
  });

  it('renders product card with correct product information', () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('₹1000')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('displays "Add to Cart" button initially', () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    expect(addButton).toBeInTheDocument();
  });

  it('calls addItemToCart when "Add to Cart" is clicked', async () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(storeApi.addItemToCart).toHaveBeenCalled();
    });
  });

  it('shows quantity counter after adding to cart', async () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('increments quantity when + button is clicked', async () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    const incrementButton = screen.getAllByRole('button', { name: /\+/i })[0];
    fireEvent.click(incrementButton);

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('decrements quantity when - button is clicked', async () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    const incrementButton = screen.getAllByRole('button', { name: /\+/i })[0];
    fireEvent.click(incrementButton);

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    const decrementButton = screen.getByRole('button', { name: /–/i });
    fireEvent.click(decrementButton);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('disables - button when quantity is 1', async () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      const decrementButton = screen.getByRole('button', { name: /–/i });
      expect(decrementButton).toBeDisabled();
    });
  });

  it('disables + button when quantity is 9', async () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    const incrementButton = screen.getAllByRole('button', { name: /\+/i })[0];

    for (let i = 0; i < 8; i++) {
      fireEvent.click(incrementButton);
    }

    await waitFor(() => {
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(incrementButton).toBeDisabled();
    });
  });

  it('calls addItemToCart with correct product details', async () => {
    render(
      <ProductCard
        productId="p1"
        productName="Test Product"
        price={1000}
        imageUrl="/test.jpg"
      />
    );

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(storeApi.addItemToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          productId: 'p1',
          name: 'Test Product',
          price: 1000,
          quantity: 1,
        })
      );
    });
  });
});
