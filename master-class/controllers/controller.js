const { User } = require("../models");

const bcrypt = require("bcryptjs");

class Controller {
  static home(req, res) {
    if (req.query) {
      let { username, password } = req.query;

      User.findOne({
        where: { username },
      })
        .then((user) => {
          if (user) {
            const isValidPassword = bcrypt.compareSync(password, hash);
            if (isValidPassword) {
              return res.redirect("/");
            } else {
              const error = "invalid username/password";
              return res.redirect(`/?errors=${error}`);
            }
          } else {
            const error = "invalid username/password";
            return res.redirect(`/?errors=${error}`);
          }
        })
        .catch((err) => {
          res.send(err);
        });
    }
    res.render("./pages/index");
  }

  static signUp(req, res) {}
}

module.exports = Controller;
