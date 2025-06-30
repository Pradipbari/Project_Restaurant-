const express = require("express");
const storeRouter = require("./routes/storeRouter");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(storeRouter);
app.use(express.static("public"));

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on address http://localhost:${port}`);
});
