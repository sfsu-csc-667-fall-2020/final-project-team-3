const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({

    message: {
        type: String,
        required: true
      },

    date: {
        type: String,
        default: Date.now
      },

});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

module.exports = Inquiry;