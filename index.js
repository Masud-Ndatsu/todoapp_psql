const express = require("express");
const { connectDB } = require("./models");
const routes = require("./routes");
const app = express();
const PORT = 3000;

//Connection to MongoDB
connectDB();

//Middlewares
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

//pass the app instance to the route file
routes(app);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
