const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const configServer = require("./configServer");
const allRoutes = require("./routes/allRoutes");
require("./database");

const app = express();
const apiBaseUrl = configServer.api_base_url;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: apiBaseUrl,
  })
);

app.use(allRoutes);
app.use("/", function (req, res) {
  res.render("index", {
    title: "Cant get backend Instay",
  });
});

app.get("/", (req, res) => {
  res.send("Backend Instay running");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred." });
});
