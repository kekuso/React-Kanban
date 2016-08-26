'use strict';

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
var db = require('./models');
var Card = db.Card;
var User = db.User;
var UserCard = db.UserCard;

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
  User.findOne({
    where: {
      username: req.body.assignedTo
    }
  })
  .then(function(user) {
    console.log("User id: " + user.id);
    return user;
  })
  .catch(function (err) {
    console.error(err);
  })
  .then(function (user) {
    Card.create({
      title: req.body.title,
      priority: req.body.priority,
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo,
      status: 'Queue'
    })
  .then(function(card) {
    console.log("Successfully created card: " + card.id);
    console.log("User: " + user.id);
    return card;
  })
  .catch(function (err) {
    console.error(err);
  })
  .then(function(card) {
    UserCard.create({
      user_id: user.id,
      card_id: card.id,
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(function(userCard) {
      console.log("Successfully created usercard");
      res.redirect("/");
    })
    .catch(function(err) {
      console.error(err);
    })
  })
  })
});

app.put('/api/cards/:id', function (req, res) {
  Card.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  })
  .then(function (card) {
    if(card) {
      return card.updateAttributes({
        title: req.body.title,
        priority: req.body.priority,
        status: req.body.status,
        assignedTo: req.body.assignedTo,
        updatedAt: new Date()
      })
      .then(function(card) {
        console.log("Edited card: " + req.params.id)
        res.redirect("/");
      })
      .catch(function(err) {
        console.error(err);
      })
    }

    else {
      console.log("Unable to find card");
      res.send("Unable to find card.");
    }
  })
});

app.delete('/api/cards/:id',
  function (req, res) {
    console.log("req.params.id: " + req.params.id);
    Card.destroy({
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(function(card) {
      UserCard.destroy({
        where: {
          card_id: parseInt(req.params.id)
        }
      })
    })
    .then(function (card) {
      console.log("Deleted card: " + req.params.id);
      res.redirect("/");
    })
  });

var server = app.listen(app.get('port'), function () {
  db.sequelize.sync();
  console.log("Server listening on port %s", server.address().port);
});
