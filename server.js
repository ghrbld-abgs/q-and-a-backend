const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up public docs
app.use(express.static('public'));

app.use('/qa', routes);

app.listen('1492', () => {
  console.log('listening on port 1492');
});