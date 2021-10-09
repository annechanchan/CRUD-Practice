// require packages
const express = require('express');  //need npm install express
const cookieParser = require('cookie-parser'); //need npm install cookei-parser
const path = require('path'); //built in library (no install required)

// require routers
const loginRouter = require('./routes/loginRouter');
// const apiRouter = require('./routes/apiRouter');

// initialize express server and declare a port for the server
const app = express();
const PORT = 3000;

// insert global parsers
app.use(express.json()); // recognize incoming Request Object as JSON object
app.use(express.urlencoded({ extended: true })); // recognize incoming Request Object as strings & arrays
// app.use(cookieParser());

// serve static files
app.use(express.static('../client/'));

// direct to routers
app.use('/', loginRouter);
// app.use('/api', apiRouter);

// global 404 catch for bad route requests
app.use((req, res) => {
  res.status(404).send('404 page not found');
})

// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred in middleware' }
    };
    console.log('Sending a global error to the client.');

    const errorObj = Object.assign({}, defaultErr, err);

    return res.status(errorObj.status).json(errorObj.message);
})

// start server with message
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;