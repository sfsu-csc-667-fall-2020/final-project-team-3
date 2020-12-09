const sharp = require('sharp');
const KafkaConsumer = require('../kafka/KafkaConsumer');
const uploadPath = '../public/uploads/';

kafkaConsumer = new KafkaConsumer('images');

kafkaConsumer.on('message', (message) => {
  console.log(`incoming kafka message: `);
  console.log(message);

  const imageFile = JSON.parse(message.value);
  const imagePath = uploadPath.concat(imageFile.filename);
  sharp(imagePath)
    .resize(100, 100)
    .toFile(uploadPath.concat('thumb-100-', imageFile.filename))
    .then(() => {
      sharp(imagePath)
        .resize(500, 500)
        .toFile(uploadPath.concat('thumb-500-', imageFile.filename))
        .then(() => {
          // send out redis signal here
          console.log(`${imageFile.filename} processed`)
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

kafkaConsumer.connect();