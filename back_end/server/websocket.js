const WebSocket = require('ws');
const redis = require('redis');
const imageClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
const inquiryClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

const wss = new WebSocket.Server({ port: 6000 });

wss.on('connection', (ws) => {
  console.log('Someone has connected');
});

imageClient.on('message', (channel, message) => { // all channels for now
  console.log(`subscriber hears message ${message}`);
  console.log(JSON.stringify(message));
  wss.clients.forEach((client) => {
    client.send(message);
  });
});

imageClient.subscribe('images');


inquiryClient.on('message', (channel, message) => { // all channels for now
    console.log(`subscriber hears message ${message}`);
    console.log(JSON.stringify(message));
    wss.clients.forEach((client) => {
      client.send(message);
    });
  });
  
  inquiryClient.subscribe('inquiries');
  