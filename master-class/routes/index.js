const router = require("express").Router();
const Controller = require("../controllers/controller");
const { isLogin, isAdmin } = require("../middleware/middleware");
router.use(function (req, res, next) {
  console.log(req.session.userId);
  console.log(req.session.role);
  next();
});

router.get("/", Controller.home);
router.post("/", Controller.login);
//userSubscriber
router.get("/addUser", Controller.signUp);
router.post("/addUser", Controller.newUser);

router.use(isLogin);

// router.get("/addUser", isAdmin, Controller.signUpWithAdmin);
// router.post("/addUser", isAdmin, Controller.newUserWithAdmin);

router.get("/categories", Controller.categories);
router.get("/categories/:id", Controller.categoriesFindOne);

router.get("/logout", Controller.logout);

module.exports = router;
