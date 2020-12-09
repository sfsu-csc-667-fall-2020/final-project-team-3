const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const InquirySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  date: {
    type: String,
    default: Date.now
  },
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

module.exports = Inquiry;