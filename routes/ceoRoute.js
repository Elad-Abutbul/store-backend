const express = require("express");
const router = express.Router();
const controller = require("../controller/ceoController");
router.post("/removeFromDeleteList", controller.removeFromDeleteList);
router.post("/searchByUserNameMng", controller.searchByUserNameMng);
router.post("/searchByUserNameDeleteMng", controller.searchByUserNameDeleteMng);
router.post("/bestProduct", controller.bestProduct);
router.post("/addProduct", controller.addProduct);
router.post("/deleteProduct", controller.deleteProduct);
router.post("/ifNameOfTheProductExixt", controller.ifNameOfTheProductExixt);
router.post("/updateProductCEO", controller.updateProductCEO);
router.post("/searchInDeleteProductList", controller.searchInDeleteProductList);

module.exports = router;
