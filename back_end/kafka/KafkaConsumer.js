const ConsumerGroup = require('kafka-node').ConsumerGroup;
const EventEmitter = require('events');

const consumerOptions = {
  kafkaHost: 'localhost:9092',
  groupId: (Date.now()).toString(), // cluster
  sessionTimeout: 25000,
  protocol: ['roundrobin'],
  fromOffset: 'latest',
};

class KafkaConsumer extends EventEmitter {
  constructor(topics) {
    super();
    if (Array.isArray(topics)) {
      this.topics = topics;
    } else {
      this.topics = [topics];
    }
    this.consumerGroup = null;
  }

  connect() {
    this.consumerGroup = new ConsumerGroup(Object.assign({ id: 'test1' }, consumerOptions), this.topics);
    this.consumerGroup.on('message', message => this.emit('message', message));
  }
}

module.exports = KafkaConsumer;