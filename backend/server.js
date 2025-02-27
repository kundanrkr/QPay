const { log } = require("console");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const allowedOrigins = [
  "https://qpay.thekundankumar.com", // Local development
  "https://q-pay-frontend.vercel.app" // Deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins, // Allow frontend origin
    credentials: true, // Allow cookies and headers
  })
);

app.use(express.json());

const dbConfig = require("./config/dbConfig");
const usersRoute = require("./routes/usersRoute");
const transactionRoute = require("./routes/transactionRoute");
const requestsRoute = require("./routes/requestsRoute");

app.use("/api/users", usersRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/requests", requestsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server started on port: ${PORT}`);
});
