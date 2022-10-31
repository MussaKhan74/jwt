require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const bodyparser = require("body-parser");
const authRoutes = require("./apis/auth-api");
const emailRoutes = require("./apis/email-api");

const app = express();

//PORT
const port = process.env.PORT || 5000;

//CONNECT TO DATABASE
dbConnect();

//BODY PARSER
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//ROUTES
app.get("/", (req, res) => {
  res.send("its a mern stack jwt auth server");
});
//APIS
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

app.listen(port, () => console.log(`server is running on port ${port}`));
