require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require("./dataBase/db");
const userRoutes = require("./controller/users");
const authRoutes = require("./controller/auth");

const app = express()
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection
connection();

// routes
app.use("/signin", authRoutes);
app.use("/signup", userRoutes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})