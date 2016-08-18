'use strict';

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
var db = require('./models');
var Card = db.Card;

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// middleware
app.use(function(req, res, next) {
  // set a header that will allow any origin to call me
  res.setHeader('Access-Control-Allow-Origin', '*');
  // turn off cache
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/cards', function(req, res) {
  Card.findAll()
    .then(function (cards) {
      res.json(cards);
    })
    .catch(function (err) {
      console.error(err);
      res.send(err);
    });
});

app.post('/api/cards', function (req, res) {
  Card.create({
    title: req.body.title,
    priority: req.body.priority,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo,
    status: 'Queue'
  })
  .then(function (card) {
    res.json(card);
  })
  .catch(function (err) {
    console.error(err);
  });
});

var server = app.listen(app.get('port'), function () {
  db.sequelize.sync();
  console.log("Server listening on port %s", server.address().port);
});
