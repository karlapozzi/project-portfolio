const express = require('express');
const { projects } = require('./data.json');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { projects });
})

app.get('/about', (req, res, next) => {
  res.render('about');
})

app.get('/project/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects[projectId];

  if (project) {
    res.render('project', { project });
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Uh oh! That page doesn't exist.";
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.locals.message = err.message;
  res.status(err.status || 500);
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