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

router.get("/categories/add", Controller.formCategories);
router.post("/categories/add", Controller.addCategories);



router.get(`/categories/delete/:categoriesid`, Controller.deleteCategories)

router.get("/categories/:id", Controller.categoriesFindOne);

router.get("/categories/:id/edit", Controller.editCourses);
router.post("/categories/:id/edit", Controller.updateCourses);

router.get("/logout", Controller.logout);

module.exports = router;
