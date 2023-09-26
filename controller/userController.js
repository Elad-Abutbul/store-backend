const Product = require("../models/products");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Sum = require("../models/sumPurchases");
const bcrypt = require("bcrypt");
module.exports = {
  addToCart: async (req, res) => {
    try {
      // Get the product ID and user ID from the request body
      let productId = req.body.productId;
      let userNameId = req.body.userNameId;

      // Find the product and user in the database based on their IDs
      let findProduct = await Product.findById(productId);
      let findUser = await User.findById(userNameId);

      // Add the product to the user's cart array and save the changes to the database
      findUser._doc.cart.push(findProduct._doc);
      await findUser.save();
      const token = jwt.sign(
        {
          findUser,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      // Send a response indicating that the product was added to the cart
      res.json({ msg: "Product added to cart!", token: token });
    } catch (error) {
      console.log(error);
    }
  },
  search: async (req, res) => {
    try {
      // Get the search query from the request body
      const { getItem } = req.body;

      // Create a query to find products whose name matches the pattern case-insensitively
      const query = { name: { $regex: new RegExp(getItem, "i") } };

      // Execute the query to find matching products
      const result = await Product.find(query);

      // Send the search result as the response
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  },
  deleteItem: async (req, res) => {
    // Extract the user ID and product ID from the request body
    const { userNameId, productId } = req.body;
    try {
      // Find the user in the database based on the user ID
      const findUser = await User.findById(userNameId);

      let productDeleted = false;

      // Filter the user's cart array to exclude the item to be deleted
      const updatedCart = findUser.cart.filter((product) => {
        if (productDeleted === false && product._id.toString() === productId) {
          productDeleted = true;
          return false; // Exclude this product from the updated cart
        }
        return true; // Include all other products
      });

      // If the product to be deleted was not found in the cart, send a response indicating so
      if (productDeleted === false) {
        return res.send("Product not found in cart");
      }

      // Update the user's cart with the updated cart and save the changes
      findUser.cart = updatedCart;
      await findUser.save();
      const token = jwt.sign(
        {
          findUser,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      // Send a response indicating that the product was successfully deleted from the cart
      res.json({ msg: "Product deleted from cart", token: token });
    } catch (error) {
      console.log(error);
    }
  },
  pay: async (req, res) => {
    // Extract the 'items' and 'userId' from the request body
    const { items, userId } = req.body;
    try {
      // Find the user in the database by their ID
      const findUser = await User.findById(userId);

      // Add the purchased items to the user's 'historyOfCart' array
      findUser.historyOfCart.unshift(...items);
      await findUser.save();
      let sum = await Sum.findOne();
      if (!sum) {
        // Create a new Sum object if it doesn't exist
        sum = new Sum();
      }

      // Remove the paid items from the user's 'cart'
      items.forEach((item) => {
        // Get the ID of the item to be removed
        const productId = item._id.toString();

        // Find the index of the item in the 'cart' array
        const index = findUser.cart.findIndex(
          (cartItem) => cartItem._id.toString() === productId
        );
        // If the item is found, remove it from the 'cart' array
        if (index !== -1) {
          findUser.cart.splice(index, 1);
          sum.totalSum += item.price;
        }
      });
      // Save the updated user information
      await sum.save();
      await findUser.save();
      const token = jwt.sign(
        {
          findUser,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      // Send a response indicating that the payment was successful
      res.json({ msg: "Payment successful", sum: sum, token: token });
    } catch (error) {
      // If an error occurs during the payment process, log the error and send an error response
      console.log(error);
      res.send("An error occurred during payment");
    }
  },
  deleteUser: async (req, res) => {
    try {
      // Extract the 'userId' from the request body
      const { userName } = req.body;
      const deleteUser = await User.findOne({ userName: userName });
      if (!deleteUser) return;
      // If the user is found and deleted, send a response indicating success
      if (deleteUser.rank !== "ceo") {
        // Find and delete the user from the database based on their ID
        await User.findOneAndDelete({ userName: userName });
        let findUser = await User.findOne({ rank: "ceo" });
        findUser._doc.deleteUsers.unshift(deleteUser);
        await findUser.save();
        const token = jwt.sign(
          {
            findUser,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
        res.json({ msg: "delete the user", token: token });
      } else {
        res.send("is ceo");
      }
    } catch (error) {
      // If an error occurs during the deletion process, log the error
      console.log(error);
    }
  },
  editAccount: async (req, res) => {
    try {
      const userData = {
        name: req.body.name, // Extract the updated user's name from the request body
        lastName: req.body.lastName, // Extract the updated user's last name from the request body
        userName: req.body.userName, // Extract the updated user's username from the request body
        password: req.body.password, // Extract the updated user's password from the request body
        city: req.body.city,
      };
      const userId = req.body.userId; // Extract the user's ID from the request body
      // First, check if the user exists in the database
      const existingUser = await User.findById(userId); // Find the existing user by their ID
      // If the user exists, check if the updated username already exists in the database
      if (userData.userName !== existingUser.userName) {
        const userNameExists = await User.exists({
          userName: userData.userName,
        });
        // If the updated username already exists, send a response indicating the username is already taken
        if (userNameExists) {
          return res.send("Username already exists");
        }
      }
      const salt = await bcrypt.genSalt(); // Generate a salt for password hashing
      // Hash the updated password using the generated salt
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      // Update the user in the database with the new user data, including the hashed password
      userData.password = hashedPassword;
      const updated = await User.findByIdAndUpdate(userId, userData);
      // Send the updated user object as the response
      res.send(updated);
    } catch (error) {
      console.error(error);
    }
  },
  city: async (req, res) => {
    const { city, userId } = req.body;
    try {
      const findUser = await User.findById(userId);
      if (!findUser) {
        res.send("please log in");
      }
      findUser.city.push(city);
      await findUser.save();
      const token = jwt.sign(
        {
          findUser,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      res.json({ msg: "complete", token: token });
    } catch (err) {
      console.log(err);
    }
  },
  productChooseToTrue: async (req, res) => {
    try {
      const { indexProduct, userId } = req.body; // Extract the index of the product and the user ID from the request body
      const findUser = await User.findById(userId); // Find the user by their ID
      if (findUser) {
        // If the user is found, set the "choose" property of the specified product to true
        findUser.cart[indexProduct].choose = true;
        await findUser.save(); // Save the changes to the user's document in the database
        res.send("product choose switch to true"); // Send a response indicating the product choose has been set to true
      } else {
        return res.send("product not found"); // Send a response indicating the product was not found
      }
    } catch (error) {
      console.log(error);
    }
  },
  productChooseToFalse: async (req, res) => {
    try {
      const { indexProduct, userId } = req.body; // Extract the index of the product and the user ID from the request body
      const findUser = await User.findById(userId); // Find the user by their ID

      if (findUser) {
        findUser.cart[indexProduct].choose = false; // Set the "choose" property of the specified product to false
        await findUser.save(); // Save the changes to the user's document in the database
        res.send("product choose switch to false"); // Send a response indicating the product choose has been set to false
      } else {
        return res.send("product not found"); // Send a response indicating the product was not found
      }
    } catch (error) {
      console.log(error);
    }
  },
  searchByNameViewPurchases: async (req, res) => {
    try {
      // Get the search query from the request body
      const { getItem, userId } = req.body;

      // Find the user by their ID
      const user = await User.findById(userId);
      // Create a regular expression pattern to match the search query
      const regexPattern = new RegExp(getItem, "i");

      // Filter the historyOfCart array based on the regex pattern
      const filteredProducts = user.historyOfCart.filter((val) =>
        regexPattern.test(val.name)
      );

      // Send the filtered products as the response
      res.json({ msg: "search complete", products: filteredProducts });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "An error occurred" });
    }
  },
};
