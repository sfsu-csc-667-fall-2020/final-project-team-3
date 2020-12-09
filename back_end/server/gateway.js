const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = process.env.PORT || 80;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy Server Error')
});

app.all('/api/*', (req, res) => {
  const options = {
    target: 'http://localhost:4000'
  };
  apiProxy.web(req, res, options);
});

app.all('/users/*', (req, res) => {
  const options = {
    target: 'http://localhost:4000'
  };
  apiProxy.web(req, res, options);
});

app.all('/', (req, res) => {
  const options = {
    target: 'http://localhost:4000'
  };
  apiProxy.web(req, res, options);
});

app.all('/dashboard', (req, res) => {
  const options = {
    target: 'http://localhost:4000'
  };
  apiProxy.web(req, res, options);
});

app.listen(port, () => console.log(`Proxy Server Started on ${port}`));