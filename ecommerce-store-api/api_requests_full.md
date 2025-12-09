# API Request Examples (cURL + Invoke-WebRequest)

This document provides **cURL** and **PowerShell Invoke-WebRequest** commands for testing all backend APIs.  
Each request includes a description and notes for usage.

---

# 1. Add Item to Cart

Adds a product to the in-memory cart.  
The backend expects strict field names: `productId`, `name`, `price`, `quantity`.

### **cURL**

```bash
curl -X POST http://localhost:3000/cart/add   -H "Content-Type: application/json"   -d '{
    "productId": "p1",
    "name": "Laptop",
    "price": 50000,
    "quantity": 2
  }'
```

### **PowerShell (Invoke-WebRequest)**

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/cart/add" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "productId": "p1",
    "name": "Laptop",
    "price": 50000,
    "quantity": 2
  }'
```

---

# 2. Get Cart Items

Returns the list of items currently in the cart.

### **cURL**

```bash
curl http://localhost:3000/cart
```

### **PowerShell**

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/cart" -Method GET
```

---

# 3. Checkout

Places an order. Add `couponCode` field only if you have valid coupon code.  
If the user provides a `couponCode`, backend validates and applies the discount.

### **cURL with Coupon code**

```bash
curl -X POST http://localhost:3000/checkout   -H "Content-Type: application/json"   -d '{"couponCode": "DISC-W4GK2B"}'
```

### **PowerShell with Coupon code**

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/checkout" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"couponCode": "DISC-W4GK2B"}'
```

### **cURL without Coupon code**

```bash
curl -X POST http://localhost:3000/checkout   -H "Content-Type: application/json"
```

### **PowerShell without Coupon code**

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/checkout" `
  -Method POST `
  -ContentType "application/json"
```

---

# 4. Generate Discount Code (Admin)

Creates a new discount code _only if the nth-order rule is met_.

### **cURL**

```bash
curl -X POST http://localhost:3000/admin/discount/generate   -H "Content-Type: application/json"
```

### **PowerShell**

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/admin/discount/generate" `
  -Method POST `
  -ContentType "application/json"
```

---

# Additional Notes

- All APIs use in-memory storage. Restarting server or reloading the application resets data.
- JSON request bodies must use **double quotes** for PowerShell.
- For Windows users without cURL installed, Invoke-WebRequest is fully supported.
- Ideal testing order:
  1. Add items
  2. View cart
  3. Generate discount (if eligible)
  4. Checkout

---
