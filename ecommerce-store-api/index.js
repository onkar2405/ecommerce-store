const express = require("express");
const cors = require("cors");

// Import routes
const cartRoutes = require("./src/routes/cartRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cart", cartRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
