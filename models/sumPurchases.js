const db = require("mongoose");

const sumSchema = new db.Schema({
  totalSum: {
    type: Number,
    default: 0,
  },
});

const Sum = db.model("Sum", sumSchema);

module.exports = Sum;
