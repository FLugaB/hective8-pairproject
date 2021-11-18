const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const Controller = require("./controllers/controller");
const { isLogin, isAdmin } = require("./middleware/middleware");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);
app.use(function (req, res, next) {
  console.log(req.session.userId);
  console.log(req.session.role);
  next();
});
app.get("/", Controller.home);
app.post("/", Controller.login);
//userSubscriber
app.get("/addUser", Controller.signUp);
app.post("/addUser", Controller.newUser);

app.use(isLogin);

app.get("/addUser", isAdmin, Controller.signUpWithAdmin);
app.post("/addUser", isAdmin, Controller.newUserWithAdmin);

app.get("/logout", Controller.logout);

app.listen(port, () => {
  console.log(`Go to ${port}`);
});