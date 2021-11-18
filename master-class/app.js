const express = require("express");
const app = express();
const port = 3000;
const Controller = require("./controllers/controller");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", Controller.home);

app.get("/signUp", Controller.signUp);

app.listen(port, () => {
  console.log(`Go to ${port}`);
});
