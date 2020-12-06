/*
  main backend server file
*/

// redis
const redis = require('redis');
const redisClient = redis.createClient();

// kafka
const KafkaProducer = require('./kafka/KafkaProducer');
const kafkaProducer = new KafkaProducer('images');

// mongo
const mongoose = require('mongoose');
const uri = "mongodb+srv://team3user:Pu5pTgsjoPmOsNLc@cluster0.qwxma.mongodb.net/team3?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));

app.use(express.urlencoded({extended: false}));

// TODO
app.post('/api/createListing', (req, res) => {
  res.send('createListing');
});

// TODO
app.post('/api/editListing', (req, res) => {
  res.send('editListing');
});

// TODO
app.get('/api/viewListings', (req, res) => {
  res.send('viewListings');
});

// TODO
app.post('/api/deleteListing', (req, res) => {
  res.send('deleteListing');
});

// TODO
app.get('/api/getInquiries', (req, res) => {
  res.send('getInquiries');
});

// TODO
app.post('/api/makeInquiry', (req, res) => {
  res.send('makeInquiry');
});

// TODO
app.post('/api/register', (req, res) => {
  console.log(req.body);
  res.send('register');
});

// TODO
app.post('/api/login', (req, res) => {
  console.log(req.body);
  res.send('login');
});
