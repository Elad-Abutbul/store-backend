const express = require("express");
const router = express.Router();
const controller = require("../controller/getAllProductsController");
router.get("/", controller.getProducts);
router.get("/Ring", controller.getRing);
router.get("/Bracelet", controller.getBracelet);
router.get("/Necklace", controller.getNecklace);
router.get("/Earring", controller.getEarring);
module.exports = router;
