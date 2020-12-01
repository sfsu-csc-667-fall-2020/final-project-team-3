const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`server started on ${port}`));

app.post('/api/createListing', (req, res) => {
  res.send('createListing');
});

app.post('/api/editListing', (req, res) => {
  res.send('editListing');
});

app.get('/api/viewListings', (req, res) => {
  res.send('viewListings');
});

app.post('/api/deleteListing', (req, res) => {
  res.send('deleteListing');
});

app.get('/api/getInquiries', (req, res) => {
  res.send('getInquiries');
});

app.post('/api/makeInquiry', (req, res) => {
  res.send('makeInquiry');
});

app.post('/api/register', (req, res) => {
  res.send('register');
});

app.post('/api/login', (req, res) => {
  res.send('login');
});
