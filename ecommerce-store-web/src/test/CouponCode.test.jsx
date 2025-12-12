import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CouponCode } from "../components/CouponCode";
import * as storeApi from "../api/storeApi";

vi.mock("../api/storeApi");
vi.mock("react-icons/fi", () => ({
  FiCopy: ({ size }) => <span data-testid="copy-icon">{size}</span>,
  FiCheck: ({ size }) => <span data-testid="check-icon">{size}</span>,
}));

describe("CouponCode Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storeApi.getAvailableCoupons.mockResolvedValue({ data: [] });
    storeApi.getOrderHistory.mockResolvedValue({ data: [] });
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
      },
    });
  });

  it("renders coupon code section", async () => {
    render(<CouponCode />);

    await waitFor(() => {
      expect(screen.getByText("Coupon Codes")).toBeInTheDocument();
    });
  });

  it("renders input field and apply button", async () => {
    render(<CouponCode />);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Enter coupon code")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Apply code/i })
      ).toBeInTheDocument();
    });
  });

  it("displays message when no coupons are available", async () => {
    storeApi.getAvailableCoupons.mockResolvedValue({ data: [] });
    storeApi.getOrderHistory.mockResolvedValue({ data: [] });

    render(<CouponCode />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /No coupon codes available. Place more 5 orders to get a coupon code./i
        )
      ).toBeInTheDocument();
    });
  });

  it("disables input and button when no coupons available", async () => {
    storeApi.getAvailableCoupons.mockResolvedValue({ data: [] });
    storeApi.getOrderHistory.mockResolvedValue({ data: [] });

    render(<CouponCode />);

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Enter coupon code");
      const button = screen.getByRole("button", { name: /Apply code/i });

      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });
  });

  it("displays available coupons", async () => {
    storeApi.getAvailableCoupons.mockResolvedValue({
      data: ["COUPON1", "COUPON2"],
    });
    storeApi.getOrderHistory.mockResolvedValue({ data: [] });

    render(<CouponCode />);

    await waitFor(() => {
      expect(screen.getByText("COUPON1")).toBeInTheDocument();
      expect(screen.getByText("COUPON2")).toBeInTheDocument();
    });
  });

  it("enables input and button when coupons are available", async () => {
    storeApi.getAvailableCoupons.mockResolvedValue({
      data: ["COUPON1"],
    });
    storeApi.getOrderHistory.mockResolvedValue({ data: [] });

    render(<CouponCode />);

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Enter coupon code");
      const button = screen.getByRole("button", { name: /Apply code/i });

      expect(input).not.toBeDisabled();
      expect(button).not.toBeDisabled();
    });
  });

  it("copies coupon code to clipboard when copy button is clicked", async () => {
    storeApi.getAvailableCoupons.mockResolvedValue({
      data: ["COUPON1"],
    });
    storeApi.getOrderHistory.mockResolvedValue({ data: [] });

    render(<CouponCode />);

    await waitFor(() => {
      expect(screen.getByText("COUPON1")).toBeInTheDocument();
    });

    const copyButton = screen.getByRole("button", { name: "18" });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("COUPON1");
    });
  });

  it("shows check icon after copying coupon", async () => {
    storeApi.getAvailableCoupons.mockResolvedValue({
      data: ["COUPON1"],
    });
    storeApi.getOrderHistory.mockResolvedValue({ data: [] });

    render(<CouponCode />);

    await waitFor(() => {
      expect(screen.getByText("COUPON1")).toBeInTheDocument();
    });

    const copyButton = screen.getByRole("button", { name: "18" });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    });
  });

  it("calculates correct number of remaining orders needed", async () => {
    storeApi.getAvailableCoupons.mockResolvedValue({ data: [] });
    storeApi.getOrderHistory.mockResolvedValue({
      data: [{}, {}, {}], // 3 orders
    });

    render(<CouponCode />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /No coupon codes available. Place more 2 orders to get a coupon code./i
        )
      ).toBeInTheDocument();
    });
  });

  it("updates input value when user types", async () => {
    storeApi.getAvailableCoupons.mockResolvedValue({
      data: ["COUPON1"],
    });
    storeApi.getOrderHistory.mockResolvedValue({ data: [] });

    render(<CouponCode />);

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Enter coupon code");
      fireEvent.input(input, { target: { value: "TEST" } });
      expect(input.value).toBe("TEST");
    });
  });
});
