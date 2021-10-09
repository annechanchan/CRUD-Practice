//import DB models
const db = require('../models/models');

const loginController = {};

// check if username exists in the db
loginController.checkUser = (req, res, next) => {
  const { username } = req.body;

  const query = {
    text: `
        SELECT *
        FROM users
        WHERE username = $1;
    `,
    params: [username]
  };
// dbResponse.row[0]: {id: 1, username: 'parker', password: 123}
  db.query(query.text, query.params, (err, dbResponse) => {
    if (err) {
      return next({
        log: 'ERROR: loginController.checkUser',
        message: { err: err.message }
      });
    }
    res.locals.user = dbResponse.rows[0];
    return next();
  })
}

//add a user in db (when username does not exist in db)
loginController.createUser = (req, res, next) => {
  if (res.locals.user) {
    delete res.locals.user;
    return next();
  }

  const { username, password } = req.body;

  const query = {
    text: `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURN id;
    `,
    params: [username, password]
  };

  db.query(query.text, query.params, (err, dbResponse) => {
      if (err) {
          return next({
            log: 'ERROR: loginController.createUser',
            message: { err: err.message }
          });
      }

      res.locals.user = dbResponse.rows[0];
      return next();
  });
};

//verify the username and password combination in db. If we are using checkUser controller, we do not need to query anything because the information will be passed through req.body (from client) and res.locals (from checkUser)
loginController.verifyUser = (req, res, next) => {
  if (!res.locals.user) {
      return next({
            log: 'ERROR: loginController.verifyUser',
            message: { err: err.message }
      });
  }

  const { password } = req.body;

  if (password !== res.locals.user.password.toString()) {
    delete res.locals.user;
  }

  return next();
};

// create and send a cookie to the frontend
loginController.setCookie= (req, res, next) => {
    if (!res.locals.user) return next();

    const userID = res.locals.user.id;

    res.cookie('userID', userID);

    return next();
};

module.exports = loginController;