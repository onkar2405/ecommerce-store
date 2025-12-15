# 🛍️ Ecommerce Store

A full-stack e-commerce application built with React, Express.js, and Node.js.

## ✨ Features

https://github.com/user-attachments/assets/0f8d1824-5e78-4339-ba54-89bcce2eb3a0


### Frontend

- 📦 **Product Catalog** - See variety of products with images and prices
- 🛒 **Shopping Cart** - Add/remove items, update quantities with real-time updates
- 🎟️ **Coupon System** - Apply discount codes and view available coupons
- 💳 **Checkout** - Complete orders with order summary and discount calculation
- 🧭 **Navigation** - Smooth routing between shop and cart pages

### Backend

- 🔧 **REST API** - Complete REST endpoints for cart, checkout, and admin operations
- 💾 **In-Memory Data Store** - Product and order management
- 🎯 **Discount Management** - Generate and manage coupon codes
- 📊 **Order History** - Track customer orders
- ✅ **Input Validation** - Request data validation

## 📁 Project Structure

```
ecommerce-store/
├── ecommerce-store-web/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── ProductCard.jsx      # Individual product display
│   │   │   │   └── CartItem.jsx         # Cart item display
│   │   │   ├── CartPage.jsx             # Shopping cart page
│   │   │   ├── CouponCode.jsx           # Coupon code management
│   │   │   ├── Header.jsx               # Navigation header
│   │   │   ├── MainPage.jsx             # Main page layout
│   │   │   ├── Products.jsx             # Products grid
│   │   │   └── TotalSummary.jsx         # Order summary
│   │   ├── api/
│   │   │   ├── storeApi.js              # API client
│   │   │   └── productData.js           # Product mock data
│   │   ├── test/
│   │   │   ├── __mocks__/               # API mocks for tests
│   │   │   ├── *.test.jsx               # Component tests (55 tests)
│   │   │   └── setup.js                 # Test environment setup
│   │   ├── App.jsx                      # Main app component
│   │   ├── main.jsx                     # React entry point
│   │   ├── App.css                      # App styling
│   │   └── index.css                    # Global styles
│   ├── public/                          # Static assets
│   ├── package.json
│   ├── vitest.config.js                 # Vitest configuration
│   ├── vite.config.js                   # Vite configuration
│   └── eslint.config.js                 # ESLint configuration
│
└── ecommerce-store-api/           # Express backend
    ├── src/
    │   ├── controllers/
    │   │   ├── adminController.js        # Admin operations
    │   │   ├── cartControllers.js        # Cart management
    │   │   └── checkoutController.js     # Order processing
    │   ├── services/
    │   │   ├── adminService.js           # Admin business logic
    │   │   ├── cartService.js            # Cart business logic
    │   │   └── checkoutService.js        # Checkout business logic
    │   ├── routes/
    │   │   ├── adminRoutes.js            # Admin API routes
    │   │   ├── cartRoutes.js             # Cart API routes
    │   │   └── checkoutRoutes.js         # Checkout API routes
    │   ├── data/
    │   │   └── store.js                  # In-memory data store
    │   ├── utils/
    │   │   └── codeGenerator.js          # Utility functions
    │   └── constansts.js                 # Constants
    ├── index.js                          # API entry point
    ├── package.json
    └── api_requests_full.md              # API documentation
```

## 🛠️ Tech Stack

### Frontend

- **React 19.2** - UI library
- **Vite 7.2** - Build tool & dev server
- **React Router 7.10** - Client-side routing
- **Axios 1.13** - HTTP client
- **React Icons 5.5** - Icon library
- **Vitest 4.0** - Unit testing framework
- **React Testing Library 16.3** - Component testing utilities
- **ESLint 9.39** - Code linting

### Backend

- **Node.js** - Runtime environment
- **Express 5.2** - Web framework
- **Nodemon 3.1** - Development server auto-reload
- **CORS 2.8** - Cross-origin resource sharing
- **UUID 13.0** - Unique ID generation
- **Jest 30.2** - Testing framework (optional)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ecommerce-store
   ```

2. **Install frontend dependencies**

   ```bash
   cd ecommerce-store-web
   npm install
   cd ..
   ```

3. **Install backend dependencies**
   ```bash
   cd ecommerce-store-api
   npm install
   cd ..
   ```

### Running the Application

#### Method 1: Run Both Services (Recommended)

**Terminal 1 - Start Backend (Port 3000)**

```bash
cd ecommerce-store-api
npm run dev
```

**Terminal 2 - Start Frontend (Port 5173)**

```bash
cd ecommerce-store-web
npm run dev
```

Then open your browser and navigate to: `http://localhost:5173`

## 📜 Available Scripts

### Frontend (`ecommerce-store-web/`)

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run tests in watch mode
npm test

# Run tests with UI
npm test:ui

# Generate coverage report
npm test:coverage

# Lint code
npm run lint
```

### Backend (`ecommerce-store-api/`)

```bash
# Start server
npm start

# Development server (with auto-reload via nodemon)
npm run dev

# Run tests
npm test
```

## 🧪 Testing

### Frontend Test Coverage

The frontend includes **55 passing unit tests** covering all major components:

- **ProductCard** (9 tests) - Product display and add-to-cart functionality
- **CartItem** (6 tests) - Cart item rendering and calculations
- **CartPage** (9 tests) - Shopping cart page functionality
- **CouponCode** (10 tests) - Coupon code management and validation
- **TotalSummary** (10 tests) - Order summary and checkout
- **Header** (5 tests) - Navigation functionality
- **MainPage** (2 tests) - Main page layout
- **Products** (4 tests) - Product grid rendering

### Running Tests

```bash
cd ecommerce-store-web

# Run all tests (single run)
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with interactive UI
npm test:ui

# Generate coverage report
npm test:coverage
```

## 📊 Project Structure Details

### Frontend Components

| Component      | Purpose                                                     |
| -------------- | ----------------------------------------------------------- |
| `ProductCard`  | Displays individual products with add-to-cart functionality |
| `Products`     | Grid layout for all available products                      |
| `CartPage`     | Main shopping cart page with items and summary              |
| `CartItem`     | Individual cart item with quantity and price                |
| `CouponCode`   | Coupon management and code input                            |
| `TotalSummary` | Order summary with subtotal, discount, and total            |
| `Header`       | Navigation bar with cart link                               |
| `MainPage`     | Main page container                                         |

### Backend Services

| Service           | Responsibility                        |
| ----------------- | ------------------------------------- |
| `cartService`     | Add/remove items, manage cart state   |
| `checkoutService` | Process orders and generate receipts  |
| `adminService`    | Coupon code generation and management |

### API Routes

| Method | Endpoint                   | Description                       |
| ------ | -------------------------- | --------------------------------- |
| `POST` | `/cart/add`                | Add item to cart                  |
| `GET`  | `/cart`                    | Get all cart items                |
| `POST` | `/checkout`                | Process checkout and create order |
| `POST` | `/admin/discount/generate` | Generate discount code            |
| `GET`  | `/admin/coupons`           | Get available coupons             |
| `GET`  | `/admin/order-history`     | Get order history                 |
