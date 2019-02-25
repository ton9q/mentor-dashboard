const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const data = require('../assets/data/data.json');
const app = express();

const port = process.env.PORT || 1902;

app.listen(port, () => {
  console.log('Server run and listen port ', port); //eslint-disable-line
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/data', (req, res) => {
  res.send(JSON.stringify(data));
});

app.use(express.static(path.resolve(__dirname, '../dist/')));
