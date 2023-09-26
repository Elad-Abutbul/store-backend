// Load environment variables from .env file
require("dotenv").config();
// Import necessary packages
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./dbConnection/db");
// Import models and packages for authentication
const User = require("./models/user.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const Sum = require("./models/sumPurchases");
const createUserRouter = require("./routes/userRoute");
const getAllProductsRoute = require("./routes/getAllProductRoute");
const ceoRoute = require("./routes/ceoRoute");
// // Set up middlewaremnpmn
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/user", verifyToken, createUserRouter);
app.use("/allProducts", getAllProductsRoute);
app.use("/ceo", verifyToken, ceoRoute);
// Set up port for the server
app.get("/allRankUser", async (req, res) => {
  const rankUser = await User.find({ rank: "user" });
  res.send(rankUser);
});
app.get("/sumAllPurchases", async (req, res) => {
  const getSum = await Sum.find({});
  res.send(getSum);
});
app.post("/createUsers", async (req, res) => {
  // Check if the username already exists
  const ceoId = await User.findById(req.body.ceoId);
  if (await User.exists({ userName: req.body.userName })) {
    res.send("UserName exists");
  } else {
    let hashedPassword;
    try {
      // Generate a salt for hashing the password
      if (!ceoId) {
        const salt = await bcrypt.genSalt();
        // Hash the password with the salt
        hashedPassword = await bcrypt.hash(req.body.password, salt);
      }

      // Create a new user object with the hashed password
      const objUser = {
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: ceoId ? req.body.password : hashedPassword,
        rank: req.body.rank,
        city: req.body.city,
        cart: req.body.cart,
        historyOfCart: req.body.historyOfCart,
      };
      // Insert the new user into the d atabase
      await User.insertMany(objUser);
      // Send the token along with the response
      res.send("User created");
    } catch (error) {
      console.log(error);
    }
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    // Find user with matching username
    const findUser = await User.findOne({ userName: userName });
    if (!findUser) {
      // If user not found, send response
      return res.send("User or password not found");
    }
    // Compare hashed password from request with stored password
    const passwordMatch =   await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
      // Generate a JWT token
      const token = jwt.sign(findUser._doc, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
      });
      // If password is correct, send response with success message and user data
      return res.json({ msg: "success", user: findUser, token: token });
    } else {
      // If password is incorrect, send response
      return res.send("User or password not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.send("No token provided");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.send("Failed to authenticate token");
    }
    // Add the decoded user ID to the request object for further use
    req.userId = user.userId;
    next();
  });
}

// Start listening for requests on specified port
const port = 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
