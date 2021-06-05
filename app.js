const express = require('express');
const { projects } = require('./data.json');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

//Set up index route and send info about projects
app.get('/', (req, res) => {
  res.render('index', { projects });
})

//Set up about route
app.get('/about', (req, res, next) => {
  res.render('about');
})

//Set up routes for each project based on its ID
app.get('/project/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects[projectId];

  //If the project exists, show it, otherwise move on to errors
  if (project) {
    res.render('project', { project });
  } else {
    next();
  }
});

//404 error handler
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Uh oh! That page doesn't exist.";
  next(err);
});

//Global error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.locals.message = err.message;
  res.status(err.status || 500);

  //If the error is a 404, show that page, otherwise show the global error template
  if (err.status === 404) {
    res.render('page-not-found');
  } else {
    err.message = "Something went wrong."
    res.render('error');
  }
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});