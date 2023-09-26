const db = require("mongoose");
const Product = require("./products");
const bcrypt = require("bcrypt");

const userSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [Product.schema],
    required: false,
  },
  historyOfCart: {
    type: [Product.schema],
    required: false,
  },
  rank: {
    type: String,
    require: true,
  },
  deleteUsers: {
    type: [],
    require: false,
  },
  deleteProducts: {
    type: [],
    require: false,
  },
  city: {
    type: [],
    required: false,
  },
});

const User = db.model("users", userSchema);
// const createCEO = async () => {
//   const salt = await bcrypt.genSalt();
//   // Hash the password with the salt
//   const hashedPassword = await bcrypt.hash("ceo123", salt);
//   const userData = {
//     name: "elad",
//     lastName: "abutbul",
//     userName: "ceo",
//     password: hashedPassword,
//     rank: "ceo",
//   };
//   await User.insertMany(userData);
// };
// createCEO();
module.exports = User;
