const express = require("express");
const router = express.Router();
const ResponseDTO = require('../helper/responseDTO');
//mongoose models
const Inquiry = require("../models/Inquiry");

const redis = require('redis');
const client = redis.createClient({host: process.env.REDIS_HOST || 'localhost'});

/****************************
 *  view inquiries
 *  - /api/inquiries for all inquiries
 *  - /api/inquiries?listingId=id for all inquiries relating to that listing
 ***************************/
router.get('/', async (req, res, next) => {
  const listingId = req.query['listingId'];
  // check if there is a listingId query being passed in
  // and check if the listingId is valid
  if (listingId) {
    if (ObjectId.isValid(listingId)) {
      try {
        const inquiries = await Inquiry.find(listingId);
        res.json(new ResponseDTO(inquiries));
      } catch (err) {
        console.error(err.message);
        res.json(new ResponseDTO().setStatusCode(404).pushError(err));
      }
    } else { // object id not valid
      res.json(new ResponseDTO().pushError('Invalid ListingId'))
    }
  } else { // if no listingId being pass in return all inquires
    try {
      const inquiries = await Inquiry.find();
      res.json(new ResponseDTO(inquiries));
    } catch (err) {
      console.error(err.message);
      res.json(new ResponseDTO().setStatusCode(500).pushError(err));
    }
  }


});

/****************************
 *  create inquiries
 *  - /api/inquiries/create
 *  - please pass in text and listingId in req.body
 *  - response is a DTO with the inquiry itself, else res.statusCode = 500
 ***************************/
router.post('/create', (req, res, next) => {
  let errors = [];
  const user = req.user;
  if (!user) {
    errors.push('Please Log In');
  }

  const {text, listingId} = req.body;

  if (!text || !listingId) {
    errors.push(`Please enter all fields`);
  }

  if (errors.length > 0) {
    res.json(new ResponseDTO(500).pushError(errors));
  } else {
    const inquiry = new Inquiry({
      text,
      user: user._id,
      listingId
    });

    inquiry.save()
      .then(() => {
          // redis message:
          client.publish('inquiries', JSON.stringify(inquiry));

          res.json(new ResponseDTO(inquiry));
        }
      )
      .catch(err => () => {
        console.log(err);
        res.json(new ResponseDTO().setStatusCode(500).pushError(err));
      });
    //inquiryClient.publish('inquiries',inquiry);
  }
});

module.exports = router; 