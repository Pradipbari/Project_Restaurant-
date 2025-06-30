// All menu
const db = require("../utils/dataBase");
module.exports = class Item {
  constructor(id, itemName, price) {
    this.itemName = itemName;
    this.price = price;
    this.id = id;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM fooditems");
  }
  static findById(id) {
    return db.execute("SELECT * FROM fooditems WHERE id=?", [id]);
  }
};
