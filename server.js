const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res,  next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) console.log('Could nor write to log!');
  });

  next();
});

// app.use( (req, res,  next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance...',
//     maintenanceMessage: 'The site is currently down for maintenance... Please check back soon...'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to our website, wanker!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About page"
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to display that page!'
  });
});

app.listen(port, () => {
  console.log(`Server up on port ${port}!`);
});
