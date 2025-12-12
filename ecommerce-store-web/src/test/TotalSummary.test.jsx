import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TotalSummary from "../components/TotalSummary";
import * as storeApi from "../api/storeApi";

vi.mock("../api/storeApi");

describe("TotalSummary Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storeApi.checkout.mockResolvedValue({ data: { success: true } });
  });

  it("renders order summary with correct title", () => {
    render(
      <BrowserRouter>
        <TotalSummary subTotal={1000} discount={0} />
      </BrowserRouter>
    );

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });

  it("displays subtotal correctly", () => {
    render(
      <BrowserRouter>
        <TotalSummary subTotal={1000} discount={0} />
      </BrowserRouter>
    );

    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    const subtotalValues = screen.getAllByText("₹1000");
    expect(subtotalValues.length).toBeGreaterThan(0); // Should have at least subtotal
  });

  it("displays discount correctly", () => {
    render(
      <BrowserRouter>
        <TotalSummary subTotal={1000} discount={200} />
      </BrowserRouter>
    );

    expect(screen.getByText("Discount")).toBeInTheDocument();
    expect(screen.getByText("- ₹200")).toBeInTheDocument();
  });

  it("calculates and displays correct total", () => {
    render(
      <BrowserRouter>
        <TotalSummary subTotal={1000} discount={200} />
      </BrowserRouter>
    );

    expect(screen.getByText("₹800")).toBeInTheDocument();
  });

  it("applies green color class to discount when discount > 0", () => {
    const { container } = render(
      <BrowserRouter>
        <TotalSummary subTotal={1000} discount={200} />
      </BrowserRouter>
    );

    const discountElement = container.querySelector(".discount-green");
    expect(discountElement).toBeInTheDocument();
    expect(discountElement).toHaveTextContent("- ₹200");
  });

  it("does not apply green color class when discount is 0", () => {
    const { container } = render(
      <BrowserRouter>
        <TotalSummary subTotal={1000} discount={0} />
      </BrowserRouter>
    );

    const discountElement = container.querySelector(".discount-green");
    expect(discountElement).not.toBeInTheDocument();
  });

  it("renders checkout button", () => {
    render(
      <BrowserRouter>
        <TotalSummary subTotal={1000} discount={0} />
      </BrowserRouter>
    );

    const checkoutButton = screen.getByRole("button", {
      name: /Proceed to Checkout/i,
    });
    expect(checkoutButton).toBeInTheDocument();
  });

  it("calls checkout function when button is clicked", async () => {
    render(
      <BrowserRouter>
        <TotalSummary subTotal={1000} discount={0} />
      </BrowserRouter>
    );

    const checkoutButton = screen.getByRole("button", {
      name: /Proceed to Checkout/i,
    });
    fireEvent.click(checkoutButton);

    await waitFor(() => {
      expect(storeApi.checkout).toHaveBeenCalled();
    });
  });

  it("displays zero total when subtotal equals discount", () => {
    render(
      <BrowserRouter>
        <TotalSummary subTotal={500} discount={500} />
      </BrowserRouter>
    );

    expect(screen.getByText("₹0")).toBeInTheDocument();
  });

  it("displays correct total with large numbers", () => {
    render(
      <BrowserRouter>
        <TotalSummary subTotal={50000} discount={5000} />
      </BrowserRouter>
    );

    expect(screen.getByText("₹50000")).toBeInTheDocument();
    expect(screen.getByText("- ₹5000")).toBeInTheDocument();
    expect(screen.getByText("₹45000")).toBeInTheDocument();
  });
});
