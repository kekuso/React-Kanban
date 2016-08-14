'use strict';

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

var app = express();
app.set('port', (process.env.PORT || 3000));

const COMMENTS_FILE = path.join(__dirname, 'comments.json');
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

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if(err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if(err) {
      console.error(err);
      process.exit(1);
    }
    let comments = JSON.parse(data);
    let newComment = {
      author: req.body.author,
      text: req.body.text
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
      if(err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});
var server = app.listen(app.get('port'), function () {
  console.log("Server listening on port %s", server.address().port);
});
