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
    Category.findAll({
      include: {
        model: Course,
        required: true,
      },
    })
      .then((data) => {
        return res.render("./pages/categories", { data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static categoriesFindOne(req, res) {
    let id = req.params.id;
    Course.findAll({
      include: {
        model: Category,
        required: true,
      },
    })

      .then((data) => {
        let newCourses = data.filter((courses) => courses.CategoryId == id);

        console.log(newCourses);
        res.render("./pages/single", { data, newCourses });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;