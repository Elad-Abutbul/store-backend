const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Product = require("../models/products");
module.exports = {
  removeFromDeleteList: async (req, res) => {
    const { userName } = req.body;
    try {
      const findUser = await User.findOneAndUpdate(
        { rank: "ceo" },
        { $pull: { deleteUsers: { userName: userName } } },
        { new: true }
      );

      if (findUser) {
        const token = jwt.sign(
          {
            findUser,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
        res.json({
          msg: "User Recovered",
          token: token,
          userData: findUser._doc,
        });
      } else {
        res.send("Can't find a CEO.");
      }
    } catch (error) {
      res.send("An error occurred.");
    }
  },
  searchByUserNameMng: async (req, res) => {
    try {
      // Get the search query from the request body
      const { userName } = req.body;

      // Create a regular expression pattern to match the search query
      const regexPattern = new RegExp(userName, "i");

      // Create a query to find users whose name matches the pattern and rank is "user"
      const query = {
        userName: { $regex: regexPattern },
        rank: "user",
      };

      // Execute the query to find matching users
      const result = await User.find(query);

      // Send the search result as the response
      res.json({ msg: "search complete", users: result });
    } catch (err) {
      console.log(err);
    }
  },
  searchByUserNameDeleteMng: async (req, res) => {
    try {
      // Get the search query from the request body
      const { userName } = req.body;

      // Create a regular expression pattern to match the search query
      const regexPattern = new RegExp(userName, "i");

      // Find the CEO document
      const ceo = await User.findOne({ rank: "ceo" });

      // Check if the CEO document exists and has the deleteUsers array
      if (ceo) {
        // Filter the deleting users array based on the query
        const filteredUsers = ceo.deleteUsers.filter((val) =>
          regexPattern.test(val.userName)
        );

        // Send the search result as the response
        res.json({ msg: "search complete", users: filteredUsers });
      }
    } catch (err) {
      console.error(err);
      res.send("An error occurred");
    }
  },
  bestProduct: async (req, res) => {
    const { bestSeller } = req.body;
    const product = await Product.find({ name: bestSeller });
    res.send(product);
  },
  addProduct: async (req, res) => {
    const { name, description, linkImg, type, price, ceoId } = req.body;
    const findUser = await User.findById(ceoId);
    if (findUser) {
      let filterProduct = findUser.deleteProducts.filter(
        (product) => product.name !== name
      );
      findUser.deleteProducts = filterProduct;
      findUser.save();
      await Product.create({
        name: name,
        description: description,
        price: price,
        image: linkImg,
        choose: false,
        type: type,
      });
      const token = jwt.sign(
        {
          findUser,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      res.send({ msg: "product add to collection", token: token });
    }
  },
  deleteProduct: async (req, res) => {
    const { productId, ceoId } = req.body;
    const findUser = await User.findById(ceoId);
    if (findUser) {
      const product = await Product.findById(productId);
      if (product) {
        await Product.findByIdAndDelete(productId);
        findUser.deleteProducts.unshift(product);
        findUser.save();
        const token = jwt.sign(
          {
            findUser,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
        res.send({ msg: "product deleted", token: token, findUser: findUser });
      }
    }
  },
  ifNameOfTheProductExixt: async (req, res) => {
    const { nameProduct, ceoId, productId } = req.body;
    try {
      const findUser = await User.findById(ceoId);

      if (findUser) {
        const productExixt = await Product.exists({ name: nameProduct });
        const product = await Product.findById(productId);
        if (productExixt) {
          if (product?.name === nameProduct) {
            const token = jwt.sign(
              {
                findUser,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "30m" }
            );
            res.send({ msg: "not exixt", token: token });
          } else {
            res.send({ msg: "Name Of The Product Exixt" });
          }
        } else {
          const token = jwt.sign(
            {
              findUser,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
          );
          res.send({ msg: "not exixt", token: token });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateProductCEO: async (req, res) => {
    const { ceoID, product } = req.body;
    try {
      const findUser = await User.findById(ceoID);
      if (findUser) {
        const updateProduct = await Product.findByIdAndUpdate(
          product.productId,
          product
        );
        if (updateProduct) {
          const token = jwt.sign(
            {
              findUser,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
          );
          res.json({ msg: "update product suc", token: token });
        } else {
          res.send("An error occurred");
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  searchInDeleteProductList: async (req, res) => {
    const { productName, ceoId } = req.body;
    try {
      const ceo = await User.findById(ceoId);
      if (ceo) {
        const regexPattern = new RegExp(productName, "i");
        const filterProducts = ceo.deleteProducts.filter((product) =>
          regexPattern.test(product.name)
        );

        // Execute the query to find matching products
        if (filterProducts.length > 0) {
          const token = jwt.sign(
            {
              findUser: ceo,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
          );
          res.json({
            msg: "search complete",
            products: filterProducts,
            token: token,
          });
        } else {
          res.send("No products found");
        }
      } else {
        res.send("CEO not found");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
