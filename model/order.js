const db = require("../utils/dataBase");

module.exports = class Order {
  constructor(itemName, price, userName, email, address, imageUrl) {
    this.itemName = itemName;
    this.price = price;
    this.userName = userName;
    this.email = email;
    this.address = address;
    this.imageUrl = imageUrl;
  }

  save() {
    return db.execute(
      `INSERT INTO orders 
     ( itemName, price, userName, email, address,imageUrl) 
     VALUES(  ?, ?, ?, ?, ?,?)`,
      [
        this.itemName ?? null,
        this.price ?? null,
        this.userName ?? null,
        this.email ?? null,
        this.address ?? null,
        this.imageUrl ?? null,
      ]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM orders");
  }

  static findById(id) {
    return db.execute("SELECT * FROM orders WHERE item_id = ?", [id]);
  }
};
