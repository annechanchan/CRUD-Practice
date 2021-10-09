// require packages
const express = require('express'); // Need the express server library
const loginController = require('../controllers/loginController'); //
const path = require('path');

// initialize router
const router = express.Router();

/* handle routes to '/' */

// Before this callback we will add middleware
router.get('/', (req, res) => { // This is the first page that a user will see.
    return res // Before this callback we will add middleware
        .status(200)
        .setHeader('Content-Type', 'text/html')
        // .sendFile(path.joinin(__dirname, '../../client/login.html'))

});

router.get('/login', (req, res) => { // This is the first page that a user will see.
  return res // Before this callback we will add middleware
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .sendFile(path.join(__dirname, '../../client/login.html'))

});

// handle requests to /createUser to create a new user
router.post('/createUser',
    loginController.checkUser,
    loginController.createUser,
    loginController.setCookie,
    (req, res) => {
      if (!res.locals.user) {
        return res.status(400).json({ err: 'Username already exists' })
      }

      return res.status(200).json({ userid: res.locals.user.id });
    }
);

// handle requests to / to log in an existing user
router.post('/login',
    loginController.checkUser,
    loginController.verifyUser,
    loginController.setCookie,
    (req, res) => {
      if (!res.locals.user) {
        return res.status(400).json({ err: 'Invalid user login' })
      }

      return res.status(200).json({ userid: res.locals.user.id });
    }
);

// export as a router
module.exports = router;