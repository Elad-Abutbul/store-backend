const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
router.post("/addToCart", controller.addToCart);
router.post("/search", controller.search);
router.post("/deleteItem", controller.deleteItem);
router.post("/pay", controller.pay);
router.post("/deleteUser", controller.deleteUser);
router.post("/editAccount", controller.editAccount);
router.post("/city", controller.city);
router.post("/productChooseToTrue", controller.productChooseToTrue);
router.post("/productChooseToFalse", controller.productChooseToFalse);
router.post("/searchByNameViewPurchases", controller.searchByNameViewPurchases);

module.exports = router;
