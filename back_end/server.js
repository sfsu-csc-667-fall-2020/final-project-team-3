/*
  main backend server file
*/

const express = require('express');
const app = express();
const port = 4000;

app.listen(port, () => console.log(`server started on ${port}`));

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
  res.send('register');
});

// TODO
app.post('/api/login', (req, res) => {
  res.send('login');
});
