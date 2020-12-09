const express = require("express");
const router = express.Router();
const redis = require('redis');
const inquiryClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
//mongoose models
const Inquiry = require("../models/Inquiry");
const Listing = require("../models/Listing");
const { response } = require("express");
const { text } = require("body-parser");

router.get('/', auth, async (req, res) => {
    try {
      const inquiries = await Inquiry.find();
      res.json(inquiries);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


router.post("/inquiry/postInquiry", async(req, res) => {
    console.log(req.body);
    Inquiry.collection('test').insertOne({data: req.body.message })
        .then(() => console.log('db insert worked'))
        .catch((e) => console.log(e));
    inquiryClient.publish('inquiries', req.body.message);
    res.send('ok');
});

router.get("/inquiry", async (req, res) => {

    Inquiry.find({listingId: req.params.listingId})
    .then(function(inquiries){
        res.render('text', 'date', {
            inquiries:inquiries
        });
    })

    // db.Inquiry.findById(parseInt(request.params.listingId))
    // .then(function(data){
    //     response.status(200).send(data);
    //     })

    });