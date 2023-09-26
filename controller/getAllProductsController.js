const Product = require("../models/products");
module.exports = {
  getProducts: async (req, res) => {
    const allProducts = await Product.find({});
    res.send(allProducts);
  },
  getRing: async (req, res) => {
    // Find all products of type "ring" in the database
    const productResult = await Product.find({ type: "ring" });
    // Send the result as the response
    res.send(productResult);
  },
  getBracelet: async (req, res) => {
    // Find all products of type "bracelet" in the database

    const productResult = await Product.find({ type: "bracelet" });
    // Send the result as the response
    res.send(productResult);
  },
  getNecklace: async (req, res) => {
    // Find all products of type "necklace" in the database
    const productResult = await Product.find({ type: "necklace" });
    // Send the result as the response
    res.send(productResult);
  },
  getEarring: async (req, res) => {
    // Find all products of type "earring" in the database
    const productResult = await Product.find({ type: "earring" });
    // Send the result as the response
    res.send(productResult);
  },
};
