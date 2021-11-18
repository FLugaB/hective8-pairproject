const isLogin = function (req, res, next) {
  if (!req.session.userId) {
    let error = "please sign up first";
    res.redirect(`/?errors=${error}`);
  } else {
    next();
  }
};

const isAdmin = function (req, res, next) {
  if (req.session.userId && req.session.role !== "admin") {
    let error = "you can't access this";
    res.redirect(`/?errors=${error}`);
  } else {
    next();
  }
};

module.exports = { isLogin, isAdmin };
