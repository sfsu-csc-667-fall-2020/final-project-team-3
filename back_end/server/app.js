/*****************************
 *  main backend server file *
 *****************************/

/*****************************
 *           redis           *
 *****************************/
const redis = require('redis');
const redisClient = redis.createClient();

/*****************************
 *           kafka           *
 *****************************/
const KafkaProducer = require('../kafka/KafkaProducer');
const kafkaProducer = new KafkaProducer('images');

/*****************************
 *          passport         *
 *****************************/
const passport = require('passport');
require('../config/passport')(passport);

/*****************************
 *          mongoDB          *
 *****************************/
const mongoose = require('mongoose');
const uri = "mongodb+srv://team3user:Pu5pTgsjoPmOsNLc@cluster0.qwxma.mongodb.net/team3?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

/*****************************
 *          express          *
 *****************************/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));

// let express server static files
app.use(express.static('public'));

// Bodyparser
app.use(express.urlencoded({extended: true}));

// express session
const session = require('express-session');
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// EXPRESS ROUTES
// requests gets routed to ../routes/ to keep app.js clean
app.use('/api/users', require('../routes/users'));
app.use('/api/listings', require('../routes/listings'));


/*****************************
 *          endpoints        *
 *****************************/
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

// TESTING
app.get('/me', (req, res) => {
  if (req.user) {
    res.json(req.user.id)
  } else {
    res.send('pls login')
  }

});


