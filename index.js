const express = require("express");
const { connectDB } = require("./config/db.config");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

//Connection to PSQL
connectDB();

//Middlewares
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use("/public", express.static("public"));

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

routes(app);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
