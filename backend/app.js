const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
mongoose
  .connect('mongodb+srv://lazarevicnebojsa1005:JRH2FW1hye45NrL3@cluster0.svuynwh.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => console.log('connected to database'))
  .catch(err => console.log('error', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: 'Post added successfully',
  });
});

app.get('/api/posts', (req, res) => {
  Post.find().then(posts => {
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts,
      });
  });
 
});

module.exports = app
