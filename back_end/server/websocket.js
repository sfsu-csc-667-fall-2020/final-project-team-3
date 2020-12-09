const WebSocket = require('ws');
const redis = require('redis');
const imageClient = redis.createClient({host: process.env.REDIS_HOST || 'localhost'});
const inquiryClient = redis.createClient({host: process.env.REDIS_HOST || 'localhost'});

const wss = new WebSocket.Server({port: 6000});

// dictionary to keep track of all the connected ws Clients
const webSocketClients = {};

// upon wss connected, the ws client send a message, which contains client's userId
wss.on('connection', (ws) => {
  ws.on('message', message => {
    const userId = JSON.parse(message).userId;
    webSocketClients[userId] = ws;
    console.log(`${userId} has connected`);
  });
});


/*********
 * Inquiry Messages
 *
 * example message gets sent to ws client
 * {
        _id: '5fd14b598ddcd107307d7fb2',
        text: 'hello',
        user: '5fcd90b3f967f70a58dc5b53',
        listingId: '5fcd596ffe96091028014773',
        date: '1607551833064',
        __v: 0
 * }
 * front end then can use the message to notify user that there's a new inquiry for their listing
 */
inquiryClient.on('message', (channel, message) => { // all channels for now
  console.log(`subscriber hears message ${message}`);
  console.log(JSON.parse(message));

  // parse the incoming message into msgObj
  const msgObj = JSON.parse(message);
  // if client with that userId is connected to this wss,
  // forward the message to our that client

  if (webSocketClients[msgObj.userId]) {
    webSocketClients[msgObj.userId].send(message);
  }
});

imageClient.on('message', (channel, message) => { // all channels for now
  console.log(`subscriber hears message ${message}`);
  console.log(JSON.stringify(message));
  wss.clients.forEach((client) => {
    client.send(message);
  });
});

inquiryClient.subscribe('inquiries', () => {
  console.log(`Inquiry Client subscribed to Inquiries PUBSUB channel`)
});
imageClient.subscribe('images');

  