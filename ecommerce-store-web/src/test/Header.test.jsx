import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  it("renders header with navigation links", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const storeLink = screen.getByRole("link", { name: /Store/i });
    expect(storeLink).toBeInTheDocument();
    expect(storeLink).toHaveAttribute("href", "/");
  });

  it("renders cart icon link", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const cartLink = screen.getAllByRole("link")[1];
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("renders navigation element", () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("renders header with correct class name", () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const header = container.querySelector(".header");
    expect(header).toBeInTheDocument();
  });

  it("has correct link styling class", () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const headerItems = container.querySelectorAll(".header-item");
    expect(headerItems.length).toBeGreaterThan(0);
  });
});
