const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const InquirySchema = new mongoose.Schema({

    text: {
        type: String,
        required: true
      },

    date: {
        type: String,
        default: Date.now
      },

      listingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
      }

});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

module.exports = Inquiry;