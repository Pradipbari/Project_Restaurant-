const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controller/storeController");

// Main pages
storeRouter.get("/", storeController.homePage);
storeRouter.get("/menu", storeController.myMenu);
storeRouter.get("/learn-more", storeController.learnMore);
storeRouter.get("/connect", storeController.contactUs);
storeRouter.get("/my-orders", storeController.getMyOrders);

// ✅ Show order form (GET)
storeRouter.get("/order-form/:itemId", storeController.showOrderForm);

// ✅ Handle order submission (POST)
storeRouter.post("/submit-order", storeController.submitOrder);

// Payment Success (POST)
storeRouter.post("/paySuccess", storeController.paySuccess);

// For other info collection (not order-related)
storeRouter.post("/getInfo", storeController.getInfo);

module.exports = storeRouter;
