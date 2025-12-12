import { vi } from 'vitest';

export const addItemToCart = vi.fn(() => Promise.resolve({ data: { success: true } }));
export const getCartItems = vi.fn(() => Promise.resolve({ data: [] }));
export const checkout = vi.fn(() => Promise.resolve({ data: { success: true } }));
export const getAvailableCoupons = vi.fn(() => Promise.resolve({ data: [] }));
export const getOrderHistory = vi.fn(() => Promise.resolve({ data: [] }));
export const generateDiscountCode = vi.fn(() => Promise.resolve({ data: 'CODE123' }));
