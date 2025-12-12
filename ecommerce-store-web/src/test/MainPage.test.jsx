import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainPage } from '../components/MainPage';
import { BrowserRouter } from 'react-router-dom';

describe('MainPage Component', () => {
  it('renders main page', () => {
    const { container } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    const mainPageDiv = container.querySelector('div > div');
    expect(mainPageDiv).toBeInTheDocument();
  });

  it('renders with div container', () => {
    const { container } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
  });
});
