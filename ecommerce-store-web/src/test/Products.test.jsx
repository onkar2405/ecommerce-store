import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Products } from '../components/Products';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../components/common/ProductCard', () => ({
  default: ({ productId, productName, price }) => (
    <div data-testid={`product-card-${productId}`}>
      {productName} - ₹{price}
    </div>
  ),
}));

describe('Products Component', () => {
  it('renders products container', () => {
    const { container } = render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const productsDiv = container.querySelector('.products');
    expect(productsDiv).toBeInTheDocument();
  });

  it('renders all products from product data', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-card-p1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-p2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-p3')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-p4')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-p5')).toBeInTheDocument();
  });

  it('passes correct product information to ProductCard', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/HP OmniBook 5 OLED Snapdragon X Processor/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Apple Headphones/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pixel 10 Obsidian/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/SteelSeries Apex 3 RGB/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Corsair M65 RGB Ultra/)
    ).toBeInTheDocument();
  });

  it('renders correct prices for products', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    expect(screen.getByText(/₹50000/)).toBeInTheDocument();
    expect(screen.getByText(/₹8000/)).toBeInTheDocument();
    expect(screen.getByText(/₹30000/)).toBeInTheDocument();
    expect(screen.getByText(/₹5500/)).toBeInTheDocument();
    expect(screen.getByText(/₹4500/)).toBeInTheDocument();
  });
});
