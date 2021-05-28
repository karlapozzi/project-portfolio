const express = require('express');
const { projects } = require('./data.json');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
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
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});