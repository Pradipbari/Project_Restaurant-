const db = require("../utils/dataBase");
module.exports = class Contact {
  constructor(userName, email, messege) {
    this.userName = userName;
    this.email = email;
    this.messege = messege;
  }
  save() {
    return db
      .execute(
        `INSERT INTO userInfo 
        (userName, email, messege) 
        VALUES (?, ?, ?)`,
        [this.userName ?? null, this.email ?? null, this.messege ?? null]
      )
      .then((result) => {
        console.log("insert result :", result);
        return result;
      });
  }
};
