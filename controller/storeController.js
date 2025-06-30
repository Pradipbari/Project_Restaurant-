const Contact = require("../model/contact");
const Item = require("../model/items");
const Order = require("../model/order");

exports.homePage = (req, res) => {
  res.render("index");
};

exports.myMenu = (req, res) => {
  Item.fetchAll().then(([foodItems]) => {
    res.render("menus", {
      foodItems: foodItems,
    });
  });
};

// Show the registration form for a selected item
exports.showOrderForm = (req, res) => {
  const itemId = req.params.itemId;

  if (!itemId) {
    return res.status(400).send("itemId missing");
  }

  Item.findById(itemId)
    .then(([foodItems]) => {
      if (foodItems.length === 0) {
        return res.status(404).send("Item not found");
      }

      const foodItem = foodItems[0];
      res.render("orderForm", { foodItem });
    })
    .catch((err) => {
      console.error("Error loading item:", err);
      res.status(500).send("Server error");
    });
};

//  Handle form submission
exports.submitOrder = (req, res) => {
  const { id, itemname, price, userName, email, address, imageUrl } = req.body;

  if (!id || !itemname || !price || !userName || !email || !address) {
    return res.status(400).send("Missing form fields");
  }
  console.log("submitOrder :: req.body =", JSON.stringify(req.body));
  console.log("SUBMIT BODY:", req.body);

  Item.findById(id)
    .then(([foodItems]) => {
      if (foodItems.length === 0) {
        return res.status(404).send("Item not found");
      }
      const item = foodItems[0];
      const newOrder = new Order(
        item.itemName,
        item.price,
        userName,
        email,
        address,
        item.imageUrl
      );
      return newOrder.save().then(() => {
        res.render("paySuccess", {
          item,
          name: userName,
        });
      });
    })
    .catch((err) => {
      console.error("Error saving order:", err);
      res.status(500).send("Something went wrong");
    });
};

exports.getMyOrders = (req, res) => {
  Order.fetchAll().then(([foodItems]) => {
    res.render("myOrders", {
      foodItems: foodItems,
    });
  });
};

exports.learnMore = (req, res) => {
  res.render("about");
};

exports.contactUs = (req, res) => {
  res.render("contact");
};

exports.paySuccess = (req, res) => {
  res.render("paySuccess");
};

exports.getInfo = (req, res) => {
  const { userName, email, messege } = req.body;
  console.log("Received body :", req.body);
  const contact = new Contact(userName, email, messege);
  contact.save().catch((err) => {
    console.log("Error while saving messege", err);
    res.status(500).send("Failed to save contact");
  });
  res.redirect("/");
};
