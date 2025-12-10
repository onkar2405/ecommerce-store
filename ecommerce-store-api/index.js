const express = require("express");
const cors = require("cors");

// Import routes
const cartRoutes = require("./src/routes/cartRoutes");
const checkoutRoutes = require("./src/routes/checkoutRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
