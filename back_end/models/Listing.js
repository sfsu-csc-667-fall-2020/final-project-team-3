const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: true
  },
  images: {
    type: Array,
  },
  date: {
    type: String,
    default: Date.now
  },
  modified: {
    type: String
  }
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;