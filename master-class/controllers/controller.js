const { User, Category, Course, UserProfile } = require("../models");

const bcrypt = require("bcryptjs");

class Controller {
  static home(req, res) {
    let user = req.session.userId;
    if (!user) {
      user = "You need to login first before classes";
    }
    if (req.session.userId) {
      User.findOne({
        where: {
          id: user,
        },
      })
        .then((data) => {
          if (req.session.role === "Admin") {
            return res.render("./pages/index", { data, user });
          } else if (req.session.role === "Subscriber") {
            return res.render("./pages/index", { data, user });
          }
        })
        .catch((err) => {
          return res.send(err);
        });
    } else {
      let data = null;
      return res.render("./pages/index", { user, data });
    }
  }

  static login(req, res) {
    let { email, password } = req.body;

    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (user) {
          req.session.userId = user.id;
          req.session.role = user.role;
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (isValidPassword) {
            return res.redirect("/");
          } else {
            const error = "invalid email/password";
            return res.redirect(`/?errors=${error}`);
          }
        } else {
          const error = "invalid email/password";
          return res.redirect(`/?errors=${error}`);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static signUp(req, res) {
    let user = req.session.userId;
    let data;
    if (!user || !data) {
      user = false;
      data = false;
      res.render("./pages/addUserForm", {
        data,
        user,
      });
    } else {
      user = true;
      data = true;
      res.render("./pages/addUserForm", {
        data,
        user,
      });
    }
  }

  static newUser(req, res) {
    const { email, password, role = "Subscriber" } = req.body;
    // console.log(email, password, role);

    User.create({
      email: email,
      password: password,
      role: role,
    })
      .then((user) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static signUpWithAdmin(req, res) {
    res.render("./pages/addUserForm");
  }
  static newUserWithAdmin(req, res) {
    let { email, password, role } = req.body;
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    });
  }

  static categories(req, res) {
    let data = req.session;
    Category.findAll({
      include: {
        model: Course,
        required: true,
      },
    })
      .then((categories) => {
        return res.render("./pages/categories", { categories, data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static categoriesFindOne(req, res) {
    let data = req.session;
    let id = req.params.id;
    Course.findAll({
      include: {
        model: Category,
        required: true,
      },
    })
      .then((categories) => {
        let newCourses = categories.filter((courses) => courses.CategoryId == id);
        let thisCategory = categories[0].Category.name
        res.render("./pages/single", { categories, newCourses, data, thisCategory });
      })
      .catch((err) => {
        res.send(err);
      });
  }


  static formCategories(req, res) {

    let data = req.session;
    let id = req.params.id;

    res.render("./pages/categoriesForm", {data, id});

  }

  static addCategories(req, res) {
    let data = req.session;
    let id = req.params.id;
    const { name, urlVideo } = req.body

    Category.create({
      name,
      urlVideo
    })
    .then( categories => {
      res.redirect("/categories");
    })
    .catch((err) => {
      res.send(err);
    });
    
  }

  static deleteCategories(req,res){
    let data = req.session;
    let id = req.params.id;
    let CategoryId = req.params.categoriesid

    Category.destroy({
      where: {
        id: CategoryId
      }
    })
    .then( categories => {
      res.redirect("/categories");
    })
    .catch( err => {
      res.send(err);
    })
  }

  static editCourses(req,res){
    let data = req.session;
    let id = req.params.id;
    let CoursesId = req.params.id

    Course.findOne({
      include: {
        model: Category,
        required: true,
      },
      where: {
        id: CoursesId
      }
    })
    .then( courses => {
      res.render("./pages/coursesForm", {courses, data});
    })
    .catch( err => {
      res.send(err);
    })
  }

  static updateCourses(req,res){
    const { CourseId, title, master, urlImg, urlVideo, description, category } = req.body
    let data = req.session;
    let id = req.params.id;
    // let CategoryId = req.params.categoriesid

    Course.update({
      title: req.body.title,
      master: req.body.master,
      urlImg: req.body.urlImg,
      urlVideo: req.body.urlVideo,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      where: {
          id: id
      }
  })
    .then( categories => {
      res.redirect(`/categories/${category}`);
    })
    .catch( err => {
      res.send(err);
    })

  }
}

module.exports = Controller;